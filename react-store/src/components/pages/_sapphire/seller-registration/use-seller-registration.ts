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

import { omit } from "lodash-es";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { HOME } from "../../../../constants/routes";
import { REG_SELLER_ACTION } from "../../../../redux/actions/sellers";
import addressUtil from "../../../../utils/addressUtil";
import { useSellerRegContext } from "./seller-registration-context";

export const useSellerRegistration = () => {
  const {
    setActiveStep,
    sellerTranslatedInfoList,
    setSellerTranslatedInfoList,
    showAll,
    setShowAll,
    adminReg,
    orgReg,
  } = useSellerRegContext();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const payloadBase: any = { widget: "SellerSelfRegistration", signal: controller.signal };

  const languageList: string[] = ["-1", "-2", "-3", "-4", "-9", "-10", "-20", "-23"];
  const lang2Idx = languageList.reduce((m, v, i) => {
    m[v] = i;
    return m;
  }, {});
  const navigate = useNavigate();

  const isNotEmpty = (s) => !!s?.trim();

  const canProceedToInfoPage = (): boolean => {
    const { firstName, email1, address1, zipCode, state, city, country } = orgReg;
    const c = [firstName, email1, address1, zipCode, state, city, country].every(isNotEmpty);
    return c && addressUtil.validateEmail(email1);
  };

  const canSubmit = (): boolean => {
    const { address, loginInfo } = adminReg;
    const { firstName, lastName, email1, phone1 } = address ?? {};
    const { logonId, password, password2 } = loginInfo ?? {};
    const c = [logonId, password, password2, firstName, lastName, email1, phone1].every(isNotEmpty);
    return c && password === password2 && addressUtil.validateEmail(email1) && addressUtil.validatePhoneNumber(phone1);
  };

  const canProceedToAdminPage = (): boolean => {
    const f = sellerTranslatedInfoList
      .filter(({ shown }) => shown)
      .every((v) => isNotEmpty(v.sellerName) && isNotEmpty(v.sellerDescription));
    return f;
  };

  const handleChange = (langId, key, value) => {
    const i = lang2Idx[langId];
    const e = sellerTranslatedInfoList[i];
    e[key] = value;
    setSellerTranslatedInfoList([...sellerTranslatedInfoList]);
  };

  useEffect(() => {
    if (!sellerTranslatedInfoList?.length) {
      const langs = languageList.map((v, index) => ({
        langId: v,
        sellerName: "",
        sellerDescription: "",
        isDefault: index === 0,
        shown: index === 0,
      }));
      setSellerTranslatedInfoList(langs);
    }
    return () => controller.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSellerOrgSubmit = (props: any) => {
    props.preventDefault();
    setActiveStep(1);
  };

  const returnToOrgPage = (props: any) => {
    props.preventDefault();
    setActiveStep(0);
  };

  const handleDisplayInformationSubmit = (props: any) => {
    props.preventDefault();
    setActiveStep(2);
  };

  const returnToInfoPage = (props: any) => {
    props.preventDefault();
    setActiveStep(1);
  };

  const handleSellerAdminSubmit = (props: any) => {
    props.preventDefault();
    const body = {
      submitterEmail: adminReg.address.email1,
      organizationName: orgReg.firstName,
      organizationAddress: omit(orgReg, "firstName", "lastName"),
      administrators: [{ address: adminReg.address, ...omit(adminReg.loginInfo, "password2") }],
      descriptions: sellerTranslatedInfoList
        .filter(({ shown }) => shown)
        .map(({ langId: languageId, sellerName: displayName, sellerDescription: description }) => ({
          languageId,
          displayName,
          description,
        })),
    };
    dispatch(REG_SELLER_ACTION({ ...payloadBase, body, callback: navHome }));
  };

  const handleCheck = (langId: string, checked: boolean) => {
    const i = lang2Idx[langId];
    const e = sellerTranslatedInfoList[i];
    e.shown = checked;
    setSellerTranslatedInfoList([...sellerTranslatedInfoList]);
    setShowAll(sellerTranslatedInfoList.every(({ shown }) => shown));
  };

  const navHome = () => navigate(HOME);

  const isAllChecked = () => {
    return showAll;
  };

  const handleShowAll = (checked: boolean) => {
    sellerTranslatedInfoList
      .filter((v) => !v.isDefault)
      .forEach((v, i) => {
        v.shown = checked;
      });
    setSellerTranslatedInfoList([...sellerTranslatedInfoList]);
    setShowAll(checked);
  };

  return {
    handleChange,
    canProceedToInfoPage,
    handleSellerOrgSubmit,
    returnToOrgPage,
    handleDisplayInformationSubmit,
    returnToInfoPage,
    handleSellerAdminSubmit,
    canProceedToAdminPage,
    canSubmit,
    sellerTranslatedInfoList,
    isAllChecked,
    handleCheck,
    handleShowAll,
    navHome,
  };
};
