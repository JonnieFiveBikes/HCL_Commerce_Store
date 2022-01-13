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
import getDisplayName from "react-display-name";
//Foundation libraries
import cartService from "../../../_foundation/apis/transaction/cart.service";
import paymentInstructionService from "../../../_foundation/apis/transaction/paymentInstruction.service";

//Custom libraries
import OrderDetailSubsection from "../order-detail-subsection/OrderDetailSubsection";
import { OrderShippingInfo } from "../order-shipping-info";
import { OrderBillingInfo } from "../order-billing-info";
import { OrderPaymentInfo } from "../order-payment-info";
import { OrderTotalSummary } from "../order-total-summary";
import { RecurringOrderInfo } from "../recurring-order-info";
import { OrderDiscountSummary } from "../order-discount-summary";
import RecurringOrderHistory from "../../pages/_sapphire/order/RecurringOrderHistory";
import { PurchaseOrderNumber } from "../purchase-order-number";
import { PaymentInfoList } from "../payment-info-list";
import { PAYMENT } from "../../../constants/order";
import { Y, EMPTY_STRING } from "../../../constants/common";
import storeUtil from "../../../utils/storeUtil";

import { useCheckoutProfileReview } from "../../../_foundation/hooks/use-checkout-profile-review";
//UI
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  StyledPaper,
  StyledButton,
  StyledContainer,
  StyledGrid,
  StyledProgressPlaceholder,
  StyledTypography,
  StyledIconLabel,
} from "@hcl-commerce-store-sdk/react-component";
import ReccuringOrderIcon from "@material-ui/icons/Repeat";
import { Divider } from "@material-ui/core";
import { SELECTED_PROFILE } from "../../../_foundation/constants/common";
import { useLocation } from "react-router";
import { get } from "lodash-es";
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
  parentComponent?: string; //name of parent
  poNumber?: string;
}

/**
 * Order Details section
 * displays order item table, order total summary, shipping, billing and payment info for order or cart summary
 * @param props
 */
const OrderDetails: React.FC<OrderDetailsProps> = (props: any) => {
  const location = useLocation();
  const { profileList } = useCheckoutProfileReview(props);

  const widgetName = getDisplayName(OrderDetails);
  const isRecurringOrder = props.isRecurringOrder
    ? props.isRecurringOrder
    : false;
  const recurringOrderNumber = props.recurringOrderNumber
    ? props.recurringOrderNumber
    : null;
  const orderSchedule = props.orderSchedule ? props.orderSchedule : null;
  const nextDelivery = props.nextDelivery ? props.nextDelivery : null;
  const [cvv, setCvv] = useState<string>(EMPTY_STRING);
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
    parentComponent,
  } = props;
  const selectedProfile = get(location, `state.${SELECTED_PROFILE}`);
  const paymentInstruction =
    selectedProfile && profileList.length > 0
      ? profileList
      : order
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
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];
  const sm = !useMediaQuery(theme.breakpoints.up("sm"));
  const fullWidth = sm ? { fullWidth: true } : {};

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const resolvePONumber = () => {
    if (props.poNumber === undefined && order && order.buyerPONumber) {
      cartService
        .getBuyerPurchaseOrderDataBean({
          buyerPurchaseOrderId: order.buyerPONumber,
          ...payloadBase,
        })
        .then((r) => r.data)
        .then((d2) => {
          if (d2.resultList[0] && d2.resultList[0].purchaseOrderNumber) {
            setPONumber(d2.resultList[0].purchaseOrderNumber);
          }
        });
    }
  };

  const [poNumber, setPONumber] = useState<string>(props.poNumber);

  const updatePaymentInstructionAndSubmit = async () => {
    await paymentInstructionService.deleteAllPaymentInstructions({
      ...payloadBase,
    });

    const p = {
      ...payloadBase,
      body: {
        piAmount: order.grandTotal,
        cc_cvc: cvv,
        valueFromProfileOrder: Y,
        ordProfileId: selectedProfile,
        payMethodId: paymentInstruction[0].paymentMethod,
        billing_address_id:
          paymentInstruction[0].billingInfo.billing_address_id,
      },
    };

    try {
      const res = await paymentInstructionService.addPaymentInstruction(p);
      if (res?.status === 201) {
        submitButtonFunction(null, profileList);
      }
    } catch (e) {
      console.log("couldn't update payment instruction");
    }
  };

  const isValidCvv = () => {
    if (
      selectedProfile &&
      paymentInstruction[0]?.paymentMethod !== PAYMENT.paymentMethodName.cod &&
      !(storeUtil.isNumeric(cvv.trim()) && cvv.length === 3)
    ) {
      return false;
    }
    return true;
  };

  const ReviewOrderBackButton = () => {
    return (
      <StyledButton
        onClick={backButtonFunction}
        color="secondary"
        {...fullWidth}>
        {selectedProfile
          ? t("OrderDetails.Actions.BackCart")
          : t("OrderDetails.Actions.Back")}
      </StyledButton>
    );
  };
  const Actions = () => (
    <StyledGrid
      container
      justifyContent="space-between"
      spacing={1}
      className="checkout-actions horizontal-padding-2">
      <StyledGrid item>
        {backButtonFunction && <ReviewOrderBackButton />}
      </StyledGrid>
      <StyledGrid item>
        {submitButtonFunction && (
          <StyledButton
            color="primary"
            disabled={!submitButtonDisableFunction || !isValidCvv()}
            onClick={
              selectedProfile
                ? updatePaymentInstructionAndSubmit
                : submitButtonFunction
            }
            className="button"
            fullWidth>
            {isRecurringOrder
              ? t("OrderDetails.Actions.NextRecurringOrder")
              : t("OrderDetails.Actions.Next")}
          </StyledButton>
        )}
      </StyledGrid>
    </StyledGrid>
  );

  const BillingAndPaymentSection = () =>
    paymentInstruction.length === 1 ? (
      <StyledGrid container spacing={2}>
        <StyledGrid item md={4} xs={12}>
          <OrderBillingInfo
            billingInfo={
              selectedProfile
                ? paymentInstruction[0].billingInfo
                : paymentInstruction[0]
            }
          />
        </StyledGrid>
        <StyledGrid item md={4} xs={12}>
          <OrderPaymentInfo
            paymentInstruction={paymentInstruction[0]}
            {...(selectedProfile ? { cvv: cvv, setCvv: setCvv } : {})}
          />
        </StyledGrid>
      </StyledGrid>
    ) : (
      <PaymentInfoList
        selectedPaymentInfoList={paymentInstruction}
        readOnly={true}
      />
    );

  const paymentDetails = poNumber ? (
    <>
      <StyledGrid container spacing={2} className="bottom-margin-2">
        <StyledGrid item>
          <PurchaseOrderNumber poNumber={poNumber} />
        </StyledGrid>
      </StyledGrid>
      <BillingAndPaymentSection />
    </>
  ) : (
    <BillingAndPaymentSection />
  );

  useEffect(() => {
    resolvePONumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.buyerPONumber]);

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledGrid container spacing={2}>
      {isRecurringOrder && !showRecurringHistoryLink && recurringOrderNumber && (
        <StyledGrid item xs={12}>
          <StyledPaper>
            <StyledContainer className="vertical-margin-2">
              <RecurringOrderHistory parentOrderId={recurringOrderNumber} />
            </StyledContainer>
          </StyledPaper>
        </StyledGrid>
      )}
      {(!isRecurringOrder ||
        !!showRecurringHistoryLink ||
        !recurringOrderNumber) && (
        <>
          {orderItems ? (
            <OrderShippingInfo
              shippingInfo={{
                orderItems,
                shipAsComplete,
                parentComponent,
                paymentInstruction,
              }}
            />
          ) : (
            <StyledGrid item xs={12}>
              <StyledPaper>
                <StyledContainer className="vertical-margin-2">
                  <StyledProgressPlaceholder className="vertical-padding-20" />
                </StyledContainer>
              </StyledPaper>
            </StyledGrid>
          )}
          <StyledGrid item xs={12}>
            {/* Payment section */}
            {orderItems && paymentInstruction ? (
              <OrderDetailSubsection
                heading={
                  <StyledTypography variant="h4">
                    {t("OrderDetails.Labels.PaymentDetails")}
                  </StyledTypography>
                }
                details={paymentDetails}
              />
            ) : (
              <StyledProgressPlaceholder className="vertical-padding-20" />
            )}
          </StyledGrid>

          <StyledGrid item xs={12}>
            <StyledPaper>
              <StyledContainer className="vertical-margin-2">
                <StyledGrid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className="horizontal-padding-2"
                  spacing={2}>
                  <StyledGrid item xs={12} md={5}>
                    <StyledTypography variant="h4">
                      {t("OrderDetails.Labels.OrderSummary")}
                    </StyledTypography>
                  </StyledGrid>
                  {isRecurringOrder && (
                    <>
                      <StyledGrid item xs={12} md={3}>
                        <StyledIconLabel
                          variant="h6"
                          icon={<ReccuringOrderIcon color="primary" />}
                          label={t("RecurringOrderInfo.Title")}
                        />
                      </StyledGrid>
                      <StyledGrid item xs={12} md={4} container spacing={1}>
                        <RecurringOrderInfo
                          {...recurringOrderProps}
                          showHistoryLink={!!showRecurringHistoryLink}
                          handleHistoryLinkClick={() => handleHistoryClick()}
                        />
                      </StyledGrid>
                    </>
                  )}
                </StyledGrid>
              </StyledContainer>
              <Divider />
              <StyledContainer className="vertical-margin-2">
                <StyledGrid
                  container
                  display="flex"
                  direction="row"
                  alignItems="flex-start"
                  className="horizontal-padding-2"
                  {...(hasDiscounts && { justify: "space-between" })}
                  spacing={2}>
                  {hasDiscounts && (
                    <StyledGrid item xs={12} md={4}>
                      <OrderDiscountSummary order={order} />
                    </StyledGrid>
                  )}
                  <StyledGrid item xs={12} md={4}>
                    <OrderTotalSummary order={order} />
                  </StyledGrid>
                </StyledGrid>
              </StyledContainer>
              {(backButtonFunction || submitButtonFunction) && (
                <>
                  <Divider />
                  <StyledContainer className="vertical-margin-2">
                    <Actions />
                  </StyledContainer>
                </>
              )}
            </StyledPaper>
          </StyledGrid>
        </>
      )}
    </StyledGrid>
  );
};

export { OrderDetails };
