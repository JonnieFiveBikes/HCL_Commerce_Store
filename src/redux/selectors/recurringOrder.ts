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
//Redux
import { RootReducerState } from "../reducers";

const recurringOrderSelector = (state: RootReducerState) => {
  return state.recurringOrder.resultList;
};
export { recurringOrderSelector };
