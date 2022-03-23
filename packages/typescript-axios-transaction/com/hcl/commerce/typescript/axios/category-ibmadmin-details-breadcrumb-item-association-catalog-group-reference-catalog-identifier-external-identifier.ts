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

import { CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier } from './category-ibmadmin-details-breadcrumb-item-association-catalog-group-reference-catalog-identifier-external-identifier-store-identifier';

/**
 * 
 * @export
 * @interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier
 */
export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier {
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier
     */
    ownerID?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier
     */
    identifier: string;
    /**
     * 
     * @type {CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier
     */
    storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier;
}


