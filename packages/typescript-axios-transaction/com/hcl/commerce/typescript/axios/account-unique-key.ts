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

import { AccountOwner } from './account-owner';

/**
 * The unique key to identify a account, including owning oragnization and account name.
 * @export
 * @interface AccountUniqueKey
 */
export interface AccountUniqueKey {
    /**
     * 
     * @type {AccountOwner}
     * @memberof AccountUniqueKey
     */
    accountOwner?: AccountOwner;
}


