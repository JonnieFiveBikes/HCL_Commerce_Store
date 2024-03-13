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
 * response of MemberGroupMemberUpdateCmd.
 * @export
 * @interface ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse {
    /**
     * The current store identifier.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
     */
    storeId?: string;
    /**
     * MemberGroup Identifiers to explicitly exclude the user from.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
     */
    addAsExplicitExclusionToMemberGroupId?: string;
    /**
     * The URL to call when the command completes successfully.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
     */
    URL?: string;
    /**
     * MemberGroup Identifiers to explicitly add the user to.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
     */
    addAsExplicitInclusionToMemberGroupId?: string;
    /**
     * The user identifier.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
     */
    userId?: string;
    /**
     * The catalog identifier.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
     */
    catalogId?: string;
    /**
     * The request type for example, ajax.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
     */
    requesttype?: string;
    /**
     * MemberGroup Identifiers to remove the user from.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse
     */
    removeFromMemberGroupId?: string;
}

