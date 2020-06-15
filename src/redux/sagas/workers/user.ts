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
import { call, put } from "redux-saga/effects";
//Foundation libraries
import {
  CURRENT_USER,
  PERSONALIZATION_ID,
} from "../../../_foundation/constants/user";
import { WC_PREVIEW_TOKEN } from "../../../_foundation/constants/common";
import loginIdentity from "../../../_foundation/apis/transaction/loginIdentity.service";
import {
  sessionStorageUtil,
  localStorageUtil,
} from "../../../_foundation/utils/storageUtil";
import personService from "../../../_foundation/apis/transaction/person.service";
//Redux
import * as ACTIONS from "../../action-types/user";
import {
  REGISTRATION_SUCCESS_ACTION,
  LOGOUT_SUCCESS_ACTION,
  LOGIN_SUCCESS_ACTION,
  INIT_USER_FROM_STORAGE_SUCCESS_ACTION,
  FETCH_USER_DETAILS_SUCCESS_ACTION,
  SESSION_ERROR_LOGIN_ERROR_ACTION,
} from "../../actions/user";

function* loginAndFetchDetail(payload: any) {
  const response = yield call(loginIdentity.login, payload);
  yield put(LOGIN_SUCCESS_ACTION(response.data));
  const response2 = yield call(personService.findPersonBySelf, {});
  yield put(FETCH_USER_DETAILS_SUCCESS_ACTION(response2.data));
}

export function* login(action: any) {
  try {
    const payload = action.payload;
    yield* loginAndFetchDetail(payload);
  } catch (error) {
    yield put({ type: ACTIONS.LOGIN_ERROR, error });
  }
}

export function* sessionErrorReLogin(action: any) {
  try {
    const payload = action.payload;
    sessionStorageUtil.remove(CURRENT_USER);
    yield* loginAndFetchDetail(payload);
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors[0]
    ) {
      yield put(
        SESSION_ERROR_LOGIN_ERROR_ACTION(error.response.data.errors[0])
      );
    }
  }
}

export function* logout(action: any) {
  try {
    yield call(loginIdentity.logout, {});
    yield put(LOGOUT_SUCCESS_ACTION());
  } catch (error) {
    yield put({ type: ACTIONS.LOGOUT_ERROR, error });
    //still need to clear user token, event though logout fail to avoid infinite loop
    yield put(LOGOUT_SUCCESS_ACTION());
  }
}

export function* registration(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(personService.registerPerson, payload);
    yield put(REGISTRATION_SUCCESS_ACTION(response.data));
    const response2 = yield call(personService.findPersonBySelf, {});
    yield put(FETCH_USER_DETAILS_SUCCESS_ACTION(response2.data));
  } catch (error) {
    yield put({ type: ACTIONS.REGISTRATION_ERROR, error });
  }
}

export function* initStateFromStorage(action: any) {
  try {
    let currentUser = sessionStorageUtil.get(CURRENT_USER);
    if (currentUser === null) {
      //
      // if we have both previewtoken and newPreviewSession, the current user is removed in inistates.ts
      // then we should get new personalizationID from preview session
      const previewToken = sessionStorageUtil.get(WC_PREVIEW_TOKEN);
      if (!previewToken || !previewToken[WC_PREVIEW_TOKEN]) {
        let personalizationID = localStorageUtil.get(PERSONALIZATION_ID);
        if (personalizationID !== null) {
          currentUser = { personalizationID };
        }
      }
    }
    yield put(INIT_USER_FROM_STORAGE_SUCCESS_ACTION(currentUser));
  } catch (e) {
    console.warn(e);
  }
}
