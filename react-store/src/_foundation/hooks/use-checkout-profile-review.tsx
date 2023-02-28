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
//Standard libraries
import { useEffect, useState, useMemo } from "react";
//Custom libraries

import { useDispatch, useSelector } from "react-redux";
import { CPROF_FETCH_ALL_ACTION } from "../../redux/actions/checkout-profile";
import { checkoutProfileSelector } from "../../redux/selectors/checkout-profile";
import storeUtil from "../../utils/storeUtil";
import { get } from "lodash-es";
import { allowableShipModesSelector } from "../../redux/selectors/order";
import { FETCH_ALLOWABLE_SHIPMODES_ACTION } from "../../redux/actions/order";
import { localStorageUtil } from "../utils/storageUtil";
import { SELECTED_PROFILE } from "../constants/common";

/**
 * Checkout Profile Review Component
 * It will display the details of the selected profile in checkout profile review page.
 * @param props
 */
export const useCheckoutProfileReview = (props: any): any => {
  const [profileList, setProfileList] = useState<any[]>([]);
  const controller = useMemo(() => new AbortController(), []);
  const payloadBase: any = {
    signal: controller.signal,
  };

  const fromState = useSelector(checkoutProfileSelector);
  const dispatch = useDispatch();
  const modesFromState = useSelector(allowableShipModesSelector);
  // cleanup
  useEffect(
    () => {
      dispatch(CPROF_FETCH_ALL_ACTION({ ...payloadBase }));
      dispatch(FETCH_ALLOWABLE_SHIPMODES_ACTION({ ...payloadBase }));
      return () => controller.abort();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const selectedProfile = localStorageUtil.get(SELECTED_PROFILE);
  useEffect(
    () => {
      const rc = getCheckoutProfileDetails(fromState);
      setProfileList(rc);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fromState, selectedProfile]
  );
  useEffect(() => {
    if (modesFromState.length) {
      const asMap = storeUtil.toMap(modesFromState, "shipModeId");
      profileList.forEach((p) => {
        p.shippingMethod = asMap[p.shippingModeId].shipModeDescription;
      });
      setProfileList(profileList);
    }
  }, [modesFromState, profileList]);

  const getCheckoutProfileDetails = useMemo(
    () => (response) => {
      const p = response.curUserProfiles
        .filter((p) => selectedProfile && p.xchkout_ProfileId === selectedProfile)
        .map((p) => {
          const rc = {
            ...p,
            billingData: storeUtil.toMap(get(p, "protocolData", []), "name"),
          };

          return {
            billingInfo: {
              firstName: rc.billing_firstName,
              lastName: rc.billing_lastName,
              billing_address_id: rc.billing_addressId,
              city: rc.billing_city,
              stateprovince: rc.billing_state,
              country: rc.billing_country,
              zipCode: rc.billing_zipCode,
              billto_addressLine: rc.billing_addressLine,
              email1: rc.billing_email1,
              phone1: rc.billing_phone1,
              addressLine: rc.billing_addressLine,
            },
            piId: rc.xchkout_ProfileId,
            nickName: rc.xchkout_ProfileName,
            firstName: rc.shipping_firstName,
            lastName: rc.shipping_lastName,
            addressLine: rc.shipping_addressLine,
            city: rc.shipping_city,
            state: rc.shipping_state,
            country: rc.shipping_country,
            zipCode: rc.shipping_zipCode,
            shippingModeId: rc.shipping_modeId,
            account: rc.billingData?.account?.value,
            expire_month: rc.billingData?.expire_month?.value,
            expire_year: rc.billingData?.expire_year?.value,
            cc_brand: rc.billingData?.cc_brand?.value,
            stateOrProvinceName: rc.shipping_state,
            xpaym_policyId: rc.xchkout_ProfileId,
            postalCode: rc.shipping_zipCode,
            addressId: rc.shipping_addressId,
            protocolData: p.protocolData,
            shipModeId: rc.shipping_modeId,
            email1: rc.shipping_email1,
            phone1: rc.shipping_phone1,
            paymentMethod: rc.billingData?.payment_method?.value,
          };
        });
      return p;
    },
    [selectedProfile]
  );

  return { profileList };
};
export default useCheckoutProfileReview;
