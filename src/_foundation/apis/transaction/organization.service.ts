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

const organizationService = {
  /**
   * Registers a buyer organization and a buyer organization administrator.
   * `@method`
   * `@name Organization#registerBuyerOrganization`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {any} body ` Request body.
   */
  registerBuyerOrganization(
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
    let path = "/store/{storeId}/organization/buyer";
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
    if (parameters["storeId"] === undefined && site !== null) {
      parameters["storeId"] = site.storeID;
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
    if (parameters["storeId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/organization/buyer' missing path parameter storeId"
      );
    }
    requestUrl = requestUrl.replace("{storeId}", parameters["storeId"]);

    if (parameters["body"] !== undefined) {
      body = parameters["body"];
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
              " -> Transaction: " +
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

  /**
   * This allows a user to find his own entitled organizations.
   * `@method`
   * `@name Organization#getEntitledOrganizations`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} responseFormat ` This class provides RESTful services to register an organization, to get or update organization information.
   ** `@property {string} storeId (required)` The child property of `Parameters`.This class provides RESTful services to register an organization, to get or update organization information.
   ** `@property {string} accountCheck ` This class provides RESTful services to register an organization, to get or update organization information.
   ** `@property {string} explicitEntitlement ` This class provides RESTful services to register an organization, to get or update organization information.
   */
  getEntitledOrganizations(
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
    let path = "/store/{storeId}/organization/@self/entitled_orgs";
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
    headerValues["Accept"] = [
      "application/json",
      "application/xml",
      "application/xhtml+xml",
      "application/atom+xml",
    ];
    for (let val of headerValues["Accept"]) {
      header.append("Accept", val);
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

    if (parameters["storeId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/organization/@self/entitled_orgs' missing path parameter storeId"
      );
    }
    requestUrl = requestUrl.replace("{storeId}", parameters["storeId"]);

    if (parameters["accountCheck"] !== undefined) {
      const name = "accountCheck";
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

    if (parameters["explicitEntitlement"] !== undefined) {
      const name = "explicitEntitlement";
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
              " -> Transaction: " +
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

  /**
   * This allows an administrator to find organization information by organization identifier.
   * `@method`
   * `@name Organization#findByOrganizationId`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} organizationId (required)` The child property of `Parameters`.The organization identifier
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_Organization_Summary
   */
  findByOrganizationId(
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
    let path = "/store/{storeId}/organization/{organizationId}";
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
    headerValues["Accept"] = [
      "application/json",
      "application/xml",
      "application/xhtml+xml",
      "application/atom+xml",
    ];
    for (let val of headerValues["Accept"]) {
      header.append("Accept", val);
    }
    if (parameters["storeId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/organization/{organizationId}' missing path parameter storeId"
      );
    }
    requestUrl = requestUrl.replace("{storeId}", parameters["storeId"]);

    if (parameters["organizationId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/organization/{organizationId}' missing path parameter organizationId"
      );
    }
    requestUrl = requestUrl.replace(
      "{organizationId}",
      parameters["organizationId"]
    );

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
              " -> Transaction: " +
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

export default organizationService;
