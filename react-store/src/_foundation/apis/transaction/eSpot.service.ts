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
import { SpotApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const spotApiInstance = new SpotApi(undefined, site.transactionContext);
const eSpotService = {
  /**
   * Gets an e-Marketing Spot by name.
   * `@method`
   * `@name eSpot#findByName`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} name (required)` The child property of `Parameters`.E-Spot name.
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
   ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
   ** `@property {string} name2 ` E-Spot name.
   */
  findByName(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, name, responseFormat, catalogId, currency, name2, ...options } = parameters;
    return spotApiInstance.eSpotFindByName(name, storeId, responseFormat, catalogId, currency, name2, options);
  },
};

export default eSpotService;
