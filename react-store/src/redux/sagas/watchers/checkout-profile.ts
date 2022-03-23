/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import { takeLatest } from "redux-saga/effects";
import * as a from "../../actions/checkout-profile";
import * as w from "../workers/checkout-profile";

export function* watchSaga() {
  yield takeLatest(a.CPROF_FETCH_ALL_ACTION, w.fetchAllProfilesSelf);
  yield takeLatest(a.CPROF_DELETE_ACTION, w.deleteProfileById);
  yield takeLatest(a.CPROF_CREATE_ACTION, w.createProfile);
  yield takeLatest(a.CPROF_UPDATE_ACTION, w.editProfileById);
}
