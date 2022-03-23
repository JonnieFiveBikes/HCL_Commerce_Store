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
import { HANDLE_SUCCESS_MESSAGE_ACTION, RESET_SUCCESS_MESSAGE_ACTION } from "../actions/success";

const successReducer = createReducer(initStates.success, (builder) => {
  builder.addCase(HANDLE_SUCCESS_MESSAGE_ACTION, (state, action: AnyAction) => {
    Object.assign(state, action.payload);
  });

  builder.addCase(RESET_SUCCESS_MESSAGE_ACTION, (state, action: AnyAction) => {
    for (const variableKey in state) {
      if (Object.prototype.hasOwnProperty.call(state, variableKey)) {
        delete state[variableKey];
      }
    }
  });
});

export default successReducer;
