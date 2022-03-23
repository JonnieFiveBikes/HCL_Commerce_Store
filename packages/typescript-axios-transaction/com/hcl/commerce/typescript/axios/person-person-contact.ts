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

import { ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType } from './com-ibm-commerce-foundation-common-datatypes-organization-identifier-type';
import { ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType } from './com-ibm-commerce-foundation-common-datatypes-person-identifier-type';
import { JavaUtilMapEntry } from './java-util-map-entry';
import { PersonPersonContactUserDataField } from './person-person-contact-user-data-field';

/**
 * 
 * @export
 * @interface PersonPersonContact
 */
export interface PersonPersonContact {
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    addressId?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof PersonPersonContact
     */
    addressLine?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    addressType?: string;
    /**
     * 
     * @type {Array<JavaUtilMapEntry>}
     * @memberof PersonPersonContact
     */
    attributes?: Array<JavaUtilMapEntry>;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    bestCallingTime?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    businessTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    country?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    email1: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    email2: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    fax1: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    fax2: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    geographicalShippingCode?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    geographicalTaxCode?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    internalOfficeAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    middleName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    mobilePhone1: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    mobilePhone1Country: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    nickName: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType}
     * @memberof PersonPersonContact
     */
    organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    organizationName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    organizationUnitName?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType}
     * @memberof PersonPersonContact
     */
    personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    personTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    phone1: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    phone1Publish?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    phone1Type?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    phone2: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    phone2Publish?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    phone2Type?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    primary?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    state?: string;
    /**
     * 
     * @type {Array<PersonPersonContactUserDataField>}
     * @memberof PersonPersonContact
     */
    userDataField?: Array<PersonPersonContactUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof PersonPersonContact
     */
    zipCode?: string;
}


