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
import { FETCH_RECURRING_SUCCESS_ACTION, CANCEL_RECURRING_SUCCESS_ACTION } from "../actions/recurringOrder";
import { LOGOUT_SUCCESS_ACTION } from "../actions/user";

const recurringOrderReducer = createReducer(initStates.recurringOrder, (builder) => {
  builder.addCase(FETCH_RECURRING_SUCCESS_ACTION, (state: RecurringOrderReducerState, action: AnyAction) => {
    if (action?.payload?.resultList === undefined) {
      resetRecurringOrder(state, action);
    } else {
      Object.assign(state, action.payload);
    }
  });
  builder.addCase(CANCEL_RECURRING_SUCCESS_ACTION, (state: RecurringOrderReducerState, action: AnyAction) => {
    const subscriptionId = action.payload.subscriptionId[0];
    const susState = action.payload.state[0];
    state.resultList.forEach((o) => {
      if (o.subscriptionIdentifier.subscriptionId === subscriptionId) {
        o.state = susState;
      }
    });
  });

  builder.addCase(LOGOUT_SUCCESS_ACTION, resetRecurringOrder);
});

function resetRecurringOrder(state: RecurringOrderReducerState, action: AnyAction) {
  Object.assign(state, initStates.recurringOrder);
}

export default recurringOrderReducer;
