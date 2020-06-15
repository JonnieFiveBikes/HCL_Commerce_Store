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
import { OrganizationReducerState } from "./reducerStateInterface";
import {
  OPEN_CONFIRMATION_ACTION,
  CONFIRMATION_HANDLED_ACTION,
  CONFIRMATION_CANCELLED_ACTION,
} from "../actions/confirmation";
/**
 * confirmation reducer
 */
const confirmationReducer = createReducer(
  initStates.confirmation,
  (builder) => {
    builder.addCase(
      OPEN_CONFIRMATION_ACTION,
      (state: OrganizationReducerState | any, action: AnyAction) => {
        Object.assign(state, action.payload);
      }
    );
    builder.addCase(
      CONFIRMATION_HANDLED_ACTION,
      (state: OrganizationReducerState | any, action: AnyAction) => {
        for (var variableKey in state) {
          if (state.hasOwnProperty(variableKey)) {
            delete state[variableKey];
          }
        }
      }
    );
    builder.addCase(
      CONFIRMATION_CANCELLED_ACTION,
      (state: OrganizationReducerState | any, action: AnyAction) => {
        for (var variableKey in state) {
          if (state.hasOwnProperty(variableKey)) {
            delete state[variableKey];
          }
        }
      }
    );
  }
);
export default confirmationReducer;
