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
import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
//Common libraries
import * as ROUTES from "../../constants/routes";
import * as a from "../../redux/actions/checkout-profile";
import { ADDRESSLINE1, ADDRESSLINE2, ADDRESS_LINE, EMPTY_STRING } from "../../constants/common";
import { localStorageUtil } from "../utils/storageUtil";
import { CURRENT_USER } from "../constants/common";
import { get } from "lodash-es";
import { checkoutProfileSelector } from "../../redux/selectors/checkout-profile";
import { PersonCheckoutProfileCheckoutProfile } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { useCheckoutProfileContext } from "../../components/pages/checkout-profile/checkout-profile.context";
import storeUtil from "../../utils/storeUtil";
import addressUtil from "../../utils/addressUtil";
import personContactService from "../apis/transaction/personContact.service";
import * as accountActions from "../../redux/actions/account";
import * as successActions from "../../redux/actions/success";
import { PAYMENT } from "../../constants/order";

//Foundation libraries
export interface CheckoutProfileBilling {
  payment_method: any;
  account: any;
  expire_month: any;
  expire_year: any;
}
export interface CheckoutProfileType extends PersonCheckoutProfileCheckoutProfile {
  billingData: CheckoutProfileBilling;
  billingAddress: any;
  shippingAddress: any;
  isValid?: boolean;
  shippingMethod: string;
  xchkout_ProfileId: string;
  xchkout_ProfileName: string;
}

export const useCheckoutProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const payloadBase: any = {
    signal: controller.signal,
  };
  const fromState = useSelector(checkoutProfileSelector);
  const [editAddressFormData, setEditAddressFormData] = useState<any>({});
  const [editAddress, toggleEditAddress] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [useShippingAddressForBilling, setUseShippingAddressForBilling] = useState<boolean>(false);
  const [landed, setLanded] = useState<boolean>(false);
  const { cProf, setCProf, setActiveStep, updateProfile, setUpdateProfile } = useCheckoutProfileContext();
  const location: any = useLocation();

  useEffect(() => {
    if (location.state) {
      const nickName = get(location, "state.nickName");
      const profile: CheckoutProfileType = get(location, "state.profile", {});

      if (location.pathname === ROUTES.CHECKOUT_PROFILE_EDIT) {
        setUpdateProfile(true);
      }

      // returning from a create address
      if (nickName) {
        const step = get(location, "state.activeStep", 0);
        const prefix = step === 0 ? "shipping_" : "billing_";
        setActiveStep(step);
        Object.assign(profile, { [`${prefix}nickName`]: nickName });
      }

      setCProf(profile);

      navigate(location.pathname, { replace: true, state: undefined });
    }
    setLanded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(
    () => {
      // if submitted -- a refresh here implies the update or create
      //   was successful so we can navigate away to the list page --
      //   otherwise stay here in case user needs to fix any errors
      if (submitted) {
        navigate(ROUTES.CHECKOUT_PROFILES);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fromState]
  );

  const handleShippingInfoChange = (e) => {
    if (get(e, "target.name", "").trim() !== EMPTY_STRING) {
      setCProf({ ...cProf, [e.target.name]: e.target.value });
    }
  };

  const continueToBillingInfo = setActiveStep.bind(null, 1);

  const invalidCC = useCallback((billData, dirty) => {
    const cc = get(billData, "account.value", "");
    const pm = get(billData, "payment_method.value", "");
    const minLen = { VISA: 13, MasterCard: 16, AMEX: 15 };
    const len = minLen[pm] ?? 1;
    const n = cc.length >= len && storeUtil.isNumeric(cc.trim());
    return !(dirty ? n : !cc || n);
  }, []);

  const invalidExp = useCallback((billData, k, defExp, dirty) => {
    if (dirty) {
      const m = get(billData, "expire_month.value", "");
      const y = get(billData, "expire_year.value", "");
      const { expire_month, expire_year } = defExp;
      const valid = k === "expire_year" ? y >= expire_year : m >= expire_month || y > expire_year;
      return !valid;
    } else {
      return false;
    }
  }, []);

  const canSubmit = () => {
    const p = get(cProf, "billingData.payment_method.value", "");
    const m = get(cProf, "billingData.expire_month.value", "");
    const y = get(cProf, "billingData.expire_year.value", "");
    const { expire_month, expire_year } = storeUtil.getCCInitDates();
    const inPast = `${y}${m}` < `${expire_year}${expire_month}`;
    return (
      !editAddress &&
      (useShippingAddressForBilling || cProf.billing_nickName) &&
      (!PAYMENT.ccMethods[p] || (p && !invalidCC(cProf.billingData, true) && y && m && !inPast))
    );
  };

  const canContinueToBillingInfo = useMemo(
    () => () =>
      !editAddress &&
      cProf.shipping_nickName &&
      cProf.xchkout_ProfileName &&
      addressUtil.validateNickName(cProf.xchkout_ProfileName) &&
      cProf.shipping_modeId,
    [editAddress, cProf]
  );

  const getObjWithPrefix = useCallback((list, v, prefix) => {
    const acceptedKeys = [
      "addressLine",
      "addressId",
      "city",
      "country",
      "zipCode",
      "state",
      "firstName",
      "lastName",
      "nickName",
    ];
    const obj = list.find(({ nickName }) => nickName === v);
    const acceptedMap = storeUtil.toMap(acceptedKeys);
    const rc = {};
    Object.keys(obj)
      .filter((k) => acceptedMap[k])
      .forEach((k) => (rc[`${prefix}${k}`] = obj[k]));
    return rc;
  }, []);

  const submitCheckoutProfile = async (list) => {
    const addresses: any[] = [];
    if (list?.contactList) {
      list.contactList.forEach((address) => addresses.push(address));
    }
    if (list?.addressLine) {
      addresses.push(addressUtil.getRegisteredInitialAddress(list));
    }
    const body: any = {};
    const currentUser = localStorageUtil.get(CURRENT_USER);
    const shipData = getObjWithPrefix(addresses, cProf.shipping_nickName, "shipping_");
    const billData = getObjWithPrefix(
      addresses,
      useShippingAddressForBilling ? cProf.shipping_nickName : cProf.billing_nickName,
      "billing_"
    );
    const pm = get(cProf, "billingData.payment_method.value");
    const isCreditCard = PAYMENT.ccMethods[pm];

    Object.assign(body, {
      profileName: cProf.xchkout_ProfileName,
      ...shipData,
      ...billData,
      shipping_modeId: cProf.shipping_modeId,
      URL: "noURL",
      pay_payment_method: pm,
    });

    if (currentUser) {
      const { userId } = currentUser;
      Object.assign(body, { userId });
    }

    if (isCreditCard) {
      Object.assign(body, {
        pay_account: get(cProf, "billingData.account.value"),
        pay_expire_month: get(cProf, "billingData.expire_month.value"),
        pay_expire_year: get(cProf, "billingData.expire_year.value"),
        pay_cc_brand: pm,
      });
    }

    dispatch(
      updateProfile
        ? a.CPROF_UPDATE_ACTION({
            ...payloadBase,
            widget: "CheckoutProfileEdit",
            profileId: cProf.xchkout_ProfileId,
            nickName: cProf.xchkout_ProfileName,
            body,
          })
        : a.CPROF_CREATE_ACTION({
            ...payloadBase,
            widget: "CheckoutProfileCreate",
            body,
          })
    );
    setSubmitted(true);
  };

  const back = setActiveStep.bind(null, 0);
  const cancel = () => navigate(ROUTES.CHECKOUT_PROFILES);

  const persistEdit = async () => {
    const u = addressUtil.removeLeadingTrailingWhiteSpace(editAddressFormData);
    u[ADDRESS_LINE] = [u[ADDRESSLINE1], u[ADDRESSLINE2]];
    const requestParams = { nickName: u.nickName, body: u, ...payloadBase };

    try {
      const res = await personContactService.updatePersonContact(requestParams);
      if (res.data.addressId) {
        dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION({ ...payloadBase }));
        const m = {
          key: "success-message.EDIT_ADDRESS_SUCCESS",
          messageParameters: { "0": u.nickName },
        };
        dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(m));
        toggleEditAddress(false);
      }
    } catch (e) {
      console.log("Could not update the address", e);
    }
  };

  return {
    handleShippingInfoChange,
    continueToBillingInfo,
    useShippingAddressForBilling,
    setUseShippingAddressForBilling,
    canSubmit,
    submitCheckoutProfile,
    back,
    cancel,
    canContinueToBillingInfo,
    editAddressFormData,
    setEditAddressFormData,
    editAddress,
    toggleEditAddress,
    persistEdit,
    landed,
    invalidCC,
    invalidExp,
  };
};
export default useCheckoutProfile;
