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
import { SearchDisplayApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";

const searchDisplayApiInstance = new SearchDisplayApi(undefined, site.transactionContext);
const searchDisplayService = {
  /**
   * Get search layout view by search term
   * `@method`
   * `@name SearchDisplay#getSearchDisplayView`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} searchTerm (required)` The search term.
   ** `@property {string} responseFormat `
   */
  getSearchDisplayView(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, searchTerm, responseFormat, ...options } = parameters;
    return searchDisplayApiInstance.getSearchDisplayView(storeId, searchTerm, responseFormat, options);
  },
};

export default searchDisplayService;
