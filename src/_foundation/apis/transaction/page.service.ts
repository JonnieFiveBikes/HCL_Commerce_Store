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

const pageService = {
  /**
     * Finds pages by their names. Invalid page names are ignored.
     * `@method`
     * `@name Page#byNames`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.

     ** `@property {string} name (required)` The page name.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.
     */
  byNames(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    let site = getSite();
    let siteContext: string = "";
    if (site) {
      siteContext = site.transactionContext || "";
    }
    let domain = url || siteContext;
    let path = "/store/{storeId}/page";
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
        "Request '/store/{storeId}/page' missing required parameter storeId"
      );
    }

    queryParameters.set("q", "byNames");

    if (parameters["q"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/page' missing required parameter q"
      );
    }

    if (parameters["name"] !== undefined) {
      const name = "name";
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

    if (parameters["name"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/page' missing required parameter name"
      );
    }

    if (parameters["profileName"] !== undefined) {
      const name = "profileName";
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
     * Finds pages by category IDs. Invalid category IDs are ignored.
     * `@method`
     * `@name Page#byCategoryIds`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.

     ** `@property {string} categoryId (required)` The category ID.
     */
  byCategoryIds(
    parameters: any,
    headers?: any,
    url?: string
  ): AxiosPromise<any> {
    let site = getSite();
    let siteContext: string = "";
    if (site) {
      siteContext = site.transactionContext || "";
    }
    let domain = url || siteContext;
    let path = "/store/{storeId}/page";
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

    let headerValues: any = {};
    headerValues["Accept"] = [
      "application/json",
      "application/xml",
      "application/atom+xml",
      "application/xhtml+xml",
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
        "Request '/store/{storeId}/page' missing required parameter storeId"
      );
    }

    queryParameters.set("q", "byCategoryIds");

    if (parameters["q"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/page' missing required parameter q"
      );
    }

    if (parameters["categoryId"] !== undefined) {
      const name = "categoryId";
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

    if (parameters["categoryId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/page' missing required parameter categoryId"
      );
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
     * Finds pages by catalog entry IDs. Invalid catalog entry IDs are ignored.
     * `@method`
     * `@name Page#byCatalogEntryIds`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.

     ** `@property {string} catalogEntryId (required)` The catalog entry ID.
     */
  byCatalogEntryIds(
    parameters: any,
    headers?: any,
    url?: string
  ): AxiosPromise<any> {
    let site = getSite();
    let siteContext: string = "";
    if (site) {
      siteContext = site.transactionContext || "";
    }
    let domain = url || siteContext;
    let path = "/store/{storeId}/page";
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
        "Request '/store/{storeId}/page' missing required parameter storeId"
      );
    }

    queryParameters.set("q", "byCatalogEntryIds");

    if (parameters["q"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/page' missing required parameter q"
      );
    }

    if (parameters["catalogEntryId"] !== undefined) {
      const name = "catalogEntryId";
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

    if (parameters["catalogEntryId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/page' missing required parameter catalogEntryId"
      );
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
export default pageService;
/* jshint ignore:end */
