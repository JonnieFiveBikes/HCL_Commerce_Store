/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020a
 *
 *==================================================
 */
/**
 * Do not modify, the file is generated.
 */
import { AxiosRequestConfig, Method, AxiosPromise } from "axios";
import { executeRequest } from "../../axios/axiosConfig";
import { getSite } from "../../hooks/useSite";

const siteContentService = {
  /**
   * Provides keyword suggestions with type-ahead for search result page based on a term.
   * `@method`
   * `@name SiteContent#findKeywordSuggestionsByTermUsingGET`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {integer} catalogId ` The catalog identifier. If none is specified, the store default catalog will be used.
   ** `@property {integer} contractId ` The contractId
   ** `@property {integer} count ` The number of suggested keywords to be returned. The default value is 4.
   ** `@property {integer} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used.
   ** `@property {string} limit ` Limit.
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
   ** `@property {integer} storeId (required)` The child property of `Parameters`.The store ID.
   ** `@property {string} term (required)` The child property of `Parameters`.The search term.
   ** `@property {boolean} termsSort ` The sorting to be used in the returned result, "count" or "index". By default, it is "count".
   */
  findKeywordSuggestionsByTermUsingGET(
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
    let path = "/store/{storeId}/sitecontent/keywordSuggestionsByTerm/{term}";
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
    if (parameters["catalogId"] !== undefined) {
      const name = "catalogId";
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

    if (parameters["contractId"] !== undefined) {
      const name = "contractId";
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

    if (parameters["count"] !== undefined) {
      const name = "count";
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

    if (parameters["langId"] !== undefined) {
      const name = "langId";
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

    if (parameters["limit"] !== undefined) {
      const name = "limit";
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

    if (parameters["storeId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/sitecontent/keywordSuggestionsByTerm/{term}' missing path parameter storeId"
      );
    }
    requestUrl = requestUrl.replace("{storeId}", parameters["storeId"]);

    if (parameters["term"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/sitecontent/keywordSuggestionsByTerm/{term}' missing path parameter term"
      );
    }
    requestUrl = requestUrl.replace("{term}", parameters["term"]);

    if (parameters["termsSort"] !== undefined) {
      const name = "termsSort";
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
   * Provides suggestions with type-ahead for search result page.
   * `@method`
   * `@name SiteContent#findSuggestionsUsingGET`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {integer} catalogId ` The catalog identifier. If none is specified, the store default catalog will be used.
   ** `@property {integer} contractId ` The contractId
   ** `@property {integer} count ` The number of suggested keywords to be returned. The default value is 4.
   ** `@property {integer} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used.
   ** `@property {string} limit ` Limit.
   ** `@property {integer} storeId (required)` The child property of `Parameters`.The store ID.
   ** `@property {string} suggestType ` The suggestion type. Accepted values are 'Category', 'Brand', 'Articles', 'Keyword', and 'Product'.
   ** `@property {string} term ` The search term.
   ** `@property {boolean} termsSort ` The sorting to be used in the returned result, "count" or "index". By default, it is "count".
   */
  findSuggestionsUsingGET(
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
    let path = "/store/{storeId}/sitecontent/suggestions";
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
    if (parameters["catalogId"] !== undefined) {
      const name = "catalogId";
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

    if (parameters["contractId"] !== undefined) {
      const name = "contractId";
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

    if (parameters["count"] !== undefined) {
      const name = "count";
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

    if (parameters["langId"] !== undefined) {
      const name = "langId";
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

    if (parameters["limit"] !== undefined) {
      const name = "limit";
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
        "Request '/store/{storeId}/sitecontent/suggestions' missing path parameter storeId"
      );
    }
    requestUrl = requestUrl.replace("{storeId}", parameters["storeId"]);

    if (parameters["suggestType"] !== undefined) {
      const name = "suggestType";
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

    if (parameters["term"] !== undefined) {
      const name = "term";
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

    if (parameters["termsSort"] !== undefined) {
      const name = "termsSort";
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

export default siteContentService;
