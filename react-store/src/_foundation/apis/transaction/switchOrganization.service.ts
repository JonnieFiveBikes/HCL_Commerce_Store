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
import { SwitchOrganizationApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const switchOrganizationApiInstance = new SwitchOrganizationApi(undefined, site.transactionContext);
const switchOrganizationService = {
  /**
   * Response the organization change action
   * `@method`
   * `@name SwitchOrganization#changeOrganization`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  changeOrganization(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, ...options } = parameters;
    return switchOrganizationApiInstance.storeStoreIdSwitchOrganizationSwitchToPut(storeId, responseFormat, options);
  },
};

export default switchOrganizationService;
