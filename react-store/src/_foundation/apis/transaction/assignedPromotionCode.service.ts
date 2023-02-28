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
import { AssignedPromotionCodeApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const assignedPromotionCodeApiInstance = new AssignedPromotionCodeApi(undefined, site.transactionContext);
const assignedPromotionCodeService = {
  /**
   * Gets assigned promotion codes for the shopping cart.
   * `@method`
   * `@name AssignedPromotionCode#getAssignedPromotioncodeInfo`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  getAssignedPromotioncodeInfo(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, ...options } = parameters;
    return assignedPromotionCodeApiInstance.getAssignedPromotioncodeInfo(storeId, responseFormat, options);
  },

  /**
   * Applies promotion codes to the shopping cart.
   * `@method`
   * `@name AssignedPromotionCode#applyPromotioncode`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body (required)` The request body for applying promotion codes to the shopping cart.
   */
  applyPromotioncode(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return assignedPromotionCodeApiInstance.storeStoreIdCartSelfAssignedPromotionCodePost(
      storeId,
      body,
      responseFormat,
      options
    );
  },

  /**
   * Removes promotion codes from the shopping cart.
   * `@method`
   * `@name AssignedPromotionCode#removePromotionCode`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} promoCode (required)` The child property of `Parameters`.The promotion code.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  removePromotionCode(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, promoCode, ...options } = parameters;
    return assignedPromotionCodeApiInstance.storeStoreIdCartSelfAssignedPromotionCodePromoCodeDelete(
      storeId,
      promoCode,
      responseFormat,
      options
    );
  },
};

export default assignedPromotionCodeService;
