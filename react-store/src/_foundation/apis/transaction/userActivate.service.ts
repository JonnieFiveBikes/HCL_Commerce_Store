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
import i18n from "../../../i18n";

//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { UserActivateApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";
import { CommerceEnvironment } from "../../../constants/common";

const userActivateApiInstance = new UserActivateApi(undefined, site.transactionContext);

const userActivateService = {
  /**
   * Active user by LogonId
   * `@method`
   * `@name UserActivate#activeUser`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body to activate the user account.
   */
  activeUser(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    const langId = CommerceEnvironment.reverseLanguageMap[i18n.languages[0].split("-").join("_")];

    return userActivateApiInstance.userActivateActiveUser(storeId, body, responseFormat, langId, options);
  },

  /**
   * Resend active user by LogonId
   * `@method`
   * `@name UserActivate#resendActiveUser`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body for resend user account activation email.
   */
  resendActiveUser(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return userActivateApiInstance.userActivateResendActiveUser(storeId, body, responseFormat, options);
  },
};

export default userActivateService;
