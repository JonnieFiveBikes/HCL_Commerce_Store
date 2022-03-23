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

import { ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType } from './com-ibm-commerce-foundation-common-datatypes-monetary-amount-type';
import { ComIbmCommerceFoundationCommonDatatypesQuantityType } from './com-ibm-commerce-foundation-common-datatypes-quantity-type';

/**
 * 
 * @export
 * @interface EspotStandardUnitPrice
 */
export interface EspotStandardUnitPrice {
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesQuantityType}
     * @memberof EspotStandardUnitPrice
     */
    standardPriceQuantity?: ComIbmCommerceFoundationCommonDatatypesQuantityType;
    /**
     * 
     * @type {number}
     * @memberof EspotStandardUnitPrice
     */
    standardPrice?: number;
    /**
     * 
     * @type {Array<ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType>}
     * @memberof EspotStandardUnitPrice
     */
    standardPriceAltCurrencyPrice?: Array<ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType>;
    /**
     * 
     * @type {string}
     * @memberof EspotStandardUnitPrice
     */
    standardPriceCurrency?: string;
}


