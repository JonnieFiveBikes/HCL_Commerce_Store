/**
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
import { takeLatest } from "redux-saga/effects";
//Redux
import * as ACTIONS from "../../actions/wish-list";
import * as WORKERS from "../workers/wish-list";

/**
 * Wish List watch saga
 * watchers to intercept wish list actions
 */
export function* watchSaga() {
  yield takeLatest(ACTIONS.GET_USER_WISHLIST_ACTION, WORKERS.fetchWishListDetails);
  yield takeLatest(ACTIONS.WISHLIST_DELETE_ACTION, WORKERS.deleteWishlistByExternalId);
  yield takeLatest(ACTIONS.WISHLIST_DELETE_ITEM_ACTION, WORKERS.deleteWishListItem);
}
