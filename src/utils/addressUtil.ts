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
  optionalAddressFields: ["firstName", "addressLine2", "phone1"],

  validateAddressForm: (formData: any) => {
    for (let key in formData) {
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

    return true;
  },

  validatePhoneNumber: (phoneNumber: string) => {
    const PHONE = REG_EX.PHONE;
    return (
      phoneNumber === undefined ||
      phoneNumber.trim() === "" ||
      PHONE.test(phoneNumber)
    );
  },

  validateEmail: (email: string) => {
    const EMAIL = REG_EX.EMAIL;
    return email.trim() === "" || EMAIL.test(email);
  },
};

export default addressUtil;
