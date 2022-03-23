/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import { put } from "redux-saga/effects";
//REDUX
import { UPDATE_CATEGORIES_STATE_ACTION } from "../../actions/category";

export function* updateCategoriesState(action: any) {
  const payload = action.payload;
  yield put(UPDATE_CATEGORIES_STATE_ACTION(payload));
}
