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
import { combineReducers } from "redux";
//Redux
import account from "./account";
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
} from "./reducerStateInterface";

export * from "./reducerStateInterface";
export interface RootReducerState {
  account: AccountReducerState;
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
}

const reducers = {
  account,
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
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
