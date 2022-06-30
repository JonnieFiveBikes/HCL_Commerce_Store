/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import { call, put } from "redux-saga/effects";
//Foundation libraries
import countryService from "../../../_foundation/apis/transaction/country.service";
//Redux
import * as ACTIONS from "../../action-types/country";

/**
 * Saga worker to invoke get person details
 */
export function* findCountryStateList(action: any) {
  try {
    const payload = action.payload;

    const response = yield call(countryService.findCountryStateList, payload);
    const countries = response?.data?.countries;
    yield put({
      type: ACTIONS.COUNTRY_STATE_LIST_GET_SUCCESS,
      payload: countries,
    });
  } catch (error) {
    yield put({ type: ACTIONS.COUNTRY_STATE_LIST_GET_ERROR, error });
  }
}
