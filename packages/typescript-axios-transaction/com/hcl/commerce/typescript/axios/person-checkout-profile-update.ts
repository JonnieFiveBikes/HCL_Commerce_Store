/* tslint:disable */
/* eslint-disable */
/**
 * HCL Commerce Services - Account and Contract
 * These services provide APIs to manage accounts and contracts.  a contract is an agreement that represents the terms and conditions that apply to a transaction. An account is a relationship between the merchant and the financial institution that processes transactions for that merchant.
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
 * 
 * @export
 * @interface PersonCheckoutProfileUpdate
 */
export interface PersonCheckoutProfileUpdate {
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    resourceId?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    profileName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_email1?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_addressLine?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_addressId?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_state?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_modeId?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_city?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_addressType?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_zipCode?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_addressType?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_addressLine?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_state?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_nickName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_primary?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_addressId?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_country?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_primary?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_email1?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_city?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_zipCode?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_nickName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_country?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    shipping_phone1?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    billing_phone1?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    pay_cc_brand?: string;
    /**
     * 
     * @type {number}
     * @memberof PersonCheckoutProfileUpdate
     */
    pay_expire_month?: number;
    /**
     * 
     * @type {number}
     * @memberof PersonCheckoutProfileUpdate
     */
    pay_expire_year?: number;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    pay_payMethodId?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    pay_payment_method?: string;
    /**
     * 
     * @type {number}
     * @memberof PersonCheckoutProfileUpdate
     */
    pay_account?: number;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    resourceName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonCheckoutProfileUpdate
     */
    userId?: string;
}

