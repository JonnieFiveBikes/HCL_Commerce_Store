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

import { ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifierStoreIdentifier } from './com-ibm-commerce-foundation-common-datatypes-promotion-identifier-type-external-identifier-store-identifier';

/**
 * 
 * @export
 * @interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifier
 */
export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifier {
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifierStoreIdentifier}
     * @memberof ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifier
     */
    storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifierStoreIdentifier;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifier
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifier
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifier
     */
    revision?: number;
}


