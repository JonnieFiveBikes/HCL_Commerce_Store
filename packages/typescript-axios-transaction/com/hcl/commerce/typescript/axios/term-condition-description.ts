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


/**
 * The descriptions of the term and condition.
 * @export
 * @interface TermConditionDescription
 */
export interface TermConditionDescription {
    /**
     * The short description of the term and condition.
     * @type {string}
     * @memberof TermConditionDescription
     */
    shortDescription?: string;
    /**
     * The long description of the term and condition.
     * @type {string}
     * @memberof TermConditionDescription
     */
    longDescription?: string;
    /**
     * The locale of the descriptions. For example, en_US.
     * @type {string}
     * @memberof TermConditionDescription
     */
    locale?: string;
}

