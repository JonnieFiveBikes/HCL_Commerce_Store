/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
import { createContext, useContext, useState } from "react";
import { SellerTranslatedInfo } from "../../../../constants/common";

export interface RegistrationInfo {
  email1: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  phone1: string;
  firstName: string;
  lastName: string;
}
export interface LoginInfo {
  logonId: string;
  password: string;
  password2: string;
}
export interface SellerAdmin {
  address: RegistrationInfo;
  loginInfo: LoginInfo;
}
interface SellerRegContextType {
  activeStep: number;
  setActiveStep: (v: any) => void;

  adminReg: SellerAdmin;
  setAdminReg: (v: SellerAdmin) => void;

  orgReg: RegistrationInfo;
  setOrgReg: (v: RegistrationInfo) => void;

  sellerTranslatedInfoList: SellerTranslatedInfo[];
  setSellerTranslatedInfoList: (v: any) => void;

  showAll: boolean;
  setShowAll: (v: any) => void;
}

export const SellerRegContext: React.Context<SellerRegContextType> = createContext({} as SellerRegContextType);

export const SellerRegContextProvider = ({ children }: any) => {
  const [adminReg, setAdminReg] = useState<SellerAdmin>({} as SellerAdmin);
  const [orgReg, setOrgReg] = useState<RegistrationInfo>({} as RegistrationInfo);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [sellerTranslatedInfoList, setSellerTranslatedInfoList] = useState<SellerTranslatedInfo[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <SellerRegContext.Provider
      value={{
        activeStep,
        setActiveStep,
        adminReg,
        setAdminReg,
        orgReg,
        setOrgReg,
        sellerTranslatedInfoList,
        setSellerTranslatedInfoList,
        showAll,
        setShowAll,
      }}>
      {children}
    </SellerRegContext.Provider>
  );
};

export const useSellerRegContext = () => useContext(SellerRegContext);

export const withSellerRegContext =
  (Component: any): any =>
  (props: any) => {
    return (
      <SellerRegContextProvider>
        <Component {...props}></Component>
      </SellerRegContextProvider>
    );
  };
