/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
//Standard libraries
import { createAction } from "@reduxjs/toolkit";
//Redux
import * as ACTIONTYPES from "../action-types/orderDetails";

const FETCH_ORDER_DETAILS_ACTION = createAction<any, string>(ACTIONTYPES.FETCH_ORDER_DETAILS);

const FETCH_ORDER_DETAILS_SUCCESS_ACTION = createAction<any, string>(ACTIONTYPES.FETCH_ORDER_DETAILS_SUCCESS);

const FETCH_ORDER_DETAILS_FAIL_ACTION = createAction<any, string>(ACTIONTYPES.FETCH_ORDER_DETAILS_FAIL);

const FETCH_ORDER_ITEM_DETAILS_SUCCESS_ACTION = createAction<any, string>(ACTIONTYPES.FETCH_ORDER_ITEMS_SUCCESS);

const FETCH_ORDER_ITEM_FAIL_ACTION = createAction<any, string>(ACTIONTYPES.FETCH_ORDER_ITEMS_FAIL);

export {
  FETCH_ORDER_DETAILS_ACTION,
  FETCH_ORDER_DETAILS_SUCCESS_ACTION,
  FETCH_ORDER_DETAILS_FAIL_ACTION,
  FETCH_ORDER_ITEM_DETAILS_SUCCESS_ACTION,
  FETCH_ORDER_ITEM_FAIL_ACTION as FETCH_ORDER_ITEM_DETAILS_FAIL_ACTION,
};
