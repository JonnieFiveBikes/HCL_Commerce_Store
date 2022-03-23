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

import { WorkspaceIBMAdminAllItemUserDataField } from './workspace-ibmadmin-all-item-user-data-field';

/**
 * 
 * @export
 * @interface WorkspaceIBMAdminAllItem
 */
export interface WorkspaceIBMAdminAllItem {
    /**
     * 
     * @type {string}
     * @memberof WorkspaceIBMAdminAllItem
     */
    status?: string;
    /**
     * 
     * @type {string}
     * @memberof WorkspaceIBMAdminAllItem
     */
    workspaceName?: string;
    /**
     * 
     * @type {boolean}
     * @memberof WorkspaceIBMAdminAllItem
     */
    persistent?: boolean;
    /**
     * 
     * @type {string}
     * @memberof WorkspaceIBMAdminAllItem
     */
    workspaceExternalIdentifier?: string;
    /**
     * 
     * @type {string}
     * @memberof WorkspaceIBMAdminAllItem
     */
    workspaceID?: string;
    /**
     * 
     * @type {boolean}
     * @memberof WorkspaceIBMAdminAllItem
     */
    emergencyUse?: boolean;
    /**
     * 
     * @type {Array<WorkspaceIBMAdminAllItemUserDataField>}
     * @memberof WorkspaceIBMAdminAllItem
     */
    userDataField?: Array<WorkspaceIBMAdminAllItemUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof WorkspaceIBMAdminAllItem
     */
    workspaceDescription?: string;
}


