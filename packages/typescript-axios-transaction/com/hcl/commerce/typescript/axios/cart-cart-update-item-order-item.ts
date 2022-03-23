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

import { CartCartUpdateItemOrderItemItemAttributes } from './cart-cart-update-item-order-item-item-attributes';
import { CartCartUpdateItemOrderItemOrderItemExtendAttribute } from './cart-cart-update-item-order-item-order-item-extend-attribute';
import { CartCartUpdateItemOrderItemUserDataField } from './cart-cart-update-item-order-item-user-data-field';

/**
 * 
 * @export
 * @interface CartCartUpdateItemOrderItem
 */
export interface CartCartUpdateItemOrderItem {
    /**
     * 
     * @type {string}
     * @memberof CartCartUpdateItemOrderItem
     */
    comment?: string;
    /**
     * 
     * @type {string}
     * @memberof CartCartUpdateItemOrderItem
     */
    fulfillmentCenterName?: string;
    /**
     * 
     * @type {string}
     * @memberof CartCartUpdateItemOrderItem
     */
    orderItemId?: string;
    /**
     * 
     * @type {number}
     * @memberof CartCartUpdateItemOrderItem
     */
    quantity?: number;
    /**
     * 
     * @type {string}
     * @memberof CartCartUpdateItemOrderItem
     */
    fulfillmentCenterId?: string;
    /**
     * 
     * @type {Array<CartCartUpdateItemOrderItemOrderItemExtendAttribute>}
     * @memberof CartCartUpdateItemOrderItem
     */
    orderItemExtendAttribute?: Array<CartCartUpdateItemOrderItemOrderItemExtendAttribute>;
    /**
     * 
     * @type {Array<CartCartUpdateItemOrderItemItemAttributes>}
     * @memberof CartCartUpdateItemOrderItem
     */
    itemAttributes?: Array<CartCartUpdateItemOrderItemItemAttributes>;
    /**
     * 
     * @type {string}
     * @memberof CartCartUpdateItemOrderItem
     */
    partNumber: string;
    /**
     * 
     * @type {string}
     * @memberof CartCartUpdateItemOrderItem
     */
    productId?: string;
    /**
     * 
     * @type {Array<CartCartUpdateItemOrderItemUserDataField>}
     * @memberof CartCartUpdateItemOrderItem
     */
    userDataField?: Array<CartCartUpdateItemOrderItemUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof CartCartUpdateItemOrderItem
     */
    UOM?: string;
    /**
     * 
     * @type {string}
     * @memberof CartCartUpdateItemOrderItem
     */
    contractId?: string;
}

