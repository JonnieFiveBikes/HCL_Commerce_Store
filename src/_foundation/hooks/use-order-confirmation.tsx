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
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import getDisplayName from "react-display-name";
//Foundation Libraries
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
//Custom libraries
import * as ROUTES from "../../../src/constants/routes";
import OrderConfirmation from "../../components/pages/order-confirmation/OrderConfirmation";
import { WidgetProps } from "../constants/seo-config";
import { useSite } from "./useSite";
import orderService from "../apis/transaction/order.service";
import { ACCOUNT } from "../constants/common";
import { HYPHEN, ORDER_ID } from "../../constants/common";
import { ORDER_STATUS } from "../../../src/constants/order";

export const withOrderConfirmation =
  (Component: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }) => {
    const orderDetails = useOrderConfirmation();
    return orderDetails.orderId ? (
      <Component orderDetails={orderDetails} {...props}></Component>
    ) : (
      <Redirect to={ROUTES.CART} />
    );
  };

export const useOrderConfirmation = (): any => {
  const widgetName = getDisplayName(OrderConfirmation);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const { t } = useTranslation();
  const { storeDisplayName } = useSite();
  const location = useLocation<any>();
  const orderId: string = location?.state ? location.state["orderId"] : "";

  let emailList: string[] = location?.state ? location.state["emailList"] : [];
  emailList = [...new Set(emailList)];
  const emailListString = emailList.join(", ");
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const param: any = {
    orderId: orderId,
    ...payloadBase,
  };

  async function queryOrderStatus() {
    const orderResult = await orderService.findByOrderId(param);
    if (orderResult && orderResult.data)
      setOrderStatus(orderResult.data.orderStatus);
  }

  useEffect(() => {
    queryOrderStatus();

    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (localStorageUtil.get(ACCOUNT + HYPHEN + ORDER_ID + HYPHEN + orderId)) {
    localStorageUtil.remove(ACCOUNT + HYPHEN + ORDER_ID + HYPHEN + orderId);
  }

  // order status related flags
  let isOrderSubmitted: boolean = orderStatus === ORDER_STATUS.Submitted;
  let isOrderApproved: boolean = orderStatus === ORDER_STATUS.Approved;
  let isOrderPending: boolean = orderStatus === ORDER_STATUS.PendingApproval;

  // Order Confirmation related msgs
  let ORDER_CONFIRMATION_HEADING: string = t("OrderConfirmation.Msgs.Heading");
  let ORDER_CONFIRMATION_PENDING_MSG: string = t(
    "OrderConfirmation.Msgs.Pending"
  );
  let ORDER_NUMBER_MSG: string = t("OrderConfirmation.Msgs.OrderNumber", {
    orderId: orderId,
  });
  let EMAIL_CONFIMRATION_MSG: string = t("OrderConfirmation.Msgs.Details", {
    emails: emailListString,
  });
  let THANK_YOU_MSG: string = t("OrderConfirmation.Msgs.ThankYou", {
    storeName: storeDisplayName,
  });
  let PENDING_DETAILS_MSG: string = t("OrderConfirmation.Msgs.PendingDetails");
  let ORDERCONFIRMATION_TITLE: string = t("OrderConfirmation.Title");

  return {
    orderId,
    isOrderSubmitted,
    isOrderApproved,
    isOrderPending,
    ORDERCONFIRMATION_TITLE,
    ORDER_CONFIRMATION_HEADING,
    ORDER_CONFIRMATION_PENDING_MSG,
    ORDER_NUMBER_MSG,
    EMAIL_CONFIMRATION_MSG,
    PENDING_DETAILS_MSG,
    THANK_YOU_MSG,
  };
};
