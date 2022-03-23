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

import { ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeComments } from './com-ibm-commerce-order-facade-datatypes-adjustment-requirement-type-comments';
import { ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeUserData } from './com-ibm-commerce-order-facade-datatypes-adjustment-requirement-type-user-data';

/**
 * 
 * @export
 * @interface ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType
 */
export interface ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType {
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType
     */
    adjustmentUsage: string;
    /**
     * 
     * @type {ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeUserData}
     * @memberof ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType
     */
    userData?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeUserData;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType
     */
    adjustmentValue?: string;
    /**
     * 
     * @type {ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeComments}
     * @memberof ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType
     */
    comments?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeComments;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType
     */
    adjustmentCategory: string;
}


