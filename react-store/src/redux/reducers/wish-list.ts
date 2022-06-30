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
import { createReducer, AnyAction } from "@reduxjs/toolkit";
//Redux
import initStates from "./initStates";
import * as ACTIONS from "../action-types/wish-list";
import {
  WISHLIST_RESET_ACTION,
  WISHLIST_MOVE_ITEMS_ACTION,
  WISHLIST_MOVE_ITEMS_RESET_ACTION,
} from "../actions/wish-list";

/**
 * Wish List reducer
 * handles states used by wish list related components
 * @param state State object managed by wish list reducer
 * @param action The dispatched action
 */
const wishListReducer = createReducer(initStates.wishList, (builder) => {
  builder.addCase(ACTIONS.WISHLIST_GET_SUCCESS, (state, action: AnyAction) => {
    state.list = action.response.GiftList;
  });
  builder.addCase(WISHLIST_RESET_ACTION, (state, action: AnyAction) => {
    state.list = null;
  });
  builder.addCase(WISHLIST_MOVE_ITEMS_ACTION, (state, action: AnyAction) => {
    state.movementData = action.payload;
  });
  builder.addCase(WISHLIST_MOVE_ITEMS_RESET_ACTION, (state, action: AnyAction) => {
    state.movementData = null;
  });
});
export default wishListReducer;
