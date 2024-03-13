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
 * Body of MemberGroupMemberUpdateCmd.
 * @export
 * @interface ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser {
    /**
     * MemberGroup Identifiers to explicitly add the user too .
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser
     */
    addAsExplicitInclusionToMemberGroupId?: string;
    /**
     * MemberGroup Identifiers to explicitly exclude the user from.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser
     */
    addAsExplicitExclusionToMemberGroupId?: string;
    /**
     * MemberGroup Identifiers to remove the user from.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser
     */
    removeFromMemberGroupId?: string;
}

