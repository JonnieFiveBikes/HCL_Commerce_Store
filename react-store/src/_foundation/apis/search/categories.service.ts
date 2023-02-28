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
import { V2CategoryResourceApi } from "@hcl-commerce-store-sdk/typescript-axios-es";

const categoryResourceApiInstance = new V2CategoryResourceApi(undefined, site.searchContext);
const categoriesService = {
  /**
   * Gets Response for V2.0 API for store as per the requirements
   * `@method`
   * `@name Categories#getV2CategoryResourcesUsingGET`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {array} depthAndLimit ` Depth for @top categories
   ** `@property {array} id ` The list of category identifiers.
   ** `@property {array} identifier ` The list of category identifiers, not the ones assigned by the database.
   ** `@property {integer} parentCategoryId ` Parent category identifier
   ** `@property {integer} storeId (required)` The store ID.
   */
  getV2CategoryResourcesUsingGET(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, identifier, id, parentCategoryId, depthAndLimit, ...options } = parameters;
    return categoryResourceApiInstance.getV2CategoryResources(
      storeId,
      identifier,
      id,
      parentCategoryId,
      depthAndLimit,
      options
    );
  },
};

export default categoriesService;
