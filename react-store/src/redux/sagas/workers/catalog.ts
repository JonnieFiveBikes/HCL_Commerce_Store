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
import productsService from "../../../_foundation/apis/search/products.service";
//Redux
import * as ACTIONS from "../../action-types/catalog";

/**
 * Saga worker to invoke get product list API
 */
export function* fetchProductList(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(productsService.findProductsUsingGET, payload.parameters);
    yield put({
      type: ACTIONS.PRODUCT_LIST_GET_SUCCESS,
      response: response.data,
      payload: payload,
    });
  } catch (error) {
    yield put({ type: ACTIONS.PRODUCT_LIST_GET_ERROR, error });
  }
}

/**
 * Saga worker to invoke get product list API for PDP
 */
export function* fetchProductListForPDP(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(productsService.findProductsUsingGET, payload.parameters);
    yield put({
      type: ACTIONS.PRODUCT_LIST_FOR_PDP_GET_SUCCESS,
      response: response.data,
      payload: payload,
    });
  } catch (error) {
    yield put({ type: ACTIONS.PRODUCT_LIST_FOR_PDP_GET_ERROR, error });
  }
}

export function* fetchProductListDetails(action: any) {
  try {
    const payload = action.payload;
    const params = payload.parameters;
    const r = yield call(productsService.findProductsUsingGET, params);
    const response = r.data;
    yield put({ type: ACTIONS.PRODUCT_LIST_DEETS_S, response, payload });
  } catch (error) {
    yield put({ type: ACTIONS.PRODUCT_LIST_DEETS_F, error });
  }
}
