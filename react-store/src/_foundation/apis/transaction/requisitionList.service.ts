/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

//Standard libraries
import { AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { Configuration, RequisitionListApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const requisitionListApiInstance = new RequisitionListApi(new Configuration(), site.transactionContext);

const requisitionListService = {
  /**
   *
   * Gets requisition lists that can be used by the current user.
   * `@method` GET
   * `@name RequisitionList#getRequistionListInfo`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The store identifier.
   ** `@property {string} q` the query name, the value is "self" or "usable".
   ** `@property {string} orderBy` Order by.
   ** `@property {number} pageNumber` Page number, starting at 1. Valid values include positive integers of 1 and above. The �pageSize� must be specified for paging to work.
   ** `@property {number} pageSize` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The �pageNumber� must be specified for paging to work.
   */
  getRequisitionList(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, q, orderBy, pageNumber, pageSize, ...options } = parameters;

    return requisitionListApiInstance.storeStoreIdRequisitionListGet(
      storeId,
      q,
      orderBy,
      pageNumber,
      pageSize,
      options
    );
  },

  /**
   * Deletes a requisition list by its id.
   * `@method` DELETE
   * `@name RequisitionList#deleteRequisitionList`
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId` The store identifier.
   ** `@property {string} requisitionListId` The requisition list ID.
   */
  deleteRequisitionById(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, requisitionListId, ...options } = parameters;

    return requisitionListApiInstance.storeStoreIdRequisitionListRequisitionListIdDelete(
      storeId,
      requisitionListId,
      options
    );
  },

  /**
   * Get a requisition list by its ID.
   * `@method` GET
   * `@name RequisitionList#getRequisitionListById`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} requisitionListId ` The requisition list ID.
   */
  getRequisitionListById(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, requisitionListId, ...options } = parameters;

    return requisitionListApiInstance.storeStoreIdRequisitionListRequisitionListIdGet(
      storeId,
      requisitionListId,
      options
    );
  },

  /**
   * Update a requisition list by its ID.
   * `@method` PUT
   * `@name RequisitionList#getRequisitionListById`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} requisitionListId ` The requisition list ID.
   ** `@property {any} body ` The body data.
   */
  updateRequisitionListById(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, requisitionListId, body, ...options } = parameters;

    return requisitionListApiInstance.storeStoreIdRequisitionListRequisitionListIdPut(
      storeId,
      requisitionListId,
      body,
      options
    );
  },
  /**
   *  Perform an action on a requisition list.
   * `@method` POST
   * `@name RequisitionList#addDynamicKitsToList`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} action ` The action.  ["", "addConfiguration", "copy", "updateItem", "updateConfiguration", "upload"]
   ** `@property {any} body ` The body
   */

  performActionOnRequisitionList(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, action, body, ...options } = parameters;

    return requisitionListApiInstance.storeStoreIdRequisitionListPost(storeId, action, body, options);
  },

  /**
   *
   *  submit a requisition list by requistionList Id.
   * `@method` POST
   * `@name RequisitionList#getRequistionListInfo`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The store identifier.
   ** `@property {string} requisitionListId` requisitionList id.
   ** `@property {string} action` The action. ["submit"]
   ** `@property {any} body` the body.
   */
  submitRequisitionListById(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, requisitionListId, action, body, ...options } = parameters;

    return requisitionListApiInstance.storeStoreIdRequisitionListRequisitionListIdPost(
      storeId,
      requisitionListId,
      action,
      body,
      options
    );
  },
};

export default requisitionListService;
