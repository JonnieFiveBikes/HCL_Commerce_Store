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
import { AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { LoginIdentityApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const loginIdentityApiInstance = new LoginIdentityApi(undefined, site.transactionContext);
const loginIdentityService = {
  /**
   * Logs in a registered user using their user name and password.
   * `@method`
   * `@name LoginIdentity#login`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} generateLTPAToken ` The flag to generate LTPA token. It will generate or delete LTPA token by setting this parameter to true.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Logon body.
   */
  login(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return loginIdentityApiInstance.loginIdentityLogin(storeId, responseFormat, body, options);
  },

  /**
   * Logs out the registered user.
   * `@method`
   * `@name LoginIdentity#logout`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} generateLTPAToken ` The flag to generate LTPA token. It will generate or delete LTPA token by setting this parameter to true.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  logout(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, ...options } = parameters;
    return loginIdentityApiInstance.loginIdentityLogout(storeId, responseFormat, options);
  },
};

export default loginIdentityService;
