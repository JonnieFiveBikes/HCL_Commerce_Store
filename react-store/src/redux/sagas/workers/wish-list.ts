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
import { RF_JSON } from "../../../constants/common";

//Foundation libraries
import wishListService from "../../../_foundation/apis/transaction/wishList.service";
//Redux
import * as ACTIONS from "../../action-types/wish-list";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../actions/success";
import { GET_USER_WISHLIST_ACTION, WISHLIST_RESET_ACTION } from "../../actions/wish-list";

/**
 * Saga worker to invoke get wish list details
 */
export function* fetchWishListDetails(action: any) {
  try {
    const payload = action.payload;

    const response = yield call(wishListService.findWishlist, payload);
    const wishListData = response.data;

    yield put({
      type: ACTIONS.WISHLIST_GET_SUCCESS,
      response: wishListData,
    });
  } catch (error) {
    yield put({ type: ACTIONS.WISHLIST_GET_ERROR, error });
  }
}
export function* deleteWishlistByExternalId(action: any) {
  const { externalId, wishListName, length, payloadBase } = action.payload;
  try {
    yield call(wishListService.deleteWishlist, { externalId, RF_JSON });

    if (length === 1) {
      yield put(WISHLIST_RESET_ACTION());
    } else {
      yield put(GET_USER_WISHLIST_ACTION({ ...payloadBase }));
    }

    const msg = {
      key: "success-message.DELETE_WISHLIST_SUCCESS",
      messageParameters: { "0": wishListName },
    };
    yield put(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
  } catch (e) {
    yield put({ type: ACTIONS.WISHLIST_GET_ERROR, e });
  }
}

export function* deleteWishListItem(action: any) {
  const { externalId, payloadBase, itemId, productName, deleteMsgSnackbar } = action.payload;
  try {
    yield call(wishListService.deleteWishlist, { externalId, RF_JSON, itemId });

    yield put(GET_USER_WISHLIST_ACTION({ ...payloadBase }));

    if (deleteMsgSnackbar) {
      const msg = {
        key: "success-message.DELETE_WISHLIST_ITEM_SUCCESS",
        messageParameters: { "0": productName },
      };
      yield put(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
    }
  } catch (e) {
    yield put({ type: ACTIONS.WISHLIST_GET_ERROR, e });
  }
}
