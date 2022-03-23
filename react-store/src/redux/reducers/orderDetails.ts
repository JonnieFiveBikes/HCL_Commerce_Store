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
import storeUtil from "../../utils/storeUtil";
import { get } from "lodash-es";

/**
 * Order details reducer. Order details state store all order details per user session.
 * handles states used by order details components
 * @param state State object managed by OderDetails reducer
 * @param action The dispatched action
 */
const orderDetailsReducer = createReducer(initStates.orderDetails, (builder) => {
  builder.addCase(LOGIN_SUCCESS_ACTION, (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
    clearState(state);
  });
  builder.addCase(LOGOUT_SUCCESS_ACTION, (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
    clearState(state);
  });
  builder.addCase(GUEST_LOGIN_SUCCESS_ACTION, (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
    clearState(state);
  });
  builder.addCase(REGISTRATION_SUCCESS_ACTION, (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
    clearState(state);
  });
  builder.addCase(FETCH_ORDER_DETAILS_SUCCESS_ACTION, (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
    const { orderId, orderItem } = action.payload;
    const { detailedOrderItems } = orderItem ? get(state, orderId, {}) : [];
    state[orderId] = { ...action.payload, detailedOrderItems };
  });

  builder.addCase(
    FETCH_ORDER_ITEM_DETAILS_SUCCESS_ACTION,
    (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
      const { orderId, items } = action.payload;
      const newAsMap = storeUtil.toMap(items ?? [], "id");
      let detailedOrderItems: any[] = [];

      if (items.length && items.length > 0) {
        const orderItems: any[] = state[orderId].orderItem;
        detailedOrderItems = orderItems.map((item) => {
          const obj = {
            ...item,
            name: "",
            thumbnail: "",
            attributes: [],
            seo: { href: "" },
            manufacturer: "",
            price: [],
          };
          const newItem = newAsMap[item.productId];
          const { id, name, thumbnail, attributes, seo, manufacturer, price } = newItem;
          return {
            ...obj,
            id,
            name,
            thumbnail,
            attributes,
            seo,
            manufacturer,
            price,
          };
        });
      }

      // now update the detailed-items
      Object.assign(state[orderId], { detailedOrderItems });
    }
  );
  builder.addCase(FETCH_ORDER_DETAILS_FAIL_ACTION, (state: OrderDetailsMapReducerState | any, action: AnyAction) => {
    const { orderId } = action.payload;
    state[orderId] = action.payload;
  });
});

export default orderDetailsReducer;
