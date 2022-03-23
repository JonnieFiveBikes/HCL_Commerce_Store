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
import { FETCH_CONTRACT_REQUESTED_ACTION, CONTRACT_SWITCH_ACTION } from "../../actions/contract";
import * as WORKERS from "../workers/contract";
import {
  LOGIN_SUCCESS_ACTION,
  LOGOUT_SUCCESS_ACTION,
  GUEST_LOGIN_SUCCESS_ACTION,
  REGISTRATION_SUCCESS_ACTION,
} from "../../actions/user";

export function* watchSaga() {
  yield takeLatest(
    [
      LOGIN_SUCCESS_ACTION,
      LOGOUT_SUCCESS_ACTION,
      GUEST_LOGIN_SUCCESS_ACTION,
      REGISTRATION_SUCCESS_ACTION,
      FETCH_CONTRACT_REQUESTED_ACTION,
    ],
    WORKERS.fetchContract
  );
  yield takeLatest(CONTRACT_SWITCH_ACTION, WORKERS.switchContract);
}
