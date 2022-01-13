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
import { PaymentInfoType } from "../../../_foundation/hooks/use-checkout-payment";
import FormattedPriceDisplay from "../formatted-price-display";
import { PaymentInfoCard } from "../payment-info-card";
//Redux
import { cartSelector } from "../../../redux/selectors/order";
//UI
import PaymentIcon from "@material-ui/icons/Payment";
import {
  StyledGrid,
  StyledIconLabel,
  StyledButton,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";

interface PaymentInfoListProps {
  selectedPaymentInfoList: PaymentInfoType[];
  handleAddNewPayment?: Function;
  allowMorePayments?: boolean;
  readOnly?: boolean;
  handleEditPayment?: Function;
  handleDeletePayment?: Function;
  handlePiAmountChange?: Function;
  getMaximumPiAmount?: Function;
  isEditPayment?: boolean;
  isValidPaymentList?: Function;
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
    readOnly,
    handleEditPayment,
    handleDeletePayment,
    handlePiAmountChange,
    getMaximumPiAmount,
    isValidPaymentList,
  } = props;
  const { t } = useTranslation();

  const cart = useSelector(cartSelector);
  const grandTotal = (
    <FormattedPriceDisplay
      min={parseFloat(cart?.grandTotal)}
      currency={cart?.grandTotalCurrency}
    />
  );

  return (
    <>
      <StyledGrid container spacing={2} className="bottom-margin-2">
        <StyledGrid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <StyledIconLabel
            icon={<PaymentIcon />}
            label={
              readOnly ? (
                t("PaymentInfoList.Title.PayMethod")
              ) : (
                <>
                  <StyledTypography variant="h5">
                    {t("PaymentInfoList.Title.WithOrderTotal")} {grandTotal}
                  </StyledTypography>
                </>
              )
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
            {!readOnly && selectedPaymentInfoList?.length === 0 && (
              <StyledTypography variant="body1" className="error top-margin-1">
                {t("PaymentInfoList.Msgs.PayMethodRequired")}
              </StyledTypography>
            )}
          </StyledGrid>
        )}
        <StyledGrid item container spacing={2}>
          {selectedPaymentInfoList.map((payment: any, index: number) => (
            <StyledGrid item xs={12} md={6} key={index}>
              <PaymentInfoCard
                paymentInfo={selectedPaymentInfoList[index]}
                currentPaymentNumber={index}
                readOnly={readOnly}
                handleEditPayment={handleEditPayment}
                handleDeletePayment={handleDeletePayment}
                handlePiAmountChange={handlePiAmountChange}
                getMaximumPiAmount={getMaximumPiAmount}
                isValidPaymentList={isValidPaymentList}
              />
            </StyledGrid>
          ))}
        </StyledGrid>
      </StyledGrid>
    </>
  );
};

export { PaymentInfoList };
