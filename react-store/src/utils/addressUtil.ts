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
//Custom libraries
import { REG_EX } from "../constants/common";

const addressUtil = {
  optionalAddressFields: ["addressLine2", "phone1"],
  addressFormFields: [
    "firstName",
    "lastName",
    "addressLine1",
    "addressLine2",
    "city",
    "country",
    "state",
    "zipCode",
    "phone1",
    "nickName",
    "email1",
    "addressType",
  ],

  validateAddressForm: (formData: any, edit?: boolean) => {
    const editVal = edit ? edit : false;

    for (const key in formData) {
      if (!addressUtil.optionalAddressFields.includes(key)) {
        if (formData[key] !== undefined && formData[key].trim() === "") {
          return false;
        }
      }
    }

    if (!addressUtil.validatePhoneNumber(formData.phone1)) {
      return false;
    }
    if (!addressUtil.validateEmail(formData.email1)) {
      return false;
    }

    if (!editVal && !addressUtil.validateNickName(formData.nickName)) {
      return false;
    }

    return true;
  },

  validatePhoneNumber: (phoneNumber: string) => {
    const PHONE = REG_EX.PHONE;
    return phoneNumber === undefined || phoneNumber.trim() === "" || PHONE.test(phoneNumber.trim());
  },

  validateEmail: (email: string) => {
    const EMAIL = REG_EX.EMAIL;
    return email === undefined || email.trim() === "" || EMAIL.test(email);
  },

  validateNickName: (nickName: string) => {
    const NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR = REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR;
    return nickName === undefined || nickName.trim() === "" || NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.test(nickName);
  },

  removeLeadingTrailingWhiteSpace: (formData: any): any => {
    const result: any = {};
    // remove leading and trailing white space from all form input fields.
    if (formData !== undefined && formData !== null) {
      Object.keys(formData).forEach((key) => {
        const value = formData[key].trim();
        result[key] = value;
      });
    }
    return result;
  },

  removeIgnorableAddressFormFields: (formData: any): any => {
    const result: any = { ...formData };
    for (const key in result) {
      if (!addressUtil.addressFormFields.includes(key)) {
        delete result[key];
      }
    }
    return result;
  },

  getRegisteredInitialAddress: (address): any => {
    const keys = [
      "addressId",
      "addressLine",
      "addressType",
      "city",
      "country",
      "email1",
      "firstName",
      "lastName",
      "nickName",
      "phone1",
      "primary",
      "state",
      "zipCode",
    ].filter((k) => address[k] != null); // != is intentional (instead of !== since != [or ==] will equate null and undefined)
    const rc = Object.assign({}, ...keys.map((k) => ({ [k]: address[k] })));
    return rc;
  },
};

export default addressUtil;
