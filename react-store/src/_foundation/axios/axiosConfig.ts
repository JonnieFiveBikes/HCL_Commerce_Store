/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *---------------------------------------------------
 */
//Standard libraries
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import i18n from "i18next";
import { parse as losslessParse } from "lossless-json";
import { NOT_FOUND } from "http-status-codes";
import { pascalCase } from "change-case";
import { get } from "lodash-es";
//Foundation libraries
import * as ERRORS from "../../constants/errors";
import { axiosESIgnoredService, axiosHeaderIgnoredServices } from "../configs/axiosHeaderIgnoredService";
import { userRequiredServices } from "../configs/userRequiredService";
import { numberParserRequiredServices } from "../configs/numberParserRequiredService";
import {
  WC_PREVIEW_TOKEN,
  LANGID,
  FOR_USER_ID,
  SKIP_WC_TOKEN_HEADER,
  PRODUCTION,
  SHOW_API_FLOW,
  SELLER_PARAM,
} from "../constants/common";
import { site } from "../constants/site";
import { PERSONALIZATION_ID } from "../constants/user";
import { ASSETS_PATH } from "../constants/assets";
import { localStorageUtil, storageSessionHandler, storageStoreIdHandler } from "../utils/storageUtil";
import guestIdentityService from "../apis/transaction/guestIdentity.service";
import { PrerenderTimer } from "./../utils/prerenderTimer";
//Custom libraries
import { CommerceEnvironment, SELLER_STORAGE_KEY } from "../../constants/common";
//Redux
import { WATCH_AXIOS_ERROR_ACTION } from "../../redux/actions/error";
import { GUEST_LOGIN_SUCCESS_ACTION } from "../../redux/actions/user";
import { API_CALL_ACTION } from "../../redux/actions/api";

const GUEST_IDENTITY: string = "guestidentity";

const isESSvcInList = (req: AxiosRequestConfig, list: any) => {
  const { url = "" } = req;
  const _list = Object.keys(list);
  if (url) {
    const path = `${site.searchContext}/`;
    const search = url.split("?")[0].split(path).pop();
    // can do some extra work here to replace store-ids in the list, but right
    //   now we have no such services to be filtered (that use store-id)
    return search && _list.indexOf(search) >= 0;
  }
  return false;
};

const isServiceInList = (request: AxiosRequestConfig, serviceList: any) => {
  const { url = "", method } = request;
  const _method = method?.toUpperCase();
  const _serviceList = Object.keys(serviceList);
  if (url) {
    const storePath = `${site.transactionContext}/store/`;
    const path = url.split("?")[0].split(storePath).pop();
    if (path) {
      const serviceName = path.split("/")[1];
      return _serviceList.some((s) => {
        const { skip = "" } = serviceList[s];
        return s === serviceName && skip !== _method;
      });
    }
  }
  return false;
};

const isUserRequiredService = (request: AxiosRequestConfig) => {
  return isServiceInList(request, userRequiredServices);
};

const isNumberParserRequiredService = (request: AxiosRequestConfig) => {
  return isServiceInList(request, numberParserRequiredServices);
};

const dispatchObject = {
  _dispatch: null,
  set dispatch(dispatch: any) {
    this._dispatch = dispatch;
  },
  get dispatch(): any {
    return this._dispatch;
  },
};

const processTransactionHeader = (header: any) => {
  const currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
  if (currentUser) {
    if (!header["WCTrustedToken"] && currentUser.WCTrustedToken) {
      header["WCTrustedToken"] = currentUser.WCTrustedToken;
    }
    if (!header["WCToken"] && currentUser.WCToken) {
      header["WCToken"] = currentUser.WCToken;
    }

    if (!(process.env.REACT_APP_PERSISTENT_SESSION?.toLowerCase() === "true")) {
      //personalization id managed by persistent cookie, "true" to skip this.
      if (!header["WCPersonalization"]) {
        header["WCPersonalization"] = currentUser.personalizationID;
      }
    }
  }
  if (!(process.env.REACT_APP_PERSISTENT_SESSION?.toLowerCase() === "true")) {
    //personalization id managed by persistent cookie, "true" to skip this.
    if (!header["WCPersonalization"]) {
      const personalizationID = localStorageUtil.get(PERSONALIZATION_ID);
      if (personalizationID !== null) {
        header["WCPersonalization"] = personalizationID;
      }
    }
  }
  const previewToken = storageSessionHandler.getPreviewToken();
  if (previewToken && previewToken[WC_PREVIEW_TOKEN]) {
    header["WCPreviewToken"] = previewToken[WC_PREVIEW_TOKEN];
  }
};

const processSearchHeader = (header: any) => {
  const currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
  if (currentUser) {
    if (!header["WCTrustedToken"] && currentUser.WCTrustedToken) {
      header["WCTrustedToken"] = currentUser.WCTrustedToken;
    }
    if (!header["WCToken"] && currentUser.WCToken) {
      header["WCToken"] = currentUser.WCToken;
    }
  }
  const previewToken = storageSessionHandler.getPreviewToken();
  if (previewToken && previewToken[WC_PREVIEW_TOKEN]) {
    header["WCPreviewToken"] = previewToken[WC_PREVIEW_TOKEN];
  }
};

const transformResponse = function (data, headers) {
  if (typeof data === "string") {
    const previewToken = storageSessionHandler.getPreviewToken();
    data = losslessParse(data, (key, value) => {
      //transform number
      if (value && value.isLosslessNumber) {
        return value.toString();
      } else {
        if (previewToken && previewToken[WC_PREVIEW_TOKEN]) {
          //handle preview  asset
          const token = previewToken[WC_PREVIEW_TOKEN];
          if (
            ASSETS_PATH.includes(key.trim()) &&
            typeof value === "string" &&
            value.toLocaleLowerCase().indexOf("http") !== 0
          ) {
            if (value.indexOf("?") > -1) {
              return `${value}&${WC_PREVIEW_TOKEN}=${token}`;
            } else {
              return `${value}?${WC_PREVIEW_TOKEN}=${token}`;
            }
          }
        }
        return value;
      }
    });
  }
  return data;
};

const isUseSnackbarHandleError = (error: AxiosError) => {
  if (error.config) {
    const { skipErrorSnackbar } = error.config as any;
    if (skipErrorSnackbar === true) {
      return false;
    }
    if (skipErrorSnackbar?.error) {
      const errs = error.response?.data?.errors ?? [];
      const e = errs[0];
      if (e.errorKey === skipErrorSnackbar.error || e.errorCode === skipErrorSnackbar.error) {
        return false;
      }
    }
  }
  return !(error.isAxiosError && error.response?.status === NOT_FOUND);
};

const showAPIFlow = (method: any, requestUrl: any, widget: any = "Browser") => {
  const managedServer = (() => {
    if (!requestUrl) {
      return false;
    } else if (requestUrl.startsWith(site.transactionContext)) {
      return "TRANSACTION";
    } else if (requestUrl.startsWith(site.searchContext)) {
      return "SEARCH";
    } else if (requestUrl.startsWith(site.dxContext)) {
      return "DX";
    }
    return false;
  })();

  const isShowAPIFlow =
    process.env.NODE_ENV !== PRODUCTION && localStorageUtil.get(SHOW_API_FLOW) === "true" && managedServer;
  if (isShowAPIFlow) {
    const { dispatch } = dispatchObject;
    if (dispatch) {
      dispatch(API_CALL_ACTION(pascalCase(String(widget)) + " -> " + managedServer + ": " + method + " " + requestUrl));
    }
  }
};

const processForUserParameter = (request: AxiosRequestConfig) => {
  if (request[SKIP_WC_TOKEN_HEADER]) {
    //no wctoken, forUserId does not make sense.
    return;
  }
  const currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
  if (currentUser && currentUser.forUserId && request.url && request.url.indexOf(FOR_USER_ID) === -1) {
    const searchParam = request.url.split("?")[1];
    if (searchParam) {
      request.url = request.url + "&" + FOR_USER_ID + "=" + currentUser.forUserId;
    } else {
      request.url = request.url + "?" + FOR_USER_ID + "=" + currentUser.forUserId;
    }
  }
};

const processLangIdParameter = (request: AxiosRequestConfig) => {
  if (
    request.url &&
    !isServiceInList(request, axiosHeaderIgnoredServices) &&
    !isESSvcInList(request, axiosESIgnoredService) &&
    request.url.indexOf(LANGID) === -1
  ) {
    const searchParam = request.url.split("?")[1];
    const langId = CommerceEnvironment.reverseLanguageMap[i18n.languages[0].split("-").join("_")];
    if (searchParam) {
      request.url = request.url + "&" + LANGID + "=" + langId;
    } else {
      request.url = request.url + "?" + LANGID + "=" + langId;
    }
  }
};

const processSetSeller = (request: AxiosRequestConfig) => {
  const sellers = localStorageUtil.get(SELLER_STORAGE_KEY);
  const { url = "" } = request;
  const RE = new RegExp(`\\b${SELLER_PARAM}=`);

  if (
    url &&
    sellers?.length &&
    url.indexOf(`${site.searchContext}/`) !== -1 &&
    !RE.test(url) &&
    !isESSvcInList(request, axiosESIgnoredService)
  ) {
    const params = url.split("?")[1];
    const concater = params ? "&" : "?";
    const values = sellers.map((s) => `${SELLER_PARAM}=${s}`).join("&");
    request.url = `${url}${concater}${values}`;
  }
};

const processHeaders = (request: AxiosRequestConfig) => {
  if (request.url?.startsWith(site.transactionContext)) {
    if (!isServiceInList(request, axiosHeaderIgnoredServices)) {
      const header = request.headers;
      if (!request[SKIP_WC_TOKEN_HEADER]) {
        processTransactionHeader(header);
      }
    }
  }
  if (request.url?.startsWith(site.searchContext)) {
    const header = request.headers;
    processSearchHeader(header);
  }
};

const processGuestPartialAuthError = async (error: AxiosError) => {
  const errorMessage = get(error, "response.data.errors[0]", {});
  const skipGuestPartialAuthError = get(error, "config.skipGuestPartialAuthError");
  const { errorCode, errorKey } = errorMessage;
  let currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
  if (
    currentUser?.rememberMe &&
    currentUser?.isGuest &&
    (errorCode === ERRORS.PARTIAL_AUTHENTICATION_ERROR_CODE || errorKey === ERRORS.PARTIAL_AUTHENTICATION_ERROR_KEY) &&
    !skipGuestPartialAuthError
  ) {
    const payload = {
      widget: "axiosConfig",
    };
    await guestIdentityService
      .login(payload)
      .then((resp: AxiosResponse) => {
        currentUser = resp.data;
        const dispatch = dispatchObject.dispatch;
        //guest shopper always remembered when persistent session enabled.
        const rememberMe =
          process.env.REACT_APP_PERSISTENT_SESSION?.toLowerCase() === "true" ? { rememberMe: true } : {};
        dispatch(GUEST_LOGIN_SUCCESS_ACTION({ ...currentUser, ...payload, ...rememberMe }));
      })
      .catch((err) => {
        throw err;
      });
    const config = { ...error.config, skipGuestPartialAuthError: true };
    const resp = await Axios.request(config);
    return resp;
  } else {
    if (isUseSnackbarHandleError(error)) {
      const { dispatch } = dispatchObject;
      if (dispatch) {
        dispatch(WATCH_AXIOS_ERROR_ACTION(error));
      }
    }
    return Promise.reject(error);
  }
};

const processGuestLogon = async (request: AxiosRequestConfig) => {
  if (!request.url || (request.url.indexOf(GUEST_IDENTITY) === -1 && request.url.startsWith(site.transactionContext))) {
    let currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
    if (!currentUser && isUserRequiredService(request)) {
      const payload = {
        widget: "axiosConfig",
      };
      await guestIdentityService
        .login(payload)
        .then((resp: AxiosResponse) => {
          currentUser = resp.data;
          const dispatch = dispatchObject.dispatch;
          //guest shopper always remembered when persistent session enabled.
          const rememberMe =
            process.env.REACT_APP_PERSISTENT_SESSION?.toLowerCase() === "true" ? { rememberMe: true } : {};
          dispatch(GUEST_LOGIN_SUCCESS_ACTION({ ...currentUser, ...payload, ...rememberMe }));
        })
        .catch((error) => {
          throw error;
        });
    }
  }
};

const initAxios = (dispatch: any) => {
  dispatchObject.dispatch = dispatch;

  Axios.interceptors.request.use(
    async (request: AxiosRequestConfig) => {
      PrerenderTimer.myTimer.setPrerenderTimer();
      showAPIFlow(request.method, request.url, request["widget"]);
      processHeaders(request);
      //verify active storeId in localStorage.
      storageStoreIdHandler.verifyActiveStoreId();
      const previewToken = storageSessionHandler.getPreviewToken();
      if ((previewToken && previewToken[WC_PREVIEW_TOKEN]) || isNumberParserRequiredService(request)) {
        request.transformResponse = [transformResponse];
      }

      await processGuestLogon(request);
      processForUserParameter(request);
      processLangIdParameter(request);
      processSetSeller(request);
      return request;
    },
    function (error: any) {
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    (response: AxiosResponse) => {
      PrerenderTimer.myTimer.setPrerenderTimer();
      return response;
    },
    function (error) {
      return processGuestPartialAuthError(error);
    }
  );
};
export { initAxios };
