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

import { EspotCatalogGroupAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier } from './espot-catalog-group-attachment-reference-attachment-asset-attachment-asset-identifier';
import { EspotCatalogGroupAttachmentReferenceAttachmentAssetStoreIdentifier } from './espot-catalog-group-attachment-reference-attachment-asset-store-identifier';
import { EspotCatalogGroupAttachmentReferenceAttachmentAssetUserData } from './espot-catalog-group-attachment-reference-attachment-asset-user-data';

/**
 * 
 * @export
 * @interface EspotCatalogGroupAttachmentReferenceAttachmentAsset
 */
export interface EspotCatalogGroupAttachmentReferenceAttachmentAsset {
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    mimeType?: string;
    /**
     * 
     * @type {EspotCatalogGroupAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    attachmentAssetIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier;
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    rootDirectory?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    language?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    directoryPath?: string;
    /**
     * 
     * @type {EspotCatalogGroupAttachmentReferenceAttachmentAssetStoreIdentifier}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    storeIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentAssetStoreIdentifier;
    /**
     * 
     * @type {boolean}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    localAsset?: boolean;
    /**
     * 
     * @type {EspotCatalogGroupAttachmentReferenceAttachmentAssetUserData}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    userData?: EspotCatalogGroupAttachmentReferenceAttachmentAssetUserData;
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupAttachmentReferenceAttachmentAsset
     */
    attachmentAssetPath: string;
}


