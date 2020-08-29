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
//Redux
import { RootReducerState } from "../reducers";

export const cartSelector = (state: RootReducerState) => state.order.cart;
export const numItemsSelector = (state: RootReducerState) =>
  state.order.numItems;
export const orderItemsSelector = (state: RootReducerState) =>
  state.order.orderItems;
export const catentriesSelector = (state: RootReducerState) =>
  state.order.catentries;
export const isCheckoutDisabledSelector = (state: RootReducerState) =>
  state.order.isCheckoutDisabled;
export const shipInfosSelector = (state: RootReducerState) =>
  state.order.shipInfos;
export const shipModesSelector = (state: RootReducerState) =>
  state.order.shipModes;
export const payMethodsSelector = (state: RootReducerState) =>
  state.order.payMethods;
export const isRecurringOrderSelector = (state: RootReducerState) =>
  state.order.isRecurringOrder;
export const recurringOrderFrequencySelector = (state: RootReducerState) =>
  state.order.recurringOrderFrequency;
export const recurringOrderStartDateSelector = (state: RootReducerState) =>
  state.order.recurringOrderStartDate;
export const isRecurringOrderDisabledSelector = (state: RootReducerState) =>
  state.order.isRecurringOrderDisabled;
export const isFetchingSelector = (state: RootReducerState) =>
  state.order.isFetching;
export const miniCartItemsSelector = (state: RootReducerState) =>
  state.order.miniCartItems;
