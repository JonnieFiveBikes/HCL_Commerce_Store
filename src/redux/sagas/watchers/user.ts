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
import * as ACTIONS from "../../action-types/user";
import * as WORKERS from "../workers/user";
import { CANCEL_SESSION_ERROR_ACTION } from "../../actions/error";
import {
  SESSION_ERROR_LOGIN_REQUESTED_ACTION,
  INIT_STATE_FROM_STORAGE_ACTION,
  LOGOUT_REQUESTED_ACTION,
  LISTEN_USER_FROM_STORAGE_ACTION,
} from "../../actions/user";

export function* watchSaga() {
  //storage
  yield takeLatest(
    INIT_STATE_FROM_STORAGE_ACTION,
    WORKERS.initStateFromStorage
  );
  yield takeLatest(
    LISTEN_USER_FROM_STORAGE_ACTION,
    WORKERS.updateStateFromStorage
  );
  //login
  yield takeLatest(ACTIONS.LOGIN_REQUESTED, WORKERS.login);
  yield takeLatest(
    SESSION_ERROR_LOGIN_REQUESTED_ACTION,
    WORKERS.sessionErrorReLogin
  );
  //logout
  yield takeLatest(
    [CANCEL_SESSION_ERROR_ACTION, LOGOUT_REQUESTED_ACTION],
    WORKERS.logout
  );
  //registration
  yield takeLatest(ACTIONS.REGISTRATION_REQUESTED, WORKERS.registration);
}
