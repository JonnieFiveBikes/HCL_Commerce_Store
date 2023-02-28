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
import { SUCCESS_MSG_PREFIX } from "../constants/common";
import { N_ITEMS_ADDED, PARTIAL_COPY_ORDER } from "../constants/order";
//Redux
import * as ORDER_ACTIONS from "../redux/action-types/order";

export const ORDER_CONFIGS = {
  calculationUsage: "-1,-2,-3,-4,-5,-6,-7",
  calculateOrder: "1",
  inventoryValidation: true,
  allocate: "***",
  backOrder: "***",
  remerge: "***",
  check: "*n",
  sortOrderItemBy: "orderItemID",
};

/**
 * ShipInfo request body base.
 */
export const SHIP_INFO = {
  x_calculateOrder: ORDER_CONFIGS.calculateOrder,
  x_calculationUsage: ORDER_CONFIGS.calculationUsage,
  x_allocate: ORDER_CONFIGS.allocate,
  x_backorder: ORDER_CONFIGS.backOrder,
  x_remerge: ORDER_CONFIGS.remerge,
  x_check: ORDER_CONFIGS.check,
  orderId: ".",
};

export const PAGINATION_CONFIGS = {
  pageLimit: 10,
  pageSizeOptions: [10, 25, 50],
};

export const MINICART_CONFIGS = {
  maxItemsToShow: 3,
  itemAddSuccessMsgKeys: [
    SUCCESS_MSG_PREFIX + ORDER_ACTIONS.ITEM_ADD_SUCCESS,
    SUCCESS_MSG_PREFIX + ORDER_ACTIONS.COPY_CART_SUCCESS,
    SUCCESS_MSG_PREFIX + PARTIAL_COPY_ORDER,
    SUCCESS_MSG_PREFIX + N_ITEMS_ADDED,
  ],
};

export const PAYMENT_CONFIGS = {
  maxNumPayment: 3,
};
