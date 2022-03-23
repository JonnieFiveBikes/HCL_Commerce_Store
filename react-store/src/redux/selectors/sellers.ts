/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
import { RootReducerState } from "../reducers";

const sellersSelector = (state: RootReducerState) => {
  return state.sellers;
};

const selectedSellersSelector = (state: RootReducerState) => {
  return state.sellers.selected;
};

export { sellersSelector, selectedSellersSelector };
