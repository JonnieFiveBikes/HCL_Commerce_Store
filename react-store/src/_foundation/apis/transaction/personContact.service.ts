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
import { ContactApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const contactApiInstance = new ContactApi(undefined, site.transactionContext);
const personContactService = {
  /**
   * Gets the contacts in a person's address book. If the addressType optional query parameter is passed in, the returned contacts are filtered by addressType.
   * `@method`
   * `@name PersonContact#getAllPersonContact`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} addressType ` The address type.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  getAllPersonContact(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, addressType, ...options } = parameters;
    return contactApiInstance.contactGetAllPersonContact(storeId, addressType, responseFormat, options);
  },

  /**
   * Gets the contact in a person's address book by nickname.
   * `@method`
   * `@name PersonContact#getPersonContactByNickname`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} nickName (required)` The child property of `Parameters`.The address nickname.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  getPersonContactByNickname(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, nickName, ...options } = parameters;
    return contactApiInstance.contactFindPersonContactByNickName(storeId, nickName, responseFormat, options);
  },

  /**
   * Creates a new contact in a person's address book.
   * `@method`
   * `@name PersonContact#addPersonContact`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body.
   */
  addPersonContact(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return contactApiInstance.contactAddPersonContact(storeId, responseFormat, body, options);
  },

  /**
   * Updates the contact in the address book identified by nickName.
   * `@method`
   * `@name PersonContact#updatePersonContact`
   *
   * `@param {any} headers (optional)` will add headers to rest request
   *
   * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} nickName (required)` The child property of `Parameters`.The contact name saved in addressBook by registered shopper.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body.
   */
  updatePersonContact(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, nickName, ...options } = parameters;
    return contactApiInstance.contactUpdatePersonContact(storeId, nickName, responseFormat, body, options);
  },

  /**
   * Deletes the contact in the address book identified by nickName.
   * `@method`
   * `@name PersonContact#deletePersonContact`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} nickName (required)` The child property of `Parameters`.The contact name saved in addressBook by registered shopper.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  deletePersonContact(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, nickName, ...options } = parameters;
    return contactApiInstance.contactDeletePersonContact(storeId, nickName, responseFormat, options);
  },
};

export default personContactService;
