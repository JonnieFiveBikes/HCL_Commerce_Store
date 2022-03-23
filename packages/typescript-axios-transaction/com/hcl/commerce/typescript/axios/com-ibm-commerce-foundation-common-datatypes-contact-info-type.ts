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

import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddress } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-address';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAttributes } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-attributes';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifier } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-contact-info-identifier';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactName } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-contact-name';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1 } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-email-address1';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2 } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-email-address2';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1 } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-fax1';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2 } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-fax2';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1 } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-mobile-phone1';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1 } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-telephone1';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2 } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-telephone2';
import { ComIbmCommerceFoundationCommonDatatypesContactInfoTypeUserData } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type-user-data';

/**
 * 
 * @export
 * @interface ComIbmCommerceFoundationCommonDatatypesContactInfoType
 */
export interface ComIbmCommerceFoundationCommonDatatypesContactInfoType {
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeUserData}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeUserData;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    organizationName?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    fax1?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    geographicalTaxCode?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    mobilePhone1?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    geographicalShippingCode?: string;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    bestCallingTime?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifier}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    contactInfoIdentifier?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifier;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    fax2?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactName}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    contactName?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactName;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    emailAddress2?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddress}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    address?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddress;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    emailAddress1?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1;
    /**
     * 
     * @type {Array<ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAttributes>}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    attributes?: Array<ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAttributes>;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    telephone1?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    organizationUnitName?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2}
     * @memberof ComIbmCommerceFoundationCommonDatatypesContactInfoType
     */
    telephone2?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2;
}


