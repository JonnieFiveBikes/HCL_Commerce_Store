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

const loginStatusSelector = (state: RootReducerState) => {
  return state.user.userLoggedIn || false;
};

const loginErrorMsgSelector = (state: RootReducerState) => {
  return state.user.userLoginErrorMsg;
};
const guestStatusSelector = (state: RootReducerState) => {
  return state.user.isGuest || false;
};
const rememberMeSelector = (state: RootReducerState) => {
  return state.user.rememberMe || false;
};
const wcTokenSelector = (state: RootReducerState) => {
  return state.user.WCToken;
};
const wcTrustedTokenSelector = (state: RootReducerState) => {
  return state.user.WCTrustedToken;
};

const logonIdSelector = (state: RootReducerState) => {
  return state.user.details?.logonId || "";
};

const userIdSelector = (state: RootReducerState) => {
  return state.user.userId;
};

const forUserIdSelector = (state: RootReducerState) => {
  return state.user.forUserId;
};

const userNameSelector = (state: RootReducerState) => {
  const firstName = state.user.details?.firstName || "";
  const lastName = state.user.details?.lastName || "";
  return { firstName, lastName };
};

const userInitStatusSelector = (state: RootReducerState) => {
  return state.user.initiatedFromStorage;
};

const userLastUpdatedSelector = (state: RootReducerState) => {
  return state.user.lastUpdated;
};

const registrationStatusSelector = (state: RootReducerState) => {
  return state.user.userRegistration || false;
};

export {
  loginStatusSelector,
  loginErrorMsgSelector,
  guestStatusSelector,
  wcTokenSelector,
  wcTrustedTokenSelector,
  logonIdSelector,
  registrationStatusSelector,
  userNameSelector,
  userIdSelector,
  userInitStatusSelector,
  userLastUpdatedSelector,
  forUserIdSelector,
  rememberMeSelector,
};
