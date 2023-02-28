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
import { StoreLocatorApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";
import { SKIP_WC_TOKEN_HEADER } from "../../constants/common";

const storeLocatorApiInstance = new StoreLocatorApi(undefined, site.transactionContext);
const storeLocatorService = {
  /**
   * Gets store location information by specified coordinates.
   * `@method`
   * `@name StoreLocator#findStores`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} latitude (required)` The child property of `Parameters`.The latitude.
   ** `@property {string} longitude (required)` The child property of `Parameters`.The longitude.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} maxItems ` The maximum number of stores to return.
   ** `@property {string} radiusUOM ` The radius unit of measure.
   ** `@property {string} BeautyCenter ` The physcal store attribute name that describes whether the store is a beauty center.
   ** `@property {string} Type ` The physical store attribute name to describe the type of the store.
   ** `@property {string} radius ` The radius.
   ** `@property {string} siteLevelStoreSearch ` If it is 'true', a site level physical search will be performed.  Otherwise, the physical store search will be performed at the web store level. By default, it is 'true'.
   */
  findStores(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      latitude,
      longitude,
      responseFormat,
      maxItems,
      radiusUOM,
      beautyCenter,
      type,
      radius,
      siteLevelStoreSearch,
      ...options
    } = parameters;
    //HC-17679 Previewtoken cause error for storelocator services.
    //skip WCToken to workaround the issue.
    options[SKIP_WC_TOKEN_HEADER] = true;
    return storeLocatorApiInstance.storeLocatorFindStores(
      storeId,
      latitude,
      longitude,
      responseFormat,
      maxItems,
      radiusUOM,
      beautyCenter,
      type,
      radius,
      siteLevelStoreSearch,
      options
    );
  },

  /**
   * Gets store location information by one to n store unique IDs.
   * `@method`
   * `@name StoreLocator#findByStoreUniqueIds`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {array} physicalStoreId (required)` A list of physical store unique identifiers.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   */
  findByStoreUniqueIds(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      physicalStoreId,
      responseFormat,
      pageNumber,
      pageSize,
      ...options
    } = parameters;
    //HC-17679 Previewtoken cause error for storelocator services.
    //skip WCToken to workaround the issue.
    options[SKIP_WC_TOKEN_HEADER] = true;
    return storeLocatorApiInstance.storeLocatorFindByStoreUniqueIds(
      storeId,
      physicalStoreId,
      responseFormat,
      pageNumber,
      pageSize,
      options
    );
  },

  /**
   * Gets store location information by a store unique ID.
   * `@method`
   * `@name StoreLocator#findByStoreUniqueId`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} uniqueId (required)` The child property of `Parameters`.The unique identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   */
  findByStoreUniqueId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, uniqueId, responseFormat, pageNumber, pageSize, ...options } = parameters;
    return storeLocatorApiInstance.storeLocatorFindByStoreUniqueId(
      storeId,
      uniqueId,
      responseFormat,
      pageNumber,
      pageSize,
      options
    );
  },

  /**
   * Gets store location information by a specified location.
   * `@method`
   * `@name StoreLocator#findGeoNodeByGeoLocation`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} city ` The city.
   ** `@property {string} state ` The state.
   ** `@property {string} prov ` The province.
   ** `@property {string} country ` The country.
   ** `@property {string} radiusUOM ` The radius unit of measure.
   ** `@property {string} BeautyCenter ` The physcal store attribute name that describes whether the store is a beauty center.
   ** `@property {string} Type ` The physical store attribute name to describe the type of the store.
   ** `@property {string} radius ` The radius.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   ** `@property {string} siteLevelStoreSearch ` If it is 'true', a site level physical search will be performed.  Otherwise, the physical store search will be performed at the web store level. By default, it is 'true'.
   */
  findGeoNodeByGeoLocation(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      responseFormat,
      city,
      state,
      prov,
      country,
      radiusUOM,
      beautyCenter,
      type,
      radius,
      pageNumber,
      pageSize,
      siteLevelStoreSearch,
      ...options
    } = parameters;
    return storeLocatorApiInstance.storeLocatorFindGeoNodeByGeoLocation(
      storeId,
      responseFormat,
      city,
      state,
      prov,
      country,
      radiusUOM,
      beautyCenter,
      type,
      radius,
      pageNumber,
      pageSize,
      siteLevelStoreSearch,
      options
    );
  },
};

export default storeLocatorService;
