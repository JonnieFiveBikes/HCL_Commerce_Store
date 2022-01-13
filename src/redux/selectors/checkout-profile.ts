/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import { RootReducerState } from "../reducers";

export const checkoutProfileSelector = (state: RootReducerState) => {
  return state.checkoutProfile;
};
