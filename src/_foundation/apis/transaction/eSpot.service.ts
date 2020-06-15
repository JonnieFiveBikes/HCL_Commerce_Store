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
import { AxiosRequestConfig, Method, AxiosPromise } from "axios";
import { executeRequest } from "../../axios/axiosConfig";
import { getSite } from "../../hooks/useSite";
const eSpotService = {
  /**
   * Gets an e-Marketing Spot by name.
   *
   * `@method`
   * `@name ESpot#findByName`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` has following properties:
   ** `@property {string} name (required)` The child property of `Parameters`.E-Spot name.
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
   ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
   */
  findByName: (
    parameters: any,
    headers?: any,
    url?: string
  ): AxiosPromise<any> => {
    let site = getSite();
    let siteContext: string = "";
    if (site) {
      siteContext = site.transactionContext || "";
    }
    let domain = url || siteContext;
    let path = "/store/{storeId}/espot/{name}";
    let requestUrl = domain + path;
    let method: Method = "GET";
    //   if (this.getStorefrontUtils().useMocks || useMocks) {
    //       method = 'GET';
    //       let testGroup = '';
    //       if (typeof(__karma__) !== 'undefined') {
    //           testGroup = __karma__.config.testGroup;
    //       }
    //       let fileNameSeparator = testGroup === "" ? "" : ".";
    //       requestUrl = 'mocks/commerce/transaction' + path + fileNameSeparator + testGroup + '.findByName.mocks.json';
    //   }
    let form: any = {};
    let data = {};
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

    requestUrl = requestUrl.replace("{name}", parameters["name"]);

    if (parameters["name"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/espot/{name}' missing required parameter name"
      );
    }

    if (parameters["storeId"] === undefined && site !== null) {
      parameters["storeId"] = site.storeID;
    }
    requestUrl = requestUrl.replace("{storeId}", parameters["storeId"]);

    if (parameters["storeId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/espot/{name}' missing required parameter storeId"
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

    if (parameters["catalogId"] !== undefined) {
      const parameter = parameters["catalogId"];
      if (parameter instanceof Array) {
        parameter.forEach((value) => {
          queryParameters.append("catalogId", value);
        });
      } else {
        queryParameters.set("catalogId", parameter);
      }
    }

    if (parameters["currency"] !== undefined) {
      const parameter = parameters["currency"];
      if (parameter instanceof Array) {
        parameter.forEach((value) => {
          queryParameters.append("currency", value);
        });
      } else {
        queryParameters.set("currency", parameter);
      }
    }

    if (parameters["name"] !== undefined) {
      const parameter = parameters["name"];
      if (parameter instanceof Array) {
        parameter.forEach((value) => {
          queryParameters.append("name", value);
        });
      } else {
        queryParameters.set("name", parameter);
      }
    }

    if (parameters["facet"] !== undefined) {
      const parameter = parameters["facet"];
      if (parameter instanceof Array) {
        parameter.forEach((value) => {
          queryParameters.append("facet", value);
        });
      } else {
        queryParameters.set("facet", parameter);
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
      data = formData;
    } else if (Object.keys(form).length > 0) {
      header.set("content-type", "application/x-www-form-urlencoded");
      for (let p in form) {
        formParams.append(p, form[p]);
      }
      data = formParams;
    }
    header.set("Cache-Control", "no-cache");
    header.set("Pragma", "no-cache");
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
        data: data,
        url: requestUrl,
      },
      { ...parameters }
    );

    return executeRequest(requestOptions);
  },
};

export default eSpotService;
