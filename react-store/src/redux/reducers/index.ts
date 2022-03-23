/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020, 2021, 2022
 *
 *==================================================
 */
//Standard libraries
import { combineReducers } from "redux";
//Redux
import account from "./account";
import api from "./api";
import catalog from "./catalog";
import user from "./user";
import order from "./order";
import error from "./error";
import seo from "./seo";
import contract from "./contract";
import search from "./search";
import organization from "./organization";
import context from "./context";
import success from "./success";
import confirmation from "./confirmation";
import recurringOrder from "./recurringOrder";
import orderDetails from "./orderDetails";
import site from "./site";
import localStorage from "./local-storage";
import checkoutProfile from "./checkout-profile";
import categories from "./category";
import sellers from "./sellers";

import {
  ErrorReducerState,
  AccountReducerState,
  CatalogReducerState,
  UserReducerState,
  OrderReducerState,
  SEOReducerState,
  ContractReducerState,
  SearchReducerState,
  OrganizationReducerState,
  ContextReducerState,
  SuccessMessageReducerState,
  ConfirmationReducerState,
  RecurringOrderReducerState,
  OrderDetailsMapReducerState,
  SiteReducerState,
  ApiReducerState,
  CheckoutProfileReducerState,
  CategoryReducerState,
  SellerInfoState,
} from "./reducerStateInterface";

export * from "./reducerStateInterface";
export interface RootReducerState {
  account: AccountReducerState;
  api: ApiReducerState;
  catalog: CatalogReducerState;
  user: UserReducerState;
  order: OrderReducerState;
  error: ErrorReducerState;
  seo: SEOReducerState;
  contract: ContractReducerState;
  search: SearchReducerState;
  organization: OrganizationReducerState;
  context: ContextReducerState;
  success: SuccessMessageReducerState;
  confirmation: ConfirmationReducerState;
  recurringOrder: RecurringOrderReducerState;
  orderDetails: OrderDetailsMapReducerState;
  site: SiteReducerState;
  checkoutProfile: CheckoutProfileReducerState;
  categories: CategoryReducerState;
  sellers: SellerInfoState;
}

const reducers = {
  account,
  api,
  catalog,
  user,
  order,
  error,
  seo,
  contract,
  search,
  context,
  organization,
  success,
  confirmation,
  recurringOrder,
  orderDetails,
  site,
  localStorage,
  checkoutProfile,
  categories,
  sellers,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
