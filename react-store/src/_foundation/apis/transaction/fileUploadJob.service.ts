/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */

//Standard libraries
import { AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { FileUploadJobApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const fileUploadJobApiInstance = new FileUploadJobApi(undefined, site.transactionContext);

const fileUploadJobService = {
  /**
   *
   * Finds a file upload job by its ID.
   * `@method` GET
   * `@name FileUploadJob#getFileUploadJobById`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The store identifier.
   ** `@property {string} fileUploadJobId (required)` The file upload job ID.
   ** `@property {string} [langId] ` Language identifier. If not specified, the locale parameter will be used. If "locale" isn"t specified, then the store default language shall be used..
   ** `@property {string} [locale] ` The locale to use.If the langId parameter is specified, the "locale" parameter will be ignored. If no locale is specified, the store default locale will be used.
   ** `@property {string} [workspaceName] ` Name of the workspace to use for the request.
   ** `@property {string} [workspaceTask] ` Identifier of the workspace task to use for the request.
   ** `@property {string} [workspaceTaskGroup] ` Identifier of the workspace task group to use for the request.
   ** `@property {string} [forUserId] ` User identifier to act on behalf of.
   ** `@property {string} [forUser] ` User name to act on behalf of.
   ** `@property {string} [responseFormat] ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn"t specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn"t specified as well, the default response format shall be in json
   ** `@property {*} [options] ` Override http request option.
   */
  getFileUploadJobById(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      fileUploadJobId,
      langId,
      locale,
      workspaceName,
      workspaceTask,
      workspaceTaskGroup,
      forUserId,
      forUser,
      responseFormat,
      ...options
    } = parameters;

    return fileUploadJobApiInstance.storeStoreIdFileUploadJobFileUploadJobIdGet(
      storeId,
      fileUploadJobId,
      langId,
      locale,
      workspaceName,
      workspaceTask,
      workspaceTaskGroup,
      forUserId,
      forUser,
      responseFormat,
      options
    );
  },

  /**
   * Finds file upload jobs.
   * `@method` GET
   * `@name FileUploadJob#getFileUploadJobs`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} q (required)` The query name for example, byNumberOfDaysAndUploadType.
   ** `@property {string} numberOfDays (required)` Returns the file upload jobs loaded later than the specified number days from current date.
   ** `@property {string} uploadType (required)` Returns the file upload jobs of the specified upload type, for example, RequisitionListUpload.
   ** `@property {string} [langId] ` Language identifier. If not specified, the locale parameter will be used. If "locale" isn"t specified, then the store default language shall be used..
   ** `@property {string} [locale] ` The locale to use.If the langId parameter is specified, the "locale" parameter will be ignored. If no locale is specified, the store default locale will be used.
   ** `@property {string} [workspaceName] ` Name of the workspace to use for the request.
   ** `@property {string} [workspaceTask] ` Identifier of the workspace task to use for the request.
   ** `@property {string} [workspaceTaskGroup] ` Identifier of the workspace task group to use for the request.
   ** `@property {string} [forUserId] ` User identifier to act on behalf of.
   ** `@property {string} [forUser] ` User name to act on behalf of.
   ** `@property {string} [responseFormat] ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn"t specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn"t specified as well, the default response format shall be in json
   ** `@property {*} [options] ` Override http request option.
   */
  getFileUploadJobs(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      q,
      numberOfDays,
      uploadType,
      langId,
      locale,
      workspaceName,
      workspaceTask,
      workspaceTaskGroup,
      forUserId,
      forUser,
      responseFormat,
      ...options
    } = parameters;

    return fileUploadJobApiInstance.storeStoreIdFileUploadJobGet(
      storeId,
      q,
      numberOfDays,
      uploadType,
      langId,
      locale,
      workspaceName,
      workspaceTask,
      workspaceTaskGroup,
      forUserId,
      forUser,
      responseFormat,
      options
    );
  },
};

export default fileUploadJobService;
