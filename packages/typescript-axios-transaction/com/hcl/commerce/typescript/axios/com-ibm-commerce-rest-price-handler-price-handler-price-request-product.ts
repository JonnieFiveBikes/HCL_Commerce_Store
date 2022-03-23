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

import { ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestQuantity } from './com-ibm-commerce-rest-price-handler-price-handler-price-request-quantity';

/**
 * Product information.
 * @export
 * @interface ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct
 */
export interface ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct {
    /**
     * The dates on which to query the product prices.
     * @type {Array<string>}
     * @memberof ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct
     */
    dates?: Array<string>;
    /**
     * The currencies to use on specific products. If not currency is specified, the store default shall be used.
     * @type {Array<string>}
     * @memberof ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct
     */
    currencies?: Array<string>;
    /**
     * The contract identifiers to use on specific products. An exception will be thrown if an invalid contract identifier is specified. If left empty, the store default contract will be used.
     * @type {Array<string>}
     * @memberof ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct
     */
    contractIds?: Array<string>;
    /**
     * The quantities for which to query the price. If no quantities are specified, a default quantity of 1.0 and unit of measure of \'C62\' will be used.
     * @type {Array<ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestQuantity>}
     * @memberof ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct
     */
    quantities?: Array<ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestQuantity>;
    /**
     * The product part number to query. Required if the query is set to : byPartNumber.
     * @type {string}
     * @memberof ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct
     */
    partNumber?: string;
    /**
     * The product identifier to query. Required if the query is set to : byProductID.
     * @type {string}
     * @memberof ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct
     */
    productId?: string;
}


