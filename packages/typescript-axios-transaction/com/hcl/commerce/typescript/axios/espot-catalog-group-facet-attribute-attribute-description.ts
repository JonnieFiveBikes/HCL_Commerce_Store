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

import { EspotCatalogGroupFacetAttributeAttributeDescriptionExtendedData } from './espot-catalog-group-facet-attribute-attribute-description-extended-data';
import { EspotCatalogGroupFacetAttributeAttributeDescriptionUserData } from './espot-catalog-group-facet-attribute-attribute-description-user-data';

/**
 * 
 * @export
 * @interface EspotCatalogGroupFacetAttributeAttributeDescription
 */
export interface EspotCatalogGroupFacetAttributeAttributeDescription {
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupFacetAttributeAttributeDescription
     */
    name?: string;
    /**
     * 
     * @type {EspotCatalogGroupFacetAttributeAttributeDescriptionUserData}
     * @memberof EspotCatalogGroupFacetAttributeAttributeDescription
     */
    userData?: EspotCatalogGroupFacetAttributeAttributeDescriptionUserData;
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupFacetAttributeAttributeDescription
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof EspotCatalogGroupFacetAttributeAttributeDescription
     */
    language?: string;
    /**
     * 
     * @type {Array<EspotCatalogGroupFacetAttributeAttributeDescriptionExtendedData>}
     * @memberof EspotCatalogGroupFacetAttributeAttributeDescription
     */
    extendedData?: Array<EspotCatalogGroupFacetAttributeAttributeDescriptionExtendedData>;
}

