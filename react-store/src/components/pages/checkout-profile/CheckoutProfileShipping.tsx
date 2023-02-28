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
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import {
  StyledGrid,
  StyledPaper,
  StyledTypography,
  StyledButton,
  StyledSelect,
  StyledFormControl,
  StyledInputLabel,
  StyledTextField,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";
import { useDispatch, useSelector } from "react-redux";
import { addressDetailsSelector } from "../../../redux/selectors/account";
import * as a from "../../../redux/actions/account";
import * as o from "../../../redux/actions/order";
import getDisplayName from "react-display-name";
import { cloneDeep, get } from "lodash-es";
import { AddressList } from "../../widgets/address-list";
import { useMemo } from "react";
import { EMPTY_STRING } from "../../../constants/common";
import { ADD_ADDRESS } from "../../../constants/routes";
import useCheckoutProfile from "../../../_foundation/hooks/use-checkout-profile";
import { useCheckoutProfileContext } from "./checkout-profile.context";
import AddressContext from "../checkout/address/AddressContext";
import addressUtil from "../../../utils/addressUtil";
import { AddressForm } from "../../widgets/address-form";
import { allowableShipModesSelector } from "../../../redux/selectors/order";
import { SHIPMODE } from "../../../constants/order";
import storeUtil from "../../../utils/storeUtil";

/**
 * Shipping and billing section
 * displays shipping and billing input/selection
 * @param props
 */

const CheckoutProfileShipping = (props) => {
  const widget = getDisplayName(CheckoutProfileShipping);
  const {
    handleShippingInfoChange,
    continueToBillingInfo,
    cancel,
    canContinueToBillingInfo,

    editAddressFormData,
    setEditAddressFormData,
    editAddress,
    toggleEditAddress,
    persistEdit,
  } = useCheckoutProfile();
  const { activeStep, cProf, setCProf, updateProfile } = useCheckoutProfileContext();
  const cid = "checkout-profile-shipping";
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const fromState = useSelector(addressDetailsSelector);
  const modes = useSelector(allowableShipModesSelector).filter(
    (shipmethods) => shipmethods.shipModeCode !== SHIPMODE.shipModeCode.PickUp
  );
  const [addressList, setAddressList] = useState<any[]>([]);
  const [nnMap, setNnMap] = useState<any>({});
  const payload: any = {
    widget,
    signal: controller.signal,
  };

  useEffect(() => {
    dispatch(a.GET_ADDRESS_DETAIL_ACTION({ ...payload }));
    dispatch(o.FETCH_ALLOWABLE_SHIPMODES_ACTION({ ...payload }));

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSelectedAddressId = useMemo(
    () => (e, n) => {
      if (n !== get(cProf, "shipping_nickName", "")) {
        setCProf({ ...cProf, shipping_nickName: n });
      }
    },
    [cProf, setCProf]
  );

  useEffect(() => {
    const contactList: any[] = get(cloneDeep(fromState), "contactList", []);
    const shippingList = contactList.filter((address) => address.addressType?.includes("Shipping"));
    if (fromState?.addressLine && fromState?.addressType?.includes("Shipping")) {
      shippingList.push(addressUtil.getRegisteredInitialAddress(fromState));
    }
    setAddressList(shippingList);
    setNnMap(storeUtil.toMap(shippingList, "nickName"));
  }, [fromState, cProf, setAddressList, setSelectedAddressId]);

  useEffect(() => {
    if (modes.length && !updateProfile && undefined === cProf.shipping_modeId) {
      setCProf({ ...cProf, shipping_modeId: modes[0].shipModeId });
    }
  }, [modes, cProf, setCProf, updateProfile]);

  return (
    <StyledPaper className="vertical-padding-4">
      <StyledGrid
        container
        className="horizontal-padding-4"
        direction="row"
        alignments="center"
        justifyContent="flex-start"
        spacing={2}>
        <StyledGrid container spacing={2}>
          <StyledGrid item>
            <StyledTypography variant="h4" component="p">
              {updateProfile ? "" : t("CheckoutProfile.CreateCheckoutButton")}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledTextField
              required
              id={`${cid}-checkoutProfileName`}
              name="xchkout_ProfileName"
              label="Checkout Profile Name"
              onChange={handleShippingInfoChange}
              value={cProf.xchkout_ProfileName || EMPTY_STRING}
              inputProps={{ maxLength: 99 }}
              fullWidth
              autoComplete="checkout-profile-name"
              disabled={!!updateProfile}
              error={!updateProfile && !addressUtil.validateNickName(cProf.xchkout_ProfileName)}
              helperText={
                !updateProfile && !addressUtil.validateNickName(cProf.xchkout_ProfileName)
                  ? t("CheckoutProfile.invalidProfileName")
                  : EMPTY_STRING
              }
            />
          </StyledGrid>
          <StyledGrid item>
            <StyledTypography variant="h4" component="p">
              {t("CheckoutProfile.ShippingInformation")}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledFormControl variant="outlined">
              <StyledInputLabel shrink htmlFor="checkout-ship-method">
                {t("CheckoutProfile.ShippingMethod")}
              </StyledInputLabel>
              <StyledSelect
                fullWidth
                data-testid="shipping-method-select"
                native
                name="ship-methods"
                value={cProf.shipping_modeId || EMPTY_STRING}
                onChange={(event) => setCProf({ ...cProf, shipping_modeId: event.target.value })}
                id="ship-methods">
                {modes.map((m) => (
                  <option key={m.shipModeId} value={m.shipModeId}>
                    {t(m.shipModeDescription)}
                  </option>
                ))}
              </StyledSelect>
            </StyledFormControl>
          </StyledGrid>
          <StyledGrid item>
            <StyledTypography component="p">
              <Trans
                i18nKey="CheckoutProfile.selectExisting"
                t={t}
                components={[<StyledLink to={ADD_ADDRESS} state={{ profile: cProf, activeStep }} />]}
              />
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={12}>
            {editAddress ? (
              <>
                <AddressForm
                  cid="edit-address"
                  setAddressFormData={setEditAddressFormData}
                  addressFormData={editAddressFormData}
                  edit={true}
                />
                <StyledGrid container justifyContent="flex-end" spacing={2} className="checkout-actions top-margin-1">
                  <StyledGrid item>
                    <StyledButton
                      testId="checkout-profile-edit-ship-address-cancel"
                      onClick={toggleEditAddress.bind(null, false)}
                      color="secondary">
                      {t("CheckoutProfile.Cancel")}
                    </StyledButton>
                  </StyledGrid>
                  <StyledGrid item>
                    <StyledButton
                      testId="checkout-profile-edit-ship-address-save"
                      color="primary"
                      disabled={!addressUtil.validateAddressForm(editAddressFormData, true)}
                      onClick={persistEdit}>
                      {t("CheckoutProfile.saveAddress")}
                    </StyledButton>
                  </StyledGrid>
                </StyledGrid>
              </>
            ) : (
              <AddressContext.Provider value={{ toggleEditAddress, setEditAddressFormData }}>
                <AddressList
                  cid="addresses"
                  {...{
                    addressList,
                    selectedNickName: cProf.shipping_nickName,
                    setSelectedAddressId,
                  }}
                />
              </AddressContext.Provider>
            )}
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
      <Divider variant="fullWidth" className="top-margin-3 bottom-margin-3" />
      <StyledGrid
        container
        spacing={2}
        justifyContent="space-between"
        className="horizontal-padding-4 checkout-actions">
        <StyledButton
          testId="checkout-profile-ship-cancel"
          color="secondary"
          onClick={cancel}
          className="bottom-margin-1 button">
          {t("CheckoutProfile.Cancel")}
        </StyledButton>
        <StyledButton
          testId="checkout-profile-ship-continue"
          color="primary"
          disabled={!nnMap[cProf.shipping_nickName] || !canContinueToBillingInfo()}
          onClick={continueToBillingInfo}
          className="bottom-margin-1 button">
          {t("CheckoutProfile.Next")}
        </StyledButton>
      </StyledGrid>
    </StyledPaper>
  );
};

export default CheckoutProfileShipping;
