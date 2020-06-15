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
import { createAction } from "@reduxjs/toolkit";
//Redux
import * as ACTIONTYPES from "../action-types/error";
import { ErrorReducerState } from "../reducers/reducerStateInterface";
import { WACTH_AXIOS_ERROR } from "../action-types/error";

const HANDLE_SESSION_ERROR_ACTION = createAction<ErrorReducerState, string>(
  ACTIONTYPES.HANDLE_SESSION_ERROR
);
const RESET_ERROR_ACTION = createAction(ACTIONTYPES.RESET_ERROR);
const RESET_SESSION_ERROR_ACTION = createAction(
  ACTIONTYPES.RESET_SESSION_ERROR
);
const CANCEL_SESSION_ERROR_ACTION = createAction("CANCEL_SESSION_ERROR");
const RESET_ERROR_SUCCESS_ACTION = createAction<
  ErrorReducerState | any,
  string
>(ACTIONTYPES.RESET_SESSION_ERROR_SUCCESS);
const RESET_SESSION_POPUP_LOGON_ERROR_ACTION = createAction(
  "RESET_SESSION_POPUP_LOGON_ERROR"
);
const WATCH_AXIOS_ERROR_ACTION = createAction<any, string>(WACTH_AXIOS_ERROR);
const VALIDATION_ERROR_ACTION = createAction<ErrorReducerState, string>(
  ACTIONTYPES.VALIDATION_ERROR
);
export {
  HANDLE_SESSION_ERROR_ACTION,
  RESET_ERROR_ACTION,
  RESET_ERROR_SUCCESS_ACTION,
  RESET_SESSION_ERROR_ACTION,
  WATCH_AXIOS_ERROR_ACTION,
  VALIDATION_ERROR_ACTION,
  RESET_SESSION_POPUP_LOGON_ERROR_ACTION,
  CANCEL_SESSION_ERROR_ACTION,
};
