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
import { put, select } from "redux-saga/effects";
//Redux
import * as ERRORS from "../../../constants/errors";
import {
  HANDLE_SESSION_ERROR_ACTION,
  RESET_ERROR_SUCCESS_ACTION,
  VALIDATION_ERROR_ACTION,
  RESET_SESSION_POPUP_LOGON_ERROR_ACTION,
} from "../../actions/error";
import { defaultStates } from "../../reducers/initStates";
import { sessionErrorSelector } from "../../selectors/error";
//Foundation libraries
import { getSite } from "../../../_foundation/hooks/useSite";
import { ResponseError as Error } from "_foundation/types/response-error";
let handlingError = false;

const isApprovalError = (e: Error) => {
  let rc = false;
  if (e?.response) {
    const { data } = e.response;
    const { errorCode } = data ?? {};

    // master approval error-code list is here:
    // <gh02>/.../commerce-approval/blob/master/approval/src/main/resources/messages/approval-error-codes.properties
    if (errorCode?.match(/^APRV.*\d+$/)) {
      rc = true;
    }
  }
  return rc;
};

/**
 * Saga worker to invoke get orders API
 */
export function* handleAxiosErrors(action: any) {
  const mySite = getSite();
  const { payload: error }: { payload: Error } = action;
  const isLogoff =
    error.config && error.config.url.endsWith("loginidentity/@self") && error.config.method.toLowerCase() === "delete";
  //ignore logoff error
  if (error.isAxiosError && !handlingError && !isLogoff) {
    handlingError = true;
    const errorResponse = error.response;
    if (errorResponse && errorResponse.data && errorResponse.data.errors) {
      const e = errorResponse.data.errors[0];
      // handle expired session
      if (
        e.errorCode === ERRORS.EXPIRED_ACTIVITY_TOKEN_ERROR ||
        e.errorKey === ERRORS.EXPIRED_ACTIVITY_TOKEN_ERROR ||
        e.errorCode === ERRORS.ACTIVITY_TOKEN_ERROR_CODE ||
        e.errorKey === ERRORS.ACTIVITY_TOKEN_ERROR_KEY ||
        e.errorCode === ERRORS.COOKIE_EXPIRED_ERROR_CODE ||
        e.errorKey === ERRORS.COOKIE_EXPIRED_ERROR_KEY
      ) {
        const payload = {
          ...e,
          handled: false,
          errorTitleKey: "SessionError.TimeoutTitle",
          errorMsgKey: "SessionError.TimeoutMsg",
        };

        yield put(HANDLE_SESSION_ERROR_ACTION(payload));
      }
      // handle invalid session where another user logged in from different location
      else if (e.errorCode === ERRORS.INVALID_COOKIE_ERROR_CODE && e.errorKey === ERRORS.INVALID_COOKIE_ERROR_KEY) {
        const payload = {
          ...e,
          handled: false,
          errorTitleKey: "SessionError.InvalidTitle",
          errorMsgKey: mySite && mySite.isB2B ? "SessionError.InvalidMsg" : "SessionError.InvalidMsgB2C",
        };
        yield put(HANDLE_SESSION_ERROR_ACTION(payload));
      }
      // handle password expired issue.
      else if (e.errorCode === ERRORS.PASSWORD_EXPIRED_ERR_CODE || e.errorKey === ERRORS.PASSWORD_EXPIRED) {
        //reset password dialog
        const payload = {
          ...e,
          handled: false,
          errorTitleKey: "reset.title",
          errorMsgKey: "reset.errorMsg",
        };
        yield put(HANDLE_SESSION_ERROR_ACTION(payload));
      }
      // handle password expired issue.
      else if (
        e.errorCode === ERRORS.PARTIAL_AUTHENTICATION_ERROR_CODE ||
        e.errorKey === ERRORS.PARTIAL_AUTHENTICATION_ERROR_KEY
      ) {
        //reset password dialog
        const payload = {
          ...e,
          handled: false,
          errorTitleKey: "SessionError.GenericTitle",
          errorMsgKey: "SessionError.PartialAuthError",
        };
        yield put(HANDLE_SESSION_ERROR_ACTION(payload));
      } else {
        //other errors
        const payload = {
          ...e,
          handled: false,
          errorTitleKey: "SessionError.GenericTitle",
        };
        yield put(HANDLE_SESSION_ERROR_ACTION(payload));
      }
    } else if (
      errorResponse?.status === 401 &&
      errorResponse?.data?.code &&
      error?.config?.url?.startsWith("/search/resources")
    ) {
      // when search returns 401 without any error code/key, then handle as invalid session error
      const e = {
        errorKey: ERRORS.INVALID_COOKIE_ERROR_KEY,
        errorParameters: "",
        errorMessage:
          "CMN1039E: An invalid cookie was received for the user, your logonId may be in use by another user.",
        errorCode: ERRORS.INVALID_COOKIE_ERROR_CODE,
      };
      const payload = {
        ...e,
        handled: false,
        errorTitleKey: "SessionError.InvalidTitle",
        errorMsgKey: mySite && mySite.isB2B ? "SessionError.InvalidMsg" : "SessionError.InvalidMsgB2C",
      };
      yield put(HANDLE_SESSION_ERROR_ACTION(payload));
    } else {
      const errorMessage = isApprovalError(error) ? error.response.data.errorMessage : error.toLocaleString();
      const payload = { errorMessage, handled: false };
      yield put(HANDLE_SESSION_ERROR_ACTION(payload));
    }
    setTimeout(() => {
      if (handlingError) {
        handlingError = false;
      }
    }, 1000);
  }
}

export function* handleCMCSessionError() {
  const payload = {
    errorKey: ERRORS.CMC_SESSION_ERROR_KEY,
    handled: false,
    errorTitleKey: "SessionError.InvalidTitle",
    errorMsgKey: "SessionError.InvalidMsg",
  };
  yield put(HANDLE_SESSION_ERROR_ACTION(payload));
}

export function* resetError() {
  const sessionErrorObject = yield select(sessionErrorSelector);
  if (!sessionErrorObject.errorKey && !sessionErrorObject.errorCode) {
    //do not reset session error
    const sessionError = { ...defaultStates.error };
    yield put(RESET_ERROR_SUCCESS_ACTION(sessionError));
  } else {
    yield put(RESET_SESSION_POPUP_LOGON_ERROR_ACTION());
  }
}

export function* resetSessionError() {
  const sessionErrorObject = yield select(sessionErrorSelector);
  if (sessionErrorObject.errorKey || sessionErrorObject.errorCode) {
    //reset session error
    const sessionError = { ...defaultStates.error };
    yield put(RESET_ERROR_SUCCESS_ACTION(sessionError));
  }
}

export function* handleValidationError(action: any) {
  const payload = action.payload;
  yield put(VALIDATION_ERROR_ACTION(payload));
}
