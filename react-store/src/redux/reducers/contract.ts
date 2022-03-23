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
import { ContractReducerState } from "./reducerStateInterface";
import { FETCH_CONTRACT_SUCCESS_ACTION } from "../actions/contract";

/**
 * Contract reducer
 */
const contractReducer = createReducer(initStates.contract, (builder) => {
  builder.addCase(FETCH_CONTRACT_SUCCESS_ACTION, (state: ContractReducerState | any, action: AnyAction) => {
    for (const variableKey in state) {
      if (Object.prototype.hasOwnProperty.call(state, variableKey)) {
        delete state[variableKey];
      }
    }
    Object.assign(state, action.payload.contracts);
  });
});
export default contractReducer;
