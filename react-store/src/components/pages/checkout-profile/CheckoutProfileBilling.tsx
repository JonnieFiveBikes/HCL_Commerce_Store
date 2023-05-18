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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
//Foundation libraries
import { EXPIRY, PAYMENT } from "../../../constants/order";
import { Divider } from "@mui/material";
//UI libraries
import {
  StyledButton,
  StyledCheckbox,
  StyledFormControl,
  StyledFormControlLabel,
  StyledGrid,
  StyledInputLabel,
  StyledLink,
  StyledPaper,
  StyledSelect,
  StyledTextField,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import { cloneDeep, get } from "lodash-es";
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { useSelector } from "react-redux";
import { AddressList } from "../../widgets/address-list";
import useCheckoutProfile from "../../../_foundation/hooks/use-checkout-profile";
import { useCheckoutProfileContext } from "./checkout-profile.context";
import { set, merge } from "lodash-es";
import { ADD_ADDRESS } from "../../../constants/routes";
import AddressContext from "../checkout/address/AddressContext";
import { AddressForm } from "../../widgets/address-form";
import addressUtil from "../../../utils/addressUtil";
import storeUtil from "../../../utils/storeUtil";
import { allowablePaymethodsSelector } from "../../../redux/selectors/order";

/**
 * Payment section
 * displays payment method and billing address selection
 * @param props
 */
const CheckoutProfileBilling = (props: any) => {
  const {
    canSubmit,
    submitCheckoutProfile,
    back,
    useShippingAddressForBilling,
    setUseShippingAddressForBilling,
    editAddressFormData,
    setEditAddressFormData,
    editAddress,
    toggleEditAddress,
    persistEdit,
    invalidCC,
    invalidExp,
  } = useCheckoutProfile();
  const { t } = useTranslation();
  const fromState = useSelector(addressDetailsSelector);
  const payMethods = useSelector(allowablePaymethodsSelector);
  const [addressList, setAddressList] = useState<any[]>([]);
  const [nnMap, setNnMap] = useState<any>({});
  const [dirty, setDirty] = useState<boolean>(false);
  const { activeStep, cProf, setCProf, updateProfile } = useCheckoutProfileContext();
  const defExp = useMemo(() => storeUtil.getCCInitDates(), []);

  const setPmtMethod = useCallback(
    (e, k, doSetDirty = true) => {
      const o = {};
      set(o, `billingData.${k}.value`, e.target.value);
      const n = merge(cloneDeep(cProf), o);
      setCProf({ ...n });
      if (doSetDirty) {
        setDirty(true);
      }
    },
    [cProf, setCProf, setDirty]
  );

  const setSelectedAddressId = useMemo(
    () => (e, n) => {
      if (n !== get(cProf, "billing_nickName", "")) {
        setCProf({ ...cProf, billing_nickName: n });
      }
    },
    [cProf, setCProf]
  );

  useEffect(() => {
    const contactList: any[] = get(cloneDeep(fromState), "contactList", []);
    const billingList = contactList.filter((address) => address.addressType?.includes("Billing"));
    if (fromState?.addressLine && fromState?.addressType?.includes("Billing")) {
      billingList.push(addressUtil.getRegisteredInitialAddress(fromState));
    }
    const m = storeUtil.toMap(billingList, "nickName");
    setAddressList(billingList);
    setNnMap(m);

    // set use-same state
    if (m[cProf.billing_nickName] && cProf.shipping_nickName === cProf.billing_nickName) {
      setUseShippingAddressForBilling(true);
    }
  }, [fromState, cProf, setAddressList, setSelectedAddressId, setUseShippingAddressForBilling]);

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
              {t("CheckoutProfile.BillingInformation")}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledTypography component="p">
              <Trans
                i18nKey="CheckoutProfile.selectExisting"
                t={t}
                components={[<StyledLink to={ADD_ADDRESS} state={{ profile: cProf, activeStep }} />]}
              />
            </StyledTypography>
          </StyledGrid>
          {addressList.some((a) => a.nickName === cProf.shipping_nickName) ? (
            <StyledGrid item xs={12}>
              <StyledFormControlLabel
                control={
                  <StyledCheckbox
                    checked={useShippingAddressForBilling}
                    color="primary"
                    onChange={(e) => setUseShippingAddressForBilling(e.target.checked)}
                  />
                }
                label={t("CheckoutProfile.ShipSameAsBill")}
              />
            </StyledGrid>
          ) : null}
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
                      testId="checkout-profile-toggle-edit-address"
                      onClick={toggleEditAddress.bind(null, false)}
                      color="secondary">
                      {t("CheckoutProfile.Cancel")}
                    </StyledButton>
                  </StyledGrid>
                  <StyledGrid item>
                    <StyledButton
                      testId="checkout-profile-save-address"
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
                    addressList: useShippingAddressForBilling
                      ? addressList.filter(({ nickName: n }) => n === cProf.shipping_nickName)
                      : addressList,
                    selectedNickName: useShippingAddressForBilling ? cProf.shipping_nickName : cProf.billing_nickName,
                    setSelectedAddressId,
                  }}
                />
              </AddressContext.Provider>
            )}
          </StyledGrid>
          <StyledGrid item>
            <StyledTypography variant="h4" component="p">
              {t("CheckoutProfile.PaymentInformation")}
            </StyledTypography>
          </StyledGrid>

          <StyledGrid item xs={12}>
            <StyledFormControl variant="outlined">
              <StyledInputLabel shrink htmlFor="cprof-billing-method">
                {t("PaymentMethodSelection.Title")}
              </StyledInputLabel>

              <StyledSelect
                data-testid="checkout-profile-billing-method-select"
                native
                fullWidth
                value={
                  payMethods?.find(({ policyName: p }) => p === cProf?.billingData?.payment_method?.value)?.policyName
                }
                onChange={(e) => setPmtMethod(e, "payment_method", false)}
                id="cprof-billing-method">
                {(payMethods as any[]).map((p) => (
                  <option key={p.policyId} value={p.policyName}>
                    {t(`CheckoutProfile.payMethods.${p.policyName}`)}
                  </option>
                ))}
              </StyledSelect>
            </StyledFormControl>
          </StyledGrid>
          {PAYMENT.ccMethods[cProf?.billingData?.payment_method?.value] ? (
            <>
              <StyledGrid item xs={12}>
                <StyledTextField
                  name="account"
                  value={cProf?.billingData?.account?.value ?? ""}
                  label={t("PaymentMethodSelection.Labels.CCNumber")}
                  type="tel"
                  onChange={(e) => setPmtMethod(e, "account")}
                  inputProps={{ maxLength: 19 }}
                  fullWidth
                  error={invalidCC(cProf.billingData, dirty)}
                  helperText={
                    invalidCC(cProf.billingData, dirty) ? t("PaymentMethodSelection.Msgs.InvalidCardNumber") : ""
                  }
                />
              </StyledGrid>

              <StyledGrid item xs={12} sm={6}>
                <StyledFormControl variant="outlined">
                  <StyledInputLabel shrink htmlFor="expire_month">
                    {t("PaymentMethodSelection.Labels.ExpiryMonth")}
                  </StyledInputLabel>

                  <StyledSelect
                    required
                    native
                    data-testid="expiry-month"
                    id="expire_month"
                    name="expire_month"
                    value={cProf?.billingData?.expire_month?.value ?? ""}
                    onChange={(e) => setPmtMethod(e, "expire_month")}
                    error={invalidExp(cProf.billingData, "expire_month", defExp, dirty)}
                    fullWidth>
                    <option value="" hidden disabled>
                      {t("CheckoutProfile.selectExpMonth")}
                    </option>
                    {EXPIRY.MONTHS.map((month: any) => (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    ))}
                  </StyledSelect>
                </StyledFormControl>
              </StyledGrid>
              <StyledGrid item xs={12} sm={6}>
                <StyledFormControl variant="outlined">
                  <StyledInputLabel shrink htmlFor="expire_year">
                    {t("PaymentMethodSelection.Labels.ExpiryYear")}
                  </StyledInputLabel>
                  <StyledSelect
                    native
                    required
                    data-testid="expiry-year"
                    name="expire_year"
                    value={cProf?.billingData?.expire_year?.value ?? ""}
                    onChange={(e) => setPmtMethod(e, "expire_year")}
                    error={invalidExp(cProf.billingData, "expire_year", defExp, dirty)}
                    fullWidth>
                    <option value="" hidden disabled>
                      {t("CheckoutProfile.selectExpYear")}
                    </option>
                    {EXPIRY.YEARS.map((year: any) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </StyledSelect>
                </StyledFormControl>
              </StyledGrid>
            </>
          ) : null}
        </StyledGrid>
      </StyledGrid>
      <Divider className="top-margin-3 bottom-margin-3" />
      <StyledGrid
        container
        spacing={2}
        justifyContent="space-between"
        className="horizontal-padding-4 checkout-actions">
        <StyledButton
          testId="checkout-profile-update-create-back"
          color="secondary"
          className="button bottom-margin-1"
          onClick={() => back()}>
          {t("CheckoutProfile.Back")}
        </StyledButton>
        <StyledButton
          testId="checkout-profile-update-create"
          color="primary"
          disabled={!(nnMap[cProf.billing_nickName] || useShippingAddressForBilling) || !canSubmit()}
          onClick={() => submitCheckoutProfile(fromState)}
          className="button bottom-margin-1">
          {updateProfile ? t("CheckoutProfile.UpdateProfile") : t("CheckoutProfile.CreateProfile")}
        </StyledButton>
      </StyledGrid>
    </StyledPaper>
  );
};

export default CheckoutProfileBilling;
