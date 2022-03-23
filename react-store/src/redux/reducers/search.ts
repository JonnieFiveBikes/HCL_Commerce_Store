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
import { KEYWORDS_UPDATED_ACTION, KEYWORDS_RESET_ACTION } from "../actions/search";
import { SearchReducerState } from "./reducerStateInterface";

/**
 * Search keywords reducer
 * handles state for the search keyword suggestions
 * @param state State object managed by search keywords reducer
 * @param action The dispatched action
 */
const keywordReducer = createReducer(initStates.search, (builder) => {
  builder.addCase(KEYWORDS_UPDATED_ACTION, (state: SearchReducerState | any, action: AnyAction) => {
    state.keywords = action.payload;
  });

  builder.addCase(KEYWORDS_RESET_ACTION, (state: SearchReducerState | any, action: AnyAction) => {
    state.keywords = initStates.search;
  });
});

export default keywordReducer;
