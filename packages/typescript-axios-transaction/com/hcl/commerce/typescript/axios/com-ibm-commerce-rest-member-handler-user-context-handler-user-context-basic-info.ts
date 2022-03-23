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
 * User\'s basic information.
 * @export
 * @interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextBasicInfo
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextBasicInfo {
    /**
     * The user\'s channel identifier.
     * @type {number}
     * @memberof ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextBasicInfo
     */
    channelId: number;
    /**
     * The user\'s store identifier.
     * @type {number}
     * @memberof ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextBasicInfo
     */
    storeId: number;
    /**
     * The user\'s caller identifier.
     * @type {number}
     * @memberof ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextBasicInfo
     */
    callerId: number;
    /**
     * The user identifier this session is acting upon.
     * @type {number}
     * @memberof ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextBasicInfo
     */
    runAsId: number;
}


