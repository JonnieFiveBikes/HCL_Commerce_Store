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
export const shipAddressesSelector = (state: RootReducerState) =>
  state.order.shipAddresses;
export const shipModesSelector = (state: RootReducerState) =>
  state.order.shipModes;
export const payMethodsSelector = (state: RootReducerState) =>
  state.order.payMethods;
export const checkoutActiveStepSelector = (state: RootReducerState) =>
  state.order.checkoutActiveStep;
export const isRecurringOrderSelector = (state: RootReducerState) =>
  state.order.isRecurringOrder;
export const recurringOrderFrequencySelector = (state: RootReducerState) =>
  state.order.recurringOrderFrequency;
export const recurringOrderStartDateSelector = (state: RootReducerState) =>
  state.order.recurringOrderStartDate;
export const isRecurringOrderDisabledSelector = (state: RootReducerState) =>
  state.order.isRecurringOrderDisabled;
export const isFetchingSelector = (state: RootReducerState) =>
  state.order.isFetching || false;
