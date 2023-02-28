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
import i18n from "../../../i18n";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { CartApi, ShippingInfoApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";
import { CommerceEnvironment } from "../../../constants/common";

const cartApiInstance: CartApi = new CartApi(undefined, site.transactionContext);
const shippingInfoApiInstance = new ShippingInfoApi(undefined, site.transactionContext);
const cartService = {
  /**
   * Gets order details for the shopping cart.
   * `@method`
   * `@name Cart#getCart`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
   ** `@property {string} sortOrderItemBy ` The order the results are sorted by ie:orderItemID
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.
   */
  getCart(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      responseFormat,
      pageNumber,
      pageSize,
      currency,
      sortOrderItemBy,
      profileName,
      ...options
    } = parameters;

    const langId = CommerceEnvironment.reverseLanguageMap[i18n.languages[0].split("-").join("_")];

    return cartApiInstance.cartGetCart(
      storeId,
      langId,
      responseFormat,
      pageNumber,
      pageSize,
      currency,
      sortOrderItemBy,
      profileName,
      options
    );
  },

  /**
   * Copies a specified order.
   * `@method`
   * `@name Cart#copyOrder`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` The request object for copy order.
   */
  copyOrder(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartCopyOrder(storeId, responseFormat, body, options);
  },

  /**
   * Deletes the specified order item from the order.
   * `@method`
   * `@name Cart#deleteOrderItem`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` The request body for deleting an order item.
   */
  deleteOrderItem(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartDeleteOrderItem(storeId, responseFormat, body, options);
  },

  /**
   * Gets usable shipping information for the shopping cart.
   * `@method`
   * `@name Cart#getUsableShippingInfo`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   ** `@property {string} orderId ` The order ID.
   */
  getUsableShippingInfo(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, pageNumber, pageSize, orderId, ...options } = parameters;

    return shippingInfoApiInstance.cartGetUsableShippingInfo(
      storeId,
      responseFormat,
      pageNumber,
      pageSize,
      orderId,
      options
    );
  },

  /**
   * Gets usable shipping information for the shopping cart by address.
   * `@method`
   * `@name Cart#getUsableShippingMode`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   ** `@property {string} orderId ` The order ID.
   */
  getUsableShippingMode(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, pageNumber, pageSize, orderId, ...options } = parameters;

    return cartApiInstance.getUsableShippingMode(storeId, responseFormat, pageNumber, pageSize, orderId, options);
  },

  /**
   * Gets usable payment information for the shopping cart.
   * `@method`
   * `@name Cart#getUsablePaymentInfo`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   ** `@property {string} orderId ` The order ID.
   */
  getUsablePaymentInfo(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, pageNumber, pageSize, orderId, ...options } = parameters;

    return cartApiInstance.cartGetUsablePaymentInfo(storeId, responseFormat, pageNumber, pageSize, orderId, options);
  },

  /**
   * Adds one or more order items to the shopping cart.
   * `@method`
   * `@name Cart#addOrderItem`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` The request object for AddOrderItem.
   */
  addOrderItem(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartAddOrderItem(storeId, responseFormat, body, options);
  },

  /**
   * Updates one or more order items in the shopping cart.
   * `@method`
   * `@name Cart#updateOrderItem`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Update order item body.
   */
  updateOrderItem(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartUpdateOrderItem(storeId, responseFormat, body, options);
  },

  /**
   * Prepares the shopping cart for checkout. This method must be called before the checkout service.
   * `@method`
   * `@name Cart#preCheckout`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` The request object for preCheckout.
   */
  preCheckout(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartPreCheckout(storeId, responseFormat, body, options);
  },

  /**
   * Checks out the shopping cart.
   * `@method`
   * `@name Cart#checkOut`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` The request object for checkout.
   */
  checkOut(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartCheckOut(storeId, responseFormat, body, options);
  },

  /**
   * Locks the shopping cart by a CSR.
   * `@method`
   * `@name Cart#lockCart`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} cartId (required)` The child property of `Parameters`.Order identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  lockCart(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartLockCart(storeId, body, responseFormat, options);
  },

  /**
   * Locks the shopping cart when the buyer administrator/CSR has established a session to act on behalf of a user.
   * `@method`
   * `@name Cart#lockCartOnBehalf`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} cartId (required)` The child property of `Parameters`.Order identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} forUser ` User name to act on behalf of.
   ** `@property {string} forUserId ` User identifier to act on behalf of.
   */
  lockCartOnBehalf(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, cartId, responseFormat, forUser, forUserId, ...options } = parameters;

    return cartApiInstance.cartLockCartOnBehalf(storeId, cartId, responseFormat, forUser, forUserId, options);
  },

  /**
   * Unlocks the shopping cart by a CSR.
   * `@method`
   * `@name Cart#unlockCart`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} cartId (required)` The child property of `Parameters`.Order identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  unlockCart(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, cartId, responseFormat, ...options } = parameters;

    return cartApiInstance.cartUnlockCart(storeId, cartId, responseFormat, options);
  },

  /**
   * Unlocks the shopping cart when the buyer administrator/CSR has established a session to act on behalf of a user.
   * `@method`
   * `@name Cart#unlockCartOnBehalf`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} cartId (required)` The child property of `Parameters`.Order identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} forUser ` User name to act on behalf of.
   ** `@property {string} forUserId ` User identifier to act on behalf of.
   */
  unlockCartOnBehalf(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, cartId, responseFormat, forUser, forUserId, ...options } = parameters;

    return cartApiInstance.cartUnlockCartOnBehalf(storeId, cartId, responseFormat, forUser, forUserId, options);
  },

  /**
   * Gets buyer purchase order information for buyer purchase order ID.
   * `@method`
   * `@name Cart#getBuyerPurchaseOrderDataBean`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} buyerPurchaseOrderId (required)` The child property of `Parameters`.The buyer purchase order identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.
   */
  getBuyerPurchaseOrderDataBean(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, buyerPurchaseOrderId, responseFormat, profileName, ...options } = parameters;

    return cartApiInstance.cartGetBuyerPurchaseOrderDataBean(
      storeId,
      buyerPurchaseOrderId,
      responseFormat,
      profileName,
      options
    );
  },

  /**
   * Create the order.
   * `@method`
   * `@name Cart#createOrder`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} description (required)` The child property of `Parameters`.The description for the order.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` The request body object for create order.
   */
  createOrder(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, description, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartCreateOrder(storeId, description, responseFormat, body, options);
  },

  /**
   * Sets the order as the pending order.
   * `@method`
   * `@name Cart#setPendingOrder`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} orderId (required)` The child property of `Parameters`.The order ID.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` The request body object for set pending order.
   */
  setPendingOrder(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, orderId, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartSetPendingOrder(storeId, orderId, responseFormat, body, options);
  },

  /**
   * Add order item.
   * `@method`
   * `@name Cart#addPreConfigurationOrderItem`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  addPreConfigurationOrderItem(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;

    return cartApiInstance.cartAddPreConfigurationOrderItem(storeId, responseFormat, body, options);
  },

  calculateOrder(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return cartApiInstance.cartCalculateOrder1(storeId, responseFormat, body, options);
  },
};

export default cartService;
