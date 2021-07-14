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
import { OrderApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const orderApiInstance = new OrderApi(undefined, site.transactionContext);
const orderService = {
  /**
   * Gets the order details for a specific order ID.
   * `@method`
   * `@name Order#findByOrderId`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} orderId (required)` The child property of `Parameters`.The order identifier.
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.
   */
  findByOrderId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      orderId,
      responseFormat,
      pageNumber,
      pageSize,
      currency,
      profileName,
      ...options
    } = parameters;
    return orderApiInstance.orderFindByOrderId(
      orderId,
      storeId,
      responseFormat,
      pageNumber,
      pageSize,
      currency,
      profileName,
      options
    );
  },

  /**
   * Gets a list of orders by order status.
   * `@method`
   * `@name Order#findByStatus`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} status (required)` The child property of `Parameters`.The order status.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
   */
  findByStatus(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      status,
      responseFormat,
      pageNumber,
      pageSize,
      currency,
      ...options
    } = parameters;
    return orderApiInstance.orderFindByStatus(
      storeId,
      status,
      responseFormat,
      pageNumber,
      pageSize,
      currency,
      options
    );
  },

  /**
  * This allows a CSR to find orders that he/she can work on behalf.
  * `@method`
  * `@name Order#ordersICanWorkonbehalf`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.


   ** `@property {string} orderByTableName ` The order by table name.
   ** `@property {string} orderByFieldName ` The order by field name.
   ** `@property {string} startIndex ` The starting index of the result.
   ** `@property {string} retrievePendingGuestOrders ` The flag of retrieving pending guest orders or not. Default value is false.
   ** `@property {string} maxResults ` The maximum number of results to be returned.
  */
  ordersICanWorkonbehalf(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      profileName,
      extOrderId,
      orderItemId,
      orderId,
      orderByTableName,
      orderByFieldName,
      startIndex,
      retrievePendingGuestOrders,
      status,
      maxResults,
      pageNumber,
      pageSize,
      recordSetTotal,
      ...options
    } = parameters;
    return orderApiInstance.orderOrdersICanWorkonbehalf(
      storeId,
      "ordersICanWorkonbehalf",
      profileName,
      extOrderId,
      orderItemId,
      orderId,
      orderByTableName,
      orderByFieldName,
      startIndex,
      retrievePendingGuestOrders,
      status,
      maxResults,
      pageNumber,
      pageSize,
      recordSetTotal,
      options
    );
  },

  /**
   * Add CSR comments to the order.
   * `@method`
   * `@name Order#addCSROrderComments`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} orderId (required)` The child property of `Parameters`.The order identifier.
   ** `@property {string} mode ` CSR add comment mode.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` CSR comment body.
   */
  addCSROrderComments(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      orderId,
      mode,
      responseFormat,
      body,
      ...options
    } = parameters;
    return orderApiInstance.orderAddCSROrderComments(
      storeId,
      orderId,
      mode,
      responseFormat,
      body,
      options
    );
  },

  /**
   * Find the order comments for the specific order
   * `@method`
   * `@name Order#getOrderCommentsByOrderId`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} orderId (required)` The child property of `Parameters`.The order identifier.
   ** `@property {boolean} isAsc ` Returned order comment sorted ascending or not
   ** `@property {string} orderByField ` The order by filed name.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   */
  getOrderCommentsByOrderId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      orderId,
      isAsc,
      orderByField,
      responseFormat,
      pageNumber,
      pageSize,
      ...options
    } = parameters;
    return orderApiInstance.orderGetOrderCommentsByOrderId(
      storeId,
      orderId,
      isAsc,
      orderByField,
      responseFormat,
      pageNumber,
      pageSize,
      options
    );
  },

  /**
  * Find order by the parent order ID.
  * `@method`
  * `@name Order#findByParentOrderId`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.

   ** `@property {string} orderId (required)` The order identifier.
   ** `@property {string} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {string} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
  */
  findByParentOrderId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      profileName,
      extOrderId,
      orderItemId,
      orderId,
      orderByTableName,
      orderByFieldName,
      startIndex,
      retrievePendingGuestOrders,
      status,
      maxResults,
      pageNumber,
      pageSize,
      recordSetTotal,
      ...options
    } = parameters;
    return orderApiInstance.orderOrdersICanWorkonbehalf(
      storeId,
      "findByParentOrderId",
      profileName,
      extOrderId,
      orderItemId,
      orderId,
      orderByTableName,
      orderByFieldName,
      startIndex,
      retrievePendingGuestOrders,
      status,
      maxResults,
      pageNumber,
      pageSize,
      recordSetTotal,
      options
    );
  },
};

export default orderService;
