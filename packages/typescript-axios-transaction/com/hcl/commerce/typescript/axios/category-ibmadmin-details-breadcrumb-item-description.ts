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

import { CategoryIBMAdminDetailsBreadcrumbItemDescriptionAttributes } from './category-ibmadmin-details-breadcrumb-item-description-attributes';
import { CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride } from './category-ibmadmin-details-breadcrumb-item-description-override';

/**
 * 
 * @export
 * @interface CategoryIBMAdminDetailsBreadcrumbItemDescription
 */
export interface CategoryIBMAdminDetailsBreadcrumbItemDescription {
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    keyword?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    fullImage?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    longDescription?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    breadcrumb?: Array<string>;
    /**
     * 
     * @type {Array<CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride>}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    override?: Array<CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride>;
    /**
     * 
     * @type {Array<CategoryIBMAdminDetailsBreadcrumbItemDescriptionAttributes>}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    attributes?: Array<CategoryIBMAdminDetailsBreadcrumbItemDescriptionAttributes>;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    shortDescription?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    thumbnail?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryIBMAdminDetailsBreadcrumbItemDescription
     */
    name?: string;
}


