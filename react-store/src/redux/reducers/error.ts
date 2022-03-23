/**
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
import { createReducer, AnyAction } from "@reduxjs/toolkit";
//Redux
import initStates from "./initStates";
import { ErrorReducerState } from "./reducerStateInterface";
import {
  RESET_ERROR_SUCCESS_ACTION,
  HANDLE_SESSION_ERROR_ACTION,
  VALIDATION_ERROR_ACTION,
  RESET_SESSION_POPUP_LOGON_ERROR_ACTION,
  GENERIC_ERROR_ACTION,
} from "../actions/error";
import {
  LOGIN_SUCCESS_ACTION,
  LOGON_AND_CHANGE_PASSWORD_FAIL_ACTION,
  SESSION_ERROR_LOGIN_ERROR_ACTION,
} from "../actions/user";
import { EXPIRED_PASSWORD_PAGE_ERROR } from "../../_foundation/constants/common";

/**
 * Session error reducer
 */
const errorReducer = createReducer(initStates.error, (builder) => {
  builder.addCase(HANDLE_SESSION_ERROR_ACTION, (state: ErrorReducerState | any, action: AnyAction) => {
    Object.assign(state, { ...action.payload });
    delete state[EXPIRED_PASSWORD_PAGE_ERROR];
  });
  builder.addCase(SESSION_ERROR_LOGIN_ERROR_ACTION, (state: ErrorReducerState | any, action: AnyAction) => {
    Object.assign(state, { sessionErrorLoginError: { ...action.payload } });
    delete state[EXPIRED_PASSWORD_PAGE_ERROR];
  });
  builder.addCase(LOGIN_SUCCESS_ACTION, (state: ErrorReducerState | any, action: AnyAction) => {
    if (state.handled === false) state.handled = true;
    delete state[EXPIRED_PASSWORD_PAGE_ERROR];
  });
  builder.addCase(RESET_ERROR_SUCCESS_ACTION, (state: ErrorReducerState | any, action: AnyAction) => {
    for (const variableKey in state) {
      if (Object.prototype.hasOwnProperty.call(state, variableKey)) {
        delete state[variableKey];
      }
    }
    Object.assign(state, { ...action.payload });
  });
  builder.addCase(RESET_SESSION_POPUP_LOGON_ERROR_ACTION, (state: ErrorReducerState | any, action: AnyAction) => {
    if (Object.prototype.hasOwnProperty.call(state, "sessionErrorLoginError")) {
      delete state.sessionErrorLoginError;
    }
    delete state[EXPIRED_PASSWORD_PAGE_ERROR];
  });
  builder.addCase(VALIDATION_ERROR_ACTION, (state: ErrorReducerState | any, action: AnyAction) => {
    Object.assign(state, { ...action.payload });
    delete state[EXPIRED_PASSWORD_PAGE_ERROR];
  });
  builder.addCase(LOGON_AND_CHANGE_PASSWORD_FAIL_ACTION, (state: ErrorReducerState | any, action: AnyAction) => {
    Object.assign(state, { ...action.payload });
  });
  builder.addCase(GENERIC_ERROR_ACTION, (state: ErrorReducerState | any, action: AnyAction) => {
    Object.assign(state, { ...action.payload });
  });
});
export default errorReducer;
