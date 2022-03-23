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
import { ContextReducerState } from "./reducerStateInterface";
import { USER_CONTEXT_REQUEST_SUCCESS_ACTION } from "../actions/context";
/**
 * context reducer
 */
const contextReducer = createReducer(initStates.context, (builder) => {
  builder.addCase(USER_CONTEXT_REQUEST_SUCCESS_ACTION, (state: ContextReducerState | any, action: AnyAction) => {
    Object.assign(state, action.payload);
  });
});
export default contextReducer;
