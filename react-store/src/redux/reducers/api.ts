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
import * as ACTIONS from "../action-types/api";
import initStates from "./initStates";

/**
 * API reducer
 * handles states used by api related components for development use
 * @param state State object managed by api reducer
 * @param action The dispatched action
 */
const apiReducer = createReducer(initStates.api, (builder) => {
  builder.addCase(ACTIONS.API_CALL_REQUESTED, (state, action: AnyAction) => {
    state.apiFlowList.push(action.payload);
  });
});

export default apiReducer;
