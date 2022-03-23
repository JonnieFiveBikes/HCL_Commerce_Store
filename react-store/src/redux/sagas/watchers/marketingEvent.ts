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
import { takeEvery } from "redux-saga/effects";
//Redux
import { CLICK_EVENT_TRIGGERED_ACTION, TRIGGER_MARKETING_ACTION } from "../../actions/marketingEvent";
import { performClickEvent, performTriggerMarketing } from "../workers/marketingEvent";

export function* watchSaga() {
  yield takeEvery(CLICK_EVENT_TRIGGERED_ACTION, performClickEvent);
  yield takeEvery(TRIGGER_MARKETING_ACTION, performTriggerMarketing);
}
