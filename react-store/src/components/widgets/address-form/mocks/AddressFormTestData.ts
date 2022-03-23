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
import { useState } from "react";
//Custom libraries
import { ADDRESS_SHIPPING, EMPTY_STRING, ADDRESS_SHIPPING_BILLING } from "../../../../constants/common";

/**
 * Default react hook state for Add Address in AddressForm component
 */
export const useInitFormDataState = (): any => {
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
    addressType: ADDRESS_SHIPPING,
  };
  const [newAddressFormData, setNewAddressFormData] = useState<any>(addressFormDataInit);
  return { newAddressFormData, setNewAddressFormData };
};

/**
 * Default react hook state for Edit Address in AddressForm component
 */
export const useEditAddressFormDataState = (): any => {
  const editAddressFormDataInit = {
    firstName: "John",
    lastName: "Matsumoto",
    addressLine1: "Motosumiyoshi",
    addressLine2: "Ida",
    city: "Kawasaki",
    country: "Japan",
    state: "Kanagawa",
    zipCode: "211025",
    phone1: "123-456-7891",
    nickName: "John Tokyo Address",
    email1: "john@mail.com",
    addressType: ADDRESS_SHIPPING_BILLING,
  };
  const [editAddressFormData, setEditAddressFormData] = useState<any>(editAddressFormDataInit);
  return { editAddressFormData, setEditAddressFormData };
};

// cid props for new address
export const NEW_ADDRESS_CID = "newAddress";
// cid props for edit address
export const EDIT_ADDRESS_CID = "editAddress";
