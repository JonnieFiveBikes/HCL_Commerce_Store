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
import React, { useEffect, useState, ChangeEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
//Custom libraries
import { PaymentMethodSelection } from "../../widgets/payment-method-selection";
import { PAYMENT, ACCOUNT_CC, ACCOUNT_FOR_VIEW_CC } from "../../../constants/order";
import { EMPTY_STRING } from "../../../constants/common";
import {
  PaymentInfoType,
  CREDITCARDFORMDATA_INIT,
  CreditCardFormDataType,
} from "../../../_foundation/hooks/use-checkout-payment";
import CheckoutAddress, { CheckoutPageType } from "../../pages/checkout/address/CheckoutAddress";
//Redux
import { payMethodsSelector } from "../../../redux/selectors/order";
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { organizationDetailsSelector } from "../../../redux/selectors/organization";
//UI
import { Divider } from "@mui/material";
import { StyledButton, StyledGrid } from "@hcl-commerce-store-sdk/react-component";
import addressUtil from "../../../utils/addressUtil";

interface PaymentMethodContainerProps {
  paymentInfo: PaymentInfoType;
  currentPaymentNumber: number;
  createNewAddress: boolean;
  setCreateNewAddress: (v?: any) => void;
  setEditAddress: (v?: any) => void;
  editAddress: boolean;
  isValidCardNumber: (v?: any) => boolean;
  isValidCode: (v?: any) => boolean;
  isValidPayment: (v?: any) => boolean;
  useMultiplePayment: boolean;
  getMaximumPiAmount: (v?: any) => number;
  handleAddNewPayment: (v?: any, v2?: any) => void;
  handleCancelNewPayment: (v?: any) => void;
  updateSelectedPaymentInfoList: (v?: any, v2?: any) => void;
  handleSavePayment: (v?: any, v2?: any) => void;
  allowMorePayments: boolean;
}

/**
 * PaymentMethodContainer component
 * displays billing address selection component and payment method selection component
 * @param props
 */
const PaymentMethodContainer: React.FC<PaymentMethodContainerProps> = (props: PaymentMethodContainerProps) => {
  const {
    paymentInfo,
    currentPaymentNumber,
    createNewAddress,
    setCreateNewAddress,
    setEditAddress,
    editAddress,
    isValidCardNumber,
    isValidCode,
    isValidPayment,
    useMultiplePayment,
    getMaximumPiAmount,
    handleAddNewPayment,
    handleCancelNewPayment,
    updateSelectedPaymentInfoList,
    handleSavePayment,
    allowMorePayments,
  } = props;
  const payMethods = useSelector(payMethodsSelector);
  const addressDetails: any = useSelector(addressDetailsSelector);
  const orgAddressDetails = useSelector(organizationDetailsSelector);
  const [paymentChosen, setPaymentChosen] = useState<boolean>(false);
  const [localPaymentInfo, setLocalPaymentInfo] = useState<PaymentInfoType>(paymentInfo);
  const thisPaymentInfo = useMultiplePayment ? localPaymentInfo : paymentInfo;
  const { t } = useTranslation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const usableBillAddresses = useMemo(initUsableBillingAddresses, [
    addressDetails,
    orgAddressDetails,
    thisPaymentInfo,
    currentPaymentNumber,
    payMethods,
  ]);

  useEffect(() => {
    if (thisPaymentInfo && thisPaymentInfo.policyId && thisPaymentInfo.payMethodId) {
      setPaymentChosen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisPaymentInfo]);

  useEffect(() => {
    if (paymentInfo) {
      setLocalPaymentInfo(paymentInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentInfo]);

  /**
   * Initialize filtered billing addresses based on usable payment info
   */
  function initUsableBillingAddresses() {
    const filterList: any[] = [];
    if (thisPaymentInfo && currentPaymentNumber !== null) {
      const payment = thisPaymentInfo;
      if (payment) {
        const paymentFromList = payMethods.filter((p) => p.xumet_policyId === payment.policyId)[0];
        const addrList = paymentFromList?.usableBillingAddress;
        const p = addressUtil.filterAddresses(addrList, addressDetails);
        const o = addressUtil.filterOrgAddresses(addrList, orgAddressDetails);
        filterList.push(...p, ...o);
      }
    }
    return filterList;
  }

  /** Handle pi amount changes */
  const onPiAmountChange = (valueAsNumber: number, paymentNumber: number) => {
    if (valueAsNumber) {
      const newPaymentInfo: PaymentInfoType = {
        ...thisPaymentInfo,
        piAmount: valueAsNumber.toString(),
      };
      updatePaymentState(newPaymentInfo, paymentNumber);
    }
  };

  /** Handle credit card form input changes */
  const onCreditCardChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, paymentNumber: number) => {
    const newCreditCardFormData = {
      ...thisPaymentInfo.creditCardFormData,
    };
    if (event.target.name.trim() !== EMPTY_STRING) {
      if (event.target.name === ACCOUNT_CC) {
        newCreditCardFormData[ACCOUNT_FOR_VIEW_CC] = event.target.value;
      }
      newCreditCardFormData[event.target.name] = event.target.value;
    }

    const newPaymentInfo: PaymentInfoType = {
      ...thisPaymentInfo,
      creditCardFormData: newCreditCardFormData,
    };
    updatePaymentState(newPaymentInfo, paymentNumber);
  };

  /** Handle pay option change  */
  const onPayOptionChange = (optionValue: number, paymentNumber: number) => {
    const payment = payMethods.filter((x) => x.xumet_policyId === optionValue)[0];
    const paymentTCId = payment?.paymentTermConditionId;

    let newPaymentInfo: PaymentInfoType = {
      ...thisPaymentInfo,
      payMethodId: payment?.paymentMethodName,
      creditCardFormData: CREDITCARDFORMDATA_INIT,
      paymentTermConditionId: paymentTCId ? paymentTCId : EMPTY_STRING,
      addressId: EMPTY_STRING,
      policyId: payment?.xumet_policyId,
      title: payment?.description,
    };
    if (paymentTCId && paymentTCId !== EMPTY_STRING && PAYMENT.ccMethods[payment.payMethodId]) {
      const formData: CreditCardFormDataType = {
        account: EMPTY_STRING,
        expire_month: EMPTY_STRING,
        expire_year: EMPTY_STRING,
        cc_cvc: EMPTY_STRING,
      };
      newPaymentInfo = {
        ...thisPaymentInfo,
        payMethodId: payment.paymentMethodName,
        creditCardFormData: formData,
        paymentTermConditionId: paymentTCId,
        addressId: EMPTY_STRING,
        policyId: payment?.xumet_policyId,
        title: payment?.description,
      };
    }
    updatePaymentState(newPaymentInfo, paymentNumber);
  };

  /** Sets the billing address id for the current payment method */
  const onBillingAddressIdChange = (newAddressId: string) => {
    const newPaymentInfo: PaymentInfoType = {
      ...thisPaymentInfo,
      addressId: newAddressId,
    };
    updatePaymentState(newPaymentInfo, currentPaymentNumber);
  };

  /** Update appropriate payment state based on single or multiple payment */
  const updatePaymentState = (newPaymentInfo: PaymentInfoType, paymentNumber: number) => {
    if (useMultiplePayment) {
      setLocalPaymentInfo(newPaymentInfo);
    } else {
      updateSelectedPaymentInfoList(newPaymentInfo, paymentNumber);
    }
  };
  return (
    <>
      {!createNewAddress && !editAddress && (
        <>
          <PaymentMethodSelection
            paymentInfo={thisPaymentInfo}
            currentPaymentNumber={currentPaymentNumber}
            togglePayOption={onPayOptionChange}
            handleCreditCardChange={onCreditCardChange}
            isValidCardNumber={isValidCardNumber}
            isValidCode={isValidCode}
            useMultiplePayment={useMultiplePayment}
            handlePiAmountChange={onPiAmountChange}
            getMaximumPiAmount={getMaximumPiAmount}
          />
          <Divider className="top-margin-3 bottom-margin-2" />
        </>
      )}

      <CheckoutAddress
        usableAddresses={usableBillAddresses || []}
        page={CheckoutPageType.PAYMENT}
        setSelectedAddressId={onBillingAddressIdChange}
        selectedAddressId={thisPaymentInfo?.addressId ? thisPaymentInfo.addressId : EMPTY_STRING}
        toggleCreateNewAddress={setCreateNewAddress}
        createNewAddress={createNewAddress}
        editAddress={editAddress}
        toggleEditAddress={setEditAddress}
        orgAddressDetails={orgAddressDetails}
        addressDetails={addressDetails}
        paymentChosen={paymentChosen}
      />

      {useMultiplePayment && !createNewAddress && !editAddress && (
        <>
          <StyledGrid container spacing={1} justifyContent="space-between" className="checkout-actions">
            <StyledGrid item xs={false}>
              <StyledButton
                testId="payment-method-container-cancel"
                color="secondary"
                onClick={() => handleCancelNewPayment()}>
                {t("PaymentMethodContainer.Actions.Cancel")}
              </StyledButton>
            </StyledGrid>

            <StyledGrid item xs spacing={1} container justifyContent="flex-end" className="checkout-actions">
              <StyledGrid item>
                {allowMorePayments &&
                parseFloat(thisPaymentInfo?.piAmount).toFixed(2) !==
                  getMaximumPiAmount(currentPaymentNumber).toFixed(2) ? (
                  <StyledButton
                    testId="payment-method-container-save-add"
                    color="secondary"
                    disabled={!isValidPayment(thisPaymentInfo)}
                    onClick={() => {
                      handleSavePayment(localPaymentInfo, currentPaymentNumber);
                      handleAddNewPayment(localPaymentInfo, currentPaymentNumber);
                    }}>
                    {t("PaymentMethodContainer.Actions.SaveAndAdd")}
                  </StyledButton>
                ) : null}
              </StyledGrid>
              <StyledGrid item>
                <StyledButton
                  testId="payment-method-container-done"
                  color="primary"
                  disabled={!isValidPayment(thisPaymentInfo)}
                  onClick={() => {
                    handleSavePayment(localPaymentInfo, currentPaymentNumber);
                  }}>
                  {t("PaymentMethodContainer.Actions.Done")}
                </StyledButton>
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
        </>
      )}
    </>
  );
};

export { PaymentMethodContainer };
