/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
/**
 * Do not modify, the file is generated.
 */
//Standard libraries
import { AxiosRequestConfig, Method, AxiosPromise } from "axios";
//Foundation libraries
import { executeRequest } from "../../axios/axiosConfig";
import { getSite } from "../../hooks/useSite";
import { localStorageUtil } from "../../utils/storageUtil";
import { PRODUCTION, SHOW_API_FLOW } from "../../constants/common";
//Redux
import { API_CALL_ACTION } from "../../../redux/actions/api";

const urlsService = {
  /**
   * Gets Response for V2.0 API Seo url data
   * `@method`
   * `@name Urls#getV2URLResourcesUsingGET`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {array} id ` The list of category IDs.
   ** `@property {array} identifier ` The list of category identifiers.
   ** `@property {integer} storeId (required)` The store ID.
   */
  getV2URLResourcesUsingGET(
    parameters: any,
    headers?: any,
    url?: string
  ): AxiosPromise<any> {
    let site = getSite();
    let siteContext: string = "";
    if (site) {
      siteContext = site.searchContext || "";
    }
    let domain = url || siteContext;
    let path = "/api/v2/urls";
    let requestUrl = domain + path;
    let method: Method = "GET";
    let form: any = {};
    let body = {};
    let header: Headers;
    let queryParameters = new URLSearchParams();
    let formParams = new URLSearchParams();
    if (typeof headers === "undefined" || headers === null) {
      header = new Headers();
    } else {
      header = new Headers(headers);
    }
    if (parameters === undefined) {
      parameters = {};
    }
    if (parameters["storeId"] === undefined && site !== null) {
      parameters["storeId"] = site.storeID;
    }
    let headerValues: any = {};
    headerValues["Accept"] = ["application/json"];
    for (let val of headerValues["Accept"]) {
      header.append("Accept", val);
    }
    if (parameters["id"] !== undefined) {
      const name = "id";
      const parameter = parameters[name];
      delete parameters[name];
      if (parameter instanceof Array) {
        parameter.forEach((value) => {
          queryParameters.append(name, value);
        });
      } else {
        queryParameters.set(name, parameter);
      }
    }

    if (parameters["identifier"] !== undefined) {
      const name = "identifier";
      const parameter = parameters[name];
      delete parameters[name];
      if (parameter instanceof Array) {
        parameter.forEach((value) => {
          queryParameters.append(name, value);
        });
      } else {
        queryParameters.set(name, parameter);
      }
    }

    if (parameters["storeId"] === undefined) {
      throw new Error(
        "Request '/api/v2/urls' missing required parameter storeId"
      );
    }
    if (parameters["storeId"] !== undefined) {
      const name = "storeId";
      const parameter = parameters[name];
      delete parameters[name];
      if (parameter instanceof Array) {
        parameter.forEach((value) => {
          queryParameters.append(name, value);
        });
      } else {
        queryParameters.set(name, parameter);
      }
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function (
        parameterName
      ) {
        var parameter = parameters.$queryParameters[parameterName];
        queryParameters.set(parameterName, parameter);
      });
    }
    if (!header.get("Content-Type")) {
      header.append("Content-Type", "application/json; charset=utf-8");
    }
    const accept = header.get("Accept");
    if (accept !== null && accept.indexOf("application/json") > -1) {
      header.set("Accept", "application/json");
    }
    if (
      header.get("content-type") === "multipart/form-data" &&
      Object.keys(form).length > 0
    ) {
      let formData = new FormData();
      for (let p in form) {
        if (form[p].name !== undefined) {
          formData.append(p, form[p], form[p].name);
        } else {
          formData.append(p, form[p]);
        }
      }
      body = formData;
    } else if (Object.keys(form).length > 0) {
      header.set("content-type", "application/x-www-form-urlencoded");
      for (let p in form) {
        formParams.append(p, form[p]);
      }
      formParams.sort();
      body = formParams;
    }
    const headerObject: any = {};
    for (let headerPair of header.entries()) {
      headerObject[headerPair[0]] = headerPair[1];
    }
    queryParameters.sort();
    let requestOptions: AxiosRequestConfig = Object.assign(
      {
        params: queryParameters,
        method: method,
        headers: headerObject,
        data: body,
        url: requestUrl,
      },
      { ...parameters }
    );

    const showAPIFlow =
      process.env.NODE_ENV !== PRODUCTION
        ? localStorageUtil.get(SHOW_API_FLOW) === "true"
        : false;
    if (showAPIFlow) {
      const from = parameters["widget"] ? parameters["widget"] : "Browser";
      const store = require("../../../redux/store").default;
      if (store) {
        store.dispatch(
          API_CALL_ACTION(
            from +
              " -> Search: " +
              method +
              " " +
              requestUrl +
              "?" +
              queryParameters
          )
        );
      }
    }

    return executeRequest(requestOptions);
  },
};

export default urlsService;
