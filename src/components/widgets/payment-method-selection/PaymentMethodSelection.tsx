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
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
//Custom libraries
import { PAYMENT, EXPIRY } from "../../../constants/order";
import { PaymentInfoType } from "../../pages/checkout/payment/Payment";
import FormattedPriceDisplay from "../formatted-price-display";
//Redux
import { cartSelector } from "../../../redux/selectors/order";
//UI
import { Divider } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import {
  StyledGrid,
  StyledTypography,
  StyledTextField,
  StyledRadio,
  StyledRadioGroup,
  StyledFormControl,
  StyledFormControlLabel,
  StyledInputLabel,
  StyledSelect,
  StyledBox,
  StyledIconLabel,
  StyledCircularProgress,
} from "@hcl-commerce-store-sdk/react-component";

interface PaymentMethodSelectionProps {
  paymentInfo: PaymentInfoType;
  currentPaymentNumber: number;
  togglePayOption: Function;
  handleCreditCardChange: Function;
  isValidCardNumber: Function;
  isValidCode: Function;
  useMultiplePayment: boolean;
  paymentsList: any[];
}

/**
 * PaymentMethodSelection component
 * displays payment method type selection and credit card form
 * @param props
 */
const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = (
  props: PaymentMethodSelectionProps
) => {
  const {
    paymentInfo,
    currentPaymentNumber,
    togglePayOption,
    handleCreditCardChange,
    isValidCardNumber,
    isValidCode,
    useMultiplePayment,
    paymentsList,
  } = props;
  const { t } = useTranslation();
  const cart = useSelector(cartSelector);
  const [policyIdValue, setPolicyIdValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (paymentInfo && paymentInfo.policyId) {
      setPolicyIdValue(paymentInfo.policyId);
    }
    if (paymentsList && paymentsList.length > 0) {
      setLoading(false);
    }
  }, [paymentInfo, paymentsList]);
  return (
    <StyledGrid container spacing={4} className="bottom-margin-2">
      <StyledGrid
        item
        container
        direction="row"
        justify="space-between"
        alignItems="center">
        <StyledIconLabel
          icon={<PaymentIcon />}
          label={t("PaymentMethodSelection.Title")}
        />
      </StyledGrid>

      <StyledGrid item xs={12} md={6}>
        {loading ? (
          <div className="horizontal-padding-13">
            <StyledCircularProgress />
          </div>
        ) : (
          <StyledBox className="basic-border" border={1}>
            <StyledFormControl component="fieldset">
              <StyledRadioGroup
                name="payOption"
                value={policyIdValue}
                onChange={(event) => togglePayOption(event.target.value)}>
                {paymentsList &&
                  paymentsList.length > 0 &&
                  paymentsList.map((payment: any) => (
                    <Fragment key={payment.xumet_policyId}>
                      <StyledFormControlLabel
                        value={payment.xumet_policyId}
                        control={<StyledRadio />}
                        label={
                          <StyledTypography variant="body1">
                            {payment.description}
                          </StyledTypography>
                        }
                        className="vertical-padding-1 pay-option"
                      />

                      {paymentInfo &&
                        paymentInfo.payMethodId !==
                          PAYMENT.paymentMethodName.cod &&
                        paymentInfo.policyId === payment.xumet_policyId &&
                        paymentInfo.paymentTermConditionId === "" && (
                          <>
                            <Divider className="horizontal-margin-2" />
                            <StyledGrid
                              container
                              spacing={2}
                              className="horizontal-padding-2 vertical-padding-3">
                              <StyledGrid item xs={12}>
                                <StyledTextField
                                  required
                                  name="account"
                                  value={
                                    paymentInfo.creditCardFormData?.account
                                  }
                                  label={t(
                                    "PaymentMethodSelection.Labels.CCNumber"
                                  )}
                                  type="tel"
                                  onChange={(event) =>
                                    handleCreditCardChange(
                                      event,
                                      currentPaymentNumber
                                    )
                                  }
                                  error={
                                    !isValidCardNumber(currentPaymentNumber)
                                  }
                                  helperText={
                                    !isValidCardNumber(currentPaymentNumber)
                                      ? t(
                                          "PaymentMethodSelection.Msgs.InvalidFormat"
                                        )
                                      : ""
                                  }
                                  inputProps={{ maxLength: 19 }}
                                  fullWidth
                                />
                              </StyledGrid>

                              <StyledGrid item xs={12} sm={8}>
                                <StyledGrid
                                  container
                                  spacing={2}
                                  alignItems="flex-end">
                                  <StyledGrid item xs={6} sm={5}>
                                    <StyledFormControl variant="outlined">
                                      <StyledInputLabel
                                        shrink
                                        htmlFor="expire_month">
                                        {t(
                                          "PaymentMethodSelection.Labels.ExpiryDate"
                                        )}
                                      </StyledInputLabel>

                                      <StyledSelect
                                        required
                                        native
                                        id="expire_month"
                                        name="expire_month"
                                        value={
                                          paymentInfo.creditCardFormData
                                            ?.expire_month
                                        }
                                        onChange={(event) =>
                                          handleCreditCardChange(
                                            event,
                                            currentPaymentNumber
                                          )
                                        }
                                        fullWidth>
                                        {EXPIRY.MONTHS.map(
                                          (month: any, index: number) => (
                                            <option value={month} key={month}>
                                              {month}
                                            </option>
                                          )
                                        )}
                                      </StyledSelect>
                                    </StyledFormControl>
                                  </StyledGrid>
                                  <StyledGrid item xs={6} sm={5}>
                                    <StyledFormControl variant="outlined">
                                      <StyledSelect
                                        native
                                        required
                                        name="expire_year"
                                        value={
                                          paymentInfo.creditCardFormData
                                            ?.expire_year
                                        }
                                        onChange={(event) =>
                                          handleCreditCardChange(
                                            event,
                                            currentPaymentNumber
                                          )
                                        }
                                        fullWidth>
                                        {EXPIRY.YEARS.map(
                                          (year: any, index: number) => (
                                            <option value={year} key={year}>
                                              {year}
                                            </option>
                                          )
                                        )}
                                      </StyledSelect>
                                    </StyledFormControl>
                                  </StyledGrid>
                                </StyledGrid>
                              </StyledGrid>

                              <StyledGrid item xs={12} sm={4}>
                                <StyledTextField
                                  required
                                  name="cc_cvc"
                                  value={paymentInfo.creditCardFormData?.cc_cvc}
                                  label={t("PaymentMethodSelection.Labels.CVV")}
                                  type="tel"
                                  onChange={(event) =>
                                    handleCreditCardChange(
                                      event,
                                      currentPaymentNumber
                                    )
                                  }
                                  error={!isValidCode(currentPaymentNumber)}
                                  helperText={
                                    !isValidCode(currentPaymentNumber)
                                      ? t(
                                          "PaymentMethodSelection.Msgs.InvalidFormat"
                                        )
                                      : ""
                                  }
                                  inputProps={{ maxLength: 4 }}
                                  fullWidth
                                />
                              </StyledGrid>
                            </StyledGrid>
                          </>
                        )}
                    </Fragment>
                  ))}
              </StyledRadioGroup>
            </StyledFormControl>
          </StyledBox>
        )}
      </StyledGrid>

      {useMultiplePayment && (
        <StyledGrid item xs={12} md={6}>
          <StyledTypography variant="body2" className="full-width">
            {t("PaymentMethodSelection.Labels.OrderTotal")}
          </StyledTypography>
          <StyledTypography variant="body1" className="bottom-margin-2">
            <FormattedPriceDisplay
              min={parseFloat(cart.grandTotal)}
              currency={cart.grandTotalCurrency}
            />
          </StyledTypography>

          <StyledTypography variant="body2" className="full-width">
            {t("PaymentMethodSelection.Labels.RemainingAmount")}
          </StyledTypography>
          <StyledTypography variant="body1" className="bottom-margin-2">
            <FormattedPriceDisplay
              min={parseFloat(cart.grandTotal)}
              currency={cart.grandTotalCurrency}
            />
          </StyledTypography>

          <StyledTypography variant="body2" className="full-width">
            {t("PaymentMethodSelection.Labels.AmountToPay")}
          </StyledTypography>
          <StyledTypography
            variant="body2"
            className="full-width"></StyledTypography>
        </StyledGrid>
      )}
    </StyledGrid>
  );
};

export { PaymentMethodSelection };
