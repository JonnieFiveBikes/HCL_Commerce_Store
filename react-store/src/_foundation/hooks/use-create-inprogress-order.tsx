/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

//Standard libraries
import Axios, { Canceler } from "axios";
import { useState } from "react";
import { OK } from "http-status-codes";
//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_ALL_ORDERS_ACTION,
  GET_CART_ACTION,
  RESET_ACTIVE_INPROGRESS_ORDER_ACTION,
} from "../../redux/actions/order";
import { loginStatusSelector } from "../../redux/selectors/user";
import * as successActions from "../../redux/actions/success";
import { cartSelector } from "../../redux/selectors/order";
//Custom libraries
import { EMPTY_STRING, SHARED_ORDER } from "../../constants/common";
import { ORDER_STATUS } from "../../constants/order";
import cartService from "../apis/transaction/cart.service";
import addressUtil from "../../utils/addressUtil";

export const useCreateInprogressOrder = (): any => {
  const dispatch = useDispatch();
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const payloadBase: any = {
    widget: "Create In Progress Order",
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const loginStatus = useSelector(loginStatusSelector);
  // Order name
  const [orderName, setOrderName] = useState<string>(EMPTY_STRING);
  // Order Type -> "private or shared"
  const [orderType, setOrderType] = useState<string>(SHARED_ORDER);
  const cart = useSelector(cartSelector);
  /**
   * Onchange event handler for order name text field
   *
   * @param event
   */
  const handleOrderName = (event) => {
    setOrderName(event.target.value);
  };

  /**
   * Onchange event handler for order type radio group
   *
   * @param event
   */
  const handleOrderType = (event) => {
    setOrderType(event.target.value);
  };

  /**
   * orderName validation
   *
   */
  const isValidOrderName = (): boolean => {
    if (orderName.trim().length > 0 && addressUtil.validateNickName(orderName)) {
      return true;
    }
    return false;
  };

  /**
   * Onclick event handler for Create order button
   *
   */
  const createOrder = (event) => {
    event.preventDefault();
    let payload: any = {
      description: orderName,
      payloadBase,
    };
    //pass the isSharedOrder like this for now, change it after sdk updated
    if (orderType === SHARED_ORDER) {
      payload = {
        query: {
          isSharedOrder: true,
        },
        ...payload,
      };
    } else {
      payload = {
        query: {
          isSharedOrder: false,
        },
        ...payload,
      };
    }
    cartService
      .createOrder(payload)
      .then((res) => {
        if (res.status === OK) {
          const msg = {
            key: "success-message.CREATE_ORDER_SUCCESS",
            messageParameters: { "0": orderName },
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(msg));
          setOrderName(EMPTY_STRING);
          dispatch(RESET_ACTIVE_INPROGRESS_ORDER_ACTION());
          const cartPayload: any = {
            orderId: cart?.orderId,
            body: {
              orderId: cart?.orderId,
            },
            payloadBase,
          };
          cartService
            .setPendingOrder(cartPayload)
            .then((res) => {
              const { cancelToken, ...rest } = payloadBase;
              dispatch(
                FETCH_ALL_ORDERS_ACTION({
                  query: {
                    orderType: "all",
                    activeOrg: true,
                  },
                  status: ORDER_STATUS.PendingOrder,
                  widget: "Create In Progress Order",
                })
              );
              dispatch(GET_CART_ACTION({ ...rest }));
            })
            .catch((e) => {
              console.log("Could not set pending order", e);
              const { cancelToken, ...rest } = payloadBase;
              dispatch(
                FETCH_ALL_ORDERS_ACTION({
                  query: {
                    orderType: "all",
                    activeOrg: true,
                  },
                  status: ORDER_STATUS.PendingOrder,
                  widget: "Create In Progress Order",
                })
              );
              dispatch(GET_CART_ACTION({ ...rest }));
            });
        }
      })
      .catch((e) => {
        console.log("Could not create in progress order", e);
      });
  };
  return {
    loginStatus,
    orderName,
    orderType,
    handleOrderName,
    handleOrderType,
    createOrder,
    isValidOrderName,
  };
};
