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

import { AnyAction, createReducer } from "@reduxjs/toolkit";
import initStates from "./initStates";
import { SELLERS_GET_SUCCESS_ACTION, SET_SELLER_SUCCESS_ACTION } from "../actions/sellers";
import { SellerInfoState } from "./reducerStateInterface";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import { SELLER_STORAGE_KEY } from "../../constants/common";
import { PERMANENT_STORE_DAYS } from "../../configs/common";

const sellersReducer = createReducer(initStates.sellers, (builder) => {
  builder.addCase(SELLERS_GET_SUCCESS_ACTION, (state: SellerInfoState | any, action: AnyAction) => {
    const { response } = action.payload;
    const { b2b, items: marketplaceSellers } = response;
    const sellers = marketplaceSellers?.filter(({ status, onlineStatus }) => 1 === status && 1 === onlineStatus);
    const showSellerList = !b2b && sellers?.length > 0;
    Object.assign(state, response, { sellers, showSellerList, initialized: true });
  });
  builder.addCase(SET_SELLER_SUCCESS_ACTION, (state: SellerInfoState | any, action: AnyAction) => {
    const { sellers: selected } = action.payload;
    Object.assign(state, { selected });
    localStorageUtil.set(SELLER_STORAGE_KEY, selected, PERMANENT_STORE_DAYS);
  });
});

export default sellersReducer;
