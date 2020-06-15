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
import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import creditCardType, { types as CardType } from "credit-card-type";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import FormattedPriceDisplay from "../../widgets/formatted-price-display";
import { PAYMENT, EXPIRY } from "../../../constants/order";
import storeUtil from "../../../utils/storeUtil";
//Redux
import {
  orderItemsSelector,
  isCheckoutDisabledSelector,
  shipModesSelector,
  payMethodsSelector,
} from "../../../redux/selectors/order";
import * as orderActions from "../../../redux/actions/order";
//UI
import { Divider } from "@material-ui/core";
import {
  StyledGrid,
  StyledPaper,
  StyledTypography,
  StyledTextField,
  StyledRadio,
  StyledRadioGroup,
  StyledFormControl,
  StyledFormControlLabel,
  StyledInputLabel,
  StyledButton,
  StyledSelect,
  StyledMenuItem,
  StyledBox,
} from "../../StyledUI";

interface PaymentSectionProps {
  handleBack: Function; //handle back fn to move back in checkout flow
  selectedShipAddressId: string;
  selectedBillAddressId: string;
  selectedPayMethod: string;
  setSelectedPayMethod: Function; //setter fn to set selecting payment method
}

/**
 * Payment section
 * displays ship mode selection, and payment instructions input
 * @param props
 */
const PaymentSection: React.FC<PaymentSectionProps> = (props: any) => {
  const isCheckoutDisabled = useSelector(isCheckoutDisabledSelector);
  const orderItems = useSelector(orderItemsSelector);
  const shipModes = useSelector(shipModesSelector);
  const payMethods = useSelector(payMethodsSelector);

  const handleBack = props.handleBack;
  const selectedShipAddressId = props.selectedShipAddressId;
  const selectedBillAddressId = props.selectedBillAddressId;
  const selectedPayMethod = props.selectedPayMethod;
  const setSelectedPayMethod = props.setSelectedPayMethod;

  const payOptions = { cod: "COD", cc: "CC" };
  const [payOption, setPayOption] = useState<string>(
    selectedPayMethod === payOptions.cod ? payOptions.cod : payOptions.cc
  );
  const [selectedShipModeId, setSelectedShipModeId] = useState<string>("");
  const creditCardFormDataInit = {
    account: "",
    expire_month: EXPIRY.MONTHS[0],
    expire_year: EXPIRY.YEARS[0],
    cc_cvc: "",
  };
  const [creditCardFormData, setCreditCardFormData] = useState<any>(
    creditCardFormDataInit
  );
  const { allowedCardTypes, allowedCardDisplayNames } = initAllowedCardTypes();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mySite: any = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    if (mySite) {
      let payload = {
        ...payloadBase,
      };
      dispatch(orderActions.GET_SHIPMODES_ACTION(payload));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite]);

  useEffect(() => {
    if (shipModes) {
      if (
        shipModes.length > 0 &&
        selectedShipModeId === "" &&
        orderItems.length > 0
      ) {
        for (let i = 0; i < shipModes.length; i++) {
          if (orderItems[0].shipModeId === shipModes[i].shipModeId) {
            setSelectedShipModeId(shipModes[i].shipModeId);
            break;
          }
        }
      }
    }
  }, [shipModes]);

  /**
   * Initialize allowed credit card types based on usable payment info
   * and map to card-type utility's type constants
   */
  function initAllowedCardTypes() {
    let newAllowedCardTypes = {};
    let newAllowedCardDisplayNames: string[] = [];
    payMethods.forEach((payMethod: any) => {
      if (payMethod.paymentMethodName === PAYMENT.paymentMethodName.visa) {
        newAllowedCardTypes[CardType.VISA] = PAYMENT.paymentMethodName.visa;
        newAllowedCardDisplayNames.push(PAYMENT.paymentDisplayName.visa);
      } else if (payMethod.paymentMethodName === PAYMENT.paymentMethodName.mc) {
        newAllowedCardTypes[CardType.MASTERCARD] = PAYMENT.paymentMethodName.mc;
        newAllowedCardDisplayNames.push(PAYMENT.paymentDisplayName.mc);
      } else if (
        payMethod.paymentMethodName === PAYMENT.paymentMethodName.amex
      ) {
        newAllowedCardTypes[CardType.AMERICAN_EXPRESS] =
          PAYMENT.paymentMethodName.amex;
        newAllowedCardDisplayNames.push(PAYMENT.paymentDisplayName.amex);
      }
    });
    return {
      allowedCardTypes: newAllowedCardTypes,
      allowedCardDisplayNames: newAllowedCardDisplayNames,
    };
  }

  /**
   * Handle pay option change
   * @param option The selected pay option
   */
  function togglePayOption(optionValue: string) {
    setPayOption(optionValue);
    setCreditCardFormData(creditCardFormDataInit);
  }

  /**
   * Handle credit card form input changes
   * @param event The event handler
   */
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let newCreditCardFormData = { ...creditCardFormData };
    if (event.target.name.trim() !== "") {
      newCreditCardFormData[event.target.name] = event.target.value;
      setCreditCardFormData(newCreditCardFormData);
    }
  }

  /**
   * Checks if the entered credit card number is a numeric value
   * @returns Whether the card number format is valid.
   */
  function isValidCardNumber() {
    return (
      creditCardFormData.account.trim() === "" ||
      storeUtil.isNumeric(creditCardFormData.account.trim())
    );
  }

  /**
   * Checks if the entered cvv code entered is a numeric value
   * @returns Whether the cvv code format is valid.
   */
  function isValidCode() {
    return (
      creditCardFormData.cc_cvc.trim() === "" ||
      storeUtil.isNumeric(creditCardFormData.cc_cvc.trim())
    );
  }

  /**
   * Detect credit card type based on card number
   * then validate against usable payment methods to see if card type is allowed
   * @param cardNumber The credit card number to check
   * @returns The credit card type if it is an allowed payment method. Otherwise return empty string.
   */
  function getAllowedCardType(cardNumber: string) {
    let allowedCardType = "";
    const cardTypeList = creditCardType(cardNumber);

    if (cardTypeList != null && cardTypeList.length > 0) {
      const type = cardTypeList[0].type;
      if (allowedCardTypes[type] !== undefined) {
        allowedCardType = allowedCardTypes[type];
      } else {
        allowedCardType = type;
      }
    } else {
      //Fallback to first allowed card type for service to validate, if type not found
      if (Object.keys(allowedCardTypes).length > 0) {
        allowedCardType = allowedCardTypes[Object.keys(allowedCardTypes)[0]];
      } else {
        //Last fallback to visa
        allowedCardType = PAYMENT.paymentMethodName.visa;
      }
    }
    return allowedCardType;
  }

  /**
   * Validate payment options and input
   * @returns Whether or not payment selections is valid
   */
  function isValidPayment() {
    if (payOption === payOptions.cod) {
      return true;
    } else if (payOption === payOptions.cc) {
      for (let key in creditCardFormData) {
        if (creditCardFormData[key].trim() === "") {
          return false;
        }
      }
      if (getAllowedCardType(creditCardFormData.account) === "") {
        return false;
      }
      return true;
    }
  }

  /**
   * Validate whether shopper can proceed to next step
   * @returns Whether next step is allowed
   */
  function canContinue() {
    return !isCheckoutDisabled && isValidPayment();
  }

  /**
   * Submit the selected ship mode and payment information
   */
  function submit() {
    if (canContinue()) {
      let payMethod = payOption;
      if (payOption === payOptions.cc) {
        payMethod = getAllowedCardType(creditCardFormData.account);
      }
      let payload = {
        ...payloadBase,
        shipModeId: selectedShipModeId,
        shipAddressId: selectedShipAddressId,
        billAddressId: selectedBillAddressId,
        payMethodId: payMethod,
      };
      if (payOption === payOptions.cc) {
        payload = {
          ...payload,
          ...creditCardFormData,
        };
      }
      dispatch(orderActions.UPDATE_SHIPMODE_AND_ADD_PI_ACTION(payload));
      setSelectedPayMethod(payMethod);
    }
  }

  /**
   * Go back to the previous checkout step
   */
  function back() {
    handleBack();
  }

  return (
    <StyledPaper className="vertical-padding-2 horizontal-padding-2">
      <StyledGrid container>
        <StyledGrid container item xs={12} md={6} className="bottom-margin-3">
          <StyledGrid item xs={12} sm={8} md={8}>
            <StyledTypography variant="h6" className="bottom-margin-2">
              {t("PaymentSection.Title.ShipMethod")}
            </StyledTypography>
            <StyledSelect
              value={selectedShipModeId}
              name="shipMode"
              onChange={(event) => setSelectedShipModeId(event.target.value)}
              fullWidth>
              {shipModes.map((shipMode: any, index: number) => (
                <StyledMenuItem
                  value={shipMode.shipModeId}
                  key={shipMode.shipModeId}>
                  {shipMode.description} -{" "}
                  <FormattedPriceDisplay
                    min={parseFloat(shipMode.shippingCharge)}
                  />
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </StyledGrid>
        </StyledGrid>

        <StyledGrid container item xs={12} md={6}>
          <StyledGrid container item xs={12} sm={8} md={8}>
            <StyledTypography variant="h6" className="bottom-margin-2">
              {t("PaymentSection.Title.PayMethod")}
            </StyledTypography>
            <StyledFormControl component="fieldset">
              <StyledBox
                className="basic-border horizontal-padding-2 bottom-padding-2 top-padding-1"
                border={1}>
                <StyledRadioGroup
                  name="payOption"
                  value={payOption}
                  onChange={(event) => togglePayOption(event.target.value)}>
                  <StyledFormControlLabel
                    value={payOptions.cod}
                    control={<StyledRadio />}
                    label={
                      <StyledTypography variant="body2">
                        {t("PaymentSection.Labels.COD")}
                      </StyledTypography>
                    }
                  />
                  {allowedCardDisplayNames &&
                    allowedCardDisplayNames.length > 0 && (
                      <>
                        <StyledFormControlLabel
                          value={payOptions.cc}
                          control={<StyledRadio />}
                          label={
                            <StyledTypography variant="body2">
                              {t("PaymentSection.Labels.CreditCard")}
                            </StyledTypography>
                          }
                        />
                        <StyledTypography
                          variant="body1"
                          className="left-padding-4">
                          {t("PaymentSection.Msgs.CreditCard", {
                            cards: allowedCardDisplayNames.join(", "),
                          })}
                        </StyledTypography>
                      </>
                    )}
                </StyledRadioGroup>
              </StyledBox>
            </StyledFormControl>

            {payOption === payOptions.cc && (
              <>
                <StyledGrid item xs={12} className="bottom-margin-3">
                  <StyledTextField
                    required
                    name="account"
                    label={t("PaymentSection.Labels.CCNumber")}
                    type="tel"
                    onChange={(event) => handleChange(event)}
                    error={!isValidCardNumber()}
                    helperText={
                      !isValidCardNumber()
                        ? t("PaymentSection.Msgs.InvalidFormat")
                        : ""
                    }
                    inputProps={{ maxLength: 19 }}
                    fullWidth
                  />
                </StyledGrid>
                <StyledGrid item xs={12} md={6}>
                  <StyledInputLabel id="expMonth-label">
                    <StyledTypography variant="body2">
                      {t("PaymentSection.Labels.ExpiryDate")}
                    </StyledTypography>
                  </StyledInputLabel>
                  <StyledGrid container item xs={12} spacing={2}>
                    <StyledGrid item xs={6}>
                      <StyledFormControl required>
                        <StyledSelect
                          required
                          labelId="expMonth-label"
                          name="expire_month"
                          value={creditCardFormData.expire_month}
                          onChange={(event) => handleChange(event)}
                          fullWidth>
                          {EXPIRY.MONTHS.map((month: any, index: number) => (
                            <StyledMenuItem value={month} key={month}>
                              {month}
                            </StyledMenuItem>
                          ))}
                        </StyledSelect>
                      </StyledFormControl>
                    </StyledGrid>
                    <StyledGrid item xs={6}>
                      <StyledFormControl required>
                        <StyledSelect
                          required
                          name="expire_year"
                          value={creditCardFormData.expire_year}
                          onChange={(event) => handleChange(event)}
                          fullWidth>
                          {EXPIRY.YEARS.map((year: any, index: number) => (
                            <StyledMenuItem value={year} key={year}>
                              {year}
                            </StyledMenuItem>
                          ))}
                        </StyledSelect>
                      </StyledFormControl>
                    </StyledGrid>
                  </StyledGrid>
                </StyledGrid>
                <StyledGrid item xs={12} md={6}>
                  <StyledTextField
                    required
                    name="cc_cvc"
                    label={t("PaymentSection.Labels.CVV")}
                    type="tel"
                    onChange={(event) => handleChange(event)}
                    error={!isValidCode()}
                    helperText={
                      !isValidCode()
                        ? t("PaymentSection.Msgs.InvalidFormat")
                        : t("PaymentSection.Msgs.CVV")
                    }
                    inputProps={{ maxLength: 4 }}
                    fullWidth
                  />
                </StyledGrid>
              </>
            )}
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
      <Divider className="top-margin-3 bottom-margin-2" />
      <StyledGrid
        container
        justify="space-between"
        className="checkout-actions">
        <StyledGrid item>
          <StyledButton color="secondary" onClick={() => back()}>
            {t("PaymentSection.Actions.Back")}
          </StyledButton>
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            color="primary"
            disabled={!canContinue()}
            onClick={() => submit()}>
            {t("PaymentSection.Actions.Next")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
};

export { PaymentSection };
