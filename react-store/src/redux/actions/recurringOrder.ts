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
import * as ACTIONTYPES from "../action-types/recurringOrder";

const CANCEL_RECURRING_ACTION = createAction<any, string>(ACTIONTYPES.CANCEL_RECURRING_SUBSCRIPTION);

const CANCEL_RECURRING_SUCCESS_ACTION = createAction<any, string>(ACTIONTYPES.CANCEL_RECURRING_SUCCESS);

const CANCEL_RECURRING_ERROR_ACTION = createAction<any, string>(ACTIONTYPES.CANCEL_RECURRING_ERROR);

const FETCH_RECURRING_ORDER_ACTION = createAction<any, string>(ACTIONTYPES.FETCH_RECURRING_ORDER);

const FETCH_RECURRING_SUCCESS_ACTION = createAction<any, string>(ACTIONTYPES.FETCH_RECURRING_ORDER_SUCCESS);

const FETCH_RECURRING_ERROR_ACTION = createAction<any, string>(ACTIONTYPES.FETCH_RECURRING_ORDER_ERROR);

export {
  CANCEL_RECURRING_ACTION,
  CANCEL_RECURRING_SUCCESS_ACTION,
  FETCH_RECURRING_ORDER_ACTION,
  FETCH_RECURRING_SUCCESS_ACTION,
  CANCEL_RECURRING_ERROR_ACTION,
  FETCH_RECURRING_ERROR_ACTION,
};
