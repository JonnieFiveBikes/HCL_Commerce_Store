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
import { createReducer, AnyAction } from "@reduxjs/toolkit";
//Foundation libraries
import { getSite } from "../../_foundation/hooks/useSite";
//Custom libraries
import { CategoryProducts } from "../../components/pages-seo/category-products";
import { Product } from "../../components/pages-seo/product";
import { Category } from "../../components/pages-seo/category";
import { NotFound } from "../../components/widgets/not-found";
//Redux
import initStates from "./initStates";
import { SEOReducerState } from "./reducerStateInterface";
import { GET_SEO_CONFIG_SUCCESS_ACTION } from "../actions/seo";

const PAGE_TYPES: any = {
  NOT_FOUND: "NotFound",
  PRODUCT_LIST_PAGE: "ProductListPage",
  CATEGORY_PAGE: "CategoryPage",
  PRODUCT_PAGE: "ProductPage",
  ITEM_PAGE: "ItemPage",
  VARIANT_PAGE: "VariantPage",
};
const resolveComponent = (component: any) => {
  switch (component.page.type) {
    case PAGE_TYPES.PRODUCT_LIST_PAGE:
      return CategoryProducts;
    case PAGE_TYPES.PRODUCT_PAGE:
    case PAGE_TYPES.ITEM_PAGE:
    case PAGE_TYPES.VARIANT_PAGE:
      return Product;
    case PAGE_TYPES.CATEGORY_PAGE:
      return Category;
    default:
      return NotFound;
  }
};

const getSEOConfigFromPayload = ({ identifier, response }) => {
  let seoconfig: any = {};
  const mySite = getSite();

  if (
    response.status === 404 ||
    !response.data ||
    !response.data ||
    !response.data.contents ||
    !response.data.contents[0]
  ) {
    seoconfig = {
      page: {
        type: "NotFound",
        title:
          mySite?.storeCfg.description[0]?.displayName || mySite?.storeName,
      },
    };
  } else {
    seoconfig = response.data.contents[0];
    seoconfig.page["tokenValue"] = seoconfig.tokenValue;
    seoconfig.page.externalContext = {
      identifier: seoconfig.tokenExternalValue,
    };
  }
  seoconfig.component = resolveComponent(seoconfig);
  return { [identifier]: seoconfig };
};
/**
 * SEO reducer
 */
const seoReducer = createReducer(initStates.seo, (builder) => {
  builder.addCase(
    GET_SEO_CONFIG_SUCCESS_ACTION,
    (state: SEOReducerState | any, action: AnyAction) => {
      const seoconfig = getSEOConfigFromPayload(action.payload);
      Object.assign(state, { ...seoconfig });
    }
  );
});
export default seoReducer;
