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

import { ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultList } from './com-ibm-commerce-tools-optools-order-beans-csrorder-search-data-bean-ibmsummary-result-list';

/**
 * 
 * @export
 * @interface ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary
 */
export interface ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary {
    /**
     * 
     * @type {boolean}
     * @memberof ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary
     */
    recordSetCompleteIndicator?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary
     */
    pageSize?: string;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary
     */
    recordSetCount?: number;
    /**
     * 
     * @type {Array<ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultList>}
     * @memberof ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary
     */
    resultList?: Array<ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultList>;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary
     */
    recordSetTotal?: number;
}


