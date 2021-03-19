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
import { call, put } from "redux-saga/effects";
import { AnyAction } from "redux";
//Foundation libraries
import cartService from "../../../_foundation/apis/transaction/cart.service";
import shippingInfoService from "../../../_foundation/apis/transaction/shippingInfo.service";
//Custom libraries
import { ORDER_CONFIGS, MINICART_CONFIGS } from "../../../configs/order";
import { SUCCESS_MSG_PREFIX } from "../../../constants/common";
//Redux
import * as ACTIONS from "../../action-types/order";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../actions/success";
import { CART } from "../../../constants/routes";
import {
  COPY_CART_SUCCESS_ACTION,
  COPY_CART_ERROR_ACTION,
} from "../../actions/order";
import { fetchOrderItemDetailsByIds } from "./orderDetails";

export function* copyCart(action: AnyAction) {
  try {
    const { fromOrderId } = action.payload;
    const payload = action.payload;
    const params = {
      body: {
        fromOrderId_1: fromOrderId,
        toOrderId: ".**.",
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
    const successMessage = {
      key: SUCCESS_MSG_PREFIX + COPY_CART_SUCCESS_ACTION.type,
      link: {
        url: CART,
        textKey: SUCCESS_MSG_PREFIX + "ViewCart",
      },
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
    if (payload.partnumber) {
      partnumbers =
        payload.partnumber instanceof Array
          ? payload.partnumber
          : [payload.partnumber];
      quantities =
        payload.quantity instanceof Array
          ? payload.quantity
          : [payload.quantity];
    } else if (payload.catentryId) {
      catentryIds =
        payload.catentryId instanceof Array
          ? payload.catentryId
          : [payload.catentryId];
      quantities =
        payload.quantity instanceof Array
          ? payload.quantity
          : [payload.quantity];
    }

    for (const i in partnumbers) {
      _orderItems[i] = {
        quantity: quantities[i].toString(),
        partNumber: partnumbers[i],
        contractId: payload.contractId,
      };
    }
    for (const i in catentryIds) {
      _orderItems[i] = {
        quantity: quantities[i].toString(),
        productId: catentryIds[i],
        contractId: payload.contractId,
      };
    }
    let body = {
      body: {
        orderId: ".",
        x_calculateOrder: ORDER_CONFIGS.calculateOrder,
        orderItem: _orderItems,
        x_inventoryValidation: ORDER_CONFIGS.inventoryValidation,
      },
    };
    if (payload.widget) {
      body["widget"] = payload.widget;
      cartPayload["widget"] = payload.widget;
    }

    const response = yield call(cartService.addOrderItem, body);
    yield put({
      type: ACTIONS.ITEM_ADD_SUCCESS,
      response: response.data,
      payload: payload,
    });

    const cartAction = { ...action, payload: cartPayload };
    yield call(fetchCart, cartAction);

    const successMessage = {
      key: SUCCESS_MSG_PREFIX + ACTIONS.ITEM_ADD_SUCCESS,
      link: {
        url: CART,
        textKey: SUCCESS_MSG_PREFIX + "ViewCart",
      },
    };
    yield put(HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
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
    const orderItemId = payload.orderItemId;
    const body = {
      body: {
        x_calculateOrder: ORDER_CONFIGS.calculateOrder,
        x_calculationUsage: ORDER_CONFIGS.calculationUsage,
        orderItemId: orderItemId,
      },
    };
    if (payload.widget) {
      body["widget"] = payload.widget;
    }

    const response = yield call(cartService.deleteOrderItem, body);
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
    const orderItemId = payload.orderItemId;
    const quantity = payload.quantity;
    const body = {
      body: {
        x_calculateOrder: ORDER_CONFIGS.calculateOrder,
        x_calculationUsage: ORDER_CONFIGS.calculationUsage,
        x_inventoryValidation: ORDER_CONFIGS.inventoryValidation,
        orderItem: [
          {
            quantity: quantity,
            orderItemId: orderItemId,
          },
        ],
      },
    };
    if (payload.widget) {
      body["widget"] = payload.widget;
    }

    const response = yield call(cartService.updateOrderItem, body);
    yield put({ type: ACTIONS.ITEM_UPDATE_SUCCESS, response, payload });
  } catch (error) {
    yield put({ type: ACTIONS.ITEM_UPDATE_ERROR, error });
  }
}

export function* initFromStorageFetchCart(action: any) {
  const { WCToken } = action.payload || {};
  if (!!WCToken) {
    yield* fetchCart(action);
  }
}

/**
 * Saga worker to invoke get cart API
 */
export function* fetchCart(action: any) {
  try {
    const payload = action.payload;
    const parameters = {
      ...payload,
      sortOrderItemBy: ORDER_CONFIGS.sortOrderItemBy,
    };

    const fetchCatentries: boolean = payload.fetchCatentries
      ? payload.fetchCatentries
      : false;
    const checkInventory: boolean = payload.checkInventory
      ? payload.checkInventory
      : false;

    if (payload.widget) {
      parameters["widget"] = payload.widget;
    }

    const responseCart = yield call(cartService.getCart, { ...parameters });

    let catentries: any = null;
    if (responseCart) {
      const cart = responseCart.data;

      if (cart) {
        const orderItems = cart.orderItem;

        if (orderItems && orderItems.length > 0) {
          let catentryIdList: string[] = [];

          if (
            fetchCatentries ||
            orderItems.length <= MINICART_CONFIGS.maxItemsToShow
          ) {
            //get product info for all items
            orderItems.forEach((item: any, index: number) => {
              catentryIdList.push(item.productId);
            });
          } else {
            //get product info for mini cart only
            orderItems
              .slice(MINICART_CONFIGS.maxItemsToShow * -1)
              .forEach((item: any, index: number) => {
                catentryIdList.push(item.productId);
              });
          }

          if (catentryIdList.length > 0) {
            catentryIdList = [...new Set(catentryIdList)];

            const currency = parameters ? parameters.currency : "";
            const contractId = parameters ? parameters.contractId : "";
            const paramsProduct: any = {
              currency: currency,
              contractId: contractId,
              id: catentryIdList,
            };
            if (parameters?.cancelToken) {
              paramsProduct["cancelToken"] = parameters.cancelToken;
            }
            if (parameters?.widget) {
              paramsProduct["widget"] = parameters.widget;
            }

            try {
              const contents = yield call(
                fetchOrderItemDetailsByIds,
                paramsProduct
              );

              if (contents) {
                catentries = {};
                contents.forEach((catentry: any, index: number) => {
                  const obj = {
                    name: catentry.name,
                    thumbnail: catentry.thumbnail,
                    attributes: catentry.attributes,
                    seo: catentry.seo,
                    disallowRecurringOrder: catentry.disallowRecurringOrder,
                    parentCatalogGroupID: catentry.parentCatalogGroupID,
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
  const response = yield call(
    shippingInfoService.updateOrderShippingInfo,
    body
  );
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
