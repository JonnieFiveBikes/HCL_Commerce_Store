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
import * as WORKERS from "../workers/context";
import { USER_CONTEXT_REQUEST_ACTION } from "../../actions/context";
import {
  LOGIN_SUCCESS_ACTION,
  LOGOUT_SUCCESS_ACTION,
  GUEST_LOGIN_SUCCESS_ACTION,
  REGISTRATION_SUCCESS_ACTION,
} from "../../actions/user";

export function* watchSaga() {
  yield takeLatest(
    [
      USER_CONTEXT_REQUEST_ACTION,
      LOGIN_SUCCESS_ACTION,
      LOGOUT_SUCCESS_ACTION,
      GUEST_LOGIN_SUCCESS_ACTION,
      REGISTRATION_SUCCESS_ACTION,
    ],
    WORKERS.getUserContext
  );
}
