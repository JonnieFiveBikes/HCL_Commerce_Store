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
import { useSelector } from "react-redux";
//Custom libraries
import { PaymentInfoType } from "../../pages/checkout/payment/Payment";
import FormattedPriceDisplay from "../formatted-price-display";
import { PaymentInfoCard } from "../payment-info-card";
//Redux
import { cartSelector } from "../../../redux/selectors/order";
//UI
import { Divider } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import {
  StyledGrid,
  StyledIconLabel,
  StyledButton,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";

interface PaymentInfoListProps {
  selectedPaymentInfoList: PaymentInfoType[];
  handleAddNewPayment: Function;
  allowMorePayments: boolean;
}

/**
 * Payment info list component
 * displays list of payment info for multiple payments
 * @param props
 */
const PaymentInfoList: React.FC<PaymentInfoListProps> = (
  props: PaymentInfoListProps
) => {
  const {
    selectedPaymentInfoList,
    handleAddNewPayment,
    allowMorePayments,
  } = props;
  const { t } = useTranslation();

  const cart = useSelector(cartSelector);
  const grandTotal = (
    <FormattedPriceDisplay
      min={parseFloat(cart.grandTotal)}
      currency={cart.grandTotalCurrency}
    />
  );

  return (
    <>
      <StyledGrid container spacing={2} className="bottom-margin-2">
        <StyledGrid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center">
          <StyledIconLabel
            icon={<PaymentIcon />}
            label={
              <>
                {t("PaymentInfoList.Title")} {grandTotal}
              </>
            }
          />
        </StyledGrid>
        {allowMorePayments && (
          <StyledGrid item xs={12}>
            <StyledButton
              data-testid="payment-new-button"
              className="border-solid-bold"
              size="small"
              variant="outlined"
              onClick={handleAddNewPayment}>
              {t("PaymentInfoList.Actions.AddPayMethod")}
            </StyledButton>
            {selectedPaymentInfoList?.length === 0 && (
              <StyledTypography variant="body1" className="error top-margin-1">
                {t("PaymentInfoList.Msgs.PayMethodRequired")}
              </StyledTypography>
            )}
          </StyledGrid>
        )}
        <StyledGrid item container spacing={2}>
          {selectedPaymentInfoList.map((payment: any, index: number) => (
            <StyledGrid item xs={12} md={6}>
              <PaymentInfoCard
                paymentInfo={selectedPaymentInfoList[index]}
                currentPaymentNumber={index}
              />
            </StyledGrid>
          ))}
        </StyledGrid>
      </StyledGrid>

      <Divider className="top-margin-3 bottom-margin-2" />
    </>
  );
};

export { PaymentInfoList };
