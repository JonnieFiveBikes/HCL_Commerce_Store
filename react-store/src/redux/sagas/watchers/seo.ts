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
import { GET_SEO_CONFIG_ACTION } from "../../actions/seo";
import * as WORKERS from "../workers/seo";

export function* watchSaga() {
  yield takeLatest(GET_SEO_CONFIG_ACTION, WORKERS.getSEO);
}
