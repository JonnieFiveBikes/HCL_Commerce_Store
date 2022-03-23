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

import { MemberRefType } from './member-ref-type';
import { OriginType } from './origin-type';

/**
 * The unique key to identify a contract, including owning oragnization, contract name, major version and minor version.
 * @export
 * @interface ContractUniqueKey
 */
export interface ContractUniqueKey {
    /**
     * 
     * @type {MemberRefType}
     * @memberof ContractUniqueKey
     */
    contractOwner?: MemberRefType;
    /**
     * 
     * @type {OriginType}
     * @memberof ContractUniqueKey
     */
    origin?: OriginType;
    /**
     * The name of the contract.
     * @type {string}
     * @memberof ContractUniqueKey
     */
    name?: string;
    /**
     * The major version of the contract.
     * @type {number}
     * @memberof ContractUniqueKey
     */
    majorVersionNumber?: number;
    /**
     * The minor version of the contract.
     * @type {number}
     * @memberof ContractUniqueKey
     */
    minorVersionNumber?: number;
}

