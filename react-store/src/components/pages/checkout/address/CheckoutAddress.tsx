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
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import getDisplayName from "react-display-name";
//Foundation libraries
import personContactService from "../../../../_foundation/apis/transaction/personContact.service";
//Custom library
import {
  ADDRESS_SHIPPING_BILLING,
  ADDRESS_LINE,
  ADDRESSLINE1,
  ADDRESSLINE2,
  EMPTY_STRING,
} from "../../../../constants/common";
import { AddressForm } from "../../../widgets/address-form";
import { AddressList } from "../../../widgets/address-list";
import addressUtil from "../../../../utils/addressUtil";
import AddressContext from "./AddressContext";
//Redux
import * as accountActions from "../../../../redux/actions/account";
import * as successActions from "../../../../redux/actions/success";
import * as orderActions from "../../../../redux/actions/order";
//UI
import { Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import { StyledGrid, StyledIconLabel, StyledButton, StyledTypography } from "@hcl-commerce-store-sdk/react-component";
import { loginStatusSelector } from "../../../../redux/selectors/user";

export enum CheckoutPageType {
  SHIPPING = "shipping",
  PAYMENT = "payment",
}
interface CheckoutAddressProps {
  usableAddresses: any[];
  page: CheckoutPageType;
  setSelectedAddressId: (v1?: any, v2?: any) => void;
  selectedAddressId?: string;
  toggleCreateNewAddress: (v: boolean) => void;
  createNewAddress: boolean;
  toggleEditAddress: (v: boolean) => void;
  editAddress: boolean;
  [extraProps: string]: any;
}

const useCheckoutAddress = (editAddress: boolean) => {
  const { t } = useTranslation();
  const addressFormDataInit = {
    firstName: EMPTY_STRING,
    lastName: EMPTY_STRING,
    addressLine1: EMPTY_STRING,
    addressLine2: EMPTY_STRING,
    city: EMPTY_STRING,
    country: EMPTY_STRING,
    state: EMPTY_STRING,
    zipCode: EMPTY_STRING,
    phone1: EMPTY_STRING,
    nickName: EMPTY_STRING,
    email1: EMPTY_STRING,
    addressType: ADDRESS_SHIPPING_BILLING,
  };
  const [addressFormData, setAddressFormData] = useState<any>(addressFormDataInit);
  const canContinue = () => {
    if (editAddress) {
      return addressUtil.validateAddressForm(addressFormData, true);
    }
    return addressUtil.validateAddressForm(addressFormData);
  };
  return {
    addressFormData,
    setAddressFormData,
    canContinue,
    t,
    addressFormDataInit,
  };
};

const CheckoutAddress: React.FC<CheckoutAddressProps> = ({
  usableAddresses,
  page,
  setSelectedAddressId,
  selectedAddressId,
  toggleCreateNewAddress: toggleCreateNew,
  createNewAddress: createNew,
  toggleEditAddress,
  editAddress,
  paymentChosen,
  ...props
}: CheckoutAddressProps) => {
  const widgetName = getDisplayName(CheckoutAddress);
  const dispatch = useDispatch();
  const { addressDetails, orgAddressDetails } = props;
  const controller = useMemo(() => new AbortController(), []);
  const EDIT_SUCCESS_MSG = "success-message.EDIT_ADDRESS_SUCCESS";
  const ADD_SUCCESS_MSG = "success-message.ADD_ADDRESS_SUCCESS";
  const { addressFormData, setAddressFormData, canContinue, t, addressFormDataInit } = useCheckoutAddress(editAddress);
  const hideEdit = page === CheckoutPageType.PAYMENT; //For HC-5398
  const payloadBase: any = {
    widget: widgetName,
    signal: controller.signal,
  };
  const regdUser = useSelector(loginStatusSelector);
  const personalAllowed = useMemo(
    () => !regdUser || usableAddresses?.find(({ nickName: n }) => addressDetails?.nickName === n),
    [usableAddresses, addressDetails, regdUser]
  );
  const selectable = usableAddresses?.filter(addressUtil.validAddr);
  const submit = (createNew: boolean, editAddress: boolean) => {
    // Add Address
    if (createNew) {
      createAddress();
    }
    // Edit Address
    if (editAddress) {
      saveChanges();
    }
  };

  const createAddress = () => {
    // remove leading and trailing white space from all form input fields.
    const newAddressData = addressUtil.removeLeadingTrailingWhiteSpace(addressFormData);
    newAddressData[ADDRESS_LINE] = [newAddressData[ADDRESSLINE1]];
    if (newAddressData[ADDRESSLINE2] && newAddressData[ADDRESSLINE2].trim() !== EMPTY_STRING) {
      newAddressData[ADDRESS_LINE].push(newAddressData[ADDRESSLINE2]);
    }
    delete newAddressData[ADDRESSLINE1];
    delete newAddressData[ADDRESSLINE2];

    personContactService
      .addPersonContact({
        body: newAddressData,
        ...payloadBase,
      })
      .then((res) => res.data)
      .then((addressData) => {
        if (addressData.addressId) {
          dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION({ ...payloadBase }));
          if (page === CheckoutPageType.SHIPPING) {
            dispatch(orderActions.GET_SHIPINFO_ACTION({ ...payloadBase }));
          } else if (page === CheckoutPageType.PAYMENT) {
            dispatch(orderActions.GET_PAYMETHODS_ACTION({ ...payloadBase }));
          }
          const successMessage = {
            key: ADD_SUCCESS_MSG,
            messageParameters: {
              "0": newAddressData.nickName,
            },
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
          const addressIdFromResponse = addressData.addressId;
          setSelectedAddressId(addressIdFromResponse);
          toggleCreateNew(false);
          setAddressFormData(addressFormDataInit);
        }
      });
  };

  const saveChanges = () => {
    // remove leading and trailing white space from all form input fields.
    const updatedAddressData = addressUtil.removeLeadingTrailingWhiteSpace(addressFormData);
    updatedAddressData[ADDRESS_LINE] = [updatedAddressData[ADDRESSLINE1], updatedAddressData[ADDRESSLINE2]];
    const requestParams = {
      nickName: updatedAddressData.nickName,
      body: updatedAddressData,
      ...payloadBase,
    };
    personContactService
      .updatePersonContact(requestParams)
      .then((res) => res.data)
      .then((addressData) => {
        if (addressData.addressId) {
          dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION({ ...payloadBase }));
          if (page === CheckoutPageType.SHIPPING) {
            dispatch(orderActions.GET_SHIPINFO_ACTION({ ...payloadBase }));
          }
          if (page === CheckoutPageType.PAYMENT) {
            dispatch(orderActions.GET_PAYMETHODS_ACTION({ ...payloadBase }));
          }
          const successMessage = {
            key: EDIT_SUCCESS_MSG,
            messageParameters: {
              "0": updatedAddressData.nickName,
            },
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
          setSelectedAddressId(addressData.addressId, updatedAddressData.nickName);
          toggleEditAddress(false);
          setAddressFormData(addressFormDataInit);
        }
      })
      .catch((e) => {
        console.log("Could not update the address", e);
      });
  };

  const cancelButtonAction = () => {
    toggleCreateNew(false);
    toggleEditAddress(false);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createNew, editAddress]);

  useEffect(() => {
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StyledGrid container spacing={2}>
        <StyledGrid item container direction="row" justifyContent="space-between" alignItems="center">
          <StyledIconLabel
            icon={page === CheckoutPageType.SHIPPING ? <HomeIcon color="primary" /> : <ContactsIcon color="primary" />}
            label={
              page === CheckoutPageType.SHIPPING
                ? t("Shipping.Labels.ShippingAddress")
                : t("Payment.Labels.BillingAddress")
            }
          />
        </StyledGrid>
        {!paymentChosen && page === CheckoutPageType.PAYMENT && (
          <StyledGrid item xs={12}>
            {t("CheckoutAddress.Payment.ChooseFirst")}
          </StyledGrid>
        )}
        {(createNew || editAddress) && (
          <StyledGrid item xs={12} md={6} data-testid="checkout-address-form">
            <AddressForm
              cid="newAddress"
              setAddressFormData={setAddressFormData}
              addressFormData={addressFormData}
              edit={editAddress ? true : false}
            />
          </StyledGrid>
        )}
        {!createNew && !editAddress && (
          <>
            {((paymentChosen && page === CheckoutPageType.PAYMENT && personalAllowed) ||
              (page === CheckoutPageType.SHIPPING && personalAllowed)) && (
              <StyledGrid item xs={12}>
                <StyledButton
                  testId="checkout-new-address-button"
                  color="secondary"
                  onClick={(event) => {
                    toggleCreateNew(true);
                    setAddressFormData(addressFormDataInit);
                  }}>
                  {t("Shipping.Actions.CreateNew")}
                </StyledButton>
              </StyledGrid>
            )}
            {selectable?.length > 0 && (
              <StyledGrid item xs={12}>
                <StyledTypography className="bottom-margin-2">{t("Shipping.Msgs.UseSavedAddress")}</StyledTypography>
                <AddressContext.Provider
                  value={{
                    toggleEditAddress,
                    setEditAddressFormData: setAddressFormData,
                    orgAddressDetails,
                  }}>
                  <AddressList
                    cid="shipping"
                    addressList={selectable}
                    setSelectedAddressId={setSelectedAddressId}
                    selectedAddressId={selectedAddressId || EMPTY_STRING}
                    hideEdit={hideEdit}
                  />
                </AddressContext.Provider>
              </StyledGrid>
            )}
          </>
        )}
      </StyledGrid>
      <Divider className="top-margin-3 bottom-margin-2" />
      {(createNew || editAddress) && (
        <StyledGrid container justifyContent="flex-end" spacing={2} className="checkout-actions">
          <StyledGrid item>
            <StyledButton testId="checkout-address-cancel" onClick={cancelButtonAction} color="secondary">
              {t("AddressBook.Cancel")}
            </StyledButton>
          </StyledGrid>
          <StyledGrid item>
            <StyledButton
              testId="checkout-address-submit"
              color="primary"
              disabled={!canContinue()}
              onClick={() => submit(createNew, editAddress)}>
              {t("CheckoutAddress.Actions.Submit")}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      )}
    </>
  );
};

export default CheckoutAddress;
