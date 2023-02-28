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
import { PageDesignApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";
import { getSite } from "../../hooks/useSite";

const pageDesignApiInstance = new PageDesignApi(undefined, site.transactionContext);

const pageDesignService = {
  /**
   * Finds page design by category IDs. Invalid category IDs are ignored.
   * `@method`
   * `@name page#byCategoryIds`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} categoryId (required)` The category ID.
   */
  pageDesignByObjectIdentifier(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, objectIdentifier, productId, ...options } = parameters;
    return pageDesignApiInstance.pageDesignByProductId(
      storeId,
      "byObjectIdentifier",
      productId,
      objectIdentifier,
      options
    );
  },
};

export default pageDesignService;
