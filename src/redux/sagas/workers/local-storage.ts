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

import { put } from "redux-saga/effects";
import { CommerceEnvironment } from "../../../constants/common";
import { LS_LANG_CHANGE_DONE_ACTION } from "../../actions/local-storage";

export function* persistLang2LocalStorage(action: any) {
  const payload = action.payload;
  const newLang = CommerceEnvironment.languageMap[payload.newLangId];
  yield put(LS_LANG_CHANGE_DONE_ACTION({ newLang }));
}
