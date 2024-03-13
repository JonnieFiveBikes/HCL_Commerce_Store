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

import { CartPaymentInstructionPaymentInstructionAttributes } from './cart-payment-instruction-payment-instruction-attributes';
import { CartPaymentInstructionPaymentInstructionProtocolData } from './cart-payment-instruction-payment-instruction-protocol-data';
import { CartPaymentInstructionPaymentInstructionUserDataField } from './cart-payment-instruction-payment-instruction-user-data-field';
import { ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType } from './com-ibm-commerce-foundation-common-datatypes-monetary-amount-type';
import { ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType } from './com-ibm-commerce-foundation-common-datatypes-organization-identifier-type';
import { ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType } from './com-ibm-commerce-foundation-common-datatypes-person-identifier-type';

/**
 * 
 * @export
 * @interface CartPaymentInstructionPaymentInstruction
 */
export interface CartPaymentInstructionPaymentInstruction {
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    addressType?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    addressLine?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    piId?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    refundAllowed?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    personTitle?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    minAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    primary?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    payMethodId?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    paymentRule?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    piDescription?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    email2: string;
    /**
     * 
     * @type {number}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    piAmount?: number;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    maxAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    piCurrency?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    sequenceNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    piStatus?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    middleName?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    geographicalTaxCode?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    priority?: string;
    /**
     * 
     * @type {Array<CartPaymentInstructionPaymentInstructionProtocolData>}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    protocolData?: Array<CartPaymentInstructionPaymentInstructionProtocolData>;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    state?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    fax2: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    fax1: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    postalCode?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    email1: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    internalOfficeAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    billing_address_id?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    paymentTermConditionId?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    phone2Type?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    nickName: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    phone2: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    businessTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    phone1: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    zipCode?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    bestCallingTime?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    mobilePhone1Country: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    piLanguage?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    phone2Publish?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    mobilePhone1: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    phone1Type?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    organizationUnitName?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    organizationName?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    geographicalShippingCode?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    stateOrProvinceName?: string;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    phone1Publish?: string;
    /**
     * 
     * @type {Array<CartPaymentInstructionPaymentInstructionAttributes>}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    attributes?: Array<CartPaymentInstructionPaymentInstructionAttributes>;
    /**
     * 
     * @type {string}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    country?: string;
    /**
     * 
     * @type {Array<CartPaymentInstructionPaymentInstructionUserDataField>}
     * @memberof CartPaymentInstructionPaymentInstruction
     */
    userDataField?: Array<CartPaymentInstructionPaymentInstructionUserDataField>;
}

