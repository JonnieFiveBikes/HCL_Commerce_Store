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
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CREATED } from "http-status-codes";
import { Redirect } from "react-router-dom";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import organizationService from "../../../../_foundation/apis/transaction/organization.service";
import { useSite } from "../../../../_foundation/hooks/useSite";
//Custom libraries
import addressUtil from "../../../../utils/addressUtil";
import { SIGNIN } from "../../../../constants/routes";
//UI
import {
  StyledGrid,
  StyledContainer,
  StyledTypography,
  StyledFormControl,
  StyledInputLabel,
  StyledFormControlLabel,
  StyledCheckbox,
  StyledDialog,
  StyledDialogContent,
  StyledDialogActions,
  StyledTextField,
  StyledButton,
  StyledSelect,
  StyledMenuItem,
} from "../../../StyledUI";
//GA360
import GADataService from "../../../../_foundation/gtm/gaData.service";

const BuyerOrganizationRegistration = (props: any) => {
  const widgetName = getDisplayName(BuyerOrganizationRegistration);
  const { mySite } = useSite();
  const defaultLanguageID = mySite?.defaultLanguageID;
  const defaultCurrencyID = mySite?.defaultCurrencyID;
  const supportedLanguages = mySite?.supportedLanguages;
  const supportedCurrencies = mySite?.supportedCurrencies;
  const { t } = useTranslation();
  const [orgName, setOrgName] = React.useState<string>("");
  const [orgAddr1, setOrgAddr1] = React.useState<string>("");
  const [orgAddr2, setOrgAddr2] = React.useState<string>("");
  const [orgCity, setOrgCity] = React.useState<string>("");
  const [orgCountry, setOrgCountry] = React.useState<string>("");
  const [orgState, setOrgState] = React.useState<string>("");
  const [orgZipCode, setOrgZipCode] = React.useState<string>("");
  const [orgEmail, setOrgEmail] = React.useState<string>("");
  const [orgPhone, setOrgPhone] = React.useState<string>("");
  const [useOrg, setUseOrg] = React.useState<boolean>(false);
  const [logonId, setLogonId] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordVerify, setPasswordVerify] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [address1, setAddress1] = React.useState<string>("");
  const [address2, setAddress2] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");
  const [state, setState] = React.useState<string>("");
  const [zipCode, setZipCode] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>(defaultLanguageID);
  const [currency, setCurrency] = React.useState<string>(defaultCurrencyID);
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const handleSubmit = (props: any) => {
    props.preventDefault();
    let addr1Param = "";
    let addr2Param = "";
    let cityParam = "";
    let countryParam = "";
    let stateParam = "";
    let zipCodeParam = "";

    if (useOrg) {
      addr1Param = orgAddr1;
      addr2Param = orgAddr2;
      cityParam = orgCity;
      countryParam = orgCountry;
      stateParam = orgState;
      zipCodeParam = orgZipCode;
    } else {
      addr1Param = address1;
      addr2Param = address2;
      cityParam = city;
      countryParam = country;
      stateParam = state;
      zipCodeParam = zipCode;
    }

    const parameters: any = {
      responseFormat: "application/json",
      storeId: mySite?.storeID,
      body: {
        receiveSMSNotification: false,
        receiveSMS: false,
        page: "account",
        registerType: "G",
        primary: true,
        isBuyerUser: true,
        challengeQuestion: "-",
        challengeAnswer: "-",
        usr_profileType: "B",
        approvalGroups: "orderProcess",
        registerOrg: true,
        org_orgEntityName: orgName,
        org_address1: orgAddr1,
        org_address2: orgAddr2,
        org_city: orgCity,
        org_country: orgCountry,
        org_state: orgState,
        org_zipCode: orgZipCode,
        org_email1: orgEmail,
        org_phone1: orgPhone.trim(),
        usr_logonId: logonId,
        usr_logonPassword: password,
        usr_logonPasswordVerify: passwordVerify,
        usr_firstName: firstName,
        usr_lastName: lastName,
        usr_address1: addr1Param,
        usr_address2: addr2Param,
        usr_city: cityParam,
        usr_country: countryParam,
        usr_state: stateParam,
        usr_zipCode: zipCodeParam,
        usr_email1: email,
        usr_phone1: phone.trim(),
        usr_preferredLanguage: language,
        usr_preferredCurrency: currency,
      },
      ...payloadBase,
    };

    organizationService
      .registerBuyerOrganization(parameters, null, mySite?.transactionContext)
      .then((res) => {
        if (res.status === CREATED) {
          setOpenSuccess(true);
          clearAll();
        }
      });
  };

  const clearAll = () => {
    setOrgName("");
    setOrgAddr1("");
    setOrgAddr2("");
    setOrgCity("");
    setOrgCountry("");
    setOrgState("");
    setOrgZipCode("");
    setOrgEmail("");
    setOrgPhone("");
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

  useEffect(() => {
    if (mySite) {
      setLanguage(defaultLanguageID);
      setCurrency(defaultCurrencyID);
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite]);

  const closeAndRedirect = () => {
    setOpenSuccess(false);
    setRedirect(true);
  };

  if (redirect) {
    //GA360
    if (mySite.enableGA)
      GADataService.sendFormCompletionEvent("Register your organization");
    return <Redirect to={SIGNIN} />;
  } else {
    return (
      <StyledContainer className="page">
        <form name="buyerAdminOrgRegistrationForm" onSubmit={handleSubmit}>
          <StyledTypography
            component="h1"
            variant="h5"
            className="bottom-margin-2">
            {t("BuyerOrganizationRegistration.Title")}
          </StyledTypography>
          <StyledTypography variant="body1" className="bottom-margin-5">
            {t("BuyerOrganizationRegistration.Description")}
          </StyledTypography>
          <StyledTypography variant="body2" className="bottom-margin-2">
            {t("BuyerOrganizationRegistration.OrgDetails")}
          </StyledTypography>

          <StyledGrid container item xs={12} md={6} spacing={2}>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                label={t("BuyerOrganizationRegistration.OrgName")}
                name="orgName"
                autoFocus
                fullWidth
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                inputProps={{
                  maxLength: 254,
                }}
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 50,
                  type: "email",
                }}
                label={t("BuyerOrganizationRegistration.Email")}
                name="orgEmail"
                fullWidth
                value={orgEmail}
                onChange={(e) => setOrgEmail(e.target.value)}
                error={!addressUtil.validateEmail(orgEmail)}
                helperText={
                  !addressUtil.validateEmail(orgEmail)
                    ? t("BuyerOrganizationRegistration.Msgs.InvalidFormat")
                    : ""
                }
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 99,
                }}
                label={t("BuyerOrganizationRegistration.Address1")}
                name="orgAddr1"
                fullWidth
                value={orgAddr1}
                onChange={(e) => setOrgAddr1(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                inputProps={{
                  maxLength: 49,
                }}
                label={t("BuyerOrganizationRegistration.Address2")}
                name="orgAddr2"
                fullWidth
                value={orgAddr2}
                onChange={(e) => setOrgAddr2(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 40,
                }}
                label={t("BuyerOrganizationRegistration.City")}
                name="orgCity"
                fullWidth
                value={orgCity}
                onChange={(e) => setOrgCity(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 40,
                }}
                label={t("BuyerOrganizationRegistration.Country")}
                name="orgCountry"
                fullWidth
                value={orgCountry}
                onChange={(e) => setOrgCountry(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 40,
                }}
                label={t("BuyerOrganizationRegistration.State")}
                name="orgState"
                fullWidth
                value={orgState}
                onChange={(e) => setOrgState(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 30,
                }}
                label={t("BuyerOrganizationRegistration.ZipCode")}
                name="orgZipCode"
                fullWidth
                value={orgZipCode}
                onChange={(e) => setOrgZipCode(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                inputProps={{
                  maxLength: 32,
                  type: "tel",
                }}
                label={t("BuyerOrganizationRegistration.Phone")}
                name="orgPhone"
                fullWidth
                value={orgPhone}
                onChange={(e) => setOrgPhone(e.target.value)}
                error={!addressUtil.validatePhoneNumber(orgPhone)}
                helperText={
                  !addressUtil.validatePhoneNumber(orgPhone)
                    ? t("BuyerOrganizationRegistration.Msgs.InvalidFormat")
                    : ""
                }
              />
            </StyledGrid>
          </StyledGrid>

          <StyledTypography
            variant="body2"
            className="top-margin-5 bottom-margin-2">
            {t("BuyerOrganizationRegistration.UserDetails")}
          </StyledTypography>

          <StyledGrid container item xs={12} md={6} spacing={2}>
            <StyledGrid item xs={12}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 128,
                }}
                label={t("BuyerOrganizationRegistration.LogonId")}
                name="logonId"
                fullWidth
                value={logonId}
                onChange={(e) => setLogonId(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                required
                inputProps={{
                  maxLength: 50,
                  type: "password",
                }}
                label={t("BuyerOrganizationRegistration.Password")}
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
                label={t("BuyerOrganizationRegistration.Password2")}
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
                label={t("BuyerOrganizationRegistration.FirstName")}
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
                label={t("BuyerOrganizationRegistration.LastName")}
                name="lastName"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={6}>
              <StyledTextField
                inputProps={{
                  maxLength: 32,
                  type: "tel",
                }}
                label={t("BuyerOrganizationRegistration.Phone")}
                name="phone"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!addressUtil.validatePhoneNumber(phone)}
                helperText={
                  !addressUtil.validatePhoneNumber(phone)
                    ? t("BuyerOrganizationRegistration.Msgs.InvalidFormat")
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
                label={t("BuyerOrganizationRegistration.Email")}
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
                  {t("BuyerOrganizationRegistration.Language")}
                </StyledInputLabel>
                <StyledSelect
                  value={`${language}`}
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
                  {t("BuyerOrganizationRegistration.Currency")}
                </StyledInputLabel>
                <StyledSelect
                  value={`${currency}`}
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

            <StyledGrid item xs={12}>
              <StyledFormControlLabel
                control={
                  <StyledCheckbox
                    color="primary"
                    onChange={(e) => setUseOrg(e.target.checked)}
                  />
                }
                label={t("BuyerOrganizationRegistration.UseOrg")}
              />
            </StyledGrid>

            {!useOrg && (
              <>
                <StyledGrid item xs={12}>
                  <StyledTextField
                    required
                    inputProps={{
                      maxLength: 99,
                    }}
                    label={t("BuyerOrganizationRegistration.Address1")}
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
                    label={t("BuyerOrganizationRegistration.Address2")}
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
                    label={t("BuyerOrganizationRegistration.City")}
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
                    label={t("BuyerOrganizationRegistration.Country")}
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
                    label={t("BuyerOrganizationRegistration.State")}
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
                    label={t("BuyerOrganizationRegistration.ZipCode")}
                    name="zipCode"
                    fullWidth
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </StyledGrid>
              </>
            )}

            <StyledGrid container item xs={12} spacing={2}>
              <StyledGrid item xs={12} sm={6}>
                <StyledButton onClick={clearAll} color="secondary" fullWidth>
                  {t("BuyerOrganizationRegistration.Clear")}
                </StyledButton>
              </StyledGrid>
              <StyledGrid item xs={12} sm={6}>
                <StyledButton type="submit" color="primary" fullWidth>
                  {t("BuyerOrganizationRegistration.Submit")}
                </StyledButton>
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
        </form>

        <StyledDialog
          open={openSuccess}
          onClose={closeAndRedirect}
          aria-labelledby="buyer-org-registration-success-dialog">
          <StyledDialogContent>
            {t("BuyerOrganizationRegistration.Success")}
            <StyledDialogActions>
              <StyledButton onClick={closeAndRedirect} color="primary">
                {t("BuyerOrganizationRegistration.OK")}
              </StyledButton>
            </StyledDialogActions>
          </StyledDialogContent>
        </StyledDialog>
      </StyledContainer>
    );
  }
};

export default BuyerOrganizationRegistration;
