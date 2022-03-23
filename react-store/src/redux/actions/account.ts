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
import { createAction } from "@reduxjs/toolkit";
//Redux
import * as ACTIONTYPES from "../action-types/account";

/**
 * Action creator for getting list of user's orders
 * @returns Object action with action type get orders
 */
export function getOrders() {
  return { type: ACTIONTYPES.ORDERS_GET_REQUESTED };
}

const GET_ADDRESS_DETAIL_ACTION = createAction<any>(ACTIONTYPES.ADDRESS_DETAILS_GET_REQUESTED);

export { GET_ADDRESS_DETAIL_ACTION };
