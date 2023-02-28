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
import { TokenApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const tokenApiInstance = new TokenApi(undefined, site.transactionContext);
const tokenService = {
  /**
  * Gets the feature version data.
  * `@method`
  * `@name Token#findByUrlKeywordNames`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.

   ** `@property {string} urlKeywordName (required)` the input urlKeyword names
  */
  findByUrlKeywordNames(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, urlKeywordName, ...options } = parameters;
    return tokenApiInstance.tokenFindByUrlKeywordNames(storeId, "byUrlKeywordNames", urlKeywordName, options);
  },
};

export default tokenService;
