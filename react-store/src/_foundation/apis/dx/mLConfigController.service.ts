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

//Standard libraries
import Axios, { AxiosRequestConfig, Method, AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";

const mLConfigControllerService = {
  /**
   * <h2>This request returns the details of the multi-lingual service configuration of a content item.</h2>
   * `@method`
   * `@name MLConfigController#accessMLSTranslations`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {} Cookie ` Contains the access or authentication token. Leave this field empty if you are already authenticated, unless you intend to put a token value.
   ** `@property {} virtualportal ` The virtual portal name, if any, to which this request will be applied, otherwise leave this field empty.
   ** `@property {} content_id (required)` The child property of `Parameters`.The ID of the content (e.g., 97d110f7-ab61-49d9-b9b2-de5322892f9c)
   ** `@property {} access_type (required)` The child property of `Parameters`.The access type of the user. Authenticated users should use 'dxmyrest', and an unauthenticated users should use 'dxrest'.
   ** `@property {} language ` Specifies language(s) to use for the translated content.  All available translated languages are returned if no language parameter is defined.
   */
  accessMLSTranslations(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    const site = getSite();
    let siteContext: string = "";
    if (site) {
      siteContext = site.dxContext || "";
    }
    const domain = url || siteContext;
    const path = "/{access_type}/multilingual-config/translation/{content_id}";
    let requestUrl = domain + path;
    const method: Method = "GET";
    const form: any = {};
    let body = {};
    let header: Headers;
    const queryParameters = new URLSearchParams();
    const formParams = new URLSearchParams();
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
    if (parameters["Cookie"] !== undefined) {
      header.append("Cookie", parameters["Cookie"]);
    }

    if (parameters["virtualportal"] !== undefined) {
      const name = "virtualportal";
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

    if (parameters["content_id"] === undefined) {
      throw new Error(
        "Request '/{access_type}/multilingual-config/translation/{content_id}' missing path parameter content_id"
      );
    }
    requestUrl = requestUrl.replace("{content_id}", parameters["content_id"]);

    if (parameters["access_type"] === undefined) {
      throw new Error(
        "Request '/{access_type}/multilingual-config/translation/{content_id}' missing path parameter access_type"
      );
    }
    requestUrl = requestUrl.replace("{access_type}", parameters["access_type"]);

    if (parameters["language"] !== undefined) {
      const name = "language";
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

    if (parameters.query) {
      Object.keys(parameters.query).forEach(function (parameterName) {
        const parameter = parameters.query[parameterName];
        if (parameter !== null && parameter !== undefined) {
          queryParameters.set(parameterName, parameter);
        }
      });
    }
    if (!header.get("Content-Type")) {
      header.append("Content-Type", "application/json; charset=utf-8");
    }
    const accept = header.get("Accept");
    if (accept !== null && accept.indexOf("application/json") > -1) {
      header.set("Accept", "application/json");
    }
    if (header.get("content-type") === "multipart/form-data" && Object.keys(form).length > 0) {
      const formData = new FormData();
      for (const p in form) {
        if (form[p].name !== undefined) {
          formData.append(p, form[p], form[p].name);
        } else {
          formData.append(p, form[p]);
        }
      }
      body = formData;
    } else if (Object.keys(form).length > 0) {
      header.set("content-type", "application/x-www-form-urlencoded");
      for (const p in form) {
        formParams.append(p, form[p]);
      }
      formParams.sort();
      body = formParams;
    }
    const headerObject: any = {};
    for (const headerPair of header.entries()) {
      headerObject[headerPair[0]] = headerPair[1];
    }
    queryParameters.sort();
    const requestOptions: AxiosRequestConfig = Object.assign(
      {
        params: queryParameters,
        method: method,
        headers: headerObject,
        data: body,
        url: requestUrl,
      },
      { ...parameters }
    );

    return Axios(requestOptions);
  },
};

export default mLConfigControllerService;
