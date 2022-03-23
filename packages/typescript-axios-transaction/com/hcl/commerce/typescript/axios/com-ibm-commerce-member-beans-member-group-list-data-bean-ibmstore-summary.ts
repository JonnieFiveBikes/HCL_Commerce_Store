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

import { ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList } from './com-ibm-commerce-member-beans-member-group-list-data-bean-ibmstore-summary-result-list';

/**
 * 
 * @export
 * @interface ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary
 */
export interface ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary {
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary
     */
    recordSetCount?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary
     */
    recordSetCompleteIndicator?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary
     */
    recordSetStartNumber?: number;
    /**
     * 
     * @type {Array<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList>}
     * @memberof ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary
     */
    resultList?: Array<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList>;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary
     */
    recordSetTotal?: number;
}


