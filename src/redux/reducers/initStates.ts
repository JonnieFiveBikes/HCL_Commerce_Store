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
//Foundation libraries
//Redux
import {
  AccountReducerState,
  CatalogReducerState,
  OrderReducerState,
  ErrorReducerState,
  SearchReducerState,
  OrderDetailsMapReducerState,
} from "./reducerStateInterface";

const accountDefaultState: AccountReducerState = {
  orders: null,
  address: null,
};
const catalogDefaultState: CatalogReducerState = {
  productList: [],
  productListTotal: -1,
  priceMode: "1",
  facets: null,
  facetPrice: null,
  selectedFacets: {},
  selectedFacetLimits: [],
  selectedFacetPrices: { min: -1, max: -1 },
  selectedPageOffset: 1,
  selectedSortOption: "0",
  breadcrumbs: [],
};
const orderDefaultState: OrderReducerState = {
  cart: null,
  numItems: 0,
  orderItems: [],
  catentries: null,
  isCheckoutDisabled: false,
  shipAddresses: null,
  shipModes: [],
  payMethods: [],
  checkoutActiveStep: 0,
  isRecurringOrder: false,
  recurringOrderFrequency: "0",
  recurringOrderStartDate: null,
  isRecurringOrderDisabled: false,
};
const errorDefaultState: ErrorReducerState = {
  errorKey: null,
  errorCode: null,
  errorTitleKey: null,
  errorMsgKey: null,
  handled: null,
  errorMessage: "",
  errorParameters: "",
};

const searchDefaultState: SearchReducerState = {
  keywords: [],
};

const orderDetails: OrderDetailsMapReducerState = {};

export const defaultStates = {
  account: accountDefaultState,
  catalog: catalogDefaultState,
  order: orderDefaultState,
  user: { initiatedFromStorage: false },
  error: errorDefaultState,
  seo: {},
  contract: {},
  search: searchDefaultState,
  organization: {},
  context: {},
  success: {},
  confirmation: {},
  recurringOrder: { resultList: [] },
  orderDetails,
  site: { currentSite: null },
};

export const clearState = (o: any) => {
  for (var variableKey in o) {
    if (o.hasOwnProperty(variableKey)) {
      delete o[variableKey];
    }
  }
};

const initStates = {
  ...defaultStates,
};
export default initStates;
