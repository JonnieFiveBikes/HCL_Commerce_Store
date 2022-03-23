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

import { ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescription } from './com-ibm-commerce-order-facade-datatypes-coupon-code-type-description';
import { ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifier } from './com-ibm-commerce-order-facade-datatypes-coupon-code-type-promotion-identifier';
import { ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeUserData } from './com-ibm-commerce-order-facade-datatypes-coupon-code-type-user-data';

/**
 * 
 * @export
 * @interface ComIbmCommerceOrderFacadeDatatypesCouponCodeType
 */
export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeType {
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCouponCodeType
     */
    status?: string;
    /**
     * 
     * @type {ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeUserData}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCouponCodeType
     */
    userData?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeUserData;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCouponCodeType
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCouponCodeType
     */
    couponId?: string;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCouponCodeType
     */
    expirationDateTime?: string;
    /**
     * 
     * @type {Array<ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescription>}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCouponCodeType
     */
    description?: Array<ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescription>;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCouponCodeType
     */
    effectiveDateTime?: string;
    /**
     * 
     * @type {ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifier}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCouponCodeType
     */
    promotionIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifier;
}

