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

import { PageDesignIBMStoreDetailsItemUserDataField } from './page-design-ibmstore-details-item-user-data-field';
import { PageDesignWidget } from './page-design-widget';

/**
 * 
 * @export
 * @interface PageDesignIBMStoreDetailsItem
 */
export interface PageDesignIBMStoreDetailsItem {
    /**
     * 
     * @type {string}
     * @memberof PageDesignIBMStoreDetailsItem
     */
    layoutId?: string;
    /**
     * 
     * @type {PageDesignWidget}
     * @memberof PageDesignIBMStoreDetailsItem
     */
    widget?: PageDesignWidget;
    /**
     * 
     * @type {string}
     * @memberof PageDesignIBMStoreDetailsItem
     */
    pageGroup?: string;
    /**
     * 
     * @type {string}
     * @memberof PageDesignIBMStoreDetailsItem
     */
    objectIdentifier?: string;
    /**
     * 
     * @type {string}
     * @memberof PageDesignIBMStoreDetailsItem
     */
    deviceClass?: string;
    /**
     * 
     * @type {Array<PageDesignIBMStoreDetailsItemUserDataField>}
     * @memberof PageDesignIBMStoreDetailsItem
     */
    userDataField?: Array<PageDesignIBMStoreDetailsItemUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof PageDesignIBMStoreDetailsItem
     */
    layoutName?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof PageDesignIBMStoreDetailsItem
     */
    previewReport?: Array<string>;
}


