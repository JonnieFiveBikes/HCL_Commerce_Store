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
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
//Custom libraries
import NotFound from "../../../commerce-layouts/not-found";
import { OrderDetails } from "../../../widgets/order-details";
//Redux
import { RootReducerState } from "../../../../redux/reducers";
import { FETCH_ORDER_DETAILS_ACTION } from "../../../../redux/actions/orderDetails";
//UI
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  StyledButton,
  StyledContainer,
  StyledGrid,
  StyledCircularProgress,
  StyledTypography,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";

function OrderDetailsPage(props: any) {
  const widgetName = getDisplayName(OrderDetailsPage);
  const location: any = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { orderId } = useParams<any>();
  const recurringOrder = location?.state?.recurringOrder;
  const [showHistoryLink, setShowHistoryLink] = useState<boolean>(!!recurringOrder);

  const { mySite } = useSite();
  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const orderDetails = useSelector((state: RootReducerState) => state.orderDetails[String(orderId)]);
  const orderItems = orderDetails?.detailedOrderItems;

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat(i18n.languages[0], dateFormatOptions);

  const controller = useMemo(() => new AbortController(), []);

  const payloadBase: any = {
    widget: widgetName,
    signal: controller.signal,
  };

  useEffect(() => {
    if (orderId && defaultCurrencyID) {
      dispatch(
        FETCH_ORDER_DETAILS_ACTION({
          orderId,
          currency: defaultCurrencyID,
          skipErrorSnackbar: true,
          ...payloadBase,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, mySite, defaultCurrencyID]);

  React.useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = orderId && orderDetails === undefined;
  const notFound = !orderId || (orderDetails && orderDetails.error);
  const oStatus = t(`Order.Status_${orderDetails?.orderStatus}`);
  const groups = orderItems?.reduce((m, v) => {
    m[v.orderItemStatus] = 1;
    return m;
  }, {});
  const grpSize = Object.keys(groups ?? {}).length;
  const statusDisp = grpSize <= 1 ? oStatus : t("Order.multiStatus");

  return (
    <StyledContainer className="page">
      {loading ? (
        <StyledCircularProgress />
      ) : notFound ? (
        <NotFound />
      ) : (
        <>
          <StyledGrid container spacing={2}>
            <StyledGrid item xs={12} lg={3} md={4} container display="flex" direction="row" alignItems="center">
              {location.state?.from && (!recurringOrder || !!showHistoryLink) && (
                <StyledLink to={location.state.from}>
                  <ArrowBackIosIcon />
                </StyledLink>
              )}
              {recurringOrder && !showHistoryLink && (
                <StyledButton
                  testId="order-details-set-show-history-link"
                  variant="text"
                  onClick={() => setShowHistoryLink(true)}>
                  <ArrowBackIosIcon />
                </StyledButton>
              )}
              <StyledTypography variant="h3" component="div">
                {t("Order.OrderDetails")}
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item xs={6} md={2}>
              <StyledTypography variant="overline" display="block">
                {t("Order.OrderNumber")}
              </StyledTypography>
              <StyledTypography variant="body2" component="span" display="block">
                {orderDetails.orderId}
              </StyledTypography>
            </StyledGrid>
            {orderDetails.placedDate && (
              <StyledGrid item xs={6} md={2}>
                <StyledTypography variant="overline" display="block">
                  {t("Order.OrderDate")}
                </StyledTypography>
                <StyledTypography variant="body2" display="block">
                  {dateFormatter.format(new Date(orderDetails.placedDate))}
                </StyledTypography>
              </StyledGrid>
            )}
            <StyledGrid item xs={6} md={2}>
              <StyledTypography variant="overline" display="block">
                {t("Order.Status")}
              </StyledTypography>
              <StyledTypography variant="body2" display="block">
                {statusDisp}
              </StyledTypography>
            </StyledGrid>

            <StyledGrid item xs={12}>
              <OrderDetails
                order={orderDetails}
                orderItems={orderItems}
                isRecurringOrder={!!recurringOrder}
                recurringOrderNumber={recurringOrder?.id}
                orderScheduleDisplay={recurringOrder?.frequencyDisplay}
                nextDelivery={recurringOrder?.nextOrder}
                startDateString={recurringOrder?.subscriptionInfo.fulfillmentSchedule?.startInfo?.startDate}
                showRecurringHistoryLink={showHistoryLink}
                handleHistoryClick={() => setShowHistoryLink(false)}
              />
            </StyledGrid>
          </StyledGrid>
        </>
      )}
    </StyledContainer>
  );
}

export default OrderDetailsPage;
