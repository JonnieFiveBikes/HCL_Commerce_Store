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
/**
 * Do not modify, the file is generated.
 */
//Standard libraries
import { AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { PageApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const pageApiInstance = new PageApi(undefined, site.transactionContext);
const pageService = {
  /**
  * Finds pages by category IDs. Invalid category IDs are ignored.
  * `@method`
  * `@name page#byCategoryIds`
  *
  * `@param {any} parameters` have following properties:
     ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.

   ** `@property {string} categoryId (required)` The category ID.
  */
  byCategoryIds(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, categoryId, ...options } = parameters;
    return pageApiInstance.pageByCategoryIds(storeId, "byCategoryIds", categoryId, options);
  },
};

export default pageService;
