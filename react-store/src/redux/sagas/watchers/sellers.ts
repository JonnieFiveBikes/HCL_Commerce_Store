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
import { takeLatest } from "redux-saga/effects";
import { REG_SELLER_ACTION, SELLERS_GET_ACTION, SET_SELLER_ACTION } from "../../actions/sellers";
import { getSellers, registerSeller, setSeller } from "../workers/sellers";

export function* watchSaga() {
  yield takeLatest(SELLERS_GET_ACTION, getSellers);
  yield takeLatest(SET_SELLER_ACTION, setSeller);
  yield takeLatest(REG_SELLER_ACTION, registerSeller);
}
