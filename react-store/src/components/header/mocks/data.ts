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
import { OrderReducerState } from "../../../redux/reducers";

interface MiniCartTestState {
  order: OrderReducerState;
}
const initStatesBase: OrderReducerState = {
  cart: null,
  numItems: 0,
  orderItems: [],
  catentries: null,
  isCheckoutDisabled: false,
  shipInfos: null,
  shipModes: [],
  payMethods: [],
  isRecurringOrderDisabled: false,
  allowableShipModes: [],
  activeInprogressOrder: null,
  orderMethodIsPickup: false,
  pickupPerson: null,
};

export const ONE_ITEM = 1;
export const ORDERITEM_1 = {
  unitUom: "C62",
  shippingChargeCurrency: "USD",
  lastUpdateDate: "2020-08-31T21:00:19.591Z",
  expectedShipDate: "2020-08-31T21:00:19.747Z",
  description: "Mail",
  language: "-1",
  salesTax: "0.00000",
  xitem_isPersonalAddressesAllowedForShipping: "true",
  correlationGroup: "10065",
  shippingTax: "0.00000",
  orderItemStatus: "P",
  offerID: "4000000000000008037",
  currency: "USD",
  shippingCharge: "0.00000",
  orderItemPrice: "749.99000",
  shipModeLanguage: "-1",
  createDate: "2020-08-31T21:00:19.576Z",
  unitPrice: "749.99000",
  salesTaxCurrency: "USD",
  quantity: "1.0",
  shipModeCode: "Mail",
  productId: "14019",
  shipModeDescription: "Mail",
  orderItemId: "10065",
  fulfillmentCenterId: "13001",
  fulfillmentCenterName: "Emerald",
  shipModeId: "14001",
  isExpedited: "false",
  orderItemFulfillmentStatus: "Unreleased",
  shippingTaxCurrency: "USD",
  carrier: "Mail",
  UOM: "C62",
  freeGift: "false",
  unitQuantity: "1.0",
  contractId: "-11005",
  adjustment: [
    {
      amount: "-25.00000",
      code: "Save $25 on all orders over $200 USD",
      displayLevel: "Order",
      usage: "Discount",
      descriptionLanguage: "-1",
      description: "Save $25 on all orders over $200 USD",
      language: "-1",
      currency: "USD",
    },
  ],
  partNumber: "LR-FNTR-0001-0001",
  totalAdjustment: {
    currency: "USD",
    value: "-25.00000",
  },
  orderItemInventoryStatus: "Available",
  name: "Wooden Angled Chair",
  seo: { href: "/wooden-angled-chair-lr-fntr-0001-0001" },
  thumbnail: "/hclstore/EmeraldCAS//images/catalog/livingroom/furniture/chair1_a1_350.jpg",
  attributes: [
    {
      identifier: "Color",
      usage: "Defining",
      values: [
        {
          identifier: "blonde",
          sequence: "1.0",
          unitOfMeasure: "one",
          unitID: "C62",
          id: "7000000000000003005",
          image1: "/images/catalog/swatches/sw_blonde.png",
          value: "Blonde",
          image1path: "/hclstore/EmeraldCAS//images/catalog/swatches/sw_blonde.png",
        },
      ],
      displayable: "true",
      merchandisable: "true",
      searchable: "true",
      sequence: "0.0",
      name: "Color",
      facetable: "true",
      id: "7000000000000000501",
      comparable: "true",
      key: "color",
      swatchable: "false",
    },
  ],
};
export const CART_1 = {
  totalShippingCharge: "0.00000",
  resourceId:
    "https://localhost/wcs/resources/store/11/cart/@self?pageNumber=1&pageSize=3&sortOrder=DESC&sortOrderItemBy=orderItemID&langId=-1",
  orderId: "13007517",
  lastUpdateDate: "2020-08-31T21:00:19.578Z",
  channel: {
    channelIdentifer: {
      channelName: "Telesales",
      uniqueID: "-4",
    },
    userData: null,
    description: {
      language: "-1",
      value: "Used when operations performed by a telesales representative.",
    },
  },
  orderStatus: "P",
  x_isPurchaseOrderNumberRequired: "false",
  totalShippingChargeCurrency: "USD",
  grandTotalCurrency: "USD",
  buyerId: "13",
  recordSetCount: "1",
  x_isPersonalAddressesAllowedForShipping: "true",
  storeNameIdentifier: "Emerald",
  totalProductPriceCurrency: "USD",
  totalProductPrice: "749.99000",
  locked: "false",
  recordSetComplete: "true",
  totalAdjustmentCurrency: "USD",
  totalSalesTaxCurrency: "USD",
  totalSalesTax: "0.00000",
  grandTotal: "724.99000",
  storeUniqueID: "11",
  recordSetStartNumber: "0",
  resourceName: "cart",
  recordSetTotal: "1",
  shipAsComplete: "true",
  x_trackingIds: "",
  totalShippingTax: "0.00000",
  totalShippingTaxCurrency: "USD",
  prepareIndicator: "false",
  adjustment: [
    {
      amount: "-25.00000",
      code: "Save $25 on all orders over $200 USD",
      displayLevel: "Order",
      usage: "Discount",
      xadju_calUsageId: "-1",
      descriptionLanguage: "-1",
      description: "Save $25 on all orders over $200 USD",
      language: "-1",
      currency: "USD",
    },
  ],
  totalAdjustment: "-25.00000",
};

export const initStatesEmptyCart: MiniCartTestState = {
  order: {
    ...initStatesBase,
  },
};
export const initStatesOneItem: MiniCartTestState = {
  order: {
    ...initStatesBase,
    cart: CART_1,
    numItems: ONE_ITEM,
    orderItems: [ORDERITEM_1],
  },
};
