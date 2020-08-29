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
import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import creditCardType, { types as CardType } from "credit-card-type";
import { useHistory } from "react-router";
//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
import paymentInstructionService from "../../../../_foundation/apis/transaction/paymentInstruction.service";
//Custom libraries
import { PAYMENT, EXPIRY } from "../../../../constants/order";
import { PaymentMethodContainer } from "../../../widgets/payment-method-container";
import * as ROUTES from "../../../../constants/routes";
import storeUtil from "../../../../utils/storeUtil";
//Redux
import {
  isCheckoutDisabledSelector,
  payMethodsSelector,
  cartSelector,
} from "../../../../redux/selectors/order";
import { addressDetailsSelector } from "../../../../redux/selectors/account";
import * as orderActions from "../../../../redux/actions/order";
import * as accountActions from "../../../../redux/actions/account";
//UI
import { Divider } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  StyledBox,
  StyledButton,
  StyledGrid,
  StyledPaper,
  StyledSwitch,
  StyledTypography,
} from "../../../StyledUI";

interface PaymentProps {
  handleBack: Function; //handle back fn to move back in checkout flow
  selectedPayMethod: string;
}

interface CreditCardFormDataType {
  account: string;
  expire_month: string;
  expire_year: string;
  cc_cvc: string;
}

export const CREDITCARDFORMDATA_INIT: CreditCardFormDataType = {
  account: "",
  expire_month: EXPIRY.MONTHS[0],
  expire_year: EXPIRY.YEARS[0],
  cc_cvc: "",
};

export interface PaymentInfoType {
  selectedPayOption: string;
  creditCardFormData: CreditCardFormDataType;
}

/**
 * Payment section
 * displays ship mode selection, and payment instructions input
 * @param props
 */
const Payment: React.FC = (props: any) => {
  const isCheckoutDisabled = useSelector(isCheckoutDisabledSelector);
  const payMethods = useSelector(payMethodsSelector);
  const addressDetails: any = useSelector(addressDetailsSelector);
  const cart = useSelector(cartSelector);

  const selectedPayMethod = props.selectedPayMethod
    ? props.selectedPayMethod
    : PAYMENT.paymentMethodName.cod;

  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const mySite: any = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const isB2B = mySite ? mySite.isB2B : false;
  const paymentInfoInit: PaymentInfoType = {
    selectedPayOption:
      selectedPayMethod === PAYMENT.payOptions.cod
        ? PAYMENT.payOptions.cod
        : PAYMENT.payOptions.cc,
    creditCardFormData: CREDITCARDFORMDATA_INIT,
  };
  const [selectedPaymentInfoList, setSelectedPaymentInfoList] = useState<
    PaymentInfoType[]
  >([paymentInfoInit]);
  const usableBillAddresses = useMemo(() => initUsableBillingAddresses(), [
    payMethods,
    addressDetails,
  ]);
  const [selectedBillAddressIdList, setSelectedBillAddressIdList] = useState<
    string[]
  >([""]);
  const [useMultiplePayment, setUseMultiplePayment] = useState<boolean>(false);
  const [currentPaymentNumber, setCurrentPaymentNumber] = useState<number>(0);
  const [createNewAddress, setCreateNewAddress] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const { allowedCardTypes, allowedCardDisplayNames } = useMemo(
    () => initAllowedCardTypes(),
    [payMethods]
  );

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
      dispatch(orderActions.GET_PAYMETHODS_ACTION(payload));
      dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION(payload));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite]);

  useEffect(() => {
    if (cart?.paymentInstruction?.length > 0) {
      setSelectedBillAddressIdList(
        cart.paymentInstruction.map((pi) => pi.billing_address_id)
      );
      setSelectedPaymentInfoList(
        cart.paymentInstruction.map((pi) => {
          let payMethodId = pi.payMethodId;
          if (payMethodId !== PAYMENT.payOptions.cod) {
            payMethodId = PAYMENT.payOptions.cc;
          }
          const newPaymentInfo: PaymentInfoType = {
            selectedPayOption: payMethodId,
            creditCardFormData: CREDITCARDFORMDATA_INIT,
          };
          return newPaymentInfo;
        })
      );
    }
  }, [cart]);

  const handleMultiplePaymentChange = (event) =>
    setUseMultiplePayment(event.target.checked);

  /**
   * Initialize filtered billing addresses based on usable payment info
   */
  function initUsableBillingAddresses() {
    let newFilteredUsableBillAddresses: any[] | null = null;
    if (payMethods) {
      let newUsableBillAddresses: any[] = [];
      for (let i = 0; i < payMethods.length; i++) {
        if (payMethods[i].paymentMethodName === selectedPayMethod) {
          newUsableBillAddresses = payMethods[i].usableBillingAddress;
          break;
        }
      }
      if (newUsableBillAddresses && newUsableBillAddresses.length > 0) {
        newFilteredUsableBillAddresses = filterAddresses(
          newUsableBillAddresses
        );
      }
    }
    return newFilteredUsableBillAddresses;
  }

  /**
   * Filter out addresses that does not have the mandatory fields for checkout
   * @param usableAddresses List of addresses to scan
   * @returns Filtered list of addresses
   */
  function filterAddresses(usableAddresses: any[]) {
    if (usableAddresses) {
      const filteredList = usableAddresses.filter((address) => {
        if (address && addressDetails) {
          if (address.addressId === addressDetails.addressId) {
            return (
              addressDetails.addressLine !== undefined &&
              addressDetails.country !== undefined &&
              addressDetails.addressLine[0] !== "" &&
              addressDetails.country !== ""
            );
          } else if (
            addressDetails.contactMap &&
            addressDetails.contactMap[address.addressId]
          ) {
            const adressDetailsFromContact =
              addressDetails.contactMap[address.addressId];
            return (
              adressDetailsFromContact.addressLine !== undefined &&
              adressDetailsFromContact.country !== undefined &&
              adressDetailsFromContact.addressLine[0] !== "" &&
              adressDetailsFromContact.country !== ""
            );
          } else {
            return false;
          }
        }
        return false;
      });
      if (filteredList && filteredList.length > 0) {
        return filteredList;
      }
    }
    return null;
  }

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

  /** Sets the billing address id for the current payment method # */
  const setSelectedBillingAddressId = (newAddressId: string) => {
    let newBillingAddressIdList: string[] = selectedBillAddressIdList.slice();
    newBillingAddressIdList[currentPaymentNumber] = newAddressId;
    setSelectedBillAddressIdList(newBillingAddressIdList);
  };

  /**
   * Handle pay option change
   * @param option The selected pay option
   */
  function togglePayOption(optionValue: string) {
    let newPaymentInfo: PaymentInfoType = {
      selectedPayOption: optionValue,
      creditCardFormData: CREDITCARDFORMDATA_INIT,
    };

    let newPaymentInfoList: PaymentInfoType[] = selectedPaymentInfoList.slice();
    newPaymentInfoList.splice(currentPaymentNumber, 1, newPaymentInfo);
    setSelectedPaymentInfoList(newPaymentInfoList);
  }

  /**
   * Handle credit card form input changes
   * @param event The event handler
   */
  function handleCreditCardChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    paymentNumber: number
  ) {
    let newCreditCardFormData = {
      ...selectedPaymentInfoList[paymentNumber].creditCardFormData,
    };
    if (event.target.name.trim() !== "") {
      newCreditCardFormData[event.target.name] = event.target.value;

      let newPaymentInfo: PaymentInfoType = {
        ...selectedPaymentInfoList[paymentNumber],
        creditCardFormData: newCreditCardFormData,
      };

      let newPaymentInfoList: PaymentInfoType[] = selectedPaymentInfoList.slice();
      newPaymentInfoList.splice(paymentNumber, 1, newPaymentInfo);
      setSelectedPaymentInfoList(newPaymentInfoList);
    }
  }

  /**
   * Checks if the entered credit card number is a numeric value
   * @returns Whether the card number format is valid.
   */
  function isValidCardNumber(paymentNumber: number) {
    return (
      selectedPaymentInfoList[
        paymentNumber
      ]?.creditCardFormData.account?.trim() === "" ||
      storeUtil.isNumeric(
        selectedPaymentInfoList[
          paymentNumber
        ]?.creditCardFormData.account?.trim()
      )
    );
  }

  /**
   * Checks if the entered cvv code entered is a numeric value
   * @returns Whether the cvv code format is valid.
   */
  function isValidCode(paymentNumber: number) {
    return (
      selectedPaymentInfoList[
        paymentNumber
      ]?.creditCardFormData.cc_cvc?.trim() === "" ||
      storeUtil.isNumeric(
        selectedPaymentInfoList[
          paymentNumber
        ]?.creditCardFormData.cc_cvc?.trim()
      )
    );
  }

  /**
   * Validate billing address id list and payment options/credit card inputs
   * @returns Whether or not payment selections is valid
   */
  function isValidPayment() {
    for (let i = 0; i < selectedBillAddressIdList.length; i++) {
      if (selectedBillAddressIdList[i] === "") {
        return false;
      }
    }
    for (let i = 0; i < selectedPaymentInfoList.length; i++) {
      if (
        selectedPaymentInfoList[i].selectedPayOption !==
          PAYMENT.payOptions.cod &&
        selectedPaymentInfoList[i].selectedPayOption !== PAYMENT.payOptions.cc
      ) {
        return false;
      } else if (
        selectedPaymentInfoList[i].selectedPayOption === PAYMENT.payOptions.cc
      ) {
        for (let key in selectedPaymentInfoList[i].creditCardFormData) {
          if (
            selectedPaymentInfoList[i].creditCardFormData[key]?.trim() === ""
          ) {
            return false;
          }
        }
        if (isValidCardNumber(i) === false) {
          return false;
        }
        if (isValidCode(i) === false) {
          return false;
        }
        if (
          getAllowedCardType(
            selectedPaymentInfoList[i].creditCardFormData.account
          ) === ""
        ) {
          return false;
        }
      }
    }
    if (selectedBillAddressIdList.length !== selectedPaymentInfoList.length) {
      return false;
    }
    return true;
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
  async function submit() {
    if (canContinue()) {
      await paymentInstructionService.deleteAllPaymentInstructions({
        ...payloadBase,
      });

      for (let i = 0; i < selectedPaymentInfoList.length; i++) {
        const thisPayment = selectedPaymentInfoList[i];
        let payMethod = thisPayment.selectedPayOption;
        if (
          selectedPaymentInfoList[i].selectedPayOption === PAYMENT.payOptions.cc
        ) {
          payMethod = getAllowedCardType(
            thisPayment.creditCardFormData.account
          );
        }

        let body: any = {
          piAmount: cart.grandTotal,
          billing_address_id: selectedBillAddressIdList[i],
          payMethodId: payMethod,
        };
        if (
          selectedPaymentInfoList[i].selectedPayOption === PAYMENT.payOptions.cc
        ) {
          body = {
            ...body,
            account: thisPayment.creditCardFormData.account,
            expire_month: thisPayment.creditCardFormData.expire_month,
            expire_year: thisPayment.creditCardFormData.expire_year,
            cc_cvc: thisPayment.creditCardFormData.cc_cvc,
            cc_brand: payMethod,
          };
        }

        const payload = {
          ...payloadBase,
          body,
        };
        await paymentInstructionService.addPaymentInstruction(payload);
      }
      dispatch(
        orderActions.FETCHING_CART_ACTION({
          ...payloadBase,
          fetchCatentries: true,
        })
      );
      history.push(ROUTES.CHECKOUT_REVIEW);
    }
  }

  /**
   * Go back to the previous checkout step
   */
  function back() {
    history.push(ROUTES.CHECKOUT_SHIPPING);
  }

  return (
    <StyledPaper className="vertical-padding-2 horizontal-padding-2">
      <StyledGrid
        container
        direction="row"
        alignments="center"
        justify="flex-start"
        spacing={2}>
        {!createNewAddress && !editAddress ? (
          <>
            <StyledGrid item>
              <StyledBox
                display="flex"
                flexDirection="row"
                alignItems="center"
                className="full-height">
                <StyledTypography variant="h4" component="p">
                  {t("Payment.Title")}
                </StyledTypography>
              </StyledBox>
            </StyledGrid>
            <StyledGrid item>
              <StyledSwitch
                checked={useMultiplePayment}
                setChecked={handleMultiplePaymentChange}
                label={t("Payment.Labels.UseMultiple")}
                disabled
              />
            </StyledGrid>
          </>
        ) : (
          <>
            <StyledGrid item>
              <StyledButton
                variant="text"
                onClick={() => {
                  setCreateNewAddress(false);
                  setEditAddress(false);
                }}>
                <StyledTypography variant="h4" component="p">
                  {t("Payment.Title")}
                </StyledTypography>
              </StyledButton>
            </StyledGrid>
            <StyledGrid item>
              <StyledBox
                variant="div"
                display="inline-flex"
                alignItems="center"
                className="full-height">
                <ChevronRightIcon />
              </StyledBox>
            </StyledGrid>
            {editAddress ? (
              <StyledGrid item>
                <StyledTypography variant="h4" component="p">
                  {t("Shipping.Labels.EditAddress")}
                </StyledTypography>
              </StyledGrid>
            ) : (
              <StyledGrid item>
                <StyledTypography variant="h4" component="p">
                  {t("Shipping.Labels.AddNewAddress")}
                </StyledTypography>
              </StyledGrid>
            )}
          </>
        )}
      </StyledGrid>
      <Divider className="top-margin-3 bottom-margin-2" />

      {!useMultiplePayment ? (
        <PaymentMethodContainer
          allowedCardDisplayNames={allowedCardDisplayNames}
          selectedPaymentInfoList={selectedPaymentInfoList}
          currentPaymentNumber={currentPaymentNumber}
          usableBillAddresses={usableBillAddresses}
          selectedAddressIdList={selectedBillAddressIdList}
          setSelectedAddressId={setSelectedBillingAddressId}
          getAllowedCardType={getAllowedCardType}
          setCreateNewAddress={setCreateNewAddress}
          createNewAddress={createNewAddress}
          editAddress={editAddress}
          setEditAddress={setEditAddress}
          togglePayOption={togglePayOption}
          handleCreditCardChange={handleCreditCardChange}
          isValidCardNumber={isValidCardNumber}
          isValidCode={isValidCode}
        />
      ) : (
        <></>
      )}

      {!createNewAddress && !editAddress && (
        <StyledGrid
          container
          justify="space-between"
          className="checkout-actions">
          <StyledGrid item>
            <StyledButton
              className="left-border-solid"
              size="small"
              variant="outlined"
              onClick={() => back()}>
              {t("Payment.Actions.Back")}
            </StyledButton>
          </StyledGrid>
          <StyledGrid item>
            <StyledButton
              color="primary"
              disabled={!canContinue()}
              onClick={() => submit()}>
              {t("Payment.Actions.Next")}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      )}
    </StyledPaper>
  );
};

export default Payment;
