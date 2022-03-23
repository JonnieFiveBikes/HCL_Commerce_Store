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
import { takeLatest } from "redux-saga/effects";
//Redux
import * as ACTIONS from "../../action-types/account";
import * as WORKERS from "../workers/account";

/**
 * Account watch saga
 * watchers to intercept account actions
 */
export function* watchSaga() {
  yield takeLatest(ACTIONS.ADDRESS_DETAILS_GET_REQUESTED, WORKERS.fetchAddressDetails);
}
