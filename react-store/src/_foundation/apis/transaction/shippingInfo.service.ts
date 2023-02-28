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

  /**
   * Gets shipping modes for the shopping cart.
   * @summary Get shipping modes
   * @param {string} storeId The store identifier.
   * @param {string} [locale] The locale to use for example, locale&#x3D;en_US. If the \&quot;langId\&quot; parameter is specified, the \&quot;locale\&quot; parameter is ignored. If no locale is specified, the store default locale is used.
   * @param {string} [langId] Language identifier. If not specified, the \&quot;locale\&quot; parameter is used. If \&quot;locale\&quot; is not specified, then the store default language is used.
   * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   * @param {*} [options] Override http request option.
   */
  getAllowableShippingModes(
    storeId: string,
    locale?: string,
    langId?: string,
    responseFormat?: string,
    options?: any
  ): AxiosPromise<any> {
    return shippingInfoApiInstance.cartGetAllowableShippingModes(storeId, locale, langId, responseFormat, options);
  },
};

export default shippingInfoService;
