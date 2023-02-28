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
import i18n from "../../../i18n";

//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { site } from "../../constants/site";
import { V2ProductResourceApi } from "@hcl-commerce-store-sdk/typescript-axios-es";
import { CommerceEnvironment } from "../../../constants/common";

const productResourceApiInstance = new V2ProductResourceApi(undefined, site.searchContext);
const productsService = {
  /**
   * Gets Products
   * `@method`
   * `@name Products#findProductsUsingGET`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} associationType ` The type of the merchandising association to be returned.
   ** `@property {string} attachementFilter ` The attachment filter.
   ** `@property {string} attributeKeyword ` The attribute associated keywords to be returned.
   ** `@property {integer} catalogId ` The catalog identifier. If none is specified, the store default catalog will be used.
   ** `@property {string} category ` The category identifier.
   ** `@property {boolean} checkEntitlement ` Option to force an entitlement check.
   ** `@property {integer} contractId ` The contractId
   ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used.
   ** `@property {array} id ` The product identifiers
   ** `@property {integer} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used.
   ** `@property {integer} pageSize ` The page size.
   ** `@property {array} partNumber ` The product part numbers.
   ** `@property {integer} productId ` The product identifier.
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
   ** `@property {string} searchTerm ` The term to search for.
   ** `@property {integer} storeId (required)` The store ID.
   */
  findProductsUsingGET(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      categoryId,
      searchTerm,
      id,
      productId,
      partNumber,
      limit,
      offset,
      associationType,
      attributeKeyword,
      catalogId,
      contractId,
      currency,
      langId = CommerceEnvironment.reverseLanguageMap[i18n.languages[0].split("-").join("_")],
      checkEntitlement,
      attachmentFilter,
      profileName,
      ...options
    } = parameters;

    return productResourceApiInstance.findProducts(
      storeId,
      categoryId,
      searchTerm,
      id,
      productId,
      partNumber,
      limit,
      offset,
      associationType,
      attributeKeyword,
      catalogId,
      contractId,
      currency,
      langId,
      checkEntitlement,
      attachmentFilter,
      profileName,
      options
    );
  },
};

export default productsService;
