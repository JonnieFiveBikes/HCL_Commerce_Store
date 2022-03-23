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
import { takeLeading } from "redux-saga/effects";
//Redux
import * as WORKERS from "../workers/category";
import { UPDATE_CATEGORIES_STATE_ACTION } from "../../actions/category";
export function* watchSaga() {
  yield takeLeading(UPDATE_CATEGORIES_STATE_ACTION, WORKERS.updateCategoriesState);
}
