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
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router";
import getDisplayName from "react-display-name";
//Foundation Libraries
import { localStorageUtil } from "../../../_foundation/utils/storageUtil";
import { ACCOUNT } from "../../../_foundation/constants/common";
//Custom libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import * as ROUTES from "../../../constants/routes";
import { ORDER_ID, HYPHEN } from "../../../constants/common";
import orderService from "../../../_foundation/apis/transaction/order.service";
import { ORDER_STATUS } from "../../../constants/order";

//UI
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  StyledContainer,
  StyledGrid,
  StyledIcon,
  StyledPaper,
  StyledTypography,
} from "../../StyledUI";

/**
 * Order Confirmation component
 * displays order confirmation info
 * @param props
 */
const OrderConfirmation: React.FC = (props: any) => {
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

  return orderId ? (
    <StyledContainer className="page">
      <StyledTypography tabIndex="0" variant="h4" className="vertical-margin-4">
        {t("OrderConfirmation.Title")}
      </StyledTypography>
      <StyledPaper>
        <StyledGrid
          container
          direction="column"
          alignItems="center"
          className="vertical-margin-15">
          {(orderStatus === ORDER_STATUS.Submitted ||
            orderStatus === ORDER_STATUS.Approved) && (
            <StyledGrid item>
              <StyledIcon>
                <CheckCircleIcon color="primary" fontSize="large" />
              </StyledIcon>
            </StyledGrid>
          )}
          <StyledGrid item>
            <StyledTypography variant="h3" align="center" gutterBottom>
              {(orderStatus === ORDER_STATUS.Submitted ||
                orderStatus === ORDER_STATUS.Approved) &&
                t("OrderConfirmation.Msgs.Heading")}
              {orderStatus === ORDER_STATUS.PendingApproval &&
                t("OrderConfirmation.Msgs.Pending")}
            </StyledTypography>
            <StyledTypography variant="h6" align="center" gutterBottom>
              {t("OrderConfirmation.Msgs.OrderNumber", { orderId: orderId })}
            </StyledTypography>
            <StyledTypography variant="body1" align="center" gutterBottom>
              {(orderStatus === ORDER_STATUS.Submitted ||
                orderStatus === ORDER_STATUS.Approved) &&
                t("OrderConfirmation.Msgs.Details", {
                  emails: emailListString,
                })}
              {orderStatus === ORDER_STATUS.PendingApproval &&
                t("OrderConfirmation.Msgs.PendingDetails")}
            </StyledTypography>
            <StyledTypography variant="body1" align="center">
              {t("OrderConfirmation.Msgs.ThankYou", {
                storeName: storeDisplayName,
              })}
            </StyledTypography>
          </StyledGrid>
        </StyledGrid>
      </StyledPaper>
    </StyledContainer>
  ) : (
    <Redirect to={ROUTES.CART} />
  );
};

export default OrderConfirmation;
