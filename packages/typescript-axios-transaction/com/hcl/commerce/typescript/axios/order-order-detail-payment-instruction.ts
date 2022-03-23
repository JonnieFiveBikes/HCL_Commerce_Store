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
import { ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType } from './com-ibm-commerce-foundation-common-datatypes-organization-identifier-type';
import { ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType } from './com-ibm-commerce-foundation-common-datatypes-person-identifier-type';
import { OrderOrderDetailPaymentInstructionAttributes } from './order-order-detail-payment-instruction-attributes';
import { OrderOrderDetailPaymentInstructionProtocolData } from './order-order-detail-payment-instruction-protocol-data';
import { OrderOrderDetailPaymentInstructionUserDataField } from './order-order-detail-payment-instruction-user-data-field';

/**
 * 
 * @export
 * @interface OrderOrderDetailPaymentInstruction
 */
export interface OrderOrderDetailPaymentInstruction {
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    addressType?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    addressLine?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    piId?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    refundAllowed?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    personTitle?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    minAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    primary?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    payMethodId?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    paymentRule?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    piDescription?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    email2: string;
    /**
     * 
     * @type {number}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    piAmount?: number;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    maxAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    piCurrency?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    sequenceNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    piStatus?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    middleName?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    geographicalTaxCode?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    priority?: string;
    /**
     * 
     * @type {Array<OrderOrderDetailPaymentInstructionProtocolData>}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    protocolData?: Array<OrderOrderDetailPaymentInstructionProtocolData>;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    state?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    fax2: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    fax1: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    postalCode?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    email1: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    internalOfficeAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    billing_address_id?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    paymentTermConditionId?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    phone2Type?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    nickName: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    phone2: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    businessTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    phone1: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    zipCode?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    bestCallingTime?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    mobilePhone1Country: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    piLanguage?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    phone2Publish?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    mobilePhone1: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    phone1Type?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    organizationUnitName?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    organizationName?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    geographicalShippingCode?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    stateOrProvinceName?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    phone1Publish?: string;
    /**
     * 
     * @type {Array<OrderOrderDetailPaymentInstructionAttributes>}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    attributes?: Array<OrderOrderDetailPaymentInstructionAttributes>;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    country?: string;
    /**
     * 
     * @type {Array<OrderOrderDetailPaymentInstructionUserDataField>}
     * @memberof OrderOrderDetailPaymentInstruction
     */
    userDataField?: Array<OrderOrderDetailPaymentInstructionUserDataField>;
}


