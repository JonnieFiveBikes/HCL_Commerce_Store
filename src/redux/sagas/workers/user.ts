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
import { call, put, select } from "redux-saga/effects";
//Foundation libraries
import { PERSONALIZATION_ID } from "../../../_foundation/constants/user";
import { WC_PREVIEW_TOKEN } from "../../../_foundation/constants/common";
import loginIdentity from "../../../_foundation/apis/transaction/loginIdentity.service";
import {
  localStorageUtil,
  storageSessionHandler,
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
  GUEST_LOGIN_SUCCESS_ACTION,
} from "../../actions/user";
import { userLastUpdatedSelector } from "../../selectors/user";

function* loginAndFetchDetail(payload: any) {
  const response = yield call(loginIdentity.login, payload);
  let loginPayload = response.data;
  if (payload?.widget) {
    loginPayload["widget"] = payload.widget;
  }
  yield put(LOGIN_SUCCESS_ACTION(loginPayload));
  const response2 = yield call(personService.findPersonBySelf, payload);
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
    storageSessionHandler.removeCurrentUser();
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
  const payload = action.payload;
  try {
    yield call(loginIdentity.logout, payload);
    yield put(LOGOUT_SUCCESS_ACTION(payload));
  } catch (error) {
    yield put({ type: ACTIONS.LOGOUT_ERROR, error });
    //still need to clear user token, event though logout fail to avoid infinite loop
    yield put(LOGOUT_SUCCESS_ACTION(payload));
  }
}

export function* registration(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(personService.registerPerson, payload);
    yield put(REGISTRATION_SUCCESS_ACTION(response.data));
    const response2 = yield call(personService.findPersonBySelf, payload);
    yield put(FETCH_USER_DETAILS_SUCCESS_ACTION(response2.data));
  } catch (error) {
    yield put({ type: ACTIONS.REGISTRATION_ERROR, error });
  }
}

export function* initStateFromStorage(action: any) {
  try {
    let currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
    if (currentUser === null) {
      //
      // if we have both previewtoken and newPreviewSession, the current user is removed in inistates.ts
      // then we should get new personalizationID from preview session
      const previewToken = storageSessionHandler.getPreviewToken();
      if (!previewToken || !previewToken[WC_PREVIEW_TOKEN]) {
        let personalizationID = localStorageUtil.get(PERSONALIZATION_ID);
        if (personalizationID !== null) {
          currentUser = { personalizationID };
        }
      }
    }
    if (action?.payload?.widget) {
      currentUser["widget"] = action.payload.widget;
    }
    yield put(INIT_USER_FROM_STORAGE_SUCCESS_ACTION(currentUser));
  } catch (e) {
    console.warn(e);
  }
}

export function* updateStateFromStorage(action: any) {
  try {
    let currentUser = storageSessionHandler.getCurrentUserAndLoadAccount();
    const userLastUpdated = yield select(userLastUpdatedSelector);
    if (
      currentUser &&
      currentUser.lastUpdated &&
      (!userLastUpdated || userLastUpdated < currentUser.lastUpdated)
    ) {
      if (action?.payload?.widget) {
        currentUser["widget"] = action.payload.widget;
      }
      yield put(INIT_USER_FROM_STORAGE_SUCCESS_ACTION(currentUser));
      if (currentUser.isGuest) {
        yield put(GUEST_LOGIN_SUCCESS_ACTION(action.payload));
      } else {
        yield put(LOGIN_SUCCESS_ACTION(action.payload));
      }
    }
  } catch (e) {
    console.warn(e);
  }
}
