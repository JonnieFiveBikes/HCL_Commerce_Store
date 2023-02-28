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
import { StoreApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const storeApiInstance = new StoreApi(undefined, site.transactionContext);
const storeService = {
  /**
   * This method returns a list of enabled store features.
   * `@method`
   * `@name Store#getStoreEnabledFeaturesList`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   */
  getStoreEnabledFeaturesList(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, ...options } = parameters;
    return storeApiInstance.storeGetFeatureList(storeId, options);
  },
};

export default storeService;
