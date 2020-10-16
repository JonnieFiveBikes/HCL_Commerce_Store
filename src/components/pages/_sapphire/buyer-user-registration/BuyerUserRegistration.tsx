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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CREATED } from "http-status-codes";
import { Redirect } from "react-router-dom";
//Foundation libraries
import personService from "../../../../_foundation/apis/transaction/person.service";
import { useSite } from "../../../../_foundation/hooks/useSite";
//Custom libraries
import addressUtil from "../../../../utils/addressUtil";
import { SIGNIN } from "../../../../constants/routes";
//UI
import {
  StyledGrid,
  StyledContainer,
  StyledFormControl,
  StyledInputLabel,
  StyledDialog,
  StyledDialogContent,
  StyledTextField,
  StyledButton,
  StyledTypography,
  StyledSelect,
  StyledMenuItem,
} from "../../../StyledUI";

const BuyerUserRegistration = (props: any) => {
  const { mySite } = useSite();
  const defaultLanguageID = mySite?.defaultLanguageID;
  const defaultCurrencyID = mySite?.defaultCurrencyID;
  const supportedLanguages = mySite?.supportedLanguages;
  const supportedCurrencies = mySite?.supportedCurrencies;
  const { t } = useTranslation();
  const [orgName, setOrgName] = useState<string>("");
  const [logonId, setLogonId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerify, setPasswordVerify] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [language, setLanguage] = useState<string>(defaultLanguageID);
  const [currency, setCurrency] = useState<string>(defaultCurrencyID);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  let langMap = new Map();
  let currMap = new Map();
  langMap.set("-1", t("BuyerUserRegistration.USEnglish"));
  currMap.set("USD", t("BuyerUserRegistration.USD"));
  let parentOrg = "";

  const parseParentOrg = () => {
    const regex = new RegExp("/", "ig");
    let arr: string[];
    if (orgName.match(regex)) {
      arr = orgName.split("/");
      parentOrg = "o=" + arr[0] + ",o=" + arr[1];
    } else {
      parentOrg = "o=" + orgName;
    }
  };

  const handleSubmit = (props: any) => {
    props.preventDefault();
    parseParentOrg();
    const parameters: any = {
      responseFormat: "application/json",
      storeId: mySite?.storeID,
      body: {
        receiveSMSNotification: "false",
        receiveSMS: "false",
        registerType: "G",
        primary: "true",
        isBuyerUser: "true",
        challengeQuestion: "-",
        challengeAnswer: "-",
        usr_profileType: "B",
        addressType: "SB",
        receiveEmail: "false",
        logonId: logonId,
        logonPassword: password,
        logonPasswordVerify: passwordVerify,
        firstName: firstName,
        lastName: lastName,
        addressLine: [address1, address2],
        city: city,
        country: country,
        state: state,
        zipCode: zipCode,
        email1: email,
        phone1: phone.trim(),
        preferredLanguage: language,
        preferredCurrency: currency,
        organizationDistinguishedName: parentOrg,
        ancestorOrgs: orgName,
        appendRootOrganizationDN: "true",
      },
    };

    personService
      .registerPerson(parameters, null, mySite?.transactionContext)
      .then((res) => {
        if (res.status === CREATED) {
          setOpenSuccess(true);
          clearAll();
        }
      });
  };

  const clearAll = () => {
    setOrgName("");
    setLogonId("");
    setPassword("");
    setPasswordVerify("");
    setFirstName("");
    setLastName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setCountry("");
    setState("");
    setZipCode("");
    setEmail("");
    setPhone("");
    setLanguage(defaultLanguageID);
    setCurrency(defaultCurrencyID);
  };

  const closeAndRedirect = () => {
    setOpenSuccess(false);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={SIGNIN} />;
  } else {
    return (
      <StyledContainer className="page">
        <form name="buyerAdminUserRegistrationForm" onSubmit={handleSubmit}>
          <StyledTypography
            component="h1"
            variant="h5"
            className="bottom-margin-2">
            {t("BuyerUserRegistration.Title")}
          </StyledTypography>
          <StyledTypography component="p" className="bottom-margin-5">
            {t("BuyerUserRegistration.Description")}
          </StyledTypography>
          <StyledGrid container item xs={12} md={6} spacing={2}>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 128,
                }}
                label={t("BuyerUserRegistration.LogonId")}
                name="logonId"
                autoFocus
                fullWidth
                value={logonId}
                onChange={(e) => setLogonId(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 254,
                }}
                label={t("BuyerUserRegistration.OrgName")}
                name="orgName"
                fullWidth
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 50,
                  type: "password",
                }}
                label={t("BuyerUserRegistration.Password")}
                name="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 50,
                  type: "password",
                }}
                label={t("BuyerUserRegistration.Password2")}
                name="passwordVerify"
                fullWidth
                value={passwordVerify}
                onChange={(e) => setPasswordVerify(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 40,
                }}
                label={t("BuyerUserRegistration.FirstName")}
                name="firstName"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 40,
                }}
                label={t("BuyerUserRegistration.LastName")}
                name="lastName"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 99,
                }}
                label={t("BuyerUserRegistration.Address1")}
                name="address1"
                fullWidth
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                inputProps={{
                  maxLength: 49,
                }}
                label={t("BuyerUserRegistration.Address2")}
                name="address2"
                fullWidth
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 40,
                }}
                label={t("BuyerUserRegistration.City")}
                name="city"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 40,
                }}
                label={t("BuyerUserRegistration.Country")}
                name="country"
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 40,
                }}
                label={t("BuyerUserRegistration.State")}
                name="state"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 30,
                }}
                label={t("BuyerUserRegistration.ZipCode")}
                name="zipCode"
                fullWidth
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                inputProps={{
                  maxLength: 32,
                  type: "tel",
                }}
                label={t("BuyerUserRegistration.Phone")}
                name="phone"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!addressUtil.validatePhoneNumber(phone)}
                helperText={
                  !addressUtil.validatePhoneNumber(phone)
                    ? t("BuyerUserRegistration.Msgs.InvalidFormat")
                    : ""
                }
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 35,
                  type: "email",
                }}
                label={t("BuyerUserRegistration.Email")}
                name="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!addressUtil.validateEmail(email)}
                helperText={
                  !addressUtil.validateEmail(email)
                    ? t("BuyerOrganizationRegistration.Msgs.InvalidFormat")
                    : ""
                }
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledFormControl variant="outlined">
                <StyledInputLabel shrink>
                  {t("BuyerUserRegistration.Language")}
                </StyledInputLabel>
                <StyledSelect
                  value={language}
                  name="language"
                  native
                  onChange={(e) => setLanguage(e.target.value)}
                  fullWidth>
                  {supportedLanguages?.map((e: any) => (
                    <option value={e} key={e}>
                      {t(`CommerceEnvironment.language.${e}`)}
                    </option>
                  ))}
                </StyledSelect>
              </StyledFormControl>
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledFormControl variant="outlined">
                <StyledInputLabel shrink>
                  {t("BuyerUserRegistration.Currency")}
                </StyledInputLabel>
                <StyledSelect
                  value={currency}
                  name="currency"
                  native
                  onChange={(e) => setCurrency(e.target.value)}
                  fullWidth>
                  {supportedCurrencies?.map((e: any) => (
                    <option value={e} key={e}>
                      {t(`CommerceEnvironment.currency.${e}`)}
                    </option>
                  ))}
                </StyledSelect>
              </StyledFormControl>
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledButton onClick={clearAll} color="secondary" fullWidth>
                {t("BuyerUserRegistration.Clear")}
              </StyledButton>
            </StyledGrid>

            <StyledGrid item xs={12} sm={6}>
              <StyledButton type="submit" color="primary" fullWidth>
                {t("BuyerUserRegistration.Submit")}
              </StyledButton>
            </StyledGrid>
          </StyledGrid>
        </form>

        <StyledDialog
          open={openSuccess}
          onClose={closeAndRedirect}
          aria-labelledby="buyer-user-registration-success-dialog">
          <StyledDialogContent>
            {t("BuyerUserRegistration.Success")}
          </StyledDialogContent>
          <StyledButton onClick={closeAndRedirect} color="primary">
            {t("BuyerUserRegistration.OK")}
          </StyledButton>
        </StyledDialog>
      </StyledContainer>
    );
  }
};
export default BuyerUserRegistration;
