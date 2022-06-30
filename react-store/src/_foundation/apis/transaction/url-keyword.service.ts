/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */

//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { site } from "../../constants/site";
import { URLKeywordApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";

const urlApiInstance = new URLKeywordApi(undefined, site.transactionContext);
const urlService = {
  findKeyword(tokenName: string, parameters: any) {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, tokenValue, languageId, ...options } = parameters;
    return urlApiInstance.uRLKeywordFindByTokenName(
      storeId,
      "byLanguageIdAndTokenNameValue",
      tokenName,
      tokenValue,
      languageId,
      options
    );
  },

  findKeywordForCategory(parameters: any) {
    return this.findKeyword("CategoryToken", parameters);
  },

  findKeywordForProduct(parameters: any) {
    return this.findKeyword("ProductToken", parameters);
  },
};

export default urlService;
