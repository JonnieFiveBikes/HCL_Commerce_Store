/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
//Standard libraries
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import i18n from "i18next";
import { parse as losslessParse } from "lossless-json";
import { NOT_FOUND } from "http-status-codes";
import { pascalCase } from "change-case";
//Foundation libraries
import { axiosHeaderIgnoredServices } from "../configs/axiosHeaderIgnoredService";
import { userRequiredServices } from "../configs/userRequiredService";
import { numberParserRequiredServices } from "../configs/numberParserRequiredService";
import {
  WC_PREVIEW_TOKEN,
  LANGID,
  FOR_USER_ID,
  SKIP_WC_TOKEN_HEADER,
  PRODUCTION,
  SHOW_API_FLOW,
  SHOW_API_FLOW_TRANSACTION,
  SHOW_API_FLOW_SEARCH,
} from "../constants/common";
import { site } from "../constants/site";
import { PERSONALIZATION_ID } from "../constants/user";
import {
  localStorageUtil,
  storageSessionHandler,
  storageStoreIdHandler,
} from "../utils/storageUtil";
import guestIdentityService from "../apis/transaction/guestIdentity.service";
//Custom libraries
import { CommerceEnvironment } from "../../constants/common";
//Redux
import { WATCH_AXIOS_ERROR_ACTION } from "../../redux/actions/error";
import { GUEST_LOGIN_SUCCESS_ACTION } from "../../redux/actions/user";
import { API_CALL_ACTION } from "../../redux/actions/api";

const GUEST_IDENTITY: string = "guestidentity";

const isServiceInList = (
  request: AxiosRequestConfig,
  serviceList: string[]
) => {
  const url = request.url === undefined ? "" : request.url;
  if (url.length > 0) {
    const storePath = `${site.transactionContext}/store/`;
    const path = url.split(storePath).pop();
    if (path && path.length > 0) {
      const serviceName = path.split("/")[1];
      return serviceList.indexOf(serviceName) > -1;
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
    if (!header["WCTrustedToken"]) {
      header["WCTrustedToken"] = currentUser.WCTrustedToken;
    }
    if (!header["WCToken"]) {
      header["WCToken"] = currentUser.WCToken;
    }
    if (!header["WCPersonalization"]) {
      header["WCPersonalization"] = currentUser.personalizationID;
    }
  }
  if (!header["WCPersonalization"]) {
    const personalizationID = localStorageUtil.get(PERSONALIZATION_ID);
    if (personalizationID !== null) {
      header["WCPersonalization"] = personalizationID;
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
    if (!header["WCTrustedToken"]) {
      header["WCTrustedToken"] = currentUser.WCTrustedToken;
    }
    if (!header["WCToken"]) {
      header["WCToken"] = currentUser.WCToken;
    }
  }
  const previewToken = storageSessionHandler.getPreviewToken();
  if (previewToken && previewToken[WC_PREVIEW_TOKEN]) {
    header["WCPreviewToken"] = previewToken[WC_PREVIEW_TOKEN];
  }
};

const transformNumberResponse = function (data, headers) {
  if (typeof data === "string") {
    data = losslessParse(data, (key, value) => {
      if (value && value.isLosslessNumber) {
        return value.toString();
      } else {
        return value;
      }
    });
  }
  return data;
};

const useSnackbarHandleError = (error: AxiosError) => {
  if (error.config) {
    const { skipErrorSnackbar } = error.config as any;
    if (skipErrorSnackbar === true) {
      return false;
    }
  }
  return !(
    error.isAxiosError &&
    error.response &&
    error.response.status === NOT_FOUND
  );
};

const showAPIFlow = (
  method: any,
  requestUrl: any,
  widget: any = "Browser",
  server: string
) => {
  const isShowAPIFlow =
    process.env.NODE_ENV !== PRODUCTION
      ? localStorageUtil.get(SHOW_API_FLOW) === "true"
      : false;
  if (isShowAPIFlow) {
    const store = require("../../redux/store").default;
    if (store) {
      store.dispatch(
        API_CALL_ACTION(
          pascalCase(String(widget)) +
            " -> " +
            server +
            ": " +
            method +
            " " +
            requestUrl
        )
      );
    }
  }
};

const processForUserParameter = (request: AxiosRequestConfig) => {
  const currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
  if (
    currentUser &&
    currentUser.forUserId &&
    request.url &&
    request.url.indexOf(FOR_USER_ID) === -1
  ) {
    const searchParam = request.url.split("?")[1];
    if (searchParam) {
      request.url =
        request.url + "&" + FOR_USER_ID + "=" + currentUser.forUserId;
    } else {
      request.url =
        request.url + "?" + FOR_USER_ID + "=" + currentUser.forUserId;
    }
  }
};

const processLangIdParameter = (request: AxiosRequestConfig) => {
  if (
    request.url &&
    !isServiceInList(request, axiosHeaderIgnoredServices) &&
    request.url.indexOf(LANGID) === -1
  ) {
    const searchParam = request.url.split("?")[1];
    const langId =
      CommerceEnvironment.reverseLanguageMap[
        i18n.languages[0].split("-").join("_")
      ];
    if (searchParam) {
      request.url = request.url + "&" + LANGID + "=" + langId;
    } else {
      request.url = request.url + "?" + LANGID + "=" + langId;
    }
  }
};

const initAxios = (dispatch: any) => {
  dispatchObject.dispatch = dispatch;
  Axios.interceptors.request.use(
    async (request: AxiosRequestConfig) => {
      if (request.url?.startsWith(site.transactionContext)) {
        showAPIFlow(
          request.method,
          request.url,
          request["widget"],
          SHOW_API_FLOW_TRANSACTION
        );
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
        showAPIFlow(
          request.method,
          request.url,
          request["widget"],
          SHOW_API_FLOW_SEARCH
        );
      }

      //verify active storeId in localStorage.
      storageStoreIdHandler.verifyActiveStoreId();
      if (isNumberParserRequiredService(request)) {
        request.transformResponse = [transformNumberResponse];
      }

      if (
        !request.url ||
        (request.url.indexOf(GUEST_IDENTITY) === -1 &&
          request.url.startsWith(site.transactionContext))
      ) {
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
              dispatch(
                GUEST_LOGIN_SUCCESS_ACTION({ ...currentUser, ...payload })
              );
            })
            .catch((error) => {
              throw error;
            });
        }
      }
      processForUserParameter(request);
      processLangIdParameter(request);
      return request;
    },
    function (error: any) {
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    function (error) {
      if (useSnackbarHandleError(error)) {
        dispatch(WATCH_AXIOS_ERROR_ACTION(error));
      }
      return Promise.reject(error);
    }
  );
};
export { initAxios };
