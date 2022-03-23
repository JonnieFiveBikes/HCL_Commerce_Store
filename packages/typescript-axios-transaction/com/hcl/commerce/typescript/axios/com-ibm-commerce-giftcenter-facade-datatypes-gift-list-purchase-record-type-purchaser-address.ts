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

import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddress } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-address';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAttributes } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-attributes';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifier } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-contact-info-identifier';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactName } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-contact-name';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1 } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-email-address1';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2 } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-email-address2';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1 } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-fax1';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2 } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-fax2';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1 } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-mobile-phone1';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1 } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-telephone1';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2 } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-telephone2';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressUserData } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type-purchaser-address-user-data';

/**
 * 
 * @export
 * @interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
 */
export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress {
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressUserData}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressUserData;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    organizationName?: string;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    fax1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    geographicalTaxCode?: string;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    mobilePhone1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    geographicalShippingCode?: string;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    bestCallingTime?: string;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifier}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    contactInfoIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifier;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    fax2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactName}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    contactName?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactName;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    emailAddress2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddress}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    address?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddress;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    emailAddress1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1;
    /**
     * 
     * @type {Array<ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAttributes>}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    attributes?: Array<ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAttributes>;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    telephone1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    organizationUnitName?: string;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2}
     * @memberof ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress
     */
    telephone2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2;
}


