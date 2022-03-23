/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
import { createReducer, AnyAction } from "@reduxjs/toolkit";
import initStates from "./initStates";
import { CheckoutProfileReducerState } from "./reducerStateInterface";
import { CPROF_FETCH_ALL_SUCCESS_ACTION } from "../actions/checkout-profile";
import storeUtil from "../../utils/storeUtil";
import {
  GUEST_LOGIN_SUCCESS_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGOUT_SUCCESS_ACTION,
  REGISTRATION_SUCCESS_ACTION,
} from "../actions/user";

/**
 * checkout-profile reducer
 */
const checkoutProfileReducer = createReducer(initStates.checkoutProfile, (builder) => {
  builder.addCase(CPROF_FETCH_ALL_SUCCESS_ACTION, (state: CheckoutProfileReducerState | any, action: AnyAction) => {
    const p = action.payload;
    const r = p.profiles;
    const a = p.addresses;
    const m = storeUtil.toMap(a, "nickName");
    const curUserProfiles = r.map((c) => ({
      ...c,
      billingAddress: m[c.billing_nickName],
      shippingAddress: m[c.shipping_nickName],
      isValid: m[c.billing_nickName] && m[c.shipping_nickName],
    }));
    Object.assign(state, { curUserProfiles });
  });

  // clean redux-state on user-changes
  builder.addCase(LOGIN_SUCCESS_ACTION, (state: CheckoutProfileReducerState, action: AnyAction) => {
    Object.assign(state, { curUserProfiles: [] });
  });
  builder.addCase(LOGOUT_SUCCESS_ACTION, (state: CheckoutProfileReducerState, action: AnyAction) => {
    Object.assign(state, { curUserProfiles: [] });
  });
  builder.addCase(GUEST_LOGIN_SUCCESS_ACTION, (state: CheckoutProfileReducerState, action: AnyAction) => {
    Object.assign(state, { curUserProfiles: [] });
  });
  builder.addCase(REGISTRATION_SUCCESS_ACTION, (state: CheckoutProfileReducerState, action: AnyAction) => {
    Object.assign(state, { curUserProfiles: [] });
  });
});
export default checkoutProfileReducer;
