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

import { ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceAlternativeCurrencyPrice } from './com-ibm-commerce-foundation-common-datatypes-offer-price-type-price-alternative-currency-price';
import { ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePricePrice } from './com-ibm-commerce-foundation-common-datatypes-offer-price-type-price-price';
import { ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceQuantity } from './com-ibm-commerce-foundation-common-datatypes-offer-price-type-price-quantity';

/**
 * 
 * @export
 * @interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePrice
 */
export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePrice {
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePricePrice}
     * @memberof ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePrice
     */
    price?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePricePrice;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceQuantity}
     * @memberof ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePrice
     */
    quantity?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceQuantity;
    /**
     * 
     * @type {Array<ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceAlternativeCurrencyPrice>}
     * @memberof ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePrice
     */
    alternativeCurrencyPrice?: Array<ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceAlternativeCurrencyPrice>;
}

