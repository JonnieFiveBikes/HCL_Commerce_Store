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
/**
 * Do not modify, the file is generated.
 */
//Standard libraries
import { AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { ShippingInfoApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const shippingInfoApiInstance = new ShippingInfoApi(undefined, site.transactionContext);
const shippingInfoService = {
  /**
   * Updates shipping information for the shopping cart.
   * `@method`
   * `@name ShippingInfo#updateOrderShippingInfo`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body.
   ** `@property {string} forUser ` User name to act on behalf of.
   ** `@property {string} forUserId ` User identifier to act on behalf of.
   */
  updateOrderShippingInfo(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, forUser, forUserId, ...options } = parameters;
    return shippingInfoApiInstance.shippingInfoUpdateOrderShippingInfo(
      storeId,
      responseFormat,
      forUser,
      forUserId,
      body,
      options
    );
  },
};

export default shippingInfoService;