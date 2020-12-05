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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
//Custom libraries
import { NotFound } from "../../../widgets/not-found";
import { OrderDetails } from "../../../widgets/order-details";
//Redux
import { RootReducerState } from "../../../../redux/reducers";
import { FETCH_ORDER_DETAILS_ACTION } from "../../../../redux/actions/orderDetails";
//UI
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  StyledButton,
  StyledContainer,
  StyledGrid,
  StyledCircularProgress,
  StyledTypography,
  StyledLink,
} from "../../../StyledUI";

function OrderDetailsPage(props: any) {
  const widgetName = getDisplayName(OrderDetailsPage);
  const { location } = props;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const recurringOrder = location.state?.recurringOrder;
  const [showHistoryLink, setShowHistoryLink] = useState<boolean>(
    !!recurringOrder
  );

  const { mySite } = useSite();
  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const orderDetails = useSelector(
    (state: RootReducerState) => state.orderDetails[String(orderId)]
  );
  const orderItems = orderDetails?.detailedOrderItems;
  const dateFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateFormatter = new Intl.DateTimeFormat(
    i18n.languages[0],
    dateFormatOptions
  );

  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
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
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [orderId, mySite, defaultCurrencyID]);

  const loading = orderId && orderDetails === undefined;
  const notFound = !orderId || (orderDetails && orderDetails.error);

  return (
    <StyledContainer className="page">
      {loading ? (
        <StyledCircularProgress />
      ) : notFound ? (
        <NotFound />
      ) : (
        <>
          <StyledGrid container spacing={2}>
            <StyledGrid
              item
              xs={12}
              lg={3}
              md={4}
              container
              display="flex"
              direction="row"
              alignItems="center">
              {!recurringOrder && location.state && location.state.from && (
                <StyledLink to={location.state.from}>
                  <ArrowBackIosIcon />
                </StyledLink>
              )}
              {recurringOrder &&
                !!showHistoryLink &&
                location.state &&
                location.state.from && (
                  <StyledLink to={location.state.from}>
                    <ArrowBackIosIcon />
                  </StyledLink>
                )}
              {recurringOrder && !showHistoryLink && (
                <StyledButton
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
              <StyledTypography
                variant="body2"
                component="span"
                display="block">
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
                {t(`Order.Status_${orderDetails.orderStatus}`)}
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
                startDateString={
                  recurringOrder?.subscriptionInfo.fulfillmentSchedule
                    ?.startInfo?.startDate
                }
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
