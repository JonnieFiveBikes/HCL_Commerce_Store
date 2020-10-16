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
import * as ACTIONTYPES from "../action-types/order";

const ADD_ITEM_ACTION = createAction<any, string>(
  ACTIONTYPES.ITEM_ADD_REQUESTED
);
const REMOVE_ITEM_ACTION = createAction<any, string>(
  ACTIONTYPES.ITEM_REMOVE_REQUESTED
);
const UPDATE_ITEM_ACTION = createAction<any, string>(
  ACTIONTYPES.ITEM_UPDATE_REQUESTED
);
/**
 * The action set fetching state to true.
 */
const FETCHING_CART_ACTION = createAction<any, string>(
  ACTIONTYPES.CART_FETCHING_REQUESTED
);
const GET_CART_ACTION = createAction<any, string>(
  ACTIONTYPES.CART_GET_REQUESTED
);
const COPY_CART_ACTION = createAction<any, string>(ACTIONTYPES.COPY_CART);
const COPY_CART_SUCCESS_ACTION = createAction<any, string>(
  ACTIONTYPES.COPY_CART_SUCCESS
);
const COPY_CART_ERROR_ACTION = createAction<any, string>(
  ACTIONTYPES.COPY_CART_ERROR
);

const GET_SHIPINFO_ACTION = createAction<any, string>(
  ACTIONTYPES.SHIPINFO_GET_REQUESTED
);

const GET_SHIPMODES_ACTION = createAction<any, string>(
  ACTIONTYPES.SHIPMODES_GET_REQUESTED
);

const UPDATE_SHIPMODE_ACTION = createAction<any, string>(
  ACTIONTYPES.SHIPMODE_UPDATE_REQUESTED
);

const GET_PAYMETHODS_ACTION = createAction<any, string>(
  ACTIONTYPES.PAYMETHODS_GET_REQUESTED
);

const RESET_CART_ACTION = createAction(ACTIONTYPES.CART_RESET_REQUESTED);

export {
  ADD_ITEM_ACTION,
  REMOVE_ITEM_ACTION,
  UPDATE_ITEM_ACTION,
  FETCHING_CART_ACTION,
  GET_CART_ACTION,
  GET_SHIPINFO_ACTION,
  GET_SHIPMODES_ACTION,
  UPDATE_SHIPMODE_ACTION,
  GET_PAYMETHODS_ACTION,
  COPY_CART_ACTION,
  COPY_CART_SUCCESS_ACTION,
  COPY_CART_ERROR_ACTION,
  RESET_CART_ACTION,
};
