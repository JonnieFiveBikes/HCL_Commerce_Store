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
  builder.addCase(GET_SEO_CONFIG_SUCCESS_ACTION, (state: SEOReducerState | any, action: AnyAction) => {
    const seoconfig = getSEOConfigFromPayload(action.payload);

    // delete all other seo-urls in the state -- no need to cache since we'll refetch them anyway --
    //   keeping them in the cache re-renders the target component twice: once from cache, once from
    //   the refetch, which is terrible for state-wise tracking
    const hasOwn = Object.prototype.hasOwnProperty.bind(state);
    Object.keys(state)
      .filter(hasOwn)
      .forEach((k) => delete state[k]);

    Object.assign(state, seoconfig);
  });
});
export default seoReducer;
