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
import * as OD_WORKERS from "../workers/orderDetails";

import { FETCHING_CART_ACTION, COPY_CART_SUCCESS_ACTION, GET_CART_ACTION } from "../../actions/order";
import {
  LOGIN_SUCCESS_ACTION,
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
    [FETCHING_CART_ACTION, GET_CART_ACTION, LOGIN_SUCCESS_ACTION, GUEST_LOGIN_SUCCESS_ACTION, COPY_CART_SUCCESS_ACTION],
    WORKERS.fetchCart
  );
  yield takeLatest(INIT_USER_FROM_STORAGE_SUCCESS_ACTION, WORKERS.initFromStorageFetchCart);
  yield takeLatest(ACTIONS.ITEM_UPDATE_REQUESTED, updateItemAndFetchCart);
  yield takeLatest([ACTIONS.SHIPINFO_GET_REQUESTED], WORKERS.fetchShipInfo);
  yield takeLatest([ACTIONS.SHIPMODES_GET_REQUESTED], WORKERS.fetchShipModes);
  yield takeLatest(ACTIONS.SHIPMODE_UPDATE_REQUESTED, updateShipModeAndFetchCart);
  yield takeLatest(ACTIONS.PAYMETHODS_GET_REQUESTED, WORKERS.fetchPayMethods);
  yield takeLatest(ACTIONS.FETCH_ALL_ORDERS, WORKERS.getAllOrders);
  yield takeLatest(ACTIONS.FETCH_ALLOWABLE_SHIPMODES, WORKERS.getAllowableShipmodes);
  yield takeLatest(ACTIONS.FETCH_ACTIVE_INPROGRESS_ORDER_ITEM, fetchInProgressOrderAndCascade);

  yield takeLatest(ACTIONS.REMOVE_INPROGRESS_ORDER_ITEM, removeInProgressItem);
  yield takeLatest(ACTIONS.UPDATE_INPROGRESS_ORDER_ITEM, updateInProgressItem);

  yield takeLatest(ACTIONS.FETCH_ALLOWABLE_PAYMETHODS, WORKERS.getAllowablePaymethods);
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

function* removeInProgressItem(action: any) {
  const { payload, ...nonPayload } = action;
  const { items, ...rest } = payload;

  for (const orderItemId of items) {
    yield call(WORKERS.removeItem, {
      ...nonPayload,
      payload: { orderItemId, ...rest },
    });
  }
  yield call(fetchInProgressOrderAndCascade, action);
}

function* updateInProgressItem(action: any) {
  yield call(WORKERS.updateItem, action);
  yield call(fetchInProgressOrderAndCascade, action);
}

function* fetchInProgressOrderAndCascade(action: any) {
  yield call(WORKERS.fetchActiveInprogressOrderItem, action);
  yield call(OD_WORKERS.getOrderDetails, action);
}
