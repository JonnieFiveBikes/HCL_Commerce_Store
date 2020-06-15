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
//Standard libraries
import { takeLatest } from "redux-saga/effects";
//Redux
import * as ACTIONS from "../../action-types/catalog";
import * as WORKERS from "../workers/catalog";

/**
 * Catalog watch saga
 * watchers to intercept catalog actions
 */
export function* watchSaga() {
  yield takeLatest(
    ACTIONS.PRODUCT_LIST_GET_REQUESTED,
    WORKERS.fetchProductList
  );
  yield takeLatest(
    ACTIONS.PRODUCT_LIST_FOR_PDP_GET_REQUESTED,
    WORKERS.fetchProductListForPDP
  );
}
