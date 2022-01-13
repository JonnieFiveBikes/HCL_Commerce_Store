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
import { LS_LANG_CHANGE_ACTION } from "../../actions/local-storage";
import { persistLang2LocalStorage } from "../workers/local-storage";

export function* watchSaga() {
  yield takeLatest(LS_LANG_CHANGE_ACTION, persistLang2LocalStorage);
}
