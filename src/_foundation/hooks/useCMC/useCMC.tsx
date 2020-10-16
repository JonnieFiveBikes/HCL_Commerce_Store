/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import { Dispatch, RefObject } from "react";
//foundation
import { storageSessionHandler } from "../../utils/storageUtil";
import { site } from "../../constants/site";
//redux
import { CMC_SESSION_ERROR_ACTION } from "../../../redux/actions/error";

class CMCService {
  private static myCMCService: CMCService = new CMCService();
  private static childFrame: RefObject<HTMLIFrameElement>;
  private static dispatch: Dispatch<any>;

  private readonly LOCALE_TOKEN = "{locale}";
  private cmcUrl = `${window.origin}${site.cmcPath}?locale=${this.LOCALE_TOKEN}&initializePostMessageSrc=${window.origin}`;
  private cmcInitialized: boolean = false;
  private locale: string = "en_US";

  private pendingMessages: any[] = [];

  public static getCMCMessageService(
    iframeRef: RefObject<HTMLIFrameElement>,
    locale: string,
    dispatch: Dispatch<any>
  ): CMCService {
    CMCService.childFrame = iframeRef;
    CMCService.dispatch = dispatch;
    CMCService.myCMCService.cmcInitialized = false;
    CMCService.myCMCService.setLocale(locale);
    return CMCService.myCMCService;
  }

  private setLocale = (locale: string) => {
    this.locale = locale.replace("-", "_");
  };

  private getCMCURL = (): string => {
    return this.cmcUrl.replace(this.LOCALE_TOKEN, this.locale);
  };
  private receiveMessage = (event: MessageEvent) => {
    let origin = event.origin;
    if (window.origin !== origin) {
      //same origin handled by proxy/webserver rewrite
      return;
    }

    let childFrameWindow = CMCService.childFrame.current?.contentWindow;
    const childFrameElement = CMCService.childFrame.current;
    if (childFrameWindow && event.source !== childFrameWindow) {
      //only take message from child iframe
      return;
    } else if (typeof event.data === "string") {
      let data = JSON.parse(event.data as string);
      if (data.cmd === "cmcInitialized") {
        this.cmcInitialized = true;
        while (this.pendingMessages.length > 0) {
          this.triggerPostMessage(this.pendingMessages.shift());
        }
        if (childFrameElement) {
          childFrameElement.style.visibility = "visible";
        }
      } else if (data.cmd === "startReLogon") {
        CMCService.dispatch(CMC_SESSION_ERROR_ACTION({}));
      }
    } else {
      return;
    }
  };

  private initializeMessage() {
    window.addEventListener("message", this.receiveMessage, false);
  }

  private triggerPostMessage(message: string) {
    const contentWindow = CMCService.childFrame.current?.contentWindow;
    if (contentWindow) {
      contentWindow.postMessage(message, window.origin);
    }
  }

  private getIframeContent(): string {
    const form = `<form action="${this.getCMCURL()}" method="post" style="display:none" >
    <input name="WCToken" value="${
      storageSessionHandler.getCurrentUserAndLoadAccount().WCToken
    }" >
    <input name="WCTrustedToken" value="${
      storageSessionHandler.getCurrentUserAndLoadAccount().WCTrustedToken
    }">
    <input name="initializePostMessageSrc" value="${window.origin}" >
    <input name="navigationDisabled" value="true" >
</form>`;
    return form;
  }

  /**
   * Launch CMC using post request to pass WCToken
   * @pre The `refObject.current` must be defined before calling this method
   */
  public launchCMC() {
    if (CMCService.childFrame.current) {
      const current = CMCService.childFrame.current;
      if (current.contentDocument) {
        const doc = current.contentDocument;
        doc.write(this.getIframeContent());
        doc.close();
        doc.forms[0].submit();
      }
      this.initializeMessage();
    }
  }

  /**
   * Open business tool
   * @param idOfTool The tool's id.
   */
  public openTool = (idOfTool: string) => {
    const currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
    const message = {
      cmd: "openBusinessTool",
      args: [idOfTool, currentUser.WCToken, currentUser.WCTrustedToken],
    };
    if (this.cmcInitialized) {
      this.triggerPostMessage(JSON.stringify(message));
    } else {
      this.pendingMessages.push(JSON.stringify(message));
    }
  };

  public reset() {
    window.removeEventListener("message", this.receiveMessage);
    this.cmcInitialized = false;
    this.pendingMessages = [];
  }
}

const useCMC = (
  iframeRef: RefObject<HTMLIFrameElement>,
  locale: string,
  dispatch: Dispatch<any>
) => {
  return CMCService.getCMCMessageService(iframeRef, locale, dispatch);
};

export default useCMC;
