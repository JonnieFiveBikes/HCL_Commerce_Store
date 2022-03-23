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

import { CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescription } from './catalog-ibmadmin-details-item-attachment-reference-attachment-usage-attachment-usage-description';

/**
 * 
 * @export
 * @interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsage
 */
export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsage {
    /**
     * 
     * @type {string}
     * @memberof CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsage
     */
    displaySequence?: string;
    /**
     * 
     * @type {CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescription}
     * @memberof CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsage
     */
    attachmentUsageDescription?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescription;
    /**
     * 
     * @type {string}
     * @memberof CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsage
     */
    image?: string;
    /**
     * 
     * @type {string}
     * @memberof CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsage
     */
    usageName: string;
}


