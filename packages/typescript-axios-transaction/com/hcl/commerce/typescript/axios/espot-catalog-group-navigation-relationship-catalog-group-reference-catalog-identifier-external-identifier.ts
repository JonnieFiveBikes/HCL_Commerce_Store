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

import { EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier } from './espot-catalog-group-navigation-relationship-catalog-group-reference-catalog-identifier-external-identifier-store-identifier';

/**
 * 
 * @export
 * @interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier
 */
export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier {
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier
     */
    ownerID?: string;
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier
     */
    identifier: string;
    /**
     * 
     * @type {EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier}
     * @memberof EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier
     */
    storeIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier;
}


