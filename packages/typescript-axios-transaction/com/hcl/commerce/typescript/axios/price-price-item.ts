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

import { PricePriceItemRangePrice } from './price-price-item-range-price';
import { PricePriceItemUnitPrice } from './price-price-item-unit-price';
import { PricePriceItemUserDataField } from './price-price-item-user-data-field';

/**
 * 
 * @export
 * @interface PricePriceItem
 */
export interface PricePriceItem {
    /**
     * 
     * @type {Array<PricePriceItemRangePrice>}
     * @memberof PricePriceItem
     */
    RangePrice?: Array<PricePriceItemRangePrice>;
    /**
     * 
     * @type {string}
     * @memberof PricePriceItem
     */
    partNumber: string;
    /**
     * 
     * @type {string}
     * @memberof PricePriceItem
     */
    contractId?: string;
    /**
     * 
     * @type {Array<PricePriceItemUnitPrice>}
     * @memberof PricePriceItem
     */
    UnitPrice?: Array<PricePriceItemUnitPrice>;
    /**
     * 
     * @type {Array<PricePriceItemUserDataField>}
     * @memberof PricePriceItem
     */
    userDataField?: Array<PricePriceItemUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof PricePriceItem
     */
    productId?: string;
}


