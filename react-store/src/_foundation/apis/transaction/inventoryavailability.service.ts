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
import { InventoryAvailabilityApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const inventoryAvailabilityApiInstance = new InventoryAvailabilityApi(undefined, site.transactionContext);
const inventoryavailabilityService = {
  /**
   * Gets inventory details for the specified product by it's identifier (Catalog Entry Id). Multiple product IDs can be passed to the URI separated by a comma (,).
   * `@method`
   * `@name Inventoryavailability#getInventoryAvailabilityByProductId`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} productIds (required)` The child property of `Parameters`.The product identifiers. Multiple values are separated by commas. Example: /inventoryavailability/10001,10002
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} onlineStoreId ` The online store identifier.
   ** `@property {string} physicalStoreId ` The physical store identifiers. Multiple values are separated by commas. Example: physicalStoreId=10001,10002
   */
  getInventoryAvailabilityByProductId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      productIds,
      sellerId,
      responseFormat,
      onlineStoreId,
      physicalStoreId,
      ...options
    } = parameters;
    return inventoryAvailabilityApiInstance.inventoryAvailabilityGetInventoryAvailabilityByProductId(
      storeId,
      productIds,
      sellerId,
      responseFormat,
      onlineStoreId,
      physicalStoreId,
      options
    );
  },

  /**
   * Gets inventory details for the specified product by it's identifier (Catalog Entry Id). Multiple product IDs can be passed to the URI separated by a comma (,).
   * `@method`
   * `@name Inventoryavailability#getInventoryAvailabilityByProductId`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} partNumbers (required)` The child property of `Parameters`.The product identifiers. Multiple values are separated by commas. Example: /inventoryavailability/PART1,PART2
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} onlineStoreName ` The online store identifier.
   ** `@property {string} physicalStoreName ` The physical store names. Separate multiple values with a comma for example, physicalStoreName=China mall,Sales mall.
   ** `@property {string} forUser `User name to act on behalf of.
   ** `@property {string} forUserId ` User identifier to act on behalf of.
   ** `@property {any} options `  Override http request option.
   */
  getInventoryAvailabilityByPartNumber(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      partNumbers,
      responseFormat,
      sellerId,
      onlineStoreName,
      physicalStoreName,
      forUser,
      forUserId,
      ...options
    } = parameters;
    return inventoryAvailabilityApiInstance.inventoryAvailabilityGetInventoryAvailabilityByPartNumber(
      storeId,
      partNumbers,
      sellerId,
      responseFormat,
      onlineStoreName,
      physicalStoreName,
      forUser,
      forUserId,
      options
    );
  },
};

export default inventoryavailabilityService;
