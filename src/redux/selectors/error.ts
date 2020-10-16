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
//Redux
import { RootReducerState } from "../reducers";
import {
  EXPIRED_ACTIVITY_TOKEN_ERROR,
  INVALID_COOKIE_ERROR_CODE,
  INVALID_COOKIE_ERROR_KEY,
  PASSWORD_EXPIRED_ERR_CODE,
  PASSWORD_EXPIRED,
  PARTIAL_AUTHENTICATION_ERROR_CODE,
  PARTIAL_AUTHENTICATION_ERROR_KEY,
  CMC_SESSION_ERROR_KEY,
} from "../../constants/errors";
import { defaultStates } from "../reducers/initStates";
import { ErrorReducerState } from "../reducers/reducerStateInterface";

const sessionErrors = [
  EXPIRED_ACTIVITY_TOKEN_ERROR,
  INVALID_COOKIE_ERROR_CODE,
  INVALID_COOKIE_ERROR_KEY,
  PARTIAL_AUTHENTICATION_ERROR_CODE,
  PARTIAL_AUTHENTICATION_ERROR_KEY,
  CMC_SESSION_ERROR_KEY,
];
const passwordExpiredErrors = [PASSWORD_EXPIRED_ERR_CODE, PASSWORD_EXPIRED];

const sessionErrorSelector = (state: RootReducerState) => {
  const errorCode =
    state.error.errorCode === undefined || state.error.errorCode === ""
      ? undefined
      : state.error.errorCode;
  const errorKey =
    state.error.errorKey === undefined || state.error.errorKey === ""
      ? undefined
      : state.error.errorKey;
  let sessionError: ErrorReducerState | any = {
    ...defaultStates.error,
  };
  if (
    (errorCode && sessionErrors.includes(errorCode)) ||
    (errorKey && sessionErrors.includes(errorKey))
  ) {
    sessionError = state.error;
  }
  return sessionError;
};
const passwordExpiredErrorSelector = (state: RootReducerState) => {
  const errorCode =
    state.error.errorCode === undefined || state.error.errorCode === ""
      ? undefined
      : state.error.errorCode;
  const errorKey =
    state.error.errorKey === undefined || state.error.errorKey === ""
      ? undefined
      : state.error.errorKey;
  let passwordExpiredError = {};
  if (
    !(
      (errorCode && passwordExpiredErrors.includes(errorCode)) ||
      (errorKey && passwordExpiredErrors.includes(errorKey))
    )
  ) {
    passwordExpiredError = state.error;
  }
  return passwordExpiredError;
};

const genericErrorSelector = (state: RootReducerState) => {
  const errorCode =
    state.error.errorCode === undefined || state.error.errorCode === ""
      ? undefined
      : state.error.errorCode;
  const errorKey =
    state.error.errorKey === undefined || state.error.errorKey === ""
      ? undefined
      : state.error.errorKey;
  let error = {};
  if (
    !(errorCode && sessionErrors.includes(errorCode)) &&
    !(errorKey && sessionErrors.includes(errorKey))
  ) {
    error = state.error;
  } else if (
    ((errorCode && sessionErrors.includes(errorCode)) ||
      (errorKey && sessionErrors.includes(errorKey))) &&
    state.error.sessionErrorLoginError
  ) {
    error = state.error.sessionErrorLoginError;
  }
  return error;
};

export {
  sessionErrorSelector,
  passwordExpiredErrorSelector,
  genericErrorSelector,
};
