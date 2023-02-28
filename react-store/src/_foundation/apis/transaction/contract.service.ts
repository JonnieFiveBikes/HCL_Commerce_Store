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
import { ContractApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const contractApiInstance = new ContractApi(undefined, site.transactionContext);
const contractService = {
  /**
   * Finds contracts by query. See each query for details on input and output.
   * `@method`
   * `@name Contract#findByQuery`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} q (required)` The query name.
   */
  findByQuery(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, q, ...options } = parameters;
    return contractApiInstance.storeStoreIdContractGet(storeId, q, options);
  },

  /**
   * Finds the contracts the current user is eligible to.
   * `@method`
   * `@name Contract#findEligible`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   */
  findEligible(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, ...options } = parameters;
    return contractApiInstance.storeStoreIdContractGet(storeId, "eligible", options);
  },
  /**
  * Gets the contract details for a specific contract ID.
  * `@method`
  * `@name Contract#findByContractId`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} contractId (required)` The child property of `Parameters`.The contract identifier.
   ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.

  */
  findByContractId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, contractId, currency, profileName, ...options } = parameters;
    return contractApiInstance.storeStoreIdContractContractIdGet(storeId, contractId, currency, profileName, options);
  },
};

export default contractService;
