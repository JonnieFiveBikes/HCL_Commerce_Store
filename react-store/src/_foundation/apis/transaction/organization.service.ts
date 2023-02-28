/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */

//Standard libraries
import { AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { OrganizationApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const organizationApiInstance = new OrganizationApi(undefined, site.transactionContext);
const organizationService = {
  /**
   * Registers a buyer organization and a buyer organization administrator.
   * `@method`
   * `@name Organization#registerBuyerOrganization`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {any} body ` Request body.
   */
  registerBuyerOrganization(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, body, responseFormat, ...options } = parameters;
    return organizationApiInstance.organizationRegisterBuyerOrganization(storeId, body, responseFormat, options);
  },

  /**
   * This allows a user to find his own entitled organizations.
   * `@method`
   * `@name Organization#getEntitledOrganizations`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} responseFormat ` This class provides RESTful services to register an organization, to get or update organization information.
   ** `@property {string} storeId (required)` The child property of `Parameters`.This class provides RESTful services to register an organization, to get or update organization information.
   ** `@property {string} accountCheck ` This class provides RESTful services to register an organization, to get or update organization information.
   ** `@property {string} explicitEntitlement ` This class provides RESTful services to register an organization, to get or update organization information.
   */
  getEntitledOrganizations(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, accountCheck, explicitEntitlement, responseFormat, ...options } = parameters;
    return organizationApiInstance.organizationGetEntitledOrganizations(
      storeId,
      responseFormat,
      accountCheck,
      explicitEntitlement,
      options
    );
  },

  /**
   * This allows an administrator to find organization information by organization identifier.
   * `@method`
   * `@name Organization#findByOrganizationId`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} organizationId (required)` The child property of `Parameters`.The organization identifier
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_Organization_Summary
   */
  findByOrganizationId(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, organizationId, profileName, ...options } = parameters;
    return organizationApiInstance.organizationFindByOrganizationIdWParentAssignedRolesDetailsProfileName(
      storeId,
      organizationId,
      profileName,
      options
    );
  },
};

export default organizationService;
