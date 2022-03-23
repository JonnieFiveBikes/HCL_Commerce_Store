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

import { createReducer } from "@reduxjs/toolkit";
import { LS_LANG_CHANGE_DONE_ACTION } from "../actions/local-storage";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import { LOCALE } from "../../_foundation/constants/common";

const localStorageReducer = createReducer({}, (builder) => {
  builder.addCase(LS_LANG_CHANGE_DONE_ACTION, (state: any, action: any) => {
    const o = localStorageUtil.get(LOCALE);
    const n = action.payload.newLang;
    localStorageUtil.set(LOCALE, n ?? o, 30);
  });
});
export default localStorageReducer;
