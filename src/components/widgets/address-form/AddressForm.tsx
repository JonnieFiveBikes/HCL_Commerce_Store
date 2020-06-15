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
//UI
import { StyledGrid, StyledTextField } from "../../StyledUI";

interface AddressFormProps {
  cid: string;
  setAddressFormData: any; //address form data setter fn
  addressFormData: any; //address form data
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

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let newAdressFormData = { ...addressFormData };
    if (event.target.name.trim() !== "") {
      newAdressFormData[event.target.name] = event.target.value;
      setAddressFormData(newAdressFormData);
    }
  }

  return (
    <StyledGrid container spacing={3}>
      <StyledGrid item xs={12} sm={6}>
        <StyledTextField
          id={`${cid}-firstName`}
          name="firstName"
          label={t("AddressForm.Labels.FirstName")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.firstName}
          inputProps={{ maxLength: 128 }}
          fullWidth
          autoComplete="fname"
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
          inputProps={{ maxLength: 128 }}
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
          inputProps={{ maxLength: 100 }}
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
          inputProps={{ maxLength: 50 }}
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
          inputProps={{ maxLength: 128 }}
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
          inputProps={{ maxLength: 128 }}
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
          inputProps={{ maxLength: 128 }}
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
          inputProps={{ maxLength: 40 }}
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
              : ""
          }
          inputProps={{
            maxLength: 32,
            pattern: "[0-9]{0,1}-{0,1}[0-9]{3}-[0-9]{3}-[0-9]{4}",
            placeholder: "000-000-0000 or 1-000-000-0000",
          }}
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
              : ""
          }
          inputProps={{ maxLength: 256 }}
          fullWidth
          autoComplete="email"
        />
      </StyledGrid>

      <StyledGrid item xs={12}>
        <StyledTextField
          required
          id={`${cid}-nickName`}
          name="nickName"
          label={t("AddressForm.Labels.NickName")}
          onChange={(event) => handleChange(event)}
          value={addressFormData.nickName}
          inputProps={{ maxLength: 254 }}
          fullWidth
          autoComplete="nickname"
        />
      </StyledGrid>
    </StyledGrid>
  );
};

export { AddressForm };
