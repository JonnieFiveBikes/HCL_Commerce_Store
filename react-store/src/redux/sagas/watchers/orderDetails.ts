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
import { takeLatest } from "redux-saga/effects";
//Redux
import { FETCH_ORDER_DETAILS_ACTION } from "../../actions/orderDetails";
import * as WORKERS from "../workers/orderDetails";

export function* watchSaga() {
  yield takeLatest(FETCH_ORDER_DETAILS_ACTION, WORKERS.getOrderDetails);
}
