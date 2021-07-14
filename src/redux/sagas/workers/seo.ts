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
//Standard libraries
import { call, put } from "redux-saga/effects";
//Foundation libraries
import urlsService from "../../../_foundation/apis/search/urls.service";
//Redux
import { GET_SEO_CONFIG_SUCCESS_ACTION } from "../../actions/seo";
//Mock
import * as CategoryLandingPageLayoutJson from "../../../configs/default-layout/category-landing-page.json";
import * as ProductPageLayoutJson from "../../../configs/default-layout/product-page.json";
import * as ProductListingPageLayoutJson from "../../../configs/default-layout/product-listing-page.json";
import * as HomePageLayoutJson from "../../../configs/default-layout/home-page.json";
import * as B2BProductPageLayoutJson from "../../../configs/default-layout/b2b-product-page.json";
import * as NotFound from "../../../configs/default-layout/not-found.json";
import * as NoLayoutContentPageJson from "../../../configs/default-layout/no-layout-content-page.json";
import { getSite } from "../../../_foundation/hooks/useSite";
import { HOME } from "../../../_foundation/constants/common";

const layouts: any = {
  CategoryPage: CategoryLandingPageLayoutJson,
  ProductPage: ProductPageLayoutJson,
  ItemPage: ProductPageLayoutJson,
  VariantPage: ProductPageLayoutJson,
  ProductListPage: ProductListingPageLayoutJson,
  home: HomePageLayoutJson,
  NotFound: NotFound,
  ContentPage: NoLayoutContentPageJson,
};

export function* getSEO(action: any) {
  const { identifier } = action.payload;
  let seoconfig: any = {};
  try {
    const response = yield call(
      urlsService.getV2URLResourcesUsingGET,
      action.payload
    );

    if (
      !response.data ||
      !response.data.contents ||
      !response.data.contents[0]
    ) {
      //always make sure default home page is available.
      if (identifier === HOME) {
        seoconfig = {
          page: {
            type: HOME,
            name: HOME,
            title: HOME,
          },
        };
      } else {
        seoconfig = {
          page: {
            type: "NotFound",
            title:
              getSite()?.storeCfg.description[0]?.displayName ||
              getSite()?.storeName,
          },
        };
      }
    } else {
      seoconfig = response.data.contents[0];
    }
  } catch (error) {
    if (error.isAxiosError && error.response && error.response.status === 404) {
      //always make sure default home page is available.
      if (identifier === HOME) {
        seoconfig = {
          page: {
            type: HOME,
            name: HOME,
            title: HOME,
          },
        };
      } else {
        seoconfig = {
          page: {
            type: "NotFound",
            title:
              getSite()?.storeCfg.description[0]?.displayName ||
              getSite()?.storeName,
          },
        };
      }
    }
  } finally {
    const pageType = seoconfig.page?.type;
    if (pageType) {
      const isB2B = getSite()?.isB2B;
      if (!seoconfig.layout) {
        if (
          isB2B &&
          (pageType === "ProductPage" ||
            pageType === "ItemPage" ||
            pageType === "VariantPage")
        ) {
          seoconfig.layout = B2BProductPageLayoutJson.layout;
        } else if (identifier === HOME) {
          seoconfig.layout = HomePageLayoutJson.layout;
        } else {
          seoconfig.layout = layouts[pageType].default.layout;
        }
      }
      yield put(GET_SEO_CONFIG_SUCCESS_ACTION({ identifier, seoconfig }));
    }
  }
}
