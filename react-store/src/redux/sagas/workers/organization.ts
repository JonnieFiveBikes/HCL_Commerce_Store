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
  GET_ORGANIZATION_ADDRESS_SUCCESS_ACTION,
  GET_ORGANIZATION_ADDRESS_ERROR_ACTION,
} from "../../actions/organization";
import { USER_CONTEXT_REQUEST_ACTION } from "../../actions/context";
import { FETCH_CONTRACT_REQUESTED_ACTION } from "../../actions/contract";
import { FETCHING_CART_ACTION } from "../../actions/order";

export function* getEntitledOrg(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(organizationService.getEntitledOrganizations, payload);
    yield put(ENTITLED_ORG_SUCCESS_ACTION(response.data));
  } catch (e) {
    yield put(ENTITLED_ORG_ERROR_ACTION(e));
  }
}

export function* switchOrg(action: any) {
  try {
    const { callback, ...payload } = action.payload;
    yield call(switchOrganizationService.changeOrganization, payload);
    yield put(FETCHING_CART_ACTION(payload));
    yield put(USER_CONTEXT_REQUEST_ACTION(payload));
    yield put(FETCH_CONTRACT_REQUESTED_ACTION(payload));
    callback && callback();
  } catch (e) {
    yield put(ORG_SWITCH_ERROR_ACTION(e));
  }
}

export function* getOrganizationDetails(action: any) {
  try {
    const response = yield call(organizationService.findByOrganizationId, action.payload);
    yield put(GET_ORGANIZATION_ADDRESS_SUCCESS_ACTION(response.data));
  } catch (e) {
    yield put(GET_ORGANIZATION_ADDRESS_ERROR_ACTION(e));
  }
}
