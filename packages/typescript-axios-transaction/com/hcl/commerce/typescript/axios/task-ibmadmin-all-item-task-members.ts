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

import { TaskIBMAdminAllItemTaskMembersUserDataField } from './task-ibmadmin-all-item-task-members-user-data-field';

/**
 * 
 * @export
 * @interface TaskIBMAdminAllItemTaskMembers
 */
export interface TaskIBMAdminAllItemTaskMembers {
    /**
     * 
     * @type {string}
     * @memberof TaskIBMAdminAllItemTaskMembers
     */
    memberName?: string;
    /**
     * 
     * @type {Array<TaskIBMAdminAllItemTaskMembersUserDataField>}
     * @memberof TaskIBMAdminAllItemTaskMembers
     */
    userDataField?: Array<TaskIBMAdminAllItemTaskMembersUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof TaskIBMAdminAllItemTaskMembers
     */
    memberID?: string;
}

