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

export const WC_PREVIEW_TOKEN = "WCPreviewToken";
export const NEW_PREVIEW_SESSION = "newPreviewSession";
export const STORE_ID = "STORE_ID";
export const CURRENT_USER = "currentUser";
export const FOR_USER_SESSION = "forUserSession";
export const WINDOW_COUNTER = "windowCounter";
export const WINDOW_ID = "windowId";
export const APPOVAL_TOOL_ID = "approvalManagement";
export const USERS_TOOL_ID = "userManagement";
export const ORG_TOOL_ID = "organizationManagement";
export const ACCOUNT = "ACCOUNT";
export const LANGID = "langId";
export const LOCALE = "locale";
export const URL_LANG_REJECTED = "URL_LANG_REJECTED";
export const SHOW_API_FLOW = "showAPIFlow";
export const PRODUCTION = "production";
export const FOR_USER_ID = "forUserId";
//parent CSR window path when shop on behalf.
export const SHOP_ON_BEHALF_PATH = "/shop-on-behalf";
export const SKIP_WC_TOKEN_HEADER = "skipWCTokenHeader";
export const EXPIRED_PASSWORD_PAGE_ERROR = "expiredPasswordPageError";
export const SELECTED_PROFILE = "selectedProfile";

//SEO & page layout
export const HOME = "home";
export const CART_PAGE = "cart-page";
export const ORDER_CONFIRMATION_PAGE = "order-confirmation-page";
export const CHECKOUT_PAGE = "check-out-page";

export const PAGE_TYPE = {
  CART_PAGE: "CartPage",
  ORDER_CONFIRMATION_PAGE: "OrderConfirmationPage",
  CHECK_OUT_PAGE: "CheckOutPage",
  VARIANT_PAGE: "VariantPage",
  ITEM_PAGE: "ItemPage",
  PRODUCT_PAGE: "ProductPage",
  HOME_PAGE: "HomePage",
  CATEGORY_PAGE: "CategoryPage",
};

export const MANAGED_STATIC_PAGES = [
  PAGE_TYPE.HOME_PAGE,
  PAGE_TYPE.CHECK_OUT_PAGE,
  PAGE_TYPE.CART_PAGE,
  PAGE_TYPE.ORDER_CONFIRMATION_PAGE,
];

export const PRODUCT_TOKEN = "ProductToken";
export const STATIC_PAGES_TOKEN = "StaticPagesToken";

export const CHILD_ROUTE_SEPARATOR = "/";
export const SELLER_PARAM = "seller";

//Store locator
export const SELECTED_STORE = "SELECTED_STORE";
export const STORELOCATORACTIONS = {
  UPDATE_SELECTION_SUCCESS: "UPDATE_SELECTION_SUCCESS",
  RESET_STORE_SELECTOR: "RESET_STORE_SELECTOR",
};
export const STORELOCATORLIBRARY: any = ["places"];
export const KILOMETERS = "KM";
export const STORELISTRADIUS = 40;
export const GOOGLEMAPREGION = "ca";
export const GOOGLEMAPZOOM = {
  INIT: 9,
  ZOOMIN: 14,
};
export const DEFAULT_LOCATION = {
  //Toronto
  lat: 43.653217,
  lng: -79.383181,
};
export const SUGGESTIONS = {
  All: ["Category", "Brand", "Seller", "Product", "Keyword"],
  Category: "Category",
  Brand: "Brand",
  Seller: "Seller",
  Product: "Product",
  Keyword: "Keyword",
};
