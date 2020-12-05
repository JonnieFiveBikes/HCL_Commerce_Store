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
import userContextService from "../../../_foundation/apis/transaction/userContext.service";
//Redux
import {
  USER_CONTEXT_REQUEST_ERROR_ACTION,
  USER_CONTEXT_REQUEST_SUCCESS_ACTION,
} from "../../actions/context";

export function* getUserContext(action: any) {
  try {
    const response = yield call(
      userContextService.getContextData,
      action.payload
    );
    yield put(USER_CONTEXT_REQUEST_SUCCESS_ACTION(response.data));
  } catch (e) {
    yield put(USER_CONTEXT_REQUEST_ERROR_ACTION(e));
  }
}
