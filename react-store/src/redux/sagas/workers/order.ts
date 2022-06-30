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
import { call, put, select } from "redux-saga/effects";
import { AnyAction } from "redux";
//Foundation libraries
import cartService from "../../../_foundation/apis/transaction/cart.service";
import orderService from "../../../_foundation/apis/transaction/order.service";
import shippingInfoService from "../../../_foundation/apis/transaction/shippingInfo.service";
//Custom libraries
import { ORDER_CONFIGS, MINICART_CONFIGS } from "../../../configs/order";
import { CommerceEnvironment, EMPTY_STRING, RF_JSON, SUCCESS_MSG_PREFIX } from "../../../constants/common";
//Redux
import * as ACTIONS from "../../action-types/order";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../actions/success";
import { CART } from "../../../constants/routes";
import {
  COPY_CART_SUCCESS_ACTION,
  COPY_CART_ERROR_ACTION,
  FETCH_ORDERS_SUCCESS_ACTION,
  FETCH_ORDERS_ERROR_ACTION,
  FETCH_ALLOWABLE_SHIPMODES_SUCCESS_ACTION,
  FETCH_ALLOWABLE_SHIPMODES_ERROR_ACTION,
  FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_SUCCESS_ACTION,
  FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_ERROR_ACTION,
  FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_ACTION,
  FETCH_ALLOWABLE_PAYMETHODS_S_ACTION,
  FETCH_ALLOWABLE_PAYMETHODS_F_ACTION,
} from "../../actions/order";
import { WISHLIST_MOVE_ITEMS_ACTION } from "../../actions/wish-list";
import { fetchOrderItemDetailsByIds } from "./orderDetails";
import { CartApi, ShippingInfoApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../../_foundation/constants/site";
import { getSite } from "../../../_foundation/hooks/useSite";
import { localStorageUtil } from "../../../_foundation/utils/storageUtil";
import { LOCALE, SELLER_PARAM } from "../../../_foundation/constants/common";
import { activeInprogressOrderSelector } from "../../selectors/order";
import { get } from "lodash-es";
import { N_ITEMS_ADDED } from "../../../constants/order";

export function* copyCart(action: AnyAction) {
  try {
    const { fromOrderId } = action.payload;
    const activeInprogressOrder = yield select(activeInprogressOrderSelector);
    const payload = action.payload;
    const params = {
      body: {
        fromOrderId_1: fromOrderId,
        toOrderId: activeInprogressOrder ? activeInprogressOrder.orderId : ".**.",
        copyOrderItemId_1: "*",
      },
    };
    if (payload.widget) {
      params["widget"] = payload.widget;
    }
    const response = yield call(cartService.copyOrder, params);
    yield put(
      COPY_CART_SUCCESS_ACTION({
        response,
      })
    );

    const b2b = getSite()?.isB2B;
    const link = !b2b ? { url: CART, textKey: `${SUCCESS_MSG_PREFIX}ViewCart` } : undefined;
    const successMessage = {
      key: SUCCESS_MSG_PREFIX + COPY_CART_SUCCESS_ACTION.type,
      link,
    };
    yield put(HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
  } catch (e) {
    yield put(COPY_CART_ERROR_ACTION(e));
  }
}

/**
 * Saga worker to invoke add item API
 */
export function* addItem(action: any) {
  try {
    const payload = action.payload;
    const cartPayload = {
      contractId: payload.contractId,
    };

    const _orderItems: any[] = [];
    let catentryIds: string[] = [];
    let partnumbers: string[] = [];
    let quantities: any[] = [];
    let physicalStoreIds: string[] = [];
    let shipModeIds: string[] = [];
    if (payload.partnumber) {
      partnumbers = payload.partnumber instanceof Array ? payload.partnumber : [payload.partnumber];
      quantities = payload.quantity instanceof Array ? payload.quantity : [payload.quantity];
    } else if (payload.catentryId) {
      catentryIds = payload.catentryId instanceof Array ? payload.catentryId : [payload.catentryId];
      quantities = payload.quantity instanceof Array ? payload.quantity : [payload.quantity];
    }
    if (payload.physicalStoreId) {
      physicalStoreIds = payload.physicalStoreId instanceof Array ? payload.physicalStoreId : [payload.physicalStoreId];
    }
    if (payload.shipModeId) {
      shipModeIds = payload.shipModeId instanceof Array ? payload.shipModeId : [payload.shipModeId];
    }

    for (const i in partnumbers) {
      _orderItems[i] = {
        quantity: quantities[i].toString(),
        partNumber: partnumbers[i],
        contractId: payload.contractId,
      };
      if (physicalStoreIds[i]) {
        Object.assign(_orderItems[i], { physicalStoreId: physicalStoreIds[i] });
      }
      if (shipModeIds[i]) {
        Object.assign(_orderItems[i], { shipModeId: shipModeIds[i] });
      }
    }
    for (const i in catentryIds) {
      _orderItems[i] = {
        quantity: quantities[i].toString(),
        productId: catentryIds[i],
        contractId: payload.contractId,
      };
      if (physicalStoreIds[i]) {
        Object.assign(_orderItems[i], { physicalStoreId: physicalStoreIds[i] });
      }
      if (shipModeIds[i]) {
        Object.assign(_orderItems[i], { shipModeId: shipModeIds[i] });
      }
    }
    let body = {};
    if (payload.widget) {
      body["widget"] = payload.widget;
      cartPayload["widget"] = payload.widget;
    }
    const activeInprogressOrder = yield select(activeInprogressOrderSelector);
    let response: any = {};
    if (!activeInprogressOrder) {
      body = {
        body: {
          orderId: ".",
          x_calculateOrder: ORDER_CONFIGS.calculateOrder,
          orderItem: _orderItems,
          x_inventoryValidation: ORDER_CONFIGS.inventoryValidation,
        },
      };
      response = yield call(cartService.addOrderItem, body);
    } else {
      const orderItems = {};
      for (const i in partnumbers) {
        Object.assign(orderItems, {
          [`quantity_${i}`]: quantities[i].toString(),
          [`partNumber_${i}`]: partnumbers[i],
          [`contractId_${i}`]: payload.contractId,
        });
      }
      for (const i in catentryIds) {
        Object.assign(orderItems, {
          [`quantity_${i}`]: quantities[i].toString(),
          [`catEntryId_${i}`]: catentryIds[i],
          [`contractId_${i}`]: payload.contractId,
        });
      }
      Object.assign(orderItems, {
        orderId: activeInprogressOrder.orderId,
        calculateOrder: ORDER_CONFIGS.calculateOrder,
        inventoryValidation: ORDER_CONFIGS.inventoryValidation,
      });
      body = {
        body: orderItems,
        ...body,
      };
      response = yield call(cartService.addPreConfigurationOrderItem, body);
    }

    yield put({
      type: ACTIONS.ITEM_ADD_SUCCESS,
      response: response.data,
      payload: payload,
    });

    const cartAction = { ...action, payload: cartPayload };
    yield call(fetchCart, cartAction);

    const b2b = getSite()?.isB2B;
    const link = !b2b && partnumbers.length === 1 ? { url: CART, textKey: `${SUCCESS_MSG_PREFIX}ViewCart` } : undefined;
    const msg = {
      key: SUCCESS_MSG_PREFIX + (partnumbers.length > 1 ? N_ITEMS_ADDED : ACTIONS.ITEM_ADD_SUCCESS),
      messageParameters: partnumbers.length > 1 ? { v: String(partnumbers.length) } : undefined,
      link,
    };
    yield put(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
    if (payload.fromWishList) {
      yield put(WISHLIST_MOVE_ITEMS_ACTION(payload));
    }
  } catch (error) {
    yield put({ type: ACTIONS.ITEM_ADD_ERROR, error });
  }
}

/**
 * Saga worker to invoke remove item API
 */
export function* removeItem(action: any) {
  try {
    const payload = action.payload;
    const { widget, orderItemId } = payload;
    const activeInprogressOrder = yield select(activeInprogressOrderSelector);
    const orderId = activeInprogressOrder ? activeInprogressOrder.orderId : undefined;
    const body = {
      orderId,
      x_calculateOrder: ORDER_CONFIGS.calculateOrder,
      x_calculationUsage: ORDER_CONFIGS.calculationUsage,
      orderItemId,
    };

    const response = yield call(cartService.deleteOrderItem, { body, widget });
    yield put({ type: ACTIONS.ITEM_REMOVE_SUCCESS, response, payload });
  } catch (error) {
    yield put({ type: ACTIONS.ITEM_REMOVE_ERROR, error });
  }
}

/**
 * Saga worker to invoke update item API
 */
export function* updateItem(action: any) {
  try {
    const payload = action.payload;
    const { orderItemId, quantity, widget } = payload;
    const activeInprogressOrder = yield select(activeInprogressOrderSelector);
    const orderId = activeInprogressOrder ? activeInprogressOrder.orderId : undefined;
    const body = {
      orderId,
      x_calculateOrder: ORDER_CONFIGS.calculateOrder,
      x_calculationUsage: ORDER_CONFIGS.calculationUsage,
      x_inventoryValidation: ORDER_CONFIGS.inventoryValidation,
      orderItem: [
        {
          quantity: quantity,
          orderItemId: orderItemId,
        },
      ],
    };

    const response = yield call(cartService.updateOrderItem, { widget, body });
    yield put({ type: ACTIONS.ITEM_UPDATE_SUCCESS, response, payload });
  } catch (error) {
    yield put({ type: ACTIONS.ITEM_UPDATE_ERROR, error });
  }
}

export function* initFromStorageFetchCart(action: any) {
  const { WCToken, rememberMe } = action.payload || {};
  if (WCToken || rememberMe) {
    yield* fetchCart(action);
  }
}

/**
 * Saga worker to invoke get cart API
 */
export function* fetchCart(action: any) {
  const activeInprogressOrder = yield select(activeInprogressOrderSelector);
  try {
    const payload = action.payload;
    const parameters = {
      ...payload,
      sortOrderItemBy: ORDER_CONFIGS.sortOrderItemBy,
    };

    const fetchCatentries: boolean = payload.fetchCatentries ? payload.fetchCatentries : false;
    const checkInventory: boolean = payload.checkInventory ? payload.checkInventory : false;

    if (payload.widget) {
      parameters["widget"] = payload.widget;
    }

    if (!activeInprogressOrder) {
      const responseCart = yield call(cartService.getCart, { ...parameters });
      yield* fetchShipInfo(action);

      let catentries: any = null;
      if (responseCart) {
        const cart = responseCart.data;

        if (cart) {
          const orderItems = cart.orderItem;

          if (orderItems && orderItems.length > 0) {
            let catentryIdList: string[] = [];
            const contracts = orderItems.reduce((p, c) => {
              if (p[c.contractId]) {
                if (p[c.contractId].indexOf(c.productId) === -1) {
                  p[c.contractId].push(c.productId);
                }
              } else {
                p[c.contractId] = [c.productId];
              }
              return p;
            }, {});

            if (fetchCatentries || orderItems.length <= MINICART_CONFIGS.maxItemsToShow) {
              //get product info for all items
              orderItems.forEach((item: any, index: number) => {
                catentryIdList.push(item.productId);
              });
            } else {
              //get product info for mini cart only
              orderItems.slice(MINICART_CONFIGS.maxItemsToShow * -1).forEach((item: any, index: number) => {
                catentryIdList.push(item.productId);
              });
            }

            if (catentryIdList.length > 0) {
              catentryIdList = [...new Set(catentryIdList)];

              const currency = parameters ? parameters.currency : "";
              const paramsProduct: any = {
                currency: currency,
                id: catentryIdList,
                contracts: contracts,
                // add empty seller parameter -- don't filter when fetching order-item details
                query: { [SELLER_PARAM]: EMPTY_STRING },
              };
              if (parameters?.cancelToken) {
                paramsProduct["cancelToken"] = parameters.cancelToken;
              }
              if (parameters?.widget) {
                paramsProduct["widget"] = parameters.widget;
              }

              try {
                const contents = yield call(fetchOrderItemDetailsByIds, paramsProduct);

                if (contents) {
                  catentries = {};
                  contents.forEach((catentry: any, index: number) => {
                    const { seller, sellerId } = catentry;
                    const obj = {
                      name: catentry.name,
                      thumbnail: catentry.thumbnail,
                      attributes: catentry.attributes,
                      seo: catentry.seo,
                      disallowRecurringOrder: catentry.disallowRecurringOrder,
                      parentCatalogGroupID: catentry.parentCatalogGroupID,
                      seller,
                      sellerId,
                    };
                    catentries[catentry.id] = obj;
                  });
                }
              } catch (error) {
                console.log("Could not retrieve products");
                //Cannot retrieve catentry details; return order items as-is
                catentries = null;
              }
            }
          }
        }
      }
      if (catentries != null) {
        yield put({
          type: ACTIONS.CART_GET_SUCCESS,
          response: responseCart.data,
          catentries: catentries,
          checkInventory: checkInventory,
        });
      } else {
        yield put({
          type: ACTIONS.CART_GET_SUCCESS,
          response: responseCart.data,
          checkInventory: checkInventory,
        });
      }
    } else {
      const siteInfo = getSite();
      const oderPayload = {
        contractId: payload.contractId,
        orderId: activeInprogressOrder.orderId,
        skipErrorSnackbar: true,
        currency: siteInfo?.defaultCurrencyID ?? "",
      };
      yield put(FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_ACTION(oderPayload));
    }
  } catch (error) {
    yield put({
      type: ACTIONS.CART_GET_ERROR,
      error,
    });
  }
}

/**
 * Saga worker to invoke get usable ship info API
 */
export function* fetchShipInfo(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(cartService.getUsableShippingInfo, payload);
    yield put({
      type: ACTIONS.SHIPINFO_GET_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({ type: ACTIONS.SHIPINFO_GET_ERROR, error });
  }
}

/**
 * Saga worker to invoke get usable ship modes API
 */
export function* fetchShipModes(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(cartService.getUsableShippingMode, payload);
    yield put({
      type: ACTIONS.SHIPMODES_GET_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({ type: ACTIONS.SHIPMODES_GET_ERROR, error });
  }
}

/**
 * Saga worker to invoke update ship mode API
 */
export function* updateShipMode(action: any) {
  const payload = action.payload;
  const body = {
    body: {
      x_calculateOrder: ORDER_CONFIGS.calculateOrder,
      x_calculationUsage: ORDER_CONFIGS.calculationUsage,
      x_allocate: ORDER_CONFIGS.allocate,
      x_backorder: ORDER_CONFIGS.backOrder,
      x_remerge: ORDER_CONFIGS.remerge,
      x_check: ORDER_CONFIGS.check,
      orderId: ".",
      shipModeId: payload.shipModeId,
      //addressId: payload.shipAddressId,
      orderItem: [], //bypass defect HC-2784
    },
  };
  if (payload.widget) {
    body["widget"] = payload.widget;
  }
  const response = yield call(shippingInfoService.updateOrderShippingInfo, body);
  yield put({
    type: ACTIONS.SHIPMODE_UPDATE_SUCCESS,
    response: response.data,
  });
}

/**
 * Saga worker to invoke get usable payment methods API
 */
export function* fetchPayMethods(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(cartService.getUsablePaymentInfo, payload);
    yield put({
      type: ACTIONS.PAYMETHODS_GET_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({ type: ACTIONS.PAYMETHODS_GET_ERROR, error });
  }
}

export function* getAllOrders(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(orderService.findByStatus, payload);
    yield put({
      type: FETCH_ORDERS_SUCCESS_ACTION,
      response: response.data,
    });
  } catch (error) {
    yield put({ type: FETCH_ORDERS_ERROR_ACTION, error });
  }
}

export function* getAllowableShipmodes(action: any) {
  const shipApi = new ShippingInfoApi(undefined, site.transactionContext);
  const siteInfo = getSite();
  const storeId = siteInfo?.storeID ?? "";
  const locale = localStorageUtil.get(LOCALE);
  const lang = CommerceEnvironment.reverseLanguageMap[locale];

  try {
    const r = yield call(shipApi.cartGetAllowableShippingModes.bind(shipApi), storeId, locale, lang, RF_JSON);
    const p = { ...action.payload, modes: r.data.usableShippingMode };
    yield put(FETCH_ALLOWABLE_SHIPMODES_SUCCESS_ACTION(p));
  } catch (e) {
    yield put(FETCH_ALLOWABLE_SHIPMODES_ERROR_ACTION(e));
  }
}

export function* fetchActiveInprogressOrderItem(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(orderService.findByOrderId, payload);
    const orderDetails = response.data;

    const fetchCatentries: boolean = payload.fetchCatentries ? payload.fetchCatentries : false;

    const checkInventory: boolean = payload.checkInventory ? payload.checkInventory : false;

    let catentries: any = null;
    if (orderDetails) {
      const orderItems = orderDetails.orderItem;
      if (orderItems && orderItems.length > 0) {
        let catentryIdList: string[] = [];
        const contracts = orderItems.reduce((p, c) => {
          if (p[c.contractId]) {
            if (p[c.contractId].indexOf(c.productId) === -1) {
              p[c.contractId].push(c.productId);
            }
          } else {
            p[c.contractId] = [c.productId];
          }
          return p;
        }, {});

        if (fetchCatentries || orderItems.length <= MINICART_CONFIGS.maxItemsToShow) {
          //get product info for all items
          orderItems.forEach((item: any, index: number) => {
            catentryIdList.push(item.productId);
          });
        } else {
          //get product info for mini cart only
          orderItems.slice(MINICART_CONFIGS.maxItemsToShow * -1).forEach((item: any, index: number) => {
            catentryIdList.push(item.productId);
          });
        }

        if (catentryIdList.length > 0) {
          catentryIdList = [...new Set(catentryIdList)];

          const currency = payload ? payload.currency : "";
          const paramsProduct: any = {
            currency: currency,
            id: catentryIdList,
            contracts: contracts,
            // add empty seller parameter -- don't filter when fetching order-item details
            query: { [SELLER_PARAM]: EMPTY_STRING },
          };
          if (payload?.cancelToken) {
            paramsProduct["cancelToken"] = payload.cancelToken;
          }
          if (payload?.widget) {
            paramsProduct["widget"] = payload.widget;
          }

          try {
            const contents = yield call(fetchOrderItemDetailsByIds, paramsProduct);

            if (contents) {
              catentries = {};
              contents.forEach((catentry: any, index: number) => {
                const { seller, sellerId } = catentry;
                const obj = {
                  name: catentry.name,
                  thumbnail: catentry.thumbnail,
                  attributes: catentry.attributes,
                  seo: catentry.seo,
                  disallowRecurringOrder: catentry.disallowRecurringOrder,
                  parentCatalogGroupID: catentry.parentCatalogGroupID,
                  seller,
                  sellerId,
                };
                catentries[catentry.id] = obj;
              });
            }
          } catch (error) {
            console.log("Could not retrieve products");
            //Cannot retrieve catentry details; return order items as-is
            catentries = null;
          }
        }
      }
    }

    yield put(
      FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_SUCCESS_ACTION({
        orderDetails: orderDetails,
        catentries: catentries,
        checkInventory: checkInventory,
      })
    );
  } catch (error) {
    yield put(FETCH_ACTIVE_INPROGRESS_ORDER_ITEM_ERROR_ACTION({ error }));
  }
}

export function* getAllowablePaymethods(action: any) {
  const api = new CartApi(undefined, site.transactionContext);
  const siteInfo = getSite();
  const storeId = siteInfo?.storeID ?? "";

  try {
    const r = yield call(api.cartGetPaymentPolicyListDataBean.bind(api), storeId, RF_JSON);

    const p = {
      ...action.payload,
      methods: get(r, "data.resultList[0].paymentPolicyInfoUsableWithoutTA", []),
    };
    yield put(FETCH_ALLOWABLE_PAYMETHODS_S_ACTION(p));
  } catch (e) {
    yield put(FETCH_ALLOWABLE_PAYMETHODS_F_ACTION(e));
  }
}
