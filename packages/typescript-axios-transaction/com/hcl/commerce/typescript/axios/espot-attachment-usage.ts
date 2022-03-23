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

import { ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionType } from './com-ibm-commerce-foundation-common-datatypes-attachment-description-type';

/**
 * 
 * @export
 * @interface EspotAttachmentUsage
 */
export interface EspotAttachmentUsage {
    /**
     * 
     * @type {string}
     * @memberof EspotAttachmentUsage
     */
    attachmentDisplaySequence?: string;
    /**
     * 
     * @type {string}
     * @memberof EspotAttachmentUsage
     */
    attachmentUsageName: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionType}
     * @memberof EspotAttachmentUsage
     */
    attachmentUsageDescription?: ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionType;
    /**
     * 
     * @type {string}
     * @memberof EspotAttachmentUsage
     */
    attachmentImage?: string;
}


