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
import { takeLatest } from "redux-saga/effects";
//Redux
import * as WORKERS from "../workers/organization";
import { ENTITLED_ORG_ACTION, ORG_SWITCH_ACTION, GET_ORGANIZATION_ADDRESS_ACTION } from "../../actions/organization";
import {
  LOGIN_SUCCESS_ACTION,
  LOGOUT_SUCCESS_ACTION,
  GUEST_LOGIN_SUCCESS_ACTION,
  REGISTRATION_SUCCESS_ACTION,
} from "../../actions/user";

export function* watchSaga() {
  yield takeLatest(
    [
      ENTITLED_ORG_ACTION,
      LOGIN_SUCCESS_ACTION,
      LOGOUT_SUCCESS_ACTION,
      GUEST_LOGIN_SUCCESS_ACTION,
      REGISTRATION_SUCCESS_ACTION,
    ],
    WORKERS.getEntitledOrg
  );
  yield takeLatest(ORG_SWITCH_ACTION, WORKERS.switchOrg);
  yield takeLatest(GET_ORGANIZATION_ADDRESS_ACTION, WORKERS.getOrganizationDetails);
}
