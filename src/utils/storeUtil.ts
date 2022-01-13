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

  maskCardNumber: (input: string) => {
    const CARD_NUMBER_MASK = REG_EX.CARD_NUMBER_MASK;
    return input.replace(CARD_NUMBER_MASK, "*");
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

  toMap: (a, k?) => {
    return a.reduce((m, v) => {
      m[k ? v[k] : v] = v;
      return m;
    }, {});
  },

  getCCInitDates: () => {
    const dt = new Date();
    const m = dt.getMonth();
    const y = dt.getFullYear();
    const expire_month = `${m < 9 ? "0" : ""}${m + 1}`;
    const expire_year = `${y}`;
    return { expire_month, expire_year };
  },
};

export default storeUtil;
