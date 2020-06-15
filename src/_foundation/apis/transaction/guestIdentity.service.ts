/* jshint ignore:start */
/*
 * (C) Copyright HCL Technologies Limited 2020
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/* beautify ignore:start */
import { AxiosRequestConfig, Method, AxiosPromise } from "axios";
import { executeRequest } from "../../axios/axiosConfig";
import { getSite } from "../../hooks/useSite";

/* beautify ignore:end */

const guestIdentityService = {
  /**
   * Creates identity tokens for a guest user.
   * `@method`
   * `@name GuestIdentity#login`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  login(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    let site = getSite();
    let siteContext: string = "";
    if (site) {
      siteContext = site.transactionContext || "";
    }
    let domain = url || siteContext;
    let path = "/store/{storeId}/guestidentity";
    let requestUrl = domain + path;
    let method: Method = "POST";
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

    let headerValues: any = {};
    headerValues["Accept"] = [
      "application/json",
      "application/xml",
      "application/xhtml+xml",
      "application/atom+xml",
    ];
    for (let val of headerValues["Accept"]) {
      header.append("Accept", val);
    }

    if (parameters["storeId"] === undefined && site !== null) {
      parameters["storeId"] = site.storeID;
    }
    requestUrl = requestUrl.replace("{storeId}", parameters["storeId"]);

    if (parameters["storeId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/guestidentity' missing required parameter storeId"
      );
    }

    if (parameters["responseFormat"] !== undefined) {
      const name = "responseFormat";
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

    return executeRequest(requestOptions);
  },

  /**
   * Logs out a guest user.
   * `@method`
   * `@name GuestIdentity#logout`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  logout(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    let site = getSite();
    let siteContext: string = "";
    if (site) {
      siteContext = site.transactionContext || "";
    }
    let domain = url || siteContext;
    let path = "/store/{storeId}/guestidentity/@self";
    let requestUrl = domain + path;
    let method: Method = "DELETE";
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

    let headerValues: any = {};
    headerValues["Accept"] = [
      "application/json",
      "application/xml",
      "application/xhtml+xml",
      "application/atom+xml",
    ];
    for (let val of headerValues["Accept"]) {
      header.append("Accept", val);
    }

    if (parameters["storeId"] === undefined && site !== null) {
      parameters["storeId"] = site.storeID;
    }
    requestUrl = requestUrl.replace("{storeId}", parameters["storeId"]);

    if (parameters["storeId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/guestidentity/@self' missing required parameter storeId"
      );
    }

    if (parameters["responseFormat"] !== undefined) {
      const name = "responseFormat";
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

    return executeRequest(requestOptions);
  },
};
export default guestIdentityService;
/* jshint ignore:end */
