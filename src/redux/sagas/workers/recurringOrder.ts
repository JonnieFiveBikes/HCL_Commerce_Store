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
import { AnyAction } from "redux";
import { call, put, select } from "redux-saga/effects";
//Foundation libraries
import subscriptionService from "../../../_foundation/apis/transaction/subscription.service";
//Redux
import {
  FETCH_RECURRING_SUCCESS_ACTION,
  FETCH_RECURRING_ERROR_ACTION,
  CANCEL_RECURRING_SUCCESS_ACTION,
  CANCEL_RECURRING_ERROR_ACTION,
} from "../../actions/recurringOrder";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../actions/success";
import { userIdSelector } from "../../selectors/user";

export function* fetchRecurringOrders(action: AnyAction) {
  const subscriptionTypeCode = "RecurringOrder";
  const profileName = "IBM_Store_Summary";
  try {
    const buyerId = yield select(userIdSelector);
    const response = yield call(
      subscriptionService.byBuyerIdAndSubscriptionType,
      {
        buyerId,
        subscriptionTypeCode,
        profileName,
      }
    );
    yield put(FETCH_RECURRING_SUCCESS_ACTION(response.data));
  } catch (e) {
    yield put(FETCH_RECURRING_ERROR_ACTION(e));
  }
}

export function* cancelRecurringOrder(action: AnyAction) {
  try {
    const { orderId, subscriptionId } = action.payload;
    const response = yield call(
      subscriptionService.cancelRecurringOrSubscription,
      { orderId, subscriptionId }
    );
    yield put(CANCEL_RECURRING_SUCCESS_ACTION(response.data));
    const successMessage = {
      key: "success-message.RecurringOrderCancelled",
    };
    yield put(HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
  } catch (e) {
    yield put(CANCEL_RECURRING_ERROR_ACTION(e));
  }
}
