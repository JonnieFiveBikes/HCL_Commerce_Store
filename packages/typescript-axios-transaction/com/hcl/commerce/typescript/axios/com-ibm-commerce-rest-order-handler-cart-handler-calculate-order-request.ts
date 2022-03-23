/* tslint:disable */
/* eslint-disable */
/**
 * HCL Commerce Transaction server Services 
 * These services provide APIs to interact with transaction
 *
 * The version of the OpenAPI document: 9.1.6
 * 
 * (C) Copyright HCL Technologies Limited 2021
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Body of request input for calculateOrder.
 * @export
 * @interface ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest {
    /**
     * Order identifier.
     * @type {string}
     * @memberof ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest
     */
    orderId?: string;
    /**
     * Gives predefined codes for calculation of discounts (-1), shipping (-2), sales tax (-3), shipping tax (-4), coupons (-5), surcharge (-6) and shipping adjustment (-7).
     * @type {string}
     * @memberof ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest
     */
    calculationUsageId: string;
    /**
     * Specifies whether the command should perform the price calculation subtasks. Set to enable the price tasks (Y), or to disable price tasks (N).
     * @type {string}
     * @memberof ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest
     */
    doPrice?: string;
    /**
     * Flag to indicate whether the price of order item is refreshed in this command. if the flag is \"1\", price is updated. others will not.
     * @type {string}
     * @memberof ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest
     */
    updatePrices?: string;
    /**
     * Specifies the names of name-value pairs to pass to a JSP file. The value of each added name-value pair is the reference number of the order to display. If the name is not provided, the default name <code>orderId</code> is used. This parameter can be repeated.
     * @type {string}
     * @memberof ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest
     */
    outOrderName?: string;
    /**
     * Specifies whether the command should perform the free gift handling logic. Set to enable free gift handling, or not to handle free gifts when not required for order recalculation (N). The default value is (Y).
     * @type {string}
     * @memberof ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest
     */
    doFreeGift?: string;
}


