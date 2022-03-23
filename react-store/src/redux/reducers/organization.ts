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
import { ENTITLED_ORG_SUCCESS_ACTION, GET_ORGANIZATION_ADDRESS_SUCCESS_ACTION } from "../actions/organization";
/**
 * Organization reducer
 */
const organizationReducer = createReducer(initStates.organization, (builder) => {
  builder.addCase(ENTITLED_ORG_SUCCESS_ACTION, (state: OrganizationReducerState | any, action: AnyAction) => {
    Object.assign(state, action.payload);
  });
  builder.addCase(
    GET_ORGANIZATION_ADDRESS_SUCCESS_ACTION,
    (state: OrganizationReducerState | any, action: AnyAction) => {
      state.organizationDetails = action.payload;
    }
  );
});
export default organizationReducer;
