/*
 * ==================================================
 *  Licensed Materials - Property of HCL Technologies
 *
 *  HCL Commerce
 *
 *  (C) Copyright HCL Technologies Limited 2021
 *
 * ==================================================
 */

const extractCSStoHTML = () => {
  // extra function call to make sure all JSS styles(used by Material UI) are print to HTML.
  // with this call, we probably do not need set disableCSSOMInjection in Styled-components stylesheetmanager,
  // but we will still keep that since no harm and we can reference it if customer is using different component.
  if ((window as any).__isPrerender__) {
    let cssStyles = "";
    for (let i = 0; i < document.styleSheets.length - 1; i++) {
      const styleSheet: CSSStyleSheet = document.styleSheets[i];
      if (styleSheet.href == null) {
        const rules = styleSheet.cssRules;
        for (const item of rules) {
          if (item.cssText !== undefined) {
            cssStyles += item.cssText;
          }
        }
      }
    }
    const head = document.head || document.getElementsByTagName("head")[0];
    let style = document.getElementById("styles-for-prerender");
    if (style) {
      style.setAttribute("iteration", String(parseInt(style.getAttribute("iteration") || "0") + 1));
      while (style.firstChild) {
        style.removeChild(style.firstChild);
      }
    } else {
      style = document.createElement("style");
      style.setAttribute("iteration", "1");
      head.appendChild(style);
      style.id = "styles-for-prerender";
    }
    style.appendChild(document.createTextNode(cssStyles));
  }
};
export class PrerenderTimer {
  public static myTimer = new PrerenderTimer();

  private _myTimer: any = undefined;

  public setPrerenderTimer() {
    if (this._myTimer) {
      clearTimeout(this._myTimer);
    }
    if (this._myTimer !== null) {
      this._myTimer = setTimeout(() => {
        this._myTimer = null;
        setTimeout(() => {
          extractCSStoHTML();
          window["prerenderReady"] = true;
        }, 2000);
      }, 2000);
    }
  }
}
