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
import React, { useEffect } from "react";
//Custom libraries
import { PaymentMethodSelection } from "../../widgets/payment-method-selection";
import { PaymentInfoType } from "../../pages/checkout/payment/Payment";
import CheckoutAddress, {
  CheckoutPageType,
} from "../../pages/checkout/address/CheckoutAddress";
//UI
import { Divider } from "@material-ui/core";

interface PaymentMethodContainerProps {
  paymentInfo: PaymentInfoType;
  currentPaymentNumber: number;
  usableBillAddresses: any[] | null;
  setSelectedAddressId: Function; //setter fn to set selected billing address id
  createNewAddress: boolean;
  setCreateNewAddress: Function;
  setEditAddress: Function;
  editAddress: boolean;
  togglePayOption: Function;
  handleCreditCardChange: Function;
  isValidCardNumber: Function;
  isValidCode: Function;
  useMultiplePayment: boolean;
  paymentsList: any[];
  isPersonalAddressAllowed: string;
  orgAddressDetails: any[];
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
    paymentInfo,
    currentPaymentNumber,
    setSelectedAddressId,
    createNewAddress,
    setCreateNewAddress,
    setEditAddress,
    editAddress,
    togglePayOption,
    handleCreditCardChange,
    isValidCardNumber,
    isValidCode,
    useMultiplePayment,
    paymentsList,
    isPersonalAddressAllowed,
    orgAddressDetails,
  } = props;

  const [paymentChosen, setPaymentChosen] = React.useState<boolean>(false);

  useEffect(() => {
    if (paymentInfo && paymentInfo.policyId && paymentInfo.payMethodId) {
      setPaymentChosen(true);
    }
  }, [paymentInfo]);

  return (
    <>
      {!createNewAddress && !editAddress && (
        <>
          <PaymentMethodSelection
            paymentInfo={paymentInfo}
            currentPaymentNumber={currentPaymentNumber}
            togglePayOption={togglePayOption}
            handleCreditCardChange={handleCreditCardChange}
            isValidCardNumber={isValidCardNumber}
            isValidCode={isValidCode}
            useMultiplePayment={useMultiplePayment}
            paymentsList={paymentsList}
          />
          <Divider className="top-margin-3 bottom-margin-2" />
        </>
      )}

      <CheckoutAddress
        usableAddresses={usableBillAddresses || []}
        page={CheckoutPageType.PAYMENT}
        setSelectedAddressId={setSelectedAddressId}
        selectedAddressId={paymentInfo?.addressId ? paymentInfo.addressId : ""}
        toggleCreateNewAddress={setCreateNewAddress}
        createNewAddress={createNewAddress}
        editAddress={editAddress}
        toggleEditAddress={setEditAddress}
        isPersonalAddressAllowed={isPersonalAddressAllowed}
        orgAddressDetails={orgAddressDetails}
        paymentChosen={paymentChosen}
      />
    </>
  );
};

export { PaymentMethodContainer };
