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
import { SEOReducerState } from "./reducerStateInterface";
import { GET_SEO_CONFIG_SUCCESS_ACTION } from "../actions/seo";

const getSEOConfigFromPayload = ({ identifier, seoconfig }) => {
  seoconfig.page["tokenValue"] = seoconfig.tokenValue;
  seoconfig.page["tokenName"] = seoconfig.tokenName;
  seoconfig.page.externalContext = {
    identifier: seoconfig.tokenExternalValue,
  };
  return { [identifier]: seoconfig };
};
/**
 * SEO reducer
 */
const seoReducer = createReducer(initStates.seo, (builder) => {
  builder.addCase(
    GET_SEO_CONFIG_SUCCESS_ACTION,
    (state: SEOReducerState | any, action: AnyAction) => {
      const seoconfig = getSEOConfigFromPayload(action.payload);
      Object.assign(state, { ...seoconfig });
    }
  );
});
export default seoReducer;
