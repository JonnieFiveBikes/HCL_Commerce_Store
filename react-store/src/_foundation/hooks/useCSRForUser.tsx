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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
//custom libraries
import { INVENTORY } from "../../constants/common";
import { CART_FETCHING_REQUESTED } from "../../redux/action-types/order";
import { RESET_ERROR_ACTION } from "../../redux/actions/error";
import { FETCHING_CART_ACTION } from "../../redux/actions/order";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import {
  LOCK_ORDER_ACTION,
  LOCK_ORDRE_ERROR,
  SESSION_ERROR_ACTION,
  FOR_USER_SESSION,
  PARENT_IFRAME,
} from "../constants/csr";
import { useSite } from "./useSite";

const useCSRForUser = () => {
  const dispatch = useDispatch();
  const contractId = useSelector(currentContractIdSelector);
  const { mySite } = useSite();
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];
  const handleForUserSessionError = (errorMsgKey: string) => {
    const parentIFrame: any = window[PARENT_IFRAME];
    if (parentIFrame) {
      const sessionError = {
        msgKey: errorMsgKey,
        className: "error",
      };
      parentIFrame.sendMessage(
        {
          type: SESSION_ERROR_ACTION,
          payload: { sessionError },
        },
        window.location.origin
      );
    }
  };
  const handleLockOrderError = (error: any) => {
    const parentIFrame: any = window[PARENT_IFRAME];
    if (parentIFrame) {
      dispatch(RESET_ERROR_ACTION());
      parentIFrame.sendMessage(
        {
          type: LOCK_ORDER_ACTION,
          payload: error,
        },
        window.location.origin
      );
    }
  };

  const isOrderLockError = (error: any) => {
    if (PARENT_IFRAME in window) {
      return LOCK_ORDRE_ERROR.includes(error.errorKey);
    } else {
      return false;
    }
  };
  const receiveParentMessage = (message: any) => {
    if (message.action === CART_FETCHING_REQUESTED) {
      const payload: any = {
        currency: mySite ? mySite.defaultCurrencyID : "",
        contractId: contractId,
        checkInventory: mySite ? mySite.inventorySystem === INVENTORY.NON_ATP : false,
        widget: FOR_USER_SESSION,
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
      };
      dispatch(FETCHING_CART_ACTION(payload));
    }
  };

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleForUserSessionError,
    receiveParentMessage,
    handleLockOrderError,
    isOrderLockError,
  };
};

export { useCSRForUser };
