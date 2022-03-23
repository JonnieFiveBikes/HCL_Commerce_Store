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

import { CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideAttributes } from './category-ibmadmin-details-breadcrumb-item-description-override-attributes';
import { CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideDescriptionOverrideIdentifier } from './category-ibmadmin-details-breadcrumb-item-description-override-description-override-identifier';

/**
 * 
 * @export
 * @interface CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
 */
export interface CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride {
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
     */
    keyword?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
     */
    fullImage?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
     */
    longDescription?: string;
    /**
     * 
     * @type {CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideDescriptionOverrideIdentifier}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
     */
    descriptionOverrideIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideDescriptionOverrideIdentifier;
    /**
     * 
     * @type {Array<CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideAttributes>}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
     */
    attributes?: Array<CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideAttributes>;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
     */
    shortDescription?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride
     */
    thumbnail?: string;
}


