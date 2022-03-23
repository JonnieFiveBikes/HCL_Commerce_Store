/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import { createContext, useContext, useState } from "react";

import { PersonCheckoutProfileCheckoutProfile } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { PAYMENT } from "../../../constants/order";

export interface CheckoutProfileBilling {
  payment_method: any;
  account: any;
  expire_month: any;
  expire_year: any;
}
export interface CheckoutProfileType extends PersonCheckoutProfileCheckoutProfile {
  billingData: CheckoutProfileBilling;
  shippingMethod: string;
  xchkout_ProfileId: string;
  xchkout_ProfileName: string;
  shipObj?: any;
  billObj?: any;
}

export interface CheckoutProfileContextType {
  cProf: any;
  setCProf: (v: any) => void;
  updateProfile: any;
  setUpdateProfile: (v: any) => void;
  activeStep: number;
  setActiveStep: (v: any) => void;
}
export const CheckoutProfileContext: React.Context<CheckoutProfileContextType> = createContext(
  {} as CheckoutProfileContextType
);

export const CheckoutProfileProvider = ({ children }: any) => {
  const [cProf, setCProf] = useState<CheckoutProfileType>({
    billingData: {
      payment_method: { value: PAYMENT.paymentMethodName.cod },
      account: { value: "" },
      expire_year: { value: "" },
      expire_month: { value: "" },
    },
  } as any);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <CheckoutProfileContext.Provider
      value={{
        cProf,
        setCProf,
        updateProfile,
        setUpdateProfile,
        activeStep,
        setActiveStep,
      }}>
      {children}
    </CheckoutProfileContext.Provider>
  );
};

export const useCheckoutProfileContext = () => useContext(CheckoutProfileContext);

export const withCheckoutProfileContext =
  (Component: any): any =>
  (props: any) => {
    return (
      <CheckoutProfileProvider>
        <Component {...props}></Component>
      </CheckoutProfileProvider>
    );
  };
