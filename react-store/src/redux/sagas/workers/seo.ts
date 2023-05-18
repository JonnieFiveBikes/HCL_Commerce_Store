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
import { getSite } from "../../../_foundation/hooks/useSite";
import { HOME, MANAGED_STATIC_PAGES, PAGE_TYPE, STATIC_PAGES_TOKEN } from "../../../_foundation/constants/common";
//Redux
import { GET_SEO_CONFIG_SUCCESS_ACTION } from "../../actions/seo";
//custom
import CategoryLandingPageLayoutJson from "../../../configs/default-layout/category-landing-page.json";
import ProductPageLayoutJson from "../../../configs/default-layout/product-page.json";
import ProductListingPageLayoutJson from "../../../configs/default-layout/product-listing-page.json";
import HomePageLayoutJson from "../../../configs/default-layout/home-page.json";
import B2BProductPageLayoutJson from "../../../configs/default-layout/b2b-product-page.json";
import NotFound from "../../../configs/default-layout/not-found.json";
import NoLayoutContentPageJson from "../../../configs/default-layout/no-layout-content-page.json";
import BundlePageLayoutJson from "../../../configs/default-layout/bundle-page.json";
import CheckoutPageJson from "../../../configs/default-layout/checkout-page.json";
import CartPageJson from "../../../configs/default-layout/cart-page.json";
import OrderConfirmationPageJson from "../../../configs/default-layout/order-confirmation-page.json";
import KitPageJson from "../../../configs/default-layout/kit-page.json";

import { CART, CHECKOUT, ORDER_CONFIRMATION } from "../../../constants/routes";
import { STRING_FALSE, STRING_TRUE } from "../../../constants/common";

const layouts: any = {
  CategoryPage: CategoryLandingPageLayoutJson,
  ProductPage: ProductPageLayoutJson,
  ItemPage: ProductPageLayoutJson,
  VariantPage: ProductPageLayoutJson,
  BundlePage: BundlePageLayoutJson,
  ProductListPage: ProductListingPageLayoutJson,
  HomePage: HomePageLayoutJson,
  NotFound: NotFound,
  ContentPage: NoLayoutContentPageJson,
  CheckOutPage: CheckoutPageJson,
  CartPage: CartPageJson,
  OrderConfirmationPage: OrderConfirmationPageJson,
  KitPage: KitPageJson,
};

export function* getSEO(action: any) {
  const { identifier } = action.payload;
  let seoconfig: any = {};
  try {
    const response = yield call(urlsService.getV2URLResourcesUsingGET, {
      ...action.payload,
    });
    if (!response?.data || !response?.data?.contents || !response?.data?.contents[0]) {
      //always make sure default home page is available.
      if (identifier === HOME) {
        seoconfig = {
          page: {
            type: PAGE_TYPE.HOME_PAGE,
            name: HOME,
            title: HOME,
          },
          tokenExternalValue: PAGE_TYPE.HOME_PAGE,
        };
      } else if (`/${identifier}` === CHECKOUT) {
        seoconfig = {
          page: {
            type: PAGE_TYPE.CHECK_OUT_PAGE,
            name: "checkout",
            title: getSite()?.storeCfg.description[0]?.displayName || getSite()?.storeName,
          },
          tokenExternalValue: PAGE_TYPE.CHECK_OUT_PAGE,
        };
      } else if (`/${identifier}` === CART) {
        seoconfig = {
          page: {
            type: PAGE_TYPE.CART_PAGE,
            name: "cart",
            title: getSite()?.storeCfg.description[0]?.displayName || getSite()?.storeName,
          },
          tokenExternalValue: PAGE_TYPE.CART_PAGE,
        };
      } else if (`/${identifier}` === ORDER_CONFIRMATION) {
        seoconfig = {
          page: {
            type: PAGE_TYPE.ORDER_CONFIRMATION_PAGE,
            name: "Order confirmation",
            title: getSite()?.storeCfg.description[0]?.displayName || getSite()?.storeName,
          },
          tokenExternalValue: PAGE_TYPE.ORDER_CONFIRMATION_PAGE,
        };
      } else {
        seoconfig = {
          page: {
            type: "NotFound",
            title: getSite()?.storeCfg.description[0]?.displayName || getSite()?.storeName,
          },
        };
      }
    } else {
      seoconfig = response.data.contents[0];
    }
  } catch (error: any) {
    if (error.isAxiosError && error.response && error.response.status === 404) {
      //always make sure default home page is available.
      if (identifier === HOME) {
        seoconfig = {
          page: {
            type: PAGE_TYPE.HOME_PAGE,
            name: HOME,
            title: HOME,
          },
          tokenExternalValue: PAGE_TYPE.HOME_PAGE,
        };
      } else if (`/${identifier}` === CHECKOUT) {
        seoconfig = {
          page: {
            type: PAGE_TYPE.CHECK_OUT_PAGE,
            name: "checkout",
            title: getSite()?.storeCfg.description[0]?.displayName || getSite()?.storeName,
          },
          tokenExternalValue: PAGE_TYPE.CHECK_OUT_PAGE,
        };
      } else if (`/${identifier}` === CART) {
        seoconfig = {
          page: {
            type: PAGE_TYPE.CART_PAGE,
            name: "cart",
            title: getSite()?.storeCfg.description[0]?.displayName || getSite()?.storeName,
          },
          tokenExternalValue: PAGE_TYPE.CART_PAGE,
        };
      } else if (`/${identifier}` === ORDER_CONFIRMATION) {
        seoconfig = {
          page: {
            type: PAGE_TYPE.ORDER_CONFIRMATION_PAGE,
            name: "Order confirmation",
            title: getSite()?.storeCfg.description[0]?.displayName || getSite()?.storeName,
          },
          tokenExternalValue: PAGE_TYPE.ORDER_CONFIRMATION_PAGE,
        };
      } else {
        seoconfig = {
          page: {
            type: "NotFound",
            title: getSite()?.storeCfg.description[0]?.displayName || getSite()?.storeName,
          },
        };
      }
    }
  } finally {
    const pageType = seoconfig.page?.type;
    const tokenName = seoconfig.tokenName ?? "";
    const tokenExternalValue = seoconfig.tokenExternalValue ?? "";
    if (pageType) {
      const isB2B = getSite()?.isB2B;
      const isProductSKU = pageType === PAGE_TYPE.ITEM_PAGE ? seoconfig.isProductSKU ?? STRING_TRUE : STRING_TRUE;
      if (!seoconfig.layout?.id) {
        // with changes done in defect HC-27897 in both query and transaction server
        // we will probably always has layout but sometimes empty.
        if (
          isB2B &&
          (pageType === PAGE_TYPE.PRODUCT_PAGE ||
            pageType === PAGE_TYPE.ITEM_PAGE ||
            pageType === PAGE_TYPE.VARIANT_PAGE)
        ) {
          seoconfig.layout = Object.assign(
            seoconfig.layout ?? {},
            isProductSKU === STRING_FALSE ? ProductPageLayoutJson.layout : B2BProductPageLayoutJson.layout
          );
        } else {
          if (tokenName === STATIC_PAGES_TOKEN && MANAGED_STATIC_PAGES.includes(tokenExternalValue)) {
            seoconfig.layout = Object.assign(seoconfig.layout ?? {}, layouts[tokenExternalValue].layout);
          } else {
            seoconfig.layout = Object.assign(seoconfig.layout ?? {}, layouts[pageType].layout);
          }
        }
      }
      yield put(GET_SEO_CONFIG_SUCCESS_ACTION({ identifier, seoconfig }));
    }
  }
}
