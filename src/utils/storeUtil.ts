/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Custom libraries
import { REG_EX, SLASH, EMPTY_STRING } from "../constants/common";

const storeUtil = {
  isNumeric: (input: string) => {
    const NUMERIC = REG_EX.NUMERIC;
    return NUMERIC.test(input);
  },
  getParentCategoryId: (parentCatalogGroupID: any): string => {
    let categoryIdentifier: string = EMPTY_STRING;
    if (parentCatalogGroupID) {
      let ids: string[] = [];
      if (
        Array.isArray(parentCatalogGroupID) &&
        parentCatalogGroupID.length > 0
      ) {
        ids = parentCatalogGroupID[0].split(SLASH);
      } else {
        ids = parentCatalogGroupID?.split(SLASH);
      }
      if (ids && ids.length > 0) {
        categoryIdentifier = ids[ids.length - 1];
      }
    }
    return categoryIdentifier;
  },
};

export default storeUtil;
