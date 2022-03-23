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

import { EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier } from './espot-catalog-group-navigation-relationship-catalog-entry-reference-catalog-entry-identifier-external-identifier-store-identifier';

/**
 * 
 * @export
 * @interface EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier
 */
export interface EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier {
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier
     */
    ownerID?: string;
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier
     */
    partNumber: string;
    /**
     * 
     * @type {EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier}
     * @memberof EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier
     */
    storeIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}


