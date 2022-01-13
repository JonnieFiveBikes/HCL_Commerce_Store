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
//Redux
import { RootReducerState } from "../reducers";

export const confirmationSelector = (state: RootReducerState) => {
  return state.confirmation;
};

export const confirmationCommsSelector = (state: RootReducerState) => {
  return state.confirmation.comms;
};
