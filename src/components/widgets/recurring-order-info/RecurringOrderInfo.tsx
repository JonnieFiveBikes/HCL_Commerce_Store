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
import { StyledGrid, StyledTypography, StyledButton } from "../../StyledUI";

interface RecurringOrderInfoProps {
  recurringOrderNumber?: string;
  orderSchedule?: string;
  orderScheduleDisplay?: string;
  startDateString?: string;
  nextDelivery?: string;
  showHistoryLink?: boolean;
  handleHistoryLinkClick?: Function;
}

/**
 * Recurring order info component
 * displays recurring order details of an order
 * @param props
 */
const RecurringOrderInfo: React.FC<RecurringOrderInfoProps> = (props: any) => {
  const recurringOrderNumber = props.recurringOrderNumber
    ? props.recurringOrderNumber
    : null;
  const orderSchedule = props.orderSchedule ? props.orderSchedule : null;
  const nextDelivery = props.nextDelivery ? props.nextDelivery : null;
  const {
    showHistoryLink,
    handleHistoryLinkClick,
    startDateString,
    orderScheduleDisplay,
  } = props;

  const { t, i18n } = useTranslation();
  const dateFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateFormatter = new Intl.DateTimeFormat(
    i18n.languages[0],
    dateFormatOptions
  );

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
      <StyledGrid container>
        <StyledGrid item xs={6}>
          <StyledTypography variant="h6" gutterBottom>
            {t("RecurringOrderInfo.Title")}
          </StyledTypography>
        </StyledGrid>
        {showHistoryLink && recurringOrderNumber && (
          <StyledGrid item xs={6} align="right">
            <StyledButton
              variant="outlined"
              onClick={() => handleHistoryLinkClick()}>
              {t("RecurringOrderInfo.Labels.OrderHistoryButton", {
                orderId: recurringOrderNumber,
              })}
            </StyledButton>
          </StyledGrid>
        )}
      </StyledGrid>
      <StyledGrid container>
        {recurringOrderNumber && (
          <StyledGrid item xs={6} md={4}>
            <StyledTypography variant="overline" gutterBottom>
              {t("RecurringOrderInfo.Labels.RecurringOrderNumber")}
            </StyledTypography>
            <StyledTypography>{recurringOrderNumber}</StyledTypography>
          </StyledGrid>
        )}
        {(orderSchedule || orderScheduleDisplay) && (
          <StyledGrid item xs={6} md={4}>
            <StyledTypography variant="overline" gutterBottom>
              {t("RecurringOrderInfo.Labels.OrderSchedule")}
            </StyledTypography>
            <StyledTypography>{orderScheduleDisplayString}</StyledTypography>
          </StyledGrid>
        )}
        {startDateDisplay && (
          <StyledGrid item xs={6} md={4}>
            <StyledTypography variant="overline" gutterBottom>
              {t("RecurringOrderInfo.Labels.StartDate")}
            </StyledTypography>
            <StyledTypography>{startDateDisplay}</StyledTypography>
          </StyledGrid>
        )}
        {nextDelivery && (
          <StyledGrid item xs={6} md={4}>
            <StyledTypography variant="overline" gutterBottom>
              {t("RecurringOrderInfo.Labels.NextDelivery")}
            </StyledTypography>
            <StyledTypography>{nextDelivery}</StyledTypography>
          </StyledGrid>
        )}
      </StyledGrid>
    </>
  );
};

export { RecurringOrderInfo };
