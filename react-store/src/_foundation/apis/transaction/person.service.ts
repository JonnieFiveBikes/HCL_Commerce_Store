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
import { PersonApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const personApiInstance = new PersonApi(undefined, site.transactionContext);
const personService = {
  /**
   * Gets the account data for a registered user.
   * `@method`
   * `@name Person#findPersonBySelf`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  findPersonBySelf(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return personApiInstance.personFindPersonBySelf(storeId, responseFormat, options);
  },

  /**
   * This allows an administrator to find user information by user identifier.
   * `@method`
   * `@name Person#findByUserId`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} userId (required)` The child property of `Parameters`.The user identifier.
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
   */
  findByUserId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, userId, profileName, ...options } = parameters;
    return personApiInstance.personFindByUserIdWRolesOfUserInOrgsICanAdminProfileName(
      storeId,
      userId,
      profileName,
      options
    );
  },

  /**
   * Registers a new user.  When mode is set to admin, the register is done by an administrator.
   * `@method`
   * `@name Person#registerPerson`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body.
   ** `@property {string} mode ` The mode of the rest service. Default value is 'self'.
   */
  registerPerson(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, mode, body, ...options } = parameters;
    return personApiInstance.personRegisterPersonOnUserRegistrationAdminAdd(
      storeId,
      responseFormat,
      mode,
      body,
      options
    );
  },

  /**
  * Updates account data for a registered user.  This also supports resetting password for unauthenticated and authenticated users. When action is set to 'updateUserRegistration', user account data is updated using UserRegistrationUpdateCmd
  * `@method`
  * `@name Person#updatePerson`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body.

  */
  updatePerson(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, action, ...options } = parameters;
    return personApiInstance.personUpdatePersonOnUserRegistrationUpdate(storeId, responseFormat, action, body, options);
  },

  /**
  * Updates account data for a registered user.  This also supports resetting password for unauthenticated and authenticated users. When action is set to 'updateUserRegistration', user account data is updated using UserRegistrationUpdateCmd
  * `@method`
  * `@name Person#updatePersonOnUserRegistrationUpdate`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body.

  */
  updatePersonOnUserRegistrationUpdate(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, action, ...options } = parameters;
    return personApiInstance.personUpdatePersonOnUserRegistrationUpdate(storeId, responseFormat, action, body, options);
  },

  /**
   * This allows an administrator to update account data for a registered user.
   * `@method`
   * `@name Person#updatePersonByAdmin`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} userId (required)` The child property of `Parameters`.The user identifier.
   ** `@property {any} body ` Request body.
   */
  updatePersonByAdmin(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, body, userId, ...options } = parameters;
    return personApiInstance.personUpdatePersonByAdmin(storeId, userId, body, options);
  },

  /**
   * This allows CSR / CSS to reset password for a registered user. It also allows resetting password when the CSR / CSS has established a session to act on behalf of a user.
   * `@method`
   * `@name Person#resetPasswordByAdmin`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {any} body ` Request body.
   ** `@property {string} mode ` The mode in which resetPassword will be executed. ResetPassword can be executed in administrator session or in on-behalf session for a user Default value is 'resetPasswordAdmin'.
   */
  resetPasswordByAdmin(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, body, mode, ...options } = parameters;
    return personApiInstance.personResetPasswordByAdmin(storeId, mode, body, options);
  },
};

export default personService;
