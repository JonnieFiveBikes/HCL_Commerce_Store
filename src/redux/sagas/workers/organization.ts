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
import organizationService from "../../../_foundation/apis/transaction/organization.service";
import switchOrganizationService from "../../../_foundation/apis/transaction/switchOrganization.service";
//Redux
import {
  ENTITLED_ORG_ERROR_ACTION,
  ENTITLED_ORG_SUCCESS_ACTION,
  ORG_SWITCH_ERROR_ACTION,
} from "../../actions/organization";
import { USER_CONTEXT_REQUEST_ACTION } from "../../actions/context";
import { FETCH_CONTRACT_REQUESTED_ACTION } from "../../actions/contract";
import { FETCHING_CART_ACTION } from "../../actions/order";

export function* getEntitledOrg(action: any) {
  try {
    const response = yield call(
      organizationService.getEntitledOrganizations,
      {}
    );
    yield put(ENTITLED_ORG_SUCCESS_ACTION(response.data));
  } catch (e) {
    yield put(ENTITLED_ORG_ERROR_ACTION(e));
  }
}

export function* switchOrg(action: any) {
  try {
    yield call(switchOrganizationService.changeOrganization, action.payload);
    yield put(FETCHING_CART_ACTION({}));
    yield put(USER_CONTEXT_REQUEST_ACTION());
    yield put(FETCH_CONTRACT_REQUESTED_ACTION());
  } catch (e) {
    yield put(ORG_SWITCH_ERROR_ACTION(e));
  }
}
