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
import { RecurringOrderReducerState } from "./reducerStateInterface";
import {
  FETCH_RECURRING_SUCCESS_ACTION,
  CANCEL_RECURRING_SUCCESS_ACTION,
} from "../actions/recurringOrder";

const recurringOrderReducer = createReducer(
  initStates.confirmation,
  (builder) => {
    builder.addCase(
      FETCH_RECURRING_SUCCESS_ACTION,
      (state: RecurringOrderReducerState | any, action: AnyAction) => {
        Object.assign(state, action.payload);
      }
    );
    builder.addCase(
      CANCEL_RECURRING_SUCCESS_ACTION,
      (state: RecurringOrderReducerState | any, action: AnyAction) => {
        const subscriptionId = action.payload.subscriptionId[0];
        const susState = action.payload.state[0];
        state.resultList.forEach((o) => {
          if (o.subscriptionIdentifier.subscriptionId === subscriptionId) {
            o.state = susState;
          }
        });
      }
    );
  }
);
export default recurringOrderReducer;
