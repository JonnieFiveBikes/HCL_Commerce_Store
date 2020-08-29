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
import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
} from "axios";
import i18n from "i18next";
import { parse as losslessParse } from "lossless-json";
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from "http-status-codes";
//Foundation libraries
import { axiosHeaderIgnoredServices } from "../configs/axiosHeaderIgnoredService";
import { userRequiredServices } from "../configs/userRequiredService";
import { numberParserRequiredServices } from "../configs/numberParserRequiredService";
import { WC_PREVIEW_TOKEN } from "../constants/common";
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
  const currentUser = storageSessionHandler.getCurrentUser();
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
    if (
      skipErrorSnackbar === true &&
      error.response &&
      error.response.status < INTERNAL_SERVER_ERROR
      // status 500 and above will be handled by snackbar
    ) {
      return false;
    }
  }
  return !(
    error.isAxiosError &&
    error.response &&
    error.response.status === NOT_FOUND
  );
};

const initAxios = (dispatch: any) => {
  dispatchObject.dispatch = dispatch;
  Axios.interceptors.request.use(
    (request: AxiosRequestConfig) => {
      if (
        request.url?.startsWith(site.transactionContext) &&
        !isServiceInList(request, axiosHeaderIgnoredServices)
      ) {
        const header = request.headers;
        processTransactionHeader(header);
      }
      if (request.url?.startsWith(site.searchContext)) {
        const header = request.headers;
        processSearchHeader(header);
      }
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

const executeRequest = (request: AxiosRequestConfig): AxiosPromise<any> => {
  const params: URLSearchParams = request.params;
  //verify active storeId in localStorage.
  storageStoreIdHandler.verifyActiveStoreId();
  if (!params.has("langId")) {
    // add language Id
    const langId =
      CommerceEnvironment.reverseLanguageMap[
        i18n.languages[0].split("-").join("_")
      ];
    params.set("langId", langId);
  }
  if (isNumberParserRequiredService(request)) {
    request.transformResponse = [transformNumberResponse];
  }
  if (
    !request.url ||
    (request.url.indexOf(GUEST_IDENTITY) === -1 &&
      request.url.startsWith(site.transactionContext))
  ) {
    let currentUser = storageSessionHandler.getCurrentUser();
    if (!currentUser && isUserRequiredService(request)) {
      return guestIdentityService
        .login(undefined)
        .then((resp: AxiosResponse) => {
          currentUser = resp.data;
          const dispatch = dispatchObject.dispatch;
          dispatch(GUEST_LOGIN_SUCCESS_ACTION(currentUser));
          return Axios(request);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return Axios(request);
    }
  } else {
    return Axios(request);
  }
};

export { initAxios, executeRequest };
