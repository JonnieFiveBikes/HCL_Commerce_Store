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
import { PaymentMethodSelection } from "../../widgets/payment-method-selection";
import { PaymentInfoType } from "../../pages/checkout/payment/Payment";
import CheckoutAddress, {
  CheckoutPageType,
} from "../../pages/checkout/address/Address";
//UI
import { Divider } from "@material-ui/core";

interface PaymentMethodContainerProps {
  allowedCardDisplayNames: string[];
  selectedPaymentInfoList: PaymentInfoType[];
  currentPaymentNumber: number;
  usableBillAddresses: any[] | null;
  selectedAddressIdList: string[];
  setSelectedAddressId: Function; //setter fn to set selected billing address id
  getAllowedCardType: Function;
  createNewAddress: boolean;
  setCreateNewAddress: Function;
  setEditAddress: Function;
  editAddress: boolean;
  togglePayOption: Function;
  handleCreditCardChange: Function;
  isValidCardNumber: Function;
  isValidCode: Function;
}

/**
 * PaymentMethodContainer component
 * displays billing address selection component and payment method selection component
 * @param props
 */
const PaymentMethodContainer: React.FC<PaymentMethodContainerProps> = (
  props: PaymentMethodContainerProps
) => {
  const {
    usableBillAddresses,
    allowedCardDisplayNames,
    selectedPaymentInfoList,
    currentPaymentNumber,
    selectedAddressIdList,
    setSelectedAddressId,
    getAllowedCardType,
    createNewAddress,
    setCreateNewAddress,
    setEditAddress,
    editAddress,
    togglePayOption,
    handleCreditCardChange,
    isValidCardNumber,
    isValidCode,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <CheckoutAddress
        usableAddresses={usableBillAddresses || []}
        page={CheckoutPageType.PAYMENT}
        setSelectedAddressId={setSelectedAddressId}
        selectedAddressId={selectedAddressIdList[currentPaymentNumber]}
        toggleCreateNewAddress={setCreateNewAddress}
        createNewAddress={createNewAddress}
        editAddress={editAddress}
        toggleEditAddress={setEditAddress}
      />

      {!createNewAddress && !editAddress && (
        <>
          <PaymentMethodSelection
            allowedCardDisplayNames={allowedCardDisplayNames}
            selectedPaymentInfoList={selectedPaymentInfoList}
            getAllowedCardType={getAllowedCardType}
            currentPaymentNumber={currentPaymentNumber}
            togglePayOption={togglePayOption}
            handleCreditCardChange={handleCreditCardChange}
            isValidCardNumber={isValidCardNumber}
            isValidCode={isValidCode}
          />
          <Divider className="top-margin-3 bottom-margin-2" />
        </>
      )}
    </>
  );
};

export { PaymentMethodContainer };
