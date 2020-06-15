/*
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
import { INIT_SITE_SUCCESS_ACTION } from "../actions/site";

/**
 * Session error reducer
 */
const siteReducer = createReducer(initStates.error, (builder) => {
  builder.addCase(
    INIT_SITE_SUCCESS_ACTION,
    (state: any | any, action: AnyAction) => {
      Object.assign(state, { currentSite: { ...action.payload } });
    }
  );
});
export default siteReducer;
