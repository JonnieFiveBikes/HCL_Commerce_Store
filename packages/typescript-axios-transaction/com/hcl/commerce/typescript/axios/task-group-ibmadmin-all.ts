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

import { TaskGroupIBMAdminAllItem } from './task-group-ibmadmin-all-item';

/**
 * 
 * @export
 * @interface TaskGroupIBMAdminAll
 */
export interface TaskGroupIBMAdminAll {
    /**
     * 
     * @type {number}
     * @memberof TaskGroupIBMAdminAll
     */
    recordSetCount?: number;
    /**
     * 
     * @type {boolean}
     * @memberof TaskGroupIBMAdminAll
     */
    recordSetComplete?: boolean;
    /**
     * 
     * @type {number}
     * @memberof TaskGroupIBMAdminAll
     */
    recordSetStartNumber?: number;
    /**
     * 
     * @type {Array<TaskGroupIBMAdminAllItem>}
     * @memberof TaskGroupIBMAdminAll
     */
    resultList?: Array<TaskGroupIBMAdminAllItem>;
    /**
     * 
     * @type {number}
     * @memberof TaskGroupIBMAdminAll
     */
    recordSetTotal?: number;
}

