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
import personService from "../../../_foundation/apis/transaction/person.service";
//Redux
import * as ACTIONS from "../../action-types/account";

/**
 * Saga worker to invoke get person details
 */
export function* fetchAddressDetails(action: any) {
  try {
    const payload = action.payload;

    const response = yield call(personService.findPersonBySelf, payload);
    const personData = response.data;

    yield put({
      type: ACTIONS.ADDRESS_DETAILS_GET_SUCCESS,
      response: personData,
    });
  } catch (error) {
    yield put({ type: ACTIONS.ADDRESS_DETAILS_GET_ERROR, error });
  }
}
