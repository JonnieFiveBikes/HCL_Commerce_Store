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

export const ordersSelector = (state: RootReducerState) => state.account.orders;

const addressDetailsSelector = (state: RootReducerState) => state.account.address;

export { addressDetailsSelector };
