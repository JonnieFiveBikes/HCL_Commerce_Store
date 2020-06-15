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
import { createReducer, AnyAction } from "@reduxjs/toolkit";
//Redux
import initStates, { clearState } from "./initStates";
import { OrderDetailsMapReducerState } from "./reducerStateInterface";
import {
  LOGIN_SUCCESS_ACTION,
  LOGOUT_SUCCESS_ACTION,
  GUEST_LOGIN_SUCCESS_ACTION,
  REGISTRATION_SUCCESS_ACTION,
} from "../actions/user";
import {
  FETCH_ORDER_DETAILS_SUCCESS_ACTION,
  FETCH_ORDER_ITEM_DETAILS_SUCCESS_ACTION,
  FETCH_ORDER_DETAILS_FAIL_ACTION,
} from "../actions/orderDetails";

/**
 * Order details reducer. Order details state store all order details per user session.
 * handles states used by order details components
 * @param state State object managed by OderDetails reducer
 * @param action The dispatched action
 */
const orderDetailsReducer = createReducer(
  initStates.orderDetails,
  (builder) => {
    builder.addCase(
      LOGIN_SUCCESS_ACTION,
      (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
        clearState(state);
      }
    );
    builder.addCase(
      LOGOUT_SUCCESS_ACTION,
      (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
        clearState(state);
      }
    );
    builder.addCase(
      GUEST_LOGIN_SUCCESS_ACTION,
      (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
        clearState(state);
      }
    );
    builder.addCase(
      REGISTRATION_SUCCESS_ACTION,
      (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
        clearState(state);
      }
    );
    builder.addCase(
      FETCH_ORDER_DETAILS_SUCCESS_ACTION,
      (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
        const { orderId } = action.payload;
        state[orderId] = action.payload;
      }
    );

    builder.addCase(
      FETCH_ORDER_ITEM_DETAILS_SUCCESS_ACTION,
      (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
        const { orderId, items } = action.payload;
        const orderItems: any[] = state[orderId].orderItem;
        if (items.length && items.length > 0) {
          const detailedOrderItems = orderItems.map((item) => {
            let obj = {
              ...item,
              name: "",
              thumbnail: "",
              attributes: [],
              seo: { href: "" },
            };
            const filteredItem =
              (items as any[]).filter(
                (i) => String(i.id) === String(item.productId)
              )[0] || {};
            const { id, name, thumbnail, attributes, seo } = filteredItem;
            Object.assign(obj, { id, name, thumbnail, attributes, seo });
            return obj;
          });
          Object.assign(state[orderId], { detailedOrderItems });
        }
      }
    );
    builder.addCase(
      FETCH_ORDER_DETAILS_FAIL_ACTION,
      (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
        const { orderId } = action.payload;
        state[orderId] = action.payload;
      }
    );
  }
);

export default orderDetailsReducer;
