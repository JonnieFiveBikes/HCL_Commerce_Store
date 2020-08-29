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
import { PAYMENT, EXPIRY } from "../../../constants/order";
import { PaymentInfoType } from "../../pages/checkout/payment/Payment";
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
  StyledMenuItem,
  StyledBox,
  StyledIconLabel,
} from "../../StyledUI";

interface PaymentMethodSelectionProps {
  allowedCardDisplayNames: string[];
  selectedPaymentInfoList: PaymentInfoType[];
  currentPaymentNumber: number;
  getAllowedCardType: Function;
  togglePayOption: Function;
  handleCreditCardChange: Function;
  isValidCardNumber: Function;
  isValidCode: Function;
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
    allowedCardDisplayNames,
    selectedPaymentInfoList,
    currentPaymentNumber,
    togglePayOption,
    handleCreditCardChange,
    isValidCardNumber,
    isValidCode,
  } = props;
  const { t } = useTranslation();
  const currentPaymentInfo = selectedPaymentInfoList[currentPaymentNumber];

  return (
    <StyledGrid container spacing={2}>
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
        <StyledBox className="basic-border" border={1}>
          <StyledFormControl component="fieldset">
            <StyledRadioGroup
              name="payOption"
              value={currentPaymentInfo?.selectedPayOption}
              onChange={(event) => togglePayOption(event.target.value)}
              className="bottom-padding-2">
              <StyledFormControlLabel
                value={PAYMENT.payOptions.cod}
                control={<StyledRadio />}
                label={
                  <StyledTypography variant="body2">
                    {t("PaymentMethodSelection.Labels.COD")}
                  </StyledTypography>
                }
                className="vertical-padding-1 pay-option"
              />
              {allowedCardDisplayNames && allowedCardDisplayNames.length > 0 && (
                <>
                  <StyledFormControlLabel
                    value={PAYMENT.payOptions.cc}
                    control={<StyledRadio />}
                    label={
                      <StyledTypography variant="body2">
                        {t("PaymentMethodSelection.Labels.CreditCard")}
                      </StyledTypography>
                    }
                    className="top-padding-1 pay-option"
                  />
                  <StyledTypography variant="body1" className="left-padding-5">
                    {t("PaymentMethodSelection.Msgs.CreditCard", {
                      cards: allowedCardDisplayNames.join(", "),
                    })}
                  </StyledTypography>
                </>
              )}
            </StyledRadioGroup>
          </StyledFormControl>

          {currentPaymentInfo?.selectedPayOption === PAYMENT.payOptions.cc && (
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
                    value={currentPaymentInfo?.creditCardFormData?.account}
                    label={t("PaymentMethodSelection.Labels.CCNumber")}
                    type="tel"
                    onChange={(event) =>
                      handleCreditCardChange(event, currentPaymentNumber)
                    }
                    error={!isValidCardNumber(currentPaymentNumber)}
                    helperText={
                      !isValidCardNumber(currentPaymentNumber)
                        ? t("PaymentMethodSelection.Msgs.InvalidFormat")
                        : ""
                    }
                    inputProps={{ maxLength: 19 }}
                    fullWidth
                  />
                </StyledGrid>

                <StyledGrid item xs={12} sm={8}>
                  <StyledGrid container spacing={2} alignItems="flex-end">
                    <StyledGrid item xs={6} sm={5}>
                      <StyledFormControl variant="outlined">
                        <StyledInputLabel shrink htmlFor="expire_month">
                          {t("PaymentMethodSelection.Labels.ExpiryDate")}
                        </StyledInputLabel>

                        <StyledSelect
                          required
                          native
                          id="expire_month"
                          name="expire_month"
                          value={
                            currentPaymentInfo?.creditCardFormData?.expire_month
                          }
                          onChange={(event) =>
                            handleCreditCardChange(event, currentPaymentNumber)
                          }
                          fullWidth>
                          {EXPIRY.MONTHS.map((month: any, index: number) => (
                            <option value={month} key={month}>
                              {month}
                            </option>
                          ))}
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
                            currentPaymentInfo?.creditCardFormData?.expire_year
                          }
                          onChange={(event) =>
                            handleCreditCardChange(event, currentPaymentNumber)
                          }
                          fullWidth>
                          {EXPIRY.YEARS.map((year: any, index: number) => (
                            <option value={year} key={year}>
                              {year}
                            </option>
                          ))}
                        </StyledSelect>
                      </StyledFormControl>
                    </StyledGrid>
                  </StyledGrid>
                </StyledGrid>

                <StyledGrid item xs={12} sm={4}>
                  <StyledTextField
                    required
                    name="cc_cvc"
                    value={currentPaymentInfo?.creditCardFormData?.cc_cvc}
                    label={t("PaymentMethodSelection.Labels.CVV")}
                    type="tel"
                    onChange={(event) =>
                      handleCreditCardChange(event, currentPaymentNumber)
                    }
                    error={!isValidCode(currentPaymentNumber)}
                    helperText={
                      !isValidCode(currentPaymentNumber)
                        ? t("PaymentMethodSelection.Msgs.InvalidFormat")
                        : ""
                    }
                    inputProps={{ maxLength: 4 }}
                    fullWidth
                  />
                </StyledGrid>
              </StyledGrid>
            </>
          )}
        </StyledBox>
      </StyledGrid>
    </StyledGrid>
  );
};

export { PaymentMethodSelection };
