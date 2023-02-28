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
import { ConfigurationApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const configurationApiInstance = new ConfigurationApi(undefined, site.transactionContext);
const configurationService = {
  /**
   * This method returns the configuration details by the specified identifier.
   * `@method`
   * `@name Configuration#findByConfigurationId`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} configurationId (required)` The child property of `Parameters`.The configuration identifier. This is mandatory parameter and cannot be null or empty.
   */
  findByConfigurationId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, configurationId, ...options } = parameters;
    return configurationApiInstance.configurationFindByConfigurationId(storeId, configurationId, options);
  },
};

export default configurationService;
