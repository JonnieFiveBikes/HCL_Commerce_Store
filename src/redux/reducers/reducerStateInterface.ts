/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
export interface ErrorReducerState {
  errorKey?: string | null;
  errorCode?: string | null;
  errorTitleKey?: string | null;
  errorMsgKey?: string | null;
  [extraProps: string]: any;
}
export interface AccountReducerState {
  orders: any | null;
  address: any;
}
export interface CatalogReducerState {
  productList: any[]; //Stores list of product objects for the current category/search
  productListTotal: number; //Stores total number of products in the current category/search
  priceMode: string; //Price mode returned from catalog services
  facets: any[] | null; //Stores list of all facet objects (including price facet) associated to the current category/search
  facetPrice: any; //Stores only the price facet object associated to the current category/search
  selectedFacets: {
    [key: string]: string;
  }; //Stores map of selected facets for the current category/search. Format is "[facetEntryValue]: facetEntryLabel"
  selectedFacetLimits: string[]; //Stores list of selected facet limit values for the current category/search. Format is "facetvalue:-1"
  selectedFacetPrices: {
    min: number;
    max: number;
  }; //Stores the selected min/max price range for the current category/search. Persisted values should always be valid
  selectedPageOffset: number; //Stores the selected pagination offset value for the current category/search
  selectedSortOption: string; //Stores the selected sort option value for the current category/search
  breadcrumbs: any[];
}

export interface OrderReducerState {
  cart: any; //Stores cart object without order items
  numItems: number; //Stores the number of items in cart
  orderItems: any[]; //Stores order items in cart with catentry details added
  catentries: any; //Stores the additional catentry details need for order items in cart
  isCheckoutDisabled: boolean;
  shipInfos: any | null;
  shipModes: any[];
  payMethods: any[];
  isRecurringOrderDisabled: boolean;
  isFetching?: boolean;
}

export interface UserReducerState {
  WCToken: string;
  WCTrustedToken: string;
  lastUpdated?: number;
  [extraProps: string]: any;
}

export interface SearchReducerState {
  keywords: string[];
}

export interface SEOReducerState {
  [url: string]: any;
}
export interface ContractReducerState {
  [extraProps: string]: string;
}
export interface OrganizationReducerState {
  entitledOrganizations: any;
  organizationDetails: any;
  [extraProps: string]: any;
}
export interface ContextReducerState {
  audit?: {
    personalizationId: string;
  };
  globalization: {
    preferredCurrency: string;
    languageId: number;
    currency: string;
    preferredLanguageId: number;
  };
  catalog: {
    catalogId: number;
    masterCatalog: boolean;
  };
  entitlement: {
    eligibleTradingAgreementIds: string[];
    hostingContractId: string;
    currentTradingAgreementIds: string[];
    activeOrganizationId: string;
    sessionTradingAgreementIds: any;
  };
  activityToken?: {
    activityId: number;
  };
  isPartiallyAuthenticated: false;
  basicInfo: {
    runAsId: number;
    callerId: number;
    registerType: string;
    storeId: number;
    channelId: number;
  };
}
/**
 * The interface of success message object
 */
export interface SuccessMessageReducerState {
  /**
   * Represents the type of message, and it is also
   * served as part of message key in translation file
   */
  key: string;
  /**
   * A name value parameter map of string that to be used as token
   * in translation file.
   */
  messageParameters?: {
    [extraProps: string]: string;
  };
  /**
   * The React route url that needs to displayed as part of message
   */
  link?: {
    url: string;
    textKey: string;
  };
}
export interface ConfirmationReducerState {
  /**
   * Represents the type of message, and it is also
   * served as part of message key in translation file
   */
  key: string;
  /**
   * A name value parameter map of string that to be used as token
   * in translation file.
   */
  messageParameters?: {
    [extraProps: string]: string;
  };
  /**
   * The text or text key used for confirmation dialog title
   */
  title: string;
  /**
   * The React route url that needs to displayed as part of message
   */
  okAction?: Function;
  cancelAction?: Function;
}
export interface RecurringOrderReducerState {
  resultList: any[];
}

export interface SiteInfo {
  storeName: string;
  storeID: string;
  catalogID: string;
  defaultLanguageID: string;
  defaultCurrencyID: string;
  catalogStoreID: string;
  searchContext: string;
  transactionContext?: string;
  dxContext?: string;
  storeType: string;
  isB2B: boolean;
  inventorySystem: number;
  storeCfg: any;
  supportedLanguages: any[];
  enableGA?: boolean;
  [extraPros: string]: any;
}
export interface OrderDetailsMapReducerState {
  [orderId: string]: any;
}

export interface SiteReducerState {
  currentSite?: SiteInfo;
}

export interface ApiReducerState {
  apiFlowList: string[]; //Tracks list of API calls for development use only. State will exist in Production but will not be used.
}
