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
import { SiteContentResourceApi } from "@hcl-commerce-store-sdk/typescript-axios-es";
import { site } from "../../constants/site";
import { CommerceEnvironment } from "../../../constants/common";

const siteContentResourceApiInstance = new SiteContentResourceApi(undefined, site.searchContext);
const siteContentService = {
  /**
   * Provides keyword suggestions with type-ahead for search result page based on a term.
   * `@method`
   * `@name SiteContent#findKeywordSuggestionsByTermUsingGET`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {integer} catalogId ` The catalog identifier. If none is specified, the store default catalog will be used.
   ** `@property {integer} contractId ` The contractId
   ** `@property {integer} count ` The number of suggested keywords to be returned. The default value is 4.
   ** `@property {integer} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used.
   ** `@property {string} limit ` Limit.
   ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
   ** `@property {integer} storeId (required)` The child property of `Parameters`.The store ID.
   ** `@property {string} term (required)` The child property of `Parameters`.The search term.
   ** `@property {boolean} termsSort ` The sorting to be used in the returned result, "count" or "index". By default, it is "count".
   */
  findKeywordSuggestionsByTermUsingGET(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      langId = CommerceEnvironment.reverseLanguageMap[i18n.languages[0].split("-").join("_")],
      term,
      limit,
      contractId,
      termsSort,
      catalogId,
      profileName,
      ...options
    } = parameters;
    return siteContentResourceApiInstance.findKeywordSuggestionsByTerm(
      storeId,
      term,
      limit,
      contractId,
      langId,
      termsSort,
      catalogId,
      profileName,
      options
    );
  },

  /**
   * Provides suggestions with type-ahead for search result page.
   * `@method`
   * `@name SiteContent#findSuggestionsUsingGET`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {integer} catalogId ` The catalog identifier. If none is specified, the store default catalog will be used.
   ** `@property {integer} contractId ` The contractId
   ** `@property {integer} count ` The number of suggested keywords to be returned. The default value is 4.
   ** `@property {integer} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used.
   ** `@property {string} limit ` Limit.
   ** `@property {integer} storeId (required)` The child property of `Parameters`.The store ID.
   ** `@property {string} suggestType ` The suggestion type. Accepted values are 'Category', 'Brand', 'Articles', 'Keyword', and 'Product'.
   ** `@property {string} term ` The search term.
   ** `@property {boolean} termsSort ` The sorting to be used in the returned result, "count" or "index". By default, it is "count".
   */
  findSuggestionsUsingGET(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const {
      storeId = siteInfo?.storeID,
      langId = CommerceEnvironment.reverseLanguageMap[i18n.languages[0].split("-").join("_")],
      suggestType,
      term,
      limit,
      count,
      contractId,
      termsSort,
      catalogId,
      ...options
    } = parameters;
    return siteContentResourceApiInstance.findSuggestions(
      storeId,
      suggestType,
      term,
      limit,
      count,
      contractId,
      langId,
      termsSort,
      catalogId,
      options
    );
  },
};

export default siteContentService;
