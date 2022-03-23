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

import { ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList } from './com-ibm-commerce-approval-beans-order-approval-status-list-data-bean-ibmstore-summary-result-list';

/**
 * 
 * @export
 * @interface ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummary
 */
export interface ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummary {
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummary
     */
    recordSetCount?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummary
     */
    recordSetCompleteIndicator?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummary
     */
    recordSetStartNumber?: number;
    /**
     * 
     * @type {Array<ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList>}
     * @memberof ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummary
     */
    resultList?: Array<ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList>;
    /**
     * 
     * @type {number}
     * @memberof ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummary
     */
    recordSetTotal?: number;
}


