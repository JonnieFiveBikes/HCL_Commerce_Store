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
import { SubscriptionApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const subscriptionApiInstance = new SubscriptionApi(undefined, site.transactionContext);
const subscriptionService = {
  /**
  * Finds subcription infomation by its subscriptionId
  * `@method`
  * `@name subscription#bySubscriptionId`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} subscriptionId (required)` The child property of `Parameters`.The subcription id

   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
  */
  bySubscriptionId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, subscriptionId, profileName, responseFormat, ...options } = parameters;
    return subscriptionApiInstance.subscriptionBySubscriptionId(
      storeId,
      subscriptionId,
      profileName,
      responseFormat,
      options
    );
  },

  /**
  * Finds subscriptions by user and subscription type
  * `@method`
  * `@name subscription#byBuyerIdAndSubscriptionType`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.


   ** `@property {string} subscriptionTypeCode (required)` The subscription type code ie(All,RecurringOrder)
   ** `@property {string} buyerId (required)` The buyer Id
  */
  byBuyerIdAndSubscriptionType(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, subscriptionTypeCode, buyerId, profileName, ...options } = parameters;
    return subscriptionApiInstance.subscriptionByBuyerIdAndSubscriptionType(
      storeId,
      "byBuyerIdAndSubscriptionType",
      subscriptionTypeCode,
      buyerId,
      profileName,
      options
    );
  },

  /**
   * Submits a recurring or subscription.
   * `@method`
   * `@name subscription#submitRecurringOrSubscription`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} orderId (required)` The child property of `Parameters`.The order id
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` Request body.
   */
  submitRecurringOrSubscription(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, orderId, responseFormat, body, ...options } = parameters;
    return subscriptionApiInstance.subscriptionSubmitRecurringOrSubscription(
      storeId,
      orderId,
      responseFormat,
      body,
      options
    );
  },

  /**
   * Cancel the specified recurring or subscription.
   * `@method`
   * `@name subscription#cancelRecurringOrSubscription`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} orderId (required)` The child property of `Parameters`.The order id
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} subscriptionId ` The subcription id
   */
  cancelRecurringOrSubscription(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, orderId, responseFormat, subscriptionId, ...options } = parameters;
    return subscriptionApiInstance.subscriptionCancelRecurringOrSubscription(
      storeId,
      orderId,
      responseFormat,
      subscriptionId,
      options
    );
  },
};

export default subscriptionService;
