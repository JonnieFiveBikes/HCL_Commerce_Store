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
import { takeLatest, takeLeading } from "redux-saga/effects";
//Redux
import * as WORKERS from "../workers/error";
import {
  RESET_ERROR_ACTION,
  RESET_SESSION_ERROR_ACTION,
  WATCH_AXIOS_ERROR_ACTION,
  VALIDATION_ERROR_ACTION,
  CANCEL_SESSION_ERROR_ACTION,
  CMC_SESSION_ERROR_ACTION,
  CANCEL_REMEMBER_ME_SESSION_ERROR_ACTION,
} from "../../actions/error";
export function* watchSaga() {
  yield takeLatest(RESET_ERROR_ACTION, WORKERS.resetError);
  yield takeLatest(
    [CANCEL_SESSION_ERROR_ACTION, CANCEL_REMEMBER_ME_SESSION_ERROR_ACTION, RESET_SESSION_ERROR_ACTION],
    WORKERS.resetSessionError
  );
  yield takeLeading(WATCH_AXIOS_ERROR_ACTION, WORKERS.handleAxiosErrors);
  yield takeLeading(VALIDATION_ERROR_ACTION, WORKERS.handleValidationError);
  yield takeLeading(CMC_SESSION_ERROR_ACTION, WORKERS.handleCMCSessionError);
}
