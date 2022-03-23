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
//Foundation libraries
import { localStorageUtil, storageSessionHandler } from "../../_foundation/utils/storageUtil";
import { PERSONALIZATION_ID, INITIATED_FROM_STORAGE } from "../../_foundation/constants/user";
//Custom libraries
import { PERMANENT_STORE_DAYS } from "../../configs/common";
//Redux
import initStates from "./initStates";
import { UserReducerState } from "./reducerStateInterface";
import {
  LOGIN_SUCCESS_ACTION,
  LOGOUT_SUCCESS_ACTION,
  GUEST_LOGIN_SUCCESS_ACTION,
  loginErrorAction,
  REGISTRATION_SUCCESS_ACTION,
  registrationErrorAction,
  INIT_USER_FROM_STORAGE_SUCCESS_ACTION,
  FETCH_USER_DETAILS_SUCCESS_ACTION,
} from "../actions/user";
import { CANCEL_REMEMBER_ME_SESSION_ERROR_ACTION } from "../actions/error";

const clearUserState = (userState: any) => {
  for (const variableKey in userState) {
    if (
      variableKey !== PERSONALIZATION_ID &&
      variableKey !== INITIATED_FROM_STORAGE &&
      Object.prototype.hasOwnProperty.call(userState, variableKey)
    ) {
      delete userState[variableKey];
    }
  }
};
/**
 * User reducer
 * handles states used by user related components
 * @param state State object managed by user reducer
 * @param action The dispatched action
 */
const userReducer = createReducer(initStates.user, (builder) => {
  builder.addCase(LOGIN_SUCCESS_ACTION, (state: UserReducerState | any, action: AnyAction) => {
    if (action.payload) {
      Object.assign(state, action.payload, {
        userLoggedIn: true,
        isGuest: false,
        //lastUpdated is not needed here, since we will fetch details right after.
      });
      //user does not choose remember as a precaution, delete rememberMe
      if (!action.payload.rememberMe) {
        delete state.rememberMe;
      }
      storageSessionHandler.saveCurrentUser(state);
      //set personalizationID to localStorage
      const { personalizationID } = action.payload;
      localStorageUtil.set(PERSONALIZATION_ID, personalizationID, PERMANENT_STORE_DAYS);
    }
    //else is init from storage.
  });

  builder.addCase(INIT_USER_FROM_STORAGE_SUCCESS_ACTION, (state: UserReducerState | any, action: AnyAction) => {
    clearUserState(state);
    if (action.payload !== null) {
      Object.assign(state, action.payload, {
        [INITIATED_FROM_STORAGE]: true,
      });
    } else {
      Object.assign(state, {
        [INITIATED_FROM_STORAGE]: true,
      });
    }
  });

  builder.addCase(loginErrorAction, (state: UserReducerState | any, action: AnyAction) => {
    // state.userLoginErrorMsg = Object.assign({}, action.error.response);
    Object.assign(state, { userLoggedIn: false, isGuest: false });
    return state;
  });

  builder.addCase(LOGOUT_SUCCESS_ACTION, (state: UserReducerState | any, action: AnyAction) => {
    clearUserState(state);
    storageSessionHandler.removeCurrentUser();
    state.lastUpdated = Date.now();
  });
  builder.addCase(GUEST_LOGIN_SUCCESS_ACTION, (state: UserReducerState | any, action: AnyAction) => {
    if (action.payload) {
      delete state.rememberMe;
      Object.assign(state, action.payload);
      state.userLoggedIn = false;
      state.isGuest = true;
      state.lastUpdated = Date.now();
      const { personalizationID } = action.payload;
      localStorageUtil.set(PERSONALIZATION_ID, personalizationID, PERMANENT_STORE_DAYS);
      storageSessionHandler.saveCurrentUser(state);
    }
    //else is init from storage.
  });
  builder.addCase(REGISTRATION_SUCCESS_ACTION, (state: UserReducerState | any, action: AnyAction) => {
    Object.assign(state, action.payload);
    state.userRegistration = true;
    state.userLoggedIn = true;
    state.isGuest = false;
    state.lastUpdated = Date.now();
    if (!action.payload.rememberMe) {
      delete state.rememberMe;
    }
    storageSessionHandler.saveCurrentUser(state);
    const { personalizationID } = state;
    localStorageUtil.set(PERSONALIZATION_ID, personalizationID, PERMANENT_STORE_DAYS);
  });

  builder.addCase(registrationErrorAction, (state: UserReducerState | any, action: AnyAction) => {
    // state.userRegistrationErrorMsg = Object.assign({}, action.error.response);
    state.userRegistration = false;
    state.isGuest = true;
    return state;
  });
  builder.addCase(FETCH_USER_DETAILS_SUCCESS_ACTION, (state: UserReducerState | any, action: AnyAction) => {
    Object.assign(state, {
      details: action.payload,
      lastUpdated: Date.now(),
    });
    storageSessionHandler.saveCurrentUser(state);
  });
  //remember me session error turn into partial auth.
  builder.addCase(CANCEL_REMEMBER_ME_SESSION_ERROR_ACTION, (state: UserReducerState | any, action: AnyAction) => {
    delete state.WCToken;
    delete state.WCTrustedToken;
    storageSessionHandler.saveCurrentUser(state);
  });
});

export default userReducer;
