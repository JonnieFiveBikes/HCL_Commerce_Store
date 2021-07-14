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
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import addressUtil from "../../../utils/addressUtil";
import {
  CHECKOUT,
  ADDRESS_SHIPPING,
  ADDRESS_BILLING,
  ADDRESS_SHIPPING_BILLING,
  ADDRESS_BOOK,
  EMPTY_STRING,
} from "../../../constants/common";

//UI
import {
  StyledGrid,
  StyledTextField,
  StyledTypography,
  StyledFormControl,
  StyledRadioGroup,
  StyledFormControlLabel,
  StyledRadio,
} from "@hcl-commerce-store-sdk/react-component";

interface AddressFormProps {
  cid: string;
  setAddressFormData: any; //address form data setter fn
  addressFormData: any; //address form data
  page?: string; // page name
  edit?: boolean;
}

/**
 * Address Form component
 * to be resued to display form inputs on a shipping or billing address form
 * @param props
 */
const AddressForm: React.FC<AddressFormProps> = (props: any) => {
  const { t } = useTranslation();
  const cid = props.cid;
  const setAddressFormData = props.setAddressFormData;
  const addressFormData = props.addressFormData;
  const page = props.page ? props.page : CHECKOUT; // Default page is checkout
  const edit = props.edit ? props.edit : false;

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let newAdressFormData = { ...addressFormData };
    if (event.target.name && event.target.name.trim() !== EMPTY_STRING) {
      newAdressFormData[event.target.name] = event.target.value;
      setAddressFormData(newAdressFormData);
    }
  }

  return (
    <StyledGrid container spacing={3}>
      <StyledGrid item xs={12}>
        <StyledTextField
          required
          id={`${cid}-nickName`}
          name="nickName"
          label={t("AddressForm.Labels.NickName")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.nickName}
          inputProps={{ maxLength: 128 }}
          fullWidth
          autoComplete="nickname"
          disabled={edit}
          error={
            !edit && !addressUtil.validateNickName(addressFormData.nickName)
          }
          helperText={
            !edit && !addressUtil.validateNickName(addressFormData.nickName)
              ? t("AddressForm.Msgs.InvalidAddressName")
              : EMPTY_STRING
          }
        />
      </StyledGrid>
      {page && page === ADDRESS_BOOK && (
        <StyledGrid item xs={12}>
          <StyledTypography>
            {t("AddressForm.Labels.AddressType")}
          </StyledTypography>
          <StyledFormControl component="fieldset">
            <StyledRadioGroup
              name="addressType"
              value={addressFormData.addressType}
              onChange={(event) => handleChange(event)}>
              <StyledFormControlLabel
                value={ADDRESS_SHIPPING}
                control={<StyledRadio />}
                label={
                  <StyledTypography variant="body2">
                    {t("AddressForm.Labels.Shipping")}
                  </StyledTypography>
                }
              />
              <StyledFormControlLabel
                value={ADDRESS_BILLING}
                control={<StyledRadio />}
                label={
                  <StyledTypography variant="body2">
                    {t("AddressForm.Labels.Billing")}
                  </StyledTypography>
                }
              />
              <StyledFormControlLabel
                value={ADDRESS_SHIPPING_BILLING}
                control={<StyledRadio />}
                label={
                  <StyledTypography variant="body2">
                    {t("AddressForm.Labels.ShippingAndBilling")}
                  </StyledTypography>
                }
              />
            </StyledRadioGroup>
          </StyledFormControl>
        </StyledGrid>
      )}
      <StyledGrid item xs={12} sm={6}>
        <StyledTextField
          id={`${cid}-firstName`}
          name="firstName"
          label={t("AddressForm.Labels.FirstName")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.firstName}
          inputProps={{ maxLength: 40 }}
          fullWidth
          autoComplete="fname"
          required
        />
      </StyledGrid>
      <StyledGrid item xs={12} sm={6}>
        <StyledTextField
          required
          id={`${cid}-lastName`}
          name="lastName"
          label={t("AddressForm.Labels.LastName")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.lastName}
          inputProps={{ maxLength: 40 }}
          fullWidth
          autoComplete="lname"
        />
      </StyledGrid>

      <StyledGrid item xs={12}>
        <StyledTextField
          required
          id={`${cid}-address1`}
          name="addressLine1"
          label={t("AddressForm.Labels.Address1")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.addressLine1}
          inputProps={{ maxLength: 99 }}
          fullWidth
          autoComplete="address-line1"
        />
      </StyledGrid>

      <StyledGrid item xs={12}>
        <StyledTextField
          id={`${cid}-address2`}
          name="addressLine2"
          label={t("AddressForm.Labels.Address2")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.addressLine2}
          inputProps={{ maxLength: 49 }}
          fullWidth
          autoComplete="address-line2"
        />
      </StyledGrid>

      <StyledGrid item xs={12}>
        <StyledTextField
          required
          id={`${cid}-city`}
          name="city"
          label={t("AddressForm.Labels.City")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.city}
          inputProps={{ maxLength: 40 }}
          fullWidth
          autoComplete="address-level2"
        />
      </StyledGrid>

      <StyledGrid item xs={12} sm={6}>
        {/* TODO: country list to be retrieved from transaction server */}
        <StyledTextField
          required
          id={`${cid}-country`}
          name="country"
          label={t("AddressForm.Labels.Country")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.country}
          inputProps={{ maxLength: 40 }}
          fullWidth
          autoComplete="country"
        />
      </StyledGrid>
      <StyledGrid item xs={12} sm={6}>
        {/* TODO: states need to reload based on country selection and can either be dropdown
      (fetch list from transaction server) or textbox */}
        <StyledTextField
          required
          id={`${cid}-state`}
          name="state"
          label={t("AddressForm.Labels.State")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.state}
          inputProps={{ maxLength: 40 }}
          fullWidth
          autoComplete="state"
        />
      </StyledGrid>

      <StyledGrid item xs={12} sm={6}>
        <StyledTextField
          required
          id={`${cid}-zipCode`}
          name="zipCode"
          label={t("AddressForm.Labels.ZipCode")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.zipCode}
          inputProps={{ maxLength: 30 }}
          fullWidth
          autoComplete="postal-code"
        />
      </StyledGrid>
      <StyledGrid item xs={12} sm={6}>
        <StyledTextField
          id={`${cid}-phone`}
          name="phone1"
          type="tel"
          label={t("AddressForm.Labels.Phone")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.phone1}
          error={!addressUtil.validatePhoneNumber(addressFormData.phone1)}
          helperText={
            !addressUtil.validatePhoneNumber(addressFormData.phone1)
              ? t("AddressForm.Msgs.InvalidFormat")
              : EMPTY_STRING
          }
          inputProps={{ maxLength: 32 }}
          fullWidth
          autoComplete="phone"
        />
      </StyledGrid>

      <StyledGrid item xs={12}>
        <StyledTextField
          required
          id={`${cid}-email`}
          name="email1"
          type="email"
          label={t("AddressForm.Labels.Email")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.email1}
          error={!addressUtil.validateEmail(addressFormData.email1)}
          helperText={
            !addressUtil.validateEmail(addressFormData.email1)
              ? t("AddressForm.Msgs.InvalidFormat")
              : EMPTY_STRING
          }
          inputProps={{ maxLength: 35 }}
          fullWidth
          autoComplete="email"
        />
      </StyledGrid>
    </StyledGrid>
  );
};

export { AddressForm };
