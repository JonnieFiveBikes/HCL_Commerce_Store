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
import { CountryApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const countryApiInstance = new CountryApi(undefined, site.transactionContext);
const countryService = {
  /**
   * Retrieve a list of countries/region and corresponding states/provinces.
   * `@method`
   * `@name Country#findCountryStateList`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} countryCode ` The country or region abbreviation code
   */
  findCountryStateList(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, profileName, countryCode, ...options } = parameters;
    return countryApiInstance.countryFindCountryStateList(storeId, profileName, countryCode, options);
  },
};

export default countryService;
