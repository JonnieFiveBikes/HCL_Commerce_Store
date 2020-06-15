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
import { createReducer, AnyAction } from "@reduxjs/toolkit";
import { NOT_FOUND } from "http-status-codes";
//Custom libraries
import { INVENTORY_STATUS, SHIPMODE } from "../../constants/order";
//Redux
import * as ACTIONS from "../action-types/order";
import initStates from "./initStates";
import { OrderReducerState } from "./reducerStateInterface";
import { LOGOUT_SUCCESS_ACTION } from "../actions/user";

/**
 * Order reducer
 * handles states used by order related components
 * @param state State object managed by order reducer
 * @param action The dispatched action
 */

const orderReducer = createReducer(initStates.order, (builder) => {
  builder.addCase(
    ACTIONS.ITEM_ADD_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      let quantity =
        action.payload.quantity instanceof Array
          ? action.payload.quantity.reduce((a, b) => +a + +b, 0)
          : action.payload.quantity;
      state.numItems = state.numItems + +quantity;
      state.isFetching = false;
    }
  );
  builder.addCase(
    ACTIONS.CART_GET_REQUESTED,
    (state: OrderReducerState, action: AnyAction) => {
      state.isFetching = true;
    }
  );
  builder.addCase(
    ACTIONS.CART_GET_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      const response = action.response;
      if (response) {
        const { orderItem: orderItems, ...cart } = response;
        const newCatentries = action.catentries;
        const checkInventory = action.checkInventory;

        let count = 0;
        if (orderItems) {
          orderItems.map((item: any, index: number) => {
            count += +item.quantity;
            return count;
          });
        }
        state.cart = cart;
        state.numItems = count;

        let newOrderItems: any[] = [];
        let disableRecurringOrder = false;
        let disableCheckout = false;
        if (orderItems && orderItems.length > 0) {
          let catentries = state.catentries;

          if (newCatentries !== undefined) {
            catentries = newCatentries;
            state.catentries = newCatentries;
          }

          newOrderItems = [];
          orderItems.forEach((item: any, index: number) => {
            if (checkInventory) {
              if (
                item.orderItemInventoryStatus !== INVENTORY_STATUS.available &&
                item.orderItemInventoryStatus !== INVENTORY_STATUS.allocated
              ) {
                disableCheckout = true;
              }
            }
            let obj = {
              ...item,
            };
            const catentryId = item.productId;
            if (catentries != null) {
              const catentry = catentries[catentryId];
              if (catentry !== undefined) {
                if (catentry.name !== undefined) {
                  obj["name"] = catentry.name;
                }
                if (catentry.thumbnail !== undefined) {
                  obj["thumbnail"] = catentry.thumbnail;
                }
                if (catentry.attributes !== undefined) {
                  obj["attributes"] = catentry.attributes;
                }
                if (catentry.seo !== undefined) {
                  obj["seo"] = catentry.seo;
                }
                if (catentry.disallowRecurringOrder !== undefined) {
                  obj["disallowRecurringOrder"] =
                    catentry.disallowRecurringOrder;
                  if (catentry.disallowRecurringOrder === "1") {
                    disableRecurringOrder = true;
                  }
                }
              }
            }
            newOrderItems.push(obj);
          });
          state.isCheckoutDisabled = disableCheckout;
          state.isRecurringOrderDisabled = disableRecurringOrder;
        }
        state.orderItems = newOrderItems;
      }

      if (state.isRecurringOrderDisabled) {
        state.isRecurringOrder = false;
        state.recurringOrderFrequency = "0";
        state.recurringOrderStartDate = null;
      }
      state.isFetching = false;
    }
  );

  builder.addCase(
    ACTIONS.CART_GET_ERROR,
    (state: OrderReducerState, action: AnyAction) => {
      if (
        action.error &&
        action.error.response &&
        action.error.response.status &&
        action.error.response.status === NOT_FOUND
      ) {
        state.cart = null;
        state.numItems = 0;
        state.orderItems = [];
      }
      state.isCheckoutDisabled = true;
      state.isFetching = false;
    }
  );

  builder.addCase(
    ACTIONS.SHIPINFO_GET_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      state.shipAddresses = action.response;
    }
  );
  builder.addCase(
    ACTIONS.SHIPINFO_UPDATE_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      state.checkoutActiveStep = 1;
    }
  );
  builder.addCase(
    ACTIONS.SHIPMODES_GET_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      const response = action.response;
      if (response && response.usableShippingMode) {
        state.shipModes = response.usableShippingMode.filter(
          (s) => s.shipModeCode !== SHIPMODE.shipModeCode.PickUp
        );
      }
    }
  );
  builder.addCase(
    ACTIONS.PAYMETHODS_GET_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      const response = action.response;
      if (response && response.usablePaymentInformation) {
        state.payMethods = response.usablePaymentInformation;
      }
    }
  );
  builder.addCase(
    ACTIONS.PI_ADD_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      state.checkoutActiveStep = 2;
    }
  );

  builder.addCase(
    ACTIONS.ORDER_PLACE_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      state.checkoutActiveStep = 3;
      state.numItems = 0;
    }
  );
  builder.addCase(
    ACTIONS.CHECKOUTSTEP_PREV_REQUESTED,
    (state: OrderReducerState, action: AnyAction) => {
      if (state.checkoutActiveStep > 0) {
        state.checkoutActiveStep -= 1;
      }
    }
  );
  builder.addCase(
    ACTIONS.CHECKOUTSTEP_RESET_REQUESTED,
    (state: OrderReducerState, action: AnyAction) => {
      if (state.checkoutActiveStep > 0) {
        state.checkoutActiveStep = 0;
      }
    }
  );
  builder.addCase(
    ACTIONS.RECURRINGORDER_TOGGLE_REQUESTED,
    (state: OrderReducerState, action: AnyAction) => {
      state.isRecurringOrder = !state.isRecurringOrder;
      if (!state.isRecurringOrder) {
        state.recurringOrderFrequency = "0";
        state.recurringOrderStartDate = null;
      }
    }
  );
  builder.addCase(
    ACTIONS.RECURRINGORDER_FREQ_SET_REQUESTED,
    (state: OrderReducerState, action: AnyAction) => {
      state.recurringOrderFrequency = action.payload;
    }
  );
  builder.addCase(
    ACTIONS.RECURRINGORDER_STARTDATE_SET_REQUESTED,
    (state: OrderReducerState, action: AnyAction) => {
      state.recurringOrderStartDate = action.payload;
    }
  );
  builder.addCase(
    ACTIONS.RECURRINGORDER_PLACE_SUCCESS,
    (state: OrderReducerState, action: AnyAction) => {
      state.checkoutActiveStep = 3;
      state.numItems = 0;
    }
  );

  builder.addCase(LOGOUT_SUCCESS_ACTION, resetCart);
  builder.addCase(ACTIONS.CART_RESET_REQUESTED, resetCart);
});

function resetCart(state: OrderReducerState, action: AnyAction) {
  state.cart = null;
  state.numItems = 0;
  state.orderItems = [];
  state.catentries = null;
  state.isCheckoutDisabled = false;
  state.shipAddresses = null;
  state.shipModes = [];
  state.payMethods = [];
  state.checkoutActiveStep = 0;
  state.isRecurringOrder = false;
  state.recurringOrderFrequency = "0";
  state.recurringOrderStartDate = null;
  state.isRecurringOrderDisabled = false;
  state.isFetching = false;
}

export default orderReducer;
