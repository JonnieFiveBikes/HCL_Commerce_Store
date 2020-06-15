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

const personService = {
  /**
   * Gets the account data for a registered user.
   * `@method`
   * `@name Person#findPersonBySelf`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  findPersonBySelf(
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
    let path = "/store/{storeId}/person/@self";
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
        "Request '/store/{storeId}/person/@self' missing required parameter storeId"
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
   * This allows an administrator to find user information by user identifier.
   * `@method`
   * `@name Person#findByUserId`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} userId (required)` The child property of `Parameters`.The user identifier.
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
   */
  findByUserId(
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
    let path = "/store/{storeId}/person/{userId}";
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
        "Request '/store/{storeId}/person/{userId}' missing required parameter storeId"
      );
    }

    requestUrl = requestUrl.replace("{userId}", parameters["userId"]);

    if (parameters["userId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/person/{userId}' missing required parameter userId"
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
     * This allows CSR/CSS to find approved registered users in store organizations that he/she can manage.
     * `@method`
     * `@name Person#registeredUsersICanManage`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_List_Summary

     ** `@property {string} orderByTableName ` The order by table name.
     ** `@property {string} orderByFieldName ` The order by field name.
     ** `@property {string} startIndex ` The starting index of the result.
     ** `@property {string} maxResults ` The maximum number of results to be returned.
     ** `@property {string} logonId ` Logon Id of the customer to search for.
     ** `@property {string} logonIdSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} parentOrgName ` Parent organization name to search buyers. Only used in B2B store.
     ** `@property {string} parentOrgNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} firstName ` First name of the customer to search for.
     ** `@property {string} firstNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} lastName ` Last name of the customer to search for.
     ** `@property {string} lastNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} middleName ` Middle name of the customer to search for.
     ** `@property {string} middleNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} address1 ` Address line 1 of the customer to search for.
     ** `@property {string} address1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} city ` The city name of the customer to search for.
     ** `@property {string} citySearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} country ` The country or region name of the customer to search for.
     ** `@property {string} countrySearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} email1 ` The primary e-mail address of the customer to search for.
     ** `@property {string} email1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} email2 ` The secondary e-mail address of the customer to search for.
     ** `@property {string} email2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} fax1 ` The primary fax number of the customer to search for.
     ** `@property {string} fax1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} fax2 ` The secondary fax number of the customer to search for.
     ** `@property {string} fax2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} field1 ` Customizable field1 to search for.
     ** `@property {string} field1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} field2 ` Customizable field1 to search for.
     ** `@property {string} field2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} phone1 ` The primary phone number of the customer to search for.
     ** `@property {string} phone1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} phone2 ` The secondary phone number of the customer to search for.
     ** `@property {string} phone2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} state ` The state or province name of the customer to search for.
     ** `@property {string} stateSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} zipcode `  ZIP or postal code of the customer to search for.
     ** `@property {string} zipcodeSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     */
  registeredUsersICanManage(
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
    let path = "/store/{storeId}/person";
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
        "Request '/store/{storeId}/person' missing required parameter storeId"
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

    queryParameters.set("q", "registeredUsersICanManage");

    if (parameters["q"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/person' missing required parameter q"
      );
    }

    if (parameters["orderByTableName"] !== undefined) {
      const name = "orderByTableName";
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

    if (parameters["orderByFieldName"] !== undefined) {
      const name = "orderByFieldName";
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

    if (parameters["startIndex"] !== undefined) {
      const name = "startIndex";
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

    if (parameters["maxResults"] !== undefined) {
      const name = "maxResults";
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

    if (parameters["logonId"] !== undefined) {
      const name = "logonId";
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

    if (parameters["logonIdSearchType"] !== undefined) {
      const name = "logonIdSearchType";
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

    if (parameters["parentOrgName"] !== undefined) {
      const name = "parentOrgName";
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

    if (parameters["parentOrgNameSearchType"] !== undefined) {
      const name = "parentOrgNameSearchType";
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

    if (parameters["firstName"] !== undefined) {
      const name = "firstName";
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

    if (parameters["firstNameSearchType"] !== undefined) {
      const name = "firstNameSearchType";
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

    if (parameters["lastName"] !== undefined) {
      const name = "lastName";
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

    if (parameters["lastNameSearchType"] !== undefined) {
      const name = "lastNameSearchType";
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

    if (parameters["middleName"] !== undefined) {
      const name = "middleName";
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

    if (parameters["middleNameSearchType"] !== undefined) {
      const name = "middleNameSearchType";
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

    if (parameters["address1"] !== undefined) {
      const name = "address1";
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

    if (parameters["address1SearchType"] !== undefined) {
      const name = "address1SearchType";
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

    if (parameters["city"] !== undefined) {
      const name = "city";
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

    if (parameters["citySearchType"] !== undefined) {
      const name = "citySearchType";
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

    if (parameters["country"] !== undefined) {
      const name = "country";
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

    if (parameters["countrySearchType"] !== undefined) {
      const name = "countrySearchType";
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

    if (parameters["email1"] !== undefined) {
      const name = "email1";
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

    if (parameters["email1SearchType"] !== undefined) {
      const name = "email1SearchType";
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

    if (parameters["email2"] !== undefined) {
      const name = "email2";
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

    if (parameters["email2SearchType"] !== undefined) {
      const name = "email2SearchType";
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

    if (parameters["fax1"] !== undefined) {
      const name = "fax1";
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

    if (parameters["fax1SearchType"] !== undefined) {
      const name = "fax1SearchType";
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

    if (parameters["fax2"] !== undefined) {
      const name = "fax2";
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

    if (parameters["fax2SearchType"] !== undefined) {
      const name = "fax2SearchType";
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

    if (parameters["field1"] !== undefined) {
      const name = "field1";
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

    if (parameters["field1SearchType"] !== undefined) {
      const name = "field1SearchType";
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

    if (parameters["field2"] !== undefined) {
      const name = "field2";
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

    if (parameters["field2SearchType"] !== undefined) {
      const name = "field2SearchType";
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

    if (parameters["phone1"] !== undefined) {
      const name = "phone1";
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

    if (parameters["phone1SearchType"] !== undefined) {
      const name = "phone1SearchType";
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

    if (parameters["phone2"] !== undefined) {
      const name = "phone2";
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

    if (parameters["phone2SearchType"] !== undefined) {
      const name = "phone2SearchType";
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

    if (parameters["state"] !== undefined) {
      const name = "state";
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

    if (parameters["stateSearchType"] !== undefined) {
      const name = "stateSearchType";
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

    if (parameters["zipcode"] !== undefined) {
      const name = "zipcode";
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

    if (parameters["zipcodeSearchType"] !== undefined) {
      const name = "zipcodeSearchType";
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
   * Registers a new user.  When mode is set to admin, the register is done by an administrator.
   * `@method`
   * `@name Person#registerPerson`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body.
   ** `@property {string} mode ` The mode of the rest service. Default value is 'self'.
   */
  registerPerson(
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
    let path = "/store/{storeId}/person";
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
        "Request '/store/{storeId}/person' missing required parameter storeId"
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

    if (parameters["body"] !== undefined) {
      body = parameters["body"];
    }

    if (parameters["mode"] !== undefined) {
      const name = "mode";
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
     * Updates account data for a registered user.  This also supports resetting password for unauthenticated and authenticated users. When action is set to 'updateUserRegistration', user account data is updated using UserRegistrationUpdateCmd
     * `@method`
     * `@name Person#updatePerson`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {any} body ` Request body.

     */
  updatePerson(
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
    let path = "/store/{storeId}/person/@self";
    let requestUrl = domain + path;
    let method: Method = "PUT";
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
        "Request '/store/{storeId}/person/@self' missing required parameter storeId"
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

    if (parameters["body"] !== undefined) {
      body = parameters["body"];
    }

    if (parameters["action"] !== undefined) {
      const name = "action";
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
     * Updates account data for a registered user.  This also supports resetting password for unauthenticated and authenticated users. When action is set to 'updateUserRegistration', user account data is updated using UserRegistrationUpdateCmd
     * `@method`
     * `@name Person#updatePersonOnUserRegistrationUpdate`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {any} body ` Request body.

     */
  updatePersonOnUserRegistrationUpdate(
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
    let path = "/store/{storeId}/person/@self";
    let requestUrl = domain + path;
    let method: Method = "PUT";
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
        "Request '/store/{storeId}/person/@self' missing required parameter storeId"
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

    if (parameters["body"] !== undefined) {
      body = parameters["body"];
    }

    if (parameters["action"] !== undefined) {
      const name = "action";
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
   * This allows an administrator to update account data for a registered user.
   * `@method`
   * `@name Person#updatePersonByAdmin`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} userId (required)` The child property of `Parameters`.The user identifier.
   ** `@property {any} body ` Request body.
   */
  updatePersonByAdmin(
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
    let path = "/store/{storeId}/person/{userId}";
    let requestUrl = domain + path;
    let method: Method = "PUT";
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
        "Request '/store/{storeId}/person/{userId}' missing required parameter storeId"
      );
    }

    requestUrl = requestUrl.replace("{userId}", parameters["userId"]);

    if (parameters["userId"] === undefined) {
      throw new Error(
        "Request '/store/{storeId}/person/{userId}' missing required parameter userId"
      );
    }

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

    return executeRequest(requestOptions);
  },

  /**
   * This allows CSR / CSS to reset password for a registered user. It also allows resetting password when the CSR / CSS has established a session to act on behalf of a user.
   * `@method`
   * `@name Person#resetPasswordByAdmin`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {any} body ` Request body.
   ** `@property {string} mode ` The mode in which resetPassword will be executed. ResetPassword can be executed in administrator session or in on-behalf session for a user Default value is 'resetPasswordAdmin'.
   */
  resetPasswordByAdmin(
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
    let path = "/store/{storeId}/person/updateMemberPassword";
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
        "Request '/store/{storeId}/person/updateMemberPassword' missing required parameter storeId"
      );
    }

    if (parameters["body"] !== undefined) {
      body = parameters["body"];
    }

    if (parameters["mode"] !== undefined) {
      const name = "mode";
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
export default personService;
/* jshint ignore:end */
