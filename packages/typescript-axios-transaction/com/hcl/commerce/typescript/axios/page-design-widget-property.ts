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

import { PageDesignWidgetPropertyUserDataField } from './page-design-widget-property-user-data-field';

/**
 * 
 * @export
 * @interface PageDesignWidgetProperty
 */
export interface PageDesignWidgetProperty {
    /**
     * 
     * @type {number}
     * @memberof PageDesignWidgetProperty
     */
    sequenceOrder?: number;
    /**
     * 
     * @type {Array<PageDesignWidgetPropertyUserDataField>}
     * @memberof PageDesignWidgetProperty
     */
    userDataField?: Array<PageDesignWidgetPropertyUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof PageDesignWidgetProperty
     */
    storeId?: string;
    /**
     * 
     * @type {string}
     * @memberof PageDesignWidgetProperty
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof PageDesignWidgetProperty
     */
    value?: string;
}


