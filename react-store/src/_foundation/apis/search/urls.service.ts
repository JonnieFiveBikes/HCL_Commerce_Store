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
import { site } from "../../constants/site";
import { V2UrlResourceApi } from "@hcl-commerce-store-sdk/typescript-axios-es";

const urlResourceApiInstance = new V2UrlResourceApi(undefined, site.searchContext);
const urlsService = {
  /**
   * Gets Response for V2.0 API Seo url data
   * `@method`
   * `@name Urls#getV2URLResourcesUsingGET`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {array} id ` The list of category IDs.
   ** `@property {array} identifier ` The list of category identifiers.
   ** `@property {integer} storeId (required)` The store ID.
   */
  getV2URLResourcesUsingGET(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, identifier, ...options } = parameters;
    return urlResourceApiInstance.getV2CategoryResources1(storeId, identifier, options);
  },
};

export default urlsService;
