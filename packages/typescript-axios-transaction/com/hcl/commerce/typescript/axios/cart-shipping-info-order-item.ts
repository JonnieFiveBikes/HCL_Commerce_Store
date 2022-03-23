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

import { CartOrderItemShippingInfo } from './cart-order-item-shipping-info';
import { CartShippingInfoOrderItemUserDataField } from './cart-shipping-info-order-item-user-data-field';

/**
 * 
 * @export
 * @interface CartShippingInfoOrderItem
 */
export interface CartShippingInfoOrderItem {
    /**
     * 
     * @type {Array<CartShippingInfoOrderItemUserDataField>}
     * @memberof CartShippingInfoOrderItem
     */
    userDataField?: Array<CartShippingInfoOrderItemUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof CartShippingInfoOrderItem
     */
    orderItemId?: string;
    /**
     * 
     * @type {CartOrderItemShippingInfo}
     * @memberof CartShippingInfoOrderItem
     */
    orderItemShippingInfo?: CartOrderItemShippingInfo;
}

