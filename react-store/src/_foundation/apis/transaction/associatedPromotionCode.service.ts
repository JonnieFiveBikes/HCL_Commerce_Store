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
import { AssociatedPromotionApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const associatedPromotionApiInstance = new AssociatedPromotionApi(undefined, site.transactionContext);
const associatedPromotionCodeService = {
  /**
  * Get promotions list by product ID.
  * `@method`
  * `@name AssociatedPromotionCode#findPromotionsByProduct`
  *
  * `@param {any} parameters` have following properties:
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.
   ** `@property {string} qProductId (required)` The product ID.
   ** `@property {string} qCalculationUsageId ` The calculation usage ID.
   ** `@property {string} qCode ` The calculation code name.
   ** `@property {string} qEnableStorePath ` Whether the data bean searches for calculation code based on store path. Default value is <b>true</b>.
   ** `@property {string} qIncludeCategoryPromotions ` Whether to exclude category promotions. Default value is <b>false</b>.
   ** `@property {string} qIncludeChildItems ` Whether to include the child items. Default value is <b>false</b>.
   ** `@property {string} qIncludeNonManagementCenterPromotions ` Whether all the promotions in the store have been created in Management Center. Default value is <b>false</b>
   ** `@property {string} qIncludeParentCategories ` Whether to retrieve the calculation codes attached to the parent category of the specified catalog group. Default value is <b>false</b>.
   ** `@property {string} qIncludeParentProduct ` Whether to retrieve the calculation codes attached to the parent product of the specified catalog entry. Default value is <b>false</b>
   ** `@property {string} qIncludePromotionCode ` Whether to exclude the calculation codes that require a promotion code. Default value is <b>true</b>.
   ** `@property {string} qIncludeUnentitledPromotionsByMemberGroup ` Whether to include promotions that are targeted to a member group if the user does not belong to the member group. Default value is <b>false</b>.
   ** `@property {string} qShipModeId ` The ship mode ID.
   ** `@property {string} qUserId ` The user ID.

   ** `@property {integer} qCategoryId `
   ** `@property {integer} qDisplayLevel `
   ** `@property {integer} qStoreId `
  */
  findPromotionsByProduct(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      qProductId,
      responseFormat,
      currency,
      profileName,
      qCalculationUsageId,
      qCode,
      qEnableStorePath,
      qIncludeCategoryPromotions,
      qIncludeChildItems,
      qIncludeNonManagementCenterPromotions,
      qIncludeParentCategories,
      qIncludeParentProduct,
      qIncludePromotionCode,
      responseFoqIncludeUnentitledPromotionsByMemberGrouprmat,
      qShipModeId,
      qUserId,
      qCategoryId,
      qDisplayLevel,
      qStoreId,
      ...options
    } = parameters;
    return associatedPromotionApiInstance.associatedPromotionFindPromotionsByProductWAssociatedPromotionSummaryProfileName(
      storeId,
      qProductId,
      "byProduct",
      responseFormat,
      currency,
      profileName,
      qCalculationUsageId,
      qCode,
      qEnableStorePath,
      qIncludeCategoryPromotions,
      qIncludeChildItems,
      qIncludeNonManagementCenterPromotions,
      qIncludeParentCategories,
      qIncludeParentProduct,
      qIncludePromotionCode,
      responseFoqIncludeUnentitledPromotionsByMemberGrouprmat,
      qShipModeId,
      qUserId,
      qCategoryId,
      qDisplayLevel,
      qStoreId,
      options
    );
  },
};

export default associatedPromotionCodeService;
