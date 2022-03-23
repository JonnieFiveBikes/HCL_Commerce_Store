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

import { ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeCSRIdentifier } from './com-ibm-commerce-order-facade-datatypes-csrcomments-type-csridentifier';
import { ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCode } from './com-ibm-commerce-order-facade-datatypes-csrcomments-type-change-reason-code';
import { ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeUserData } from './com-ibm-commerce-order-facade-datatypes-csrcomments-type-user-data';

/**
 * 
 * @export
 * @interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsType
 */
export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsType {
    /**
     * 
     * @type {ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeCSRIdentifier}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCSRCommentsType
     */
    cSRIdentifier?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeCSRIdentifier;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCSRCommentsType
     */
    comment?: string;
    /**
     * 
     * @type {ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeUserData}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCSRCommentsType
     */
    userData?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeUserData;
    /**
     * 
     * @type {ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCode}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCSRCommentsType
     */
    changeReasonCode?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCode;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCSRCommentsType
     */
    orderVersion?: string;
    /**
     * 
     * @type {string}
     * @memberof ComIbmCommerceOrderFacadeDatatypesCSRCommentsType
     */
    creationDate?: string;
}


