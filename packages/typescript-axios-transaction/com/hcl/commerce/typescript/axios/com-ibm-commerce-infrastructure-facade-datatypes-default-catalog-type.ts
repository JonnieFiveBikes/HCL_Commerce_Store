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

import { ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifier } from './com-ibm-commerce-infrastructure-facade-datatypes-default-catalog-type-catalog-identifier';
import { ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeStoreIdentifier } from './com-ibm-commerce-infrastructure-facade-datatypes-default-catalog-type-store-identifier';
import { ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeUserData } from './com-ibm-commerce-infrastructure-facade-datatypes-default-catalog-type-user-data';

/**
 * 
 * @export
 * @interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogType
 */
export interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogType {
    /**
     * 
     * @type {ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeStoreIdentifier}
     * @memberof ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogType
     */
    storeIdentifier?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeStoreIdentifier;
    /**
     * 
     * @type {ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifier}
     * @memberof ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogType
     */
    catalogIdentifier?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifier;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogType
     */
    uniqueID?: string;
    /**
     * 
     * @type {ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeUserData}
     * @memberof ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogType
     */
    userData?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeUserData;
}


