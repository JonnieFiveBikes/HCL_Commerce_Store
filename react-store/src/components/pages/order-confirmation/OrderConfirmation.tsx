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
import React from "react";
import { Navigate } from "react-router-dom";

//Foundation Libraries

//Custom libraries
import * as ROUTES from "../../../constants/routes";

//UI
import { OrderConfirmationWidget } from "@hcl-commerce-store-sdk/react-component";
import { useOrderConfirmation } from "../../../_foundation/hooks/use-order-confirmation";

/**
 * Order Confirmation component
 * displays order confirmation info
 * @param props
 */
const OrderConfirmation: React.FC = (props: any) => {
  const {
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
  } = useOrderConfirmation();
  const orderDetails = {
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
  return orderId ? <OrderConfirmationWidget {...orderDetails} /> : <Navigate replace to={ROUTES.CART} />;
};

export default OrderConfirmation;
