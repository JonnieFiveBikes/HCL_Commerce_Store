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
//Redux
import { RootReducerState } from "../reducers";

const getWishListSelector = (state: RootReducerState) => state.wishList.list;
const wishListItemMoveSelector = (state: RootReducerState) => state.wishList.movementData;
export { getWishListSelector, wishListItemMoveSelector };
