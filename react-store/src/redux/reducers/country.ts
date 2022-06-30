/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import { createReducer, AnyAction } from "@reduxjs/toolkit";
//Redux
import initStates from "./initStates";
import * as ACTIONS from "../action-types/country";

/**
 * Country reducer
 */
const countryReducer = createReducer(initStates.countries, (builder) => {
  builder.addCase(ACTIONS.COUNTRY_STATE_LIST_GET_SUCCESS, (state, action: AnyAction) => {
    state.countries = action.payload;
  });
});
export default countryReducer;
