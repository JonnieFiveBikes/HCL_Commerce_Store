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
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import { EMPTY_STRING } from "../../../constants/common";
//UI
import {
  StyledFormControl,
  StyledGrid,
  StyledInputLabel,
  StyledSelect,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import getDisplayName from "react-display-name";
import { useDispatch, useSelector } from "react-redux";
import { CPROF_FETCH_ALL_ACTION } from "../../../redux/actions/checkout-profile";
import { checkoutProfileSelector } from "../../../redux/selectors/checkout-profile";
import { localStorageUtil } from "../../../_foundation/utils/storageUtil";
import { SELECTED_PROFILE } from "../../../_foundation/constants/common";

interface CheckoutProfileProps {
  setSelectedProfile: (v: any) => void;
}

/**
 * Checkout Profile Selection Component
 * It displays the list of profiles available for checkout on Cart page.
 * After selecting a profile,it will be forwarded to checkout profile review page.
 * @param props
 */

const CheckoutProfileSelection: React.FC<CheckoutProfileProps> = (props: any) => {
  const { t } = useTranslation();
  const empty = { id: EMPTY_STRING, name: EMPTY_STRING };
  const [profileList, setProfileList] = useState<any[]>([]);
  const { selectedProfile, setSelectedProfile } = props;
  const controller = useMemo(() => new AbortController(), []);
  const widget = getDisplayName(CheckoutProfileSelection);
  const payloadBase: any = {
    widget,
    signal: controller.signal,
  };
  const fromState = useSelector(checkoutProfileSelector);
  const dispatch = useDispatch();

  // cleanup
  useEffect(
    () => {
      dispatch(CPROF_FETCH_ALL_ACTION({ ...payloadBase }));
      return () => controller.abort();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => getCheckoutProfileDetails(fromState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fromState]
  );

  //to transform the checkout profile details from json object to profileList array
  const getCheckoutProfileDetails = (response) => {
    let hasSelectedProfile = false;
    const rc: any[] = response.curUserProfiles
      .filter((p) => p.isValid && p.xchkout_ProfileId && p.xchkout_ProfileName)
      .map(({ xchkout_ProfileId: id, xchkout_ProfileName: name }) => {
        hasSelectedProfile = hasSelectedProfile || id === selectedProfile;
        return { id, name };
      });
    rc.unshift(empty);
    setProfileList(rc);

    if (!hasSelectedProfile) {
      profileChangeHandler({ target: { value: EMPTY_STRING } });
    }
  };

  //to update the profileName value in select box
  const profileChangeHandler = (event) => {
    setSelectedProfile(event.target.value);
    if (event.target.value) {
      localStorageUtil.set(SELECTED_PROFILE, event.target.value);
    } else {
      localStorageUtil.remove(SELECTED_PROFILE);
    }
  };

  return (
    <StyledGrid container spacing={2}>
      <StyledGrid item xs={12}>
        <StyledTypography variant="subtitle1" gutterBottom>
          {t("CheckoutProfile.Title")}
        </StyledTypography>
        <StyledFormControl variant="outlined" disabled={profileList.length <= 1}>
          <StyledInputLabel shrink htmlFor="checkout-profile-select">
            {t("CheckoutProfile.Label")}
          </StyledInputLabel>
          <StyledSelect
            native
            value={selectedProfile}
            onChange={profileChangeHandler}
            fullWidth
            data-testid="checkout-profile-select"
            id="checkout-profile-select">
            {profileList.map(({ id, name }, index) => (
              <option key={`${id}_${index}`} value={id}>
                {name}
              </option>
            ))}
          </StyledSelect>
        </StyledFormControl>
      </StyledGrid>
    </StyledGrid>
  );
};

export { CheckoutProfileSelection };
