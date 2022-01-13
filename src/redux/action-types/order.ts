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
//Add item to cart
export const ITEM_ADD_REQUESTED = "ITEM_ADD_REQUESTED";
export const ITEM_ADD_SUCCESS = "ITEM_ADD_SUCCESS";
export const ITEM_ADD_ERROR = "ITEM_ADD_ERROR";
export const COPY_CART = "COPY_CART";
export const COPY_CART_ERROR = "COPY_CART_ERROR";
export const COPY_CART_SUCCESS = "COPY_CART_SUCCESS";

//Remove item to cart
export const ITEM_REMOVE_REQUESTED = "ITEM_REMOVE_REQUESTED";
export const ITEM_REMOVE_SUCCESS = "ITEM_REMOVE_SUCCESS";
export const ITEM_REMOVE_ERROR = "ITEM_REMOVE_ERROR";

//Update item in cart
export const ITEM_UPDATE_REQUESTED = "ITEM_UPDATE_REQUESTED";
export const ITEM_UPDATE_SUCCESS = "ITEM_UPDATE_SUCCESS";
export const ITEM_UPDATE_ERROR = "ITEM_UPDATE_ERROR";

//Get current user's cart
/**
 * The action set fetching state to true.
 */
export const CART_FETCHING_REQUESTED = "CART_FETCHING_REQUESTED";
export const CART_GET_REQUESTED = "CART_GET_REQUESTED";
export const CART_GET_SUCCESS = "CART_GET_SUCCESS";
export const CART_GET_ERROR = "CART_GET_ERROR";

//Get current cart's usable shipping info
export const SHIPINFO_GET_REQUESTED = "SHIPINFO_GET_REQUESTED";
export const SHIPINFO_GET_SUCCESS = "SHIPINFO_GET_SUCCESS";
export const SHIPINFO_GET_ERROR = "SHIPINFO_GET_ERROR";

//Get current cart's usable shipping modes
export const SHIPMODES_GET_REQUESTED = "SHIPMODES_GET_REQUESTED";
export const SHIPMODES_GET_SUCCESS = "SHIPMODES_GET_SUCCESS";
export const SHIPMODES_GET_ERROR = "SHIPMODES_GET_ERROR";

//update current cart's shipping mode
export const SHIPMODE_UPDATE_REQUESTED = "SHIPMODE_UPDATE_REQUESTED";
export const SHIPMODE_UPDATE_SUCCESS = "SHIPMODE_UPDATE_SUCCESS";
export const SHIPMODE_UPDATE_ERROR = "SHIPMODE_UPDATE_ERROR";

//Get current cart's usable payment methods
export const PAYMETHODS_GET_REQUESTED = "PAYMETHODS_GET_REQUESTED";
export const PAYMETHODS_GET_SUCCESS = "PAYMETHODS_GET_SUCCESS";
export const PAYMETHODS_GET_ERROR = "PAYMETHODS_GET_ERROR";

//Reset cart states
export const CART_RESET_REQUESTED = "CART_RESET_REQUESTED";
export const CART_RESET_SUCCESS = "CART_RESET_SUCCESS";
export const CART_RESET_ERROR = "CART_RESET_ERROR";

//Get Orders States
export const FETCH_ALL_ORDERS = "FETCH_ALL_ORDERS";
export const FETCH_ALL_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ALL_ORDERS_ERROR = "FETCH_ORDERS_ERROR";

// get allowable ship-modes (not from cart)
export const FETCH_ALLOWABLE_SHIPMODES = "FETCH_ALLOWABLE_SHIPMODES";
export const FETCH_ALLOWABLE_SHIPMODES_SUCCESS =
  "FETCH_ALLOWABLE_SHIPMODES_SUCCESS";
export const FETCH_ALLOWABLE_SHIPMODES_ERROR =
  "FETCH_ALLOWABLE_SHIPMODES_ERROR";

//Set Active In Progress Order States
export const SET_ACTIVE_INPROGRESS_ORDER = "SET_ACTIVE_INPROGRESS_ORDER";
export const RESET_ACTIVE_INPROGRESS_ORDER = "RESET_ACTIVE_INPROGRESS_ORDER";

//Fetch Active In Progress Order Item States
export const FETCH_ACTIVE_INPROGRESS_ORDER_ITEM =
  "FETCH_ACTIVE_INPROGRESS_ORDER_ITEM";
export const FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_SUCCESS =
  "FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_SUCCESS";
export const FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_ERROR =
  "FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_ERROR";

// update and remove inprogress order-item states
export const REMOVE_INPROGRESS_ORDER_ITEM = "REMOVE_INPROGRESS_ORDER_ITEM";
export const UPDATE_INPROGRESS_ORDER_ITEM = "UPDATE_INPROGRESS_ORDER_ITEM";

export const FETCH_ALLOWABLE_PAYMETHODS = "FETCH_ALLOWABLE_PAYMETHODS";
export const FETCH_ALLOWABLE_PAYMETHODS_S = "FETCH_ALLOWABLE_PAYMETHODS_S";
export const FETCH_ALLOWABLE_PAYMETHODS_F = "FETCH_ALLOWABLE_PAYMETHODS_F";
