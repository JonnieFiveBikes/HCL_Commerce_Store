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
import { useTranslation } from "react-i18next";
//Custom libraries
import { OrderItemTable } from "../order-item-table";
import { OrderShippingInfo } from "../order-shipping-info";
import { OrderBillingInfo } from "../order-billing-info";
import { OrderPaymentInfo } from "../order-payment-info";
import { OrderTotalSummary } from "../order-total-summary";
import { RecurringOrderInfo } from "../recurring-order-info";
import { OrderDiscountSummary } from "../order-discount-summary";
import RecurringOderHistory from "../../pages/_sapphire/order/RecurringOrderHistory";
//UI
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  StyledPaper,
  StyledButton,
  StyledContainer,
  StyledGrid,
  StyledProgressPlaceholder,
} from "../../StyledUI";

interface OrderDetailsProps {
  order: any;
  orderItems: any[];
  isRecurringOrder?: boolean;
  recurringOrderNumber?: string;
  orderSchedule?: string;
  orderScheduleDisplay?: string;
  startDateString?: string;
  nextDelivery?: string;
  handleHistoryClick?: Function;
  showRecurringHistoryLink?: boolean;
  backButtonFunction?: Function;
  submitButtonFunction?: Function;
  submitButtonDisableFunction?: Function;
}

/**
 * Order Details section
 * displays order item table, order total summary, shipping, billing and payment info for order or cart summary
 * @param props
 */
const OrderDetails: React.FC<OrderDetailsProps> = (props: any) => {
  const isRecurringOrder = props.isRecurringOrder
    ? props.isRecurringOrder
    : false;
  const recurringOrderNumber = props.recurringOrderNumber
    ? props.recurringOrderNumber
    : null;
  const orderSchedule = props.orderSchedule ? props.orderSchedule : null;
  const nextDelivery = props.nextDelivery ? props.nextDelivery : null;
  const {
    order,
    orderItems,
    handleHistoryClick,
    showRecurringHistoryLink,
    startDateString,
    orderScheduleDisplay,
    backButtonFunction,
    submitButtonFunction,
    submitButtonDisableFunction,
  } = props;
  const paymentInstruction = order
    ? order.paymentInstruction
      ? order.paymentInstruction
      : []
    : [];
  const shipAsComplete = order ? order.shipAsComplete : "";
  const recurringOrderProps = {
    recurringOrderNumber,
    orderSchedule,
    orderScheduleDisplay,
    startDateString,
    nextDelivery,
  };
  const hasDiscounts = order && order.adjustment ? true : false;

  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const reviewOrderBackButton = (
    <StyledButton
      color="secondary"
      onClick={backButtonFunction}
      className={"button" + isMobile ? " bottom-margin-2" : ""}
      fullWidth>
      {t("OrderDetails.Actions.Back")}
    </StyledButton>
  );

  return (
    <>
      <StyledGrid container spacing={3}>
        {isRecurringOrder && (
          <StyledGrid item xs={12}>
            <StyledPaper>
              <StyledContainer className="vertical-margin-2">
                <RecurringOrderInfo
                  {...recurringOrderProps}
                  showHistoryLink={!!showRecurringHistoryLink}
                  handleHistoryLinkClick={() => handleHistoryClick()}
                />
              </StyledContainer>
            </StyledPaper>
          </StyledGrid>
        )}
        {isRecurringOrder && !showRecurringHistoryLink && recurringOrderNumber && (
          <StyledGrid item xs={12}>
            <StyledPaper>
              <StyledContainer className="vertical-margin-2">
                <RecurringOderHistory parentOrderId={recurringOrderNumber} />
              </StyledContainer>
            </StyledPaper>
          </StyledGrid>
        )}
        {(!isRecurringOrder ||
          !!showRecurringHistoryLink ||
          !recurringOrderNumber) && (
          <>
            <StyledGrid item xs={12} md={4}>
              <StyledPaper>
                <StyledContainer className="vertical-margin-2">
                  {orderItems ? (
                    <OrderShippingInfo
                      shippingInfo={{ ...orderItems[0], shipAsComplete }}
                    />
                  ) : (
                    <StyledProgressPlaceholder className="vertical-padding-20" />
                  )}
                </StyledContainer>
              </StyledPaper>
            </StyledGrid>
            <StyledGrid item xs={12} md={4}>
              <StyledPaper>
                <StyledContainer className="vertical-margin-2">
                  {orderItems && paymentInstruction ? (
                    <OrderBillingInfo billingInfo={paymentInstruction[0]} />
                  ) : (
                    <StyledProgressPlaceholder className="vertical-padding-20" />
                  )}
                </StyledContainer>
              </StyledPaper>
            </StyledGrid>
            <StyledGrid item xs={12} md={4}>
              <StyledPaper>
                <StyledContainer className="vertical-margin-2">
                  {orderItems && paymentInstruction ? (
                    <OrderPaymentInfo
                      paymentInstruction={paymentInstruction[0]}
                    />
                  ) : (
                    <StyledProgressPlaceholder className="vertical-padding-20" />
                  )}
                </StyledContainer>
              </StyledPaper>
            </StyledGrid>
            <StyledGrid item xs={12}>
              {orderItems ? (
                <OrderItemTable data={orderItems} />
              ) : (
                <StyledPaper>
                  <StyledContainer>
                    <StyledProgressPlaceholder className="vertical-padding-20" />
                  </StyledContainer>
                </StyledPaper>
              )}
            </StyledGrid>
            <StyledGrid container item justify="flex-end" spacing={3}>
              {backButtonFunction && !isMobile && (
                <StyledGrid container item xs={12} md={4} alignItems="flex-end">
                  {reviewOrderBackButton}
                </StyledGrid>
              )}

              <StyledGrid item xs={12} md={4}>
                {hasDiscounts && (
                  <StyledPaper className="horizontal-padding-3 vertical-padding-2">
                    <OrderDiscountSummary order={order} />
                  </StyledPaper>
                )}
              </StyledGrid>

              <StyledGrid item xs={12} md={4}>
                <StyledPaper className="horizontal-padding-3 vertical-padding-2">
                  <OrderTotalSummary order={order} />
                  {backButtonFunction && isMobile && reviewOrderBackButton}

                  {submitButtonFunction && (
                    <StyledButton
                      color="primary"
                      disabled={!submitButtonDisableFunction}
                      onClick={submitButtonFunction}
                      className="button"
                      fullWidth>
                      {isRecurringOrder
                        ? t("OrderDetails.Actions.NextRecurringOrder")
                        : t("OrderDetails.Actions.Next")}
                    </StyledButton>
                  )}
                </StyledPaper>
              </StyledGrid>
            </StyledGrid>
          </>
        )}
      </StyledGrid>
    </>
  );
};

export { OrderDetails };
