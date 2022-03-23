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

import { CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifier } from './category-ibmadmin-details-breadcrumb-item-navigation-relationship-catalog-group-reference-catalog-group-identifier';
import { CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifier } from './category-ibmadmin-details-breadcrumb-item-navigation-relationship-catalog-group-reference-catalog-identifier';

/**
 * 
 * @export
 * @interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReference
 */
export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReference {
    /**
     * 
     * @type {CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifier}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReference
     */
    catalogGroupIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifier;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReference
     */
    displayName: string;
    /**
     * 
     * @type {CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifier}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReference
     */
    catalogIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifier;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReference
     */
    navigationPath?: string;
}


