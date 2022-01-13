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

export interface InprogressOrdersInfo {
  status: string;
  orderId: any;
  name: string;
  lastUpdated: any;
  totalPrice: string;
  grandTotalCurrency: string;
  type: string;
  orderInfo: any;
  language: any;
  message: string;
}

export const CONSTANTS = {
  active: "active",
  orderId: "orderId",
  orderDescription: "orderDescription",
  lastUpdated: "lastUpdated",
  totalPrice: "totalPrice",
  type: "type",
  actions: "actions",
  inProgressOrders: "InprogressOrders.Status.",
};
