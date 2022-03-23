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
import React from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import { RECURRING_ORDER_OPTIONS } from "../../../constants/order";
//UI
import { StyledGrid, StyledTypography, StyledButton } from "@hcl-commerce-store-sdk/react-component";

interface RecurringOrderInfoProps {
  recurringOrderNumber?: string;
  orderSchedule?: string;
  orderScheduleDisplay?: string;
  startDateString?: string;
  nextDelivery?: string;
  showHistoryLink?: boolean;
  handleHistoryLinkClick?: (v?: any) => void;
}

/**
 * Recurring order info component
 * displays recurring order details of an order
 * @param props
 */
const RecurringOrderInfo: React.FC<RecurringOrderInfoProps> = (props: any) => {
  const recurringOrderNumber = props.recurringOrderNumber ? props.recurringOrderNumber : null;
  const orderSchedule = props.orderSchedule ? props.orderSchedule : null;
  const nextDelivery = props.nextDelivery ? props.nextDelivery : null;
  const { showHistoryLink, handleHistoryLinkClick, startDateString, orderScheduleDisplay } = props;

  const { t, i18n } = useTranslation();
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat(i18n.languages[0], dateFormatOptions);

  const orderScheduleDisplayString = getOrderScheduleDisplay();
  const startDateDisplay = getStartDateDisplay();

  function getOrderScheduleDisplay() {
    if (orderScheduleDisplay) {
      return orderScheduleDisplay;
    }
    let displayName = "";
    if (orderSchedule) {
      for (let i = 0; i < RECURRING_ORDER_OPTIONS.length; i++) {
        if (orderSchedule === RECURRING_ORDER_OPTIONS[i].value) {
          displayName = t(RECURRING_ORDER_OPTIONS[i].translationKey);
          break;
        }
      }
    }
    return displayName;
  }

  function getStartDateDisplay() {
    if (startDateString) {
      return dateFormatter.format(new Date(startDateString));
    }
    return t("Order.NotAvailable");
  }

  return (
    <>
      {showHistoryLink && recurringOrderNumber && (
        <StyledGrid item xs={12} align="left">
          <StyledButton testId="recurring-order-info-order-history" variant="outlined" onClick={handleHistoryLinkClick}>
            {t("RecurringOrderInfo.Labels.OrderHistoryButton", {
              orderId: recurringOrderNumber,
            })}
          </StyledButton>
        </StyledGrid>
      )}
      {(orderSchedule || orderScheduleDisplay) && (
        <StyledGrid item xs={12} sm={6} md={4}>
          <StyledTypography variant="overline" gutterBottom>
            {t("RecurringOrderInfo.Labels.OrderSchedule")}
          </StyledTypography>
          <StyledTypography className="break-word">{orderScheduleDisplayString}</StyledTypography>
        </StyledGrid>
      )}
      {recurringOrderNumber && (
        <StyledGrid item xs={12} sm={6} md={8}>
          <StyledTypography variant="overline" gutterBottom>
            {t("RecurringOrderInfo.Labels.RecurringOrderNumber")}
          </StyledTypography>
          <StyledTypography className="break-word">{recurringOrderNumber}</StyledTypography>
        </StyledGrid>
      )}
      {startDateDisplay && (
        <StyledGrid item xs={12} sm={6} md={4}>
          <StyledTypography variant="overline" gutterBottom>
            {t("RecurringOrderInfo.Labels.StartDate")}
          </StyledTypography>
          <StyledTypography className="break-word">{startDateDisplay}</StyledTypography>
        </StyledGrid>
      )}
      {nextDelivery && (
        <StyledGrid item xs={12} sm={6} md={8}>
          <StyledTypography variant="overline" gutterBottom>
            {t("RecurringOrderInfo.Labels.NextDelivery")}
          </StyledTypography>
          <StyledTypography className="breakWord">{nextDelivery}</StyledTypography>
        </StyledGrid>
      )}
    </>
  );
};

export { RecurringOrderInfo };
