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
import { REG_EX, SLASH, EMPTY_STRING, DESCRIPTIVE, STRING_TRUE, EXCLUSIVE, OFFER, CS } from "../constants/common";

/**
 * @param obj
 * @returns obj if it's an array, otherwise a one-elem array with obj
 */
const asArray = (obj: any) => (Array.isArray(obj) ? obj : [obj]);

const storeUtil = {
  isNumeric: (input: string) => {
    const NUMERIC = REG_EX.NUMERIC;
    return NUMERIC.test(input);
  },

  maskCardNumber: (input: string) => {
    const CARD_NUMBER_MASK = REG_EX.CARD_NUMBER_MASK;
    return input.replace(CARD_NUMBER_MASK, "*");
  },

  getParentCategoryId: (parentCatalogGroupID: any, topCategoriesList: any[]): string => {
    let categoryIdentifier: string = EMPTY_STRING;
    const categoryByIdMap = storeUtil.toMap(topCategoriesList, "id");
    const parentCategories = Array.isArray(parentCatalogGroupID) ? parentCatalogGroupID : [parentCatalogGroupID];

    let ids: string[] = [];
    if (parentCategories.length > 0) {
      for (let i = 0; i < parentCategories.length; i++) {
        const categoryIds = parentCategories[i].split(SLASH).filter(Boolean);
        if (storeUtil.isValidCategory(categoryIds, categoryByIdMap)) {
          ids = categoryIds;
          break;
        }
      }
    }
    if (ids && ids.length > 0) {
      categoryIdentifier = ids[ids.length - 1];
    }
    return categoryIdentifier;
  },

  getCategoryBreadcrumbs: (parentCatalogGroupID: any, topCategoriesList: any[]): any[] | null => {
    const categoryByIdMap = storeUtil.toMap(topCategoriesList, "id");
    const parentCategories = Array.isArray(parentCatalogGroupID) ? parentCatalogGroupID : [parentCatalogGroupID];

    let ids: string[] = [];
    if (parentCategories.length > 0) {
      for (let i = 0; i < parentCategories.length; i++) {
        const categoryIds = parentCategories[i].split(SLASH).filter(Boolean);
        if (storeUtil.isValidCategory(categoryIds, categoryByIdMap)) {
          ids = categoryIds;
          break;
        }
      }
    }
    if (ids.length > 0) {
      return ids.map((id) => {
        return { label: categoryByIdMap[id].name, value: id, seo: categoryByIdMap[id].seo };
      });
    } else return null;
  },

  toMap: (a, k?) => {
    return a.reduce((m, v) => {
      m[k ? v[k] : v] = v;
      return m;
    }, {});
  },

  isValidCategory: (categoryIds: any, categoryByIdMap: any): boolean => {
    let isValid: boolean = false;
    if (categoryIds && categoryByIdMap) {
      isValid = categoryIds.every((id) => categoryByIdMap[id]);
    }
    return isValid;
  },

  getCCInitDates: () => {
    const dt = new Date();
    const m = dt.getMonth();
    const y = dt.getFullYear();
    const expire_month = `${m < 9 ? "0" : ""}${m + 1}`;
    const expire_year = `${y}`;
    return { expire_month, expire_year };
  },

  getRibbonAdAttrs: (product) => {
    const rc: any[] = [];

    product?.attributes
      ?.filter((a) => a.usage === DESCRIPTIVE && a.storeDisplay === STRING_TRUE)
      .map(({ identifier, values }) => ({ identifier, values }))
      .forEach(({ identifier, values }) => {
        values?.forEach(({ value }) => {
          rc.push(...asArray(value).map((v) => ({ identifier, value: v })));
        });
      });

    return rc.sort((a, b) =>
      a.identifier.toLowerCase().includes(EXCLUSIVE) ? -1 : b.identifier.toLowerCase().includes(EXCLUSIVE) ? 1 : 0
    );
  },

  getOfferPrice: (c) => {
    const { items, price, groupingProperties } = c;
    let min;
    let max;

    if (items) {
      items.forEach(({ price: p }) => {
        const o = p.find(({ usage: u, value: v }) => u === OFFER && v !== "");
        if (o?.value) {
          const v = parseFloat(o.value);
          min = min == null || v < min ? v : min;
          max = max == null || v > max ? v : max;
        }
      });
    } else if (
      groupingProperties?.groupCount > 1 &&
      groupingProperties.groupMinPriceValue != null &&
      groupingProperties.groupMaxPriceValue != null
    ) {
      min = parseFloat(groupingProperties.groupMinPriceValue);
      max = parseFloat(groupingProperties.groupMaxPriceValue);
    } else {
      const o = price.find(({ usage: u, value: v }) => u === OFFER && v !== "");

      min = o?.value ? parseFloat(o.value) : null;
      max = null;
    }

    max = max === min ? null : max;
    return { min, max };
  },

  /**
   * @param obj
   * @returns obj elements joined by comma-space if it's an array, otherwise obj itself
   */
  csValue: (obj) => asArray(obj).join(CS),
};

export default storeUtil;
