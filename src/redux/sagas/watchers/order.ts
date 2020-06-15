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
import { takeLatest, call } from "redux-saga/effects";
//Redux
import * as ACTIONS from "../../action-types/order";
import * as WORKERS from "../workers/order";
import { GET_CART_ACTION, COPY_CART_SUCCESS_ACTION } from "../../actions/order";
import {
  LOGIN_SUCCESS_ACTION,
  LOGOUT_SUCCESS_ACTION,
  GUEST_LOGIN_SUCCESS_ACTION,
  INIT_USER_FROM_STORAGE_SUCCESS_ACTION,
} from "../../actions/user";

/**
 * Order watch saga
 * watchers to intercept order actions
 */
export function* watchSaga() {
  yield takeLatest(ACTIONS.ITEM_ADD_REQUESTED, WORKERS.addItem);
  yield takeLatest(ACTIONS.COPY_CART, WORKERS.copyCart);
  yield takeLatest(ACTIONS.ITEM_REMOVE_REQUESTED, removeItemAndFetchCart);
  yield takeLatest(
    [
      GET_CART_ACTION,
      LOGIN_SUCCESS_ACTION,
      LOGOUT_SUCCESS_ACTION,
      GUEST_LOGIN_SUCCESS_ACTION,
      COPY_CART_SUCCESS_ACTION,
    ],
    WORKERS.fetchCart
  );
  yield takeLatest(
    INIT_USER_FROM_STORAGE_SUCCESS_ACTION,
    WORKERS.initFromStorageFetchCart
  );
  yield takeLatest(ACTIONS.ITEM_UPDATE_REQUESTED, updateItemAndFetchCart);
  yield takeLatest(ACTIONS.SHIPINFO_GET_REQUESTED, WORKERS.fetchShipInfo);
  yield takeLatest(ACTIONS.SHIPINFO_UPDATE_REQUESTED, WORKERS.updateShipInfo);
  yield takeLatest(ACTIONS.SHIPMODES_GET_REQUESTED, WORKERS.fetchShipModes);
  yield takeLatest(
    ACTIONS.SHIPMODE_UPDATE_REQUESTED,
    updateShipModeAndFetchCart
  );
  yield takeLatest(
    ACTIONS.SHIPMODE_UPDATE_AND_PI_ADD_REQUESTED,
    WORKERS.updateShipModeFetchCartAndAddPI
  );
  yield takeLatest(ACTIONS.PAYMETHODS_GET_REQUESTED, WORKERS.fetchPayMethods);
  yield takeLatest(ACTIONS.PI_ADD_REQUESTED, WORKERS.addPI);
  yield takeLatest(ACTIONS.ORDER_PLACE_REQUESTED, WORKERS.placeOrder);
  yield takeLatest(
    ACTIONS.RECURRINGORDER_PLACE_REQUESTED,
    WORKERS.placeRecurringOrder
  );
}

function* removeItemAndFetchCart(action: any) {
  yield call(WORKERS.removeItem, action);
  yield call(WORKERS.fetchCart, action);
}

function* updateItemAndFetchCart(action: any) {
  yield call(WORKERS.updateItem, action);
  yield call(WORKERS.fetchCart, action);
}

function* updateShipModeAndFetchCart(action: any) {
  yield call(WORKERS.updateShipMode, action);
  yield call(WORKERS.fetchCart, action);
}
