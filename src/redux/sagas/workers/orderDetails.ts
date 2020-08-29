/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
//Standard libraries
import { call, put } from "redux-saga/effects";
import chunk from "lodash/chunk";
//Foundation libraries
import orderService from "../../../_foundation/apis/transaction/order.service";
import productsService from "../../../_foundation/apis/search/products.service";
//Redux
import {
  FETCH_ORDER_DETAILS_SUCCESS_ACTION,
  FETCH_ORDER_ITEM_DETAILS_SUCCESS_ACTION,
  FETCH_ORDER_ITEM_DETAILS_FAIL_ACTION,
  FETCH_ORDER_DETAILS_FAIL_ACTION,
} from "../../actions/orderDetails";

export function* getOrderDetails(action: any) {
  const { orderId, currency, contractId } = action.payload;
  try {
    const response = yield call(orderService.findByOrderId, action.payload);
    const orderDetails = response.data;
    yield put(FETCH_ORDER_DETAILS_SUCCESS_ACTION(orderDetails));
    try {
      const orderItems: any[] = orderDetails.orderItem;
      const id = [...new Set(orderItems.map((i) => i.productId))];
      const itemDetailsParams = { id, currency, contractId };
      const itemDetails = yield call(
        fetchOrderItemDetailsByIds,
        itemDetailsParams
      );
      yield put(
        FETCH_ORDER_ITEM_DETAILS_SUCCESS_ACTION({
          orderId,
          items: itemDetails,
        })
      );
    } catch (error) {
      yield put(FETCH_ORDER_ITEM_DETAILS_FAIL_ACTION(error));
    }
  } catch (error) {
    yield put(FETCH_ORDER_DETAILS_FAIL_ACTION({ orderId, error }));
  }
}

export const fetchOrderItemDetailsByIds = (param: any) => {
  const promiseArray: Promise<any>[] = [];
  const { currency, id } = param;
  const paramBase = { currency };
  const ids = chunk(id, 50);
  ids.forEach((id) => {
    const param = Object.assign({}, paramBase, { id });
    promiseArray.push(productsService.findProductsUsingGET(param));
  });
  return Promise.all(promiseArray).then((rs) => {
    let contents = [];
    rs.forEach((r) => {
      if (r.data?.contents) {
        contents = contents.concat(r.data.contents);
      }
    });
    return contents;
  });
};
