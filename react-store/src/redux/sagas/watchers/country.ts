/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import { takeLatest } from "redux-saga/effects";
//Redux
import * as ACTIONS from "../../actions/country";
import * as WORKERS from "../workers/country";

/**
 * Account watch saga
 * watchers to intercept account actions
 */
export function* watchSaga() {
  yield takeLatest(ACTIONS.GET_COUNTRY_STATE_LIST_ACTION, WORKERS.findCountryStateList);
}
