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
import { createAction } from "@reduxjs/toolkit";
//Redux
import * as ACTIONTYPES from "../action-types/wish-list";

export const GET_USER_WISHLIST_ACTION = createAction<any>(ACTIONTYPES.WISHLIST_GET_REQUESTED);
export const WISHLIST_RESET_ACTION = createAction(ACTIONTYPES.WISHLIST_RESET);
export const WISHLIST_DELETE_ACTION = createAction<any, string>(ACTIONTYPES.WISHLIST_DELETE);
export const WISHLIST_DELETE_ITEM_ACTION = createAction<any, string>(ACTIONTYPES.WISHLIST_DELETE_ITEM);
export const WISHLIST_MOVE_ITEMS_ACTION = createAction<any, string>(ACTIONTYPES.WISHLIST_MOVE_ITEMS);
export const WISHLIST_MOVE_ITEMS_RESET_ACTION = createAction<any, string>(ACTIONTYPES.WISHLIST_MOVE_ITEMS_RESET);
