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
import { createReducer, AnyAction } from "@reduxjs/toolkit";
//Redux
import initStates from "./initStates";
import { ConfirmationReducerState } from "./reducerStateInterface";
import {
  OPEN_CONFIRMATION_ACTION,
  CONFIRMATION_HANDLED_ACTION,
  CONFIRMATION_CANCELLED_ACTION,
  CONFIRMATION_COMMS_ACTION,
} from "../actions/confirmation";
import { cloneDeepWith, get, merge } from "lodash-es";
/**
 * confirmation reducer
 */
const confirmationReducer = createReducer(initStates.confirmation, (builder) => {
  builder.addCase(OPEN_CONFIRMATION_ACTION, (state: ConfirmationReducerState | any, action: AnyAction) => {
    Object.assign(state, action.payload);
  });
  builder.addCase(CONFIRMATION_HANDLED_ACTION, (state: ConfirmationReducerState | any, action: AnyAction) => {
    for (const variableKey in state) {
      if (Object.prototype.hasOwnProperty.call(state, variableKey)) {
        delete state[variableKey];
      }
    }
  });
  builder.addCase(CONFIRMATION_CANCELLED_ACTION, (state: ConfirmationReducerState | any, action: AnyAction) => {
    for (const variableKey in state) {
      if (Object.prototype.hasOwnProperty.call(state, variableKey)) {
        delete state[variableKey];
      }
    }
  });
  builder.addCase(CONFIRMATION_COMMS_ACTION, (state: ConfirmationReducerState | any, action: AnyAction) => {
    const comms = merge(cloneDeepWith(get(state, "comms", {})), action.payload);
    Object.assign(state, { comms });
  });
});
export default confirmationReducer;
