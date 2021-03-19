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
import * as ACTIONTYPES from "../action-types/user";

const LOGIN_REQUESTED_ACTION = createAction<any, string>(
  ACTIONTYPES.LOGIN_REQUESTED
);
const LOGOUT_REQUESTED_ACTION = createAction<any, string>(
  ACTIONTYPES.LOGOUT_REQUESTED
);
const LOGIN_SUCCESS_ACTION = createAction<any, string>(
  ACTIONTYPES.LOGIN_SUCCESS
);
const SESSION_ERROR_LOGIN_REQUESTED_ACTION = createAction<any, string>(
  ACTIONTYPES.SESSION_ERROR_LOGIN_REQUESTED
);
const SESSION_ERROR_LOGIN_ERROR_ACTION = createAction<any, string>(
  ACTIONTYPES.SESSION_ERROR_LOGIN_ERROR
);
const LOGOUT_SUCCESS_ACTION = createAction<any, string>(
  ACTIONTYPES.LOGOUT_SUCCESS
);

const GUEST_LOGIN_SUCCESS_ACTION = createAction<any, string>(
  ACTIONTYPES.GUEST_LOGIN_SUCCESS
);
const loginErrorAction = createAction<any, string>(ACTIONTYPES.LOGIN_ERROR);
const registrationAction = createAction<any, string>(
  ACTIONTYPES.REGISTRATION_REQUESTED
);
const REGISTRATION_SUCCESS_ACTION = createAction<any, string>(
  ACTIONTYPES.REGISTRATION_SUCCESS
);
const registrationErrorAction = createAction<any, string>(
  ACTIONTYPES.REGISTRATION_ERROR
);

const INIT_USER_FROM_STORAGE_SUCCESS_ACTION = createAction<any, string>(
  ACTIONTYPES.INIT_USER_FROM_STORAGE_SUCCESS
);

const INIT_STATE_FROM_STORAGE_ACTION = createAction<any, string>(
  ACTIONTYPES.INIT_STATE_FROM_STORAGE
);

const FETCH_USER_DETAILS_SUCCESS_ACTION = createAction<any, string>(
  ACTIONTYPES.FETCH_USER_DETAILS_SUCCESS
);

const LISTEN_USER_FROM_STORAGE_ACTION = createAction<any, string>(
  ACTIONTYPES.LISTEN_USER_FROM_STORAGE
);

const LOGON_AND_CHANGE_PASSWORD_ACTION = createAction<any, string>(
  ACTIONTYPES.LOGON_AND_CHANGE_PASSWORD_REQUESTED
);

const LOGON_AND_CHANGE_PASSWORD_FAIL_ACTION = createAction<any, string>(
  ACTIONTYPES.LOGON_AND_CHANGE_PASSWORD_FAIL
);

export {
  LOGIN_REQUESTED_ACTION,
  LOGIN_SUCCESS_ACTION,
  SESSION_ERROR_LOGIN_REQUESTED_ACTION,
  LOGOUT_REQUESTED_ACTION,
  LOGOUT_SUCCESS_ACTION,
  GUEST_LOGIN_SUCCESS_ACTION,
  loginErrorAction,
  registrationAction,
  REGISTRATION_SUCCESS_ACTION,
  registrationErrorAction,
  INIT_USER_FROM_STORAGE_SUCCESS_ACTION,
  INIT_STATE_FROM_STORAGE_ACTION,
  FETCH_USER_DETAILS_SUCCESS_ACTION,
  SESSION_ERROR_LOGIN_ERROR_ACTION,
  LISTEN_USER_FROM_STORAGE_ACTION,
  LOGON_AND_CHANGE_PASSWORD_ACTION,
  LOGON_AND_CHANGE_PASSWORD_FAIL_ACTION,
};
