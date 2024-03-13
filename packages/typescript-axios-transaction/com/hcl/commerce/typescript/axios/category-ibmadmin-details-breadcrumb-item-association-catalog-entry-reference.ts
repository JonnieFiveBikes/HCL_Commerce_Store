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

import { CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifier } from './category-ibmadmin-details-breadcrumb-item-association-catalog-entry-reference-catalog-entry-identifier';

/**
 * 
 * @export
 * @interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReference
 */
export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReference {
    /**
     * 
     * @type {CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifier}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReference
     */
    catalogEntryIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifier;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReference
     */
    displayName?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReference
     */
    catalogEntryTypeCode?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReference
     */
    navigationPath?: string;
}

