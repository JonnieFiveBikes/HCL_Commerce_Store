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
export const INVENTORY_STATUS = {
  available: "Available",
  allocated: "Allocated",
  backordered: "Backordered",
  unallocated: "Unallocated",
};

export const PAYMENT = {
  paymentMethodName: {
    cod: "COD",
    mc: "Master Card",
    visa: "VISA",
    amex: "AMEX",
  },
  paymentDisplayName: {
    mc: "Mastercard",
    visa: "Visa",
    amex: "American Express",
  },
  payOptions: { cod: "COD", cc: "CC" },
};

export const RECURRING_ORDER_OPTIONS = [
  {
    key: "EVERYDAY",
    value: "0",
    fulfillmentInterval: "1",
    fulfillmentIntervalUOM: "DAY",
    translationKey: "CommerceEnvironment.recurringOrderFrequency.Everyday",
  },
  {
    key: "EVERYWEEK",
    value: "1",
    fulfillmentInterval: "1",
    fulfillmentIntervalUOM: "WEE",
    translationKey: "CommerceEnvironment.recurringOrderFrequency.EveryWeek",
  },
  {
    key: "EVERYTWOWEEKS",
    value: "2",
    fulfillmentInterval: "2",
    fulfillmentIntervalUOM: "WEE",
    translationKey: "CommerceEnvironment.recurringOrderFrequency.EveryTwoWeeks",
  },
  {
    key: "EVERYTHREEWEEKS",
    value: "3",
    fulfillmentInterval: "3",
    fulfillmentIntervalUOM: "WEE",
    translationKey:
      "CommerceEnvironment.recurringOrderFrequency.EveryThreeWeeks",
  },
  {
    key: "EVERYFOURWEEKS",
    value: "4",
    fulfillmentInterval: "4",
    fulfillmentIntervalUOM: "WEE",
    translationKey:
      "CommerceEnvironment.recurringOrderFrequency.EveryFourWeeks",
  },
];

export const SHIPMODE = {
  shipModeCode: {
    PickUp: "PickupInStore",
  },
};

export const EXPIRY = {
  MONTHS: [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ],
  YEARS: [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ],
};

export const PO_NUMBER = "poNumber";

export const ORDER_STATUS = {
  BackOrdered: "B",
  Submitted: "I",
  Approved: "M",
  NoInventory: "L",
  ApprovalDenied: "N",
  PendingOrder: "P",
  Released: "R",
  Shipped: "S",
  PendingApproval: "W",
  Canceled: "X",
};
