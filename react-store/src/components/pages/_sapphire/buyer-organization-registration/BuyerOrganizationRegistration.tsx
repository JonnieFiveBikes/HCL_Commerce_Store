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
import { useNavigate } from "react-router";
import { CREATED } from "http-status-codes";
import { Navigate } from "react-router-dom";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import organizationService from "../../../../_foundation/apis/transaction/organization.service";
import { useSite } from "../../../../_foundation/hooks/useSite";
//Custom libraries
import addressUtil from "../../../../utils/addressUtil";
import { SIGNIN } from "../../../../constants/routes";
import { EMPTY_STRING } from "../../../../constants/common";
import { CountryState } from "../../../widgets/country-state";
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
  StyledPaper,
  StyledStepper,
  StyledStep,
  StyledStepLabel,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@mui/material";
//GA360
import AsyncCall from "../../../../_foundation/gtm/async.service";

const BuyerOrganizationRegistration = (props: any) => {
  const widgetName = getDisplayName(BuyerOrganizationRegistration);
  const { mySite } = useSite();
  const navigate = useNavigate();
  const defaultLanguageID = mySite?.defaultLanguageID;
  const defaultCurrencyID = mySite?.defaultCurrencyID;
  const supportedLanguages = mySite?.supportedLanguages;
  const supportedCurrencies = mySite?.supportedCurrencies;
  const { t } = useTranslation();
  const [organizationName, setOrganizationName] = React.useState<string>(EMPTY_STRING);
  const [organizationAddress1, setOrganizationAddress1] = React.useState<string>(EMPTY_STRING);
  const [organizationAddress2, setOrganizationAddress2] = React.useState<string>(EMPTY_STRING);
  const [organizationCity, setOrganizationCity] = React.useState<string>(EMPTY_STRING);
  const [organizationCountry, setOrganizationCountry] = React.useState<string>(EMPTY_STRING);
  const [organizationState, setOrganizationState] = React.useState<string>(EMPTY_STRING);
  const [organizationZipCode, setOrganizationZipCode] = React.useState<string>(EMPTY_STRING);
  const [organizationEmail, setOrganizationEmail] = React.useState<string>(EMPTY_STRING);
  const [organizationPhone, setOrganizationPhone] = React.useState<string>(EMPTY_STRING);
  const [useOrganizationAddress, setUseOrganizationAddress] = React.useState<boolean>(false);
  const [logonId, setLogonId] = React.useState<string>(EMPTY_STRING);
  const [password, setPassword] = React.useState<string>(EMPTY_STRING);
  const [passwordVerify, setPasswordVerify] = React.useState<string>(EMPTY_STRING);
  const [firstName, setFirstName] = React.useState<string>(EMPTY_STRING);
  const [lastName, setLastName] = React.useState<string>(EMPTY_STRING);
  const [email, setEmail] = React.useState<string>(EMPTY_STRING);
  const [phone, setPhone] = React.useState<string>(EMPTY_STRING);
  const [adminAddress1, setAdminAddress1] = React.useState<string>(EMPTY_STRING);
  const [adminAddress2, setAdminAddress2] = React.useState<string>(EMPTY_STRING);
  const [city, setCity] = React.useState<string>(EMPTY_STRING);
  const [country, setCountry] = React.useState<string>(EMPTY_STRING);
  const [state, setState] = React.useState<string>(EMPTY_STRING);
  const [zipCode, setZipCode] = React.useState<string>(EMPTY_STRING);
  const [language, setLanguage] = React.useState<string>(defaultLanguageID);
  const [currency, setCurrency] = React.useState<string>(defaultCurrencyID);
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
  const [redirect, setRedirect] = React.useState<boolean>(false);
  const [buyerAdminAddress2, setBuyerAdminAddress2] = React.useState<boolean>(false);
  const [stepperActive, setStepperActive] = React.useState<number>(0);
  const [showBuyerAdminRegForm, setShowBuyerAdminRegForm] = React.useState<boolean>(false);
  const [showAddress2Field, setShowAddress2Field] = React.useState<boolean>(false);
  const steps = ["OrganizationRegistration", "BuyerAdminRegistration"];

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  /**
   * Form validation function
   * Return true when all mandatory field has been entered and valid
   * else false
   */
  const canCreate = (): boolean => {
    if (
      canValidStepper() &&
      logonId.trim() !== EMPTY_STRING &&
      password !== EMPTY_STRING &&
      passwordVerify.trim() !== EMPTY_STRING &&
      firstName.trim() !== EMPTY_STRING &&
      lastName.trim() !== EMPTY_STRING &&
      email.trim() !== EMPTY_STRING
    ) {
      // Ignoring personal address fields depending on useOrganizationAddress address checkbox
      if (!useOrganizationAddress) {
        if (
          adminAddress1.trim() === EMPTY_STRING ||
          city.trim() === EMPTY_STRING ||
          country.trim() === EMPTY_STRING ||
          state.trim() === EMPTY_STRING ||
          zipCode.trim() === EMPTY_STRING
        ) {
          return false;
        }
      }
      return (
        addressUtil.validateEmail(email) &&
        addressUtil.validatePhoneNumber(phone) &&
        addressUtil.validateEmail(organizationEmail) &&
        addressUtil.validatePhoneNumber(organizationPhone)
      );
    }
    return false;
  };

  const canValidStepper = (): boolean => {
    if (
      organizationName.trim() !== EMPTY_STRING &&
      organizationEmail.trim() !== EMPTY_STRING &&
      organizationAddress1.trim() !== EMPTY_STRING &&
      organizationZipCode.trim() !== EMPTY_STRING &&
      organizationState.trim() !== EMPTY_STRING &&
      organizationCity.trim() !== EMPTY_STRING &&
      organizationCountry.trim() !== EMPTY_STRING
    ) {
      return addressUtil.validateEmail(organizationEmail) && addressUtil.validatePhoneNumber(organizationPhone);
    }
    return false;
  };
  const handleSubmit = (props: any) => {
    props.preventDefault();
    let addr1Param = EMPTY_STRING;
    let addr2Param = EMPTY_STRING;
    let cityParam = EMPTY_STRING;
    let countryParam = EMPTY_STRING;
    let stateParam = EMPTY_STRING;
    let zipCodeParam = EMPTY_STRING;

    if (useOrganizationAddress) {
      addr1Param = organizationAddress1;
      addr2Param = organizationAddress2;
      cityParam = organizationCity;
      countryParam = organizationCountry;
      stateParam = organizationState;
      zipCodeParam = organizationZipCode;
    } else {
      addr1Param = adminAddress1;
      addr2Param = adminAddress2;
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
        org_orgEntityName: organizationName,
        org_address1: organizationAddress1,
        org_address2: organizationAddress2,
        org_city: organizationCity,
        org_country: organizationCountry,
        org_state: organizationState,
        org_zipCode: organizationZipCode,
        org_email1: organizationEmail,
        org_phone1: organizationPhone.trim(),
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

    organizationService.registerBuyerOrganization(parameters).then((res) => {
      if (res.status === CREATED) {
        setOpenSuccess(true);
        clearAll();
      }
    });
  };

  const clearAll = () => {
    setOrganizationName(EMPTY_STRING);
    setOrganizationAddress1(EMPTY_STRING);
    setOrganizationAddress2(EMPTY_STRING);
    setOrganizationCity(EMPTY_STRING);
    setOrganizationCountry(EMPTY_STRING);
    setOrganizationState(EMPTY_STRING);
    setOrganizationZipCode(EMPTY_STRING);
    setOrganizationEmail(EMPTY_STRING);
    setOrganizationPhone(EMPTY_STRING);
    setLogonId(EMPTY_STRING);
    setPassword(EMPTY_STRING);
    setPasswordVerify(EMPTY_STRING);
    setFirstName(EMPTY_STRING);
    setLastName(EMPTY_STRING);
    setAdminAddress1(EMPTY_STRING);
    setAdminAddress2(EMPTY_STRING);
    setCity(EMPTY_STRING);
    setCountry(EMPTY_STRING);
    setState(EMPTY_STRING);
    setZipCode(EMPTY_STRING);
    setEmail(EMPTY_STRING);
    setPhone(EMPTY_STRING);
    setLanguage(defaultLanguageID);
    setCurrency(defaultCurrencyID);
  };

  useEffect(() => {
    if (mySite) {
      setLanguage(defaultLanguageID);
      setCurrency(defaultCurrencyID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeAndRedirect = () => {
    setOpenSuccess(false);
    setRedirect(true);
  };

  if (redirect) {
    //GA360
    if (mySite.enableGA) {
      AsyncCall.sendFormCompletionEvent("Register your organization", {
        enableUA: mySite.enableUA,
        enableGA4: mySite.enableGA4,
      });
    }
    return <Navigate replace to={SIGNIN} />;
  } else {
    return (
      <>
        <StyledContainer>
          <StyledGrid container spacing={2} justifyContent="center" alignItems="center">
            <StyledGrid item xs={12} md={6}>
              <StyledPaper className="top-margin-5">
                <StyledStepper activeStep={stepperActive}>
                  {steps.map((key, i) => (
                    <StyledStep key={key}>
                      <StyledStepLabel>{t(`BuyerOrganizationRegistration.${key}`)}</StyledStepLabel>
                    </StyledStep>
                  ))}
                </StyledStepper>
              </StyledPaper>
            </StyledGrid>
          </StyledGrid>
          <form name="buyerAdminOrgRegistrationForm" noValidate onSubmit={handleSubmit}>
            <>
              {!showBuyerAdminRegForm && (
                <StyledGrid container justifyContent="center">
                  <StyledGrid item xs={12} md={6}>
                    <StyledPaper className="top-margin-2 horizontal-padding-4 vertical-padding-4">
                      <StyledGrid container spacing={2}>
                        <StyledGrid item>
                          <StyledTypography variant="h4">{t("BuyerOrganizationRegistration.Title")}</StyledTypography>
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <StyledTextField
                            required
                            label={t("BuyerOrganizationRegistration.OrganizationName")}
                            name="organizationName"
                            autoFocus
                            fullWidth
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                            inputProps={{
                              maxLength: 254,
                            }}
                          />
                        </StyledGrid>
                        <StyledGrid item xs={12} sm={6}>
                          <StyledTextField
                            required
                            inputProps={{
                              maxLength: 50,
                              type: "email",
                            }}
                            label={t("BuyerOrganizationRegistration.Email")}
                            name="organizationEmail"
                            fullWidth
                            value={organizationEmail}
                            onChange={(e) => setOrganizationEmail(e.target.value)}
                            error={!addressUtil.validateEmail(organizationEmail)}
                            helperText={
                              !addressUtil.validateEmail(organizationEmail)
                                ? t("BuyerOrganizationRegistration.Msgs.InvalidFormat")
                                : EMPTY_STRING
                            }
                          />
                        </StyledGrid>
                        <StyledGrid item xs={12} sm={6}>
                          <StyledTextField
                            inputProps={{
                              maxLength: 32,
                              type: "tel",
                            }}
                            label={t("BuyerOrganizationRegistration.Phone")}
                            name="organizationPhone"
                            fullWidth
                            value={organizationPhone}
                            onChange={(e) => setOrganizationPhone(e.target.value)}
                            error={!addressUtil.validatePhoneNumber(organizationPhone)}
                            helperText={
                              !addressUtil.validatePhoneNumber(organizationPhone)
                                ? t("BuyerOrganizationRegistration.Msgs.InvalidFormat")
                                : EMPTY_STRING
                            }
                          />
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <Divider className="top-margin-2" />
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <StyledTypography variant="h6">
                            {t("BuyerOrganizationRegistration.AddressDetails")}
                          </StyledTypography>
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <StyledTextField
                            required
                            inputProps={{
                              maxLength: 99,
                            }}
                            label={t("BuyerOrganizationRegistration.Address1")}
                            name="organizationAddress1"
                            fullWidth
                            value={organizationAddress1}
                            onChange={(e) => setOrganizationAddress1(e.target.value)}
                          />
                        </StyledGrid>
                        {!buyerAdminAddress2 && (
                          <StyledGrid item xs={12}>
                            <StyledButton
                              variant="text"
                              color="primary"
                              onClick={() => {
                                setBuyerAdminAddress2(true);
                              }}
                              testId={"set-buyer-admin-address-2"}>
                              {t("BuyerOrganizationRegistration.AddressLineAdd")}
                            </StyledButton>
                          </StyledGrid>
                        )}
                        {buyerAdminAddress2 && (
                          <StyledGrid item xs={12}>
                            <StyledTextField
                              inputProps={{
                                maxLength: 49,
                              }}
                              label={t("BuyerOrganizationRegistration.Address2")}
                              name="organizationAddress2"
                              fullWidth
                              value={organizationAddress2}
                              onChange={(e) => setOrganizationAddress2(e.target.value)}
                            />
                          </StyledGrid>
                        )}
                        <StyledGrid item xs={12} sm={6}>
                          <StyledTextField
                            required
                            inputProps={{
                              maxLength: 30,
                            }}
                            label={t("BuyerOrganizationRegistration.ZipCode")}
                            name="organizationZipCode"
                            fullWidth
                            value={organizationZipCode}
                            onChange={(e) => setOrganizationZipCode(e.target.value)}
                          />
                        </StyledGrid>
                        <CountryState
                          country={organizationCountry}
                          setCountry={setOrganizationCountry}
                          state={organizationState}
                          setState={setOrganizationState}
                        />
                        <StyledGrid item xs={12} sm={6}>
                          <StyledTextField
                            required
                            inputProps={{
                              maxLength: 40,
                            }}
                            label={t("BuyerOrganizationRegistration.City")}
                            name="organizationCity"
                            fullWidth
                            value={organizationCity}
                            onChange={(e) => setOrganizationCity(e.target.value)}
                          />
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <StyledGrid container justifyContent="space-between" spacing={2}>
                            <StyledGrid item>
                              <StyledButton
                                color="secondary"
                                onClick={() => {
                                  navigate(SIGNIN);
                                }}
                                testId={"buyer-organization-registration-back"}>
                                {t("BuyerOrganizationRegistration.Back")}
                              </StyledButton>
                            </StyledGrid>
                            <StyledGrid item>
                              <StyledButton
                                color="primary"
                                onClick={() => {
                                  setStepperActive(1);
                                  setShowBuyerAdminRegForm(true);
                                }}
                                disabled={!canValidStepper()}
                                testId={"buyer-organization-registration-next-register"}>
                                {t("BuyerOrganizationRegistration.NextRegister")}
                              </StyledButton>
                            </StyledGrid>
                          </StyledGrid>
                        </StyledGrid>
                      </StyledGrid>
                    </StyledPaper>
                  </StyledGrid>
                </StyledGrid>
              )}
              {showBuyerAdminRegForm && (
                <StyledGrid container justifyContent="center">
                  <StyledGrid item xs={12} md={6}>
                    <StyledPaper className="top-margin-2 horizontal-padding-4 vertical-padding-4">
                      <StyledGrid container spacing={2}>
                        <StyledGrid item xs={12}>
                          <StyledTypography variant="h4">
                            {t("BuyerOrganizationRegistration.BuyerAdminRegistration")}
                          </StyledTypography>
                        </StyledGrid>
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
                            autoFocus
                            onChange={(e) => setLogonId(e.target.value)}
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
                                : EMPTY_STRING
                            }
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
                                : EMPTY_STRING
                            }
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
                        <StyledGrid item xs={12}>
                          <Divider className="top-margin-2" />
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <StyledGrid container justifyContent="space-between" spacing={2}>
                            <StyledGrid item>
                              <StyledTypography variant="h6">
                                {t("BuyerOrganizationRegistration.AddressDetails")}
                              </StyledTypography>
                            </StyledGrid>
                            <StyledGrid item>
                              <StyledFormControlLabel
                                control={
                                  <StyledCheckbox
                                    checked={useOrganizationAddress}
                                    color="primary"
                                    onChange={(e) => setUseOrganizationAddress(e.target.checked)}
                                  />
                                }
                                label={t("BuyerOrganizationRegistration.UseOrganizationAddress")}
                              />
                            </StyledGrid>
                          </StyledGrid>
                        </StyledGrid>
                        {!useOrganizationAddress && (
                          <>
                            <StyledGrid item xs={12}>
                              <StyledTextField
                                required
                                inputProps={{
                                  maxLength: 99,
                                }}
                                label={t("BuyerOrganizationRegistration.Address1")}
                                name="adminAddress1"
                                fullWidth
                                value={adminAddress1}
                                onChange={(e) => setAdminAddress1(e.target.value)}
                              />
                            </StyledGrid>

                            <StyledGrid item xs={12}>
                              {!showAddress2Field && (
                                <StyledButton
                                  variant="text"
                                  color="primary"
                                  onClick={() => {
                                    setShowAddress2Field(true);
                                  }}
                                  testId={"buyer-organization-registration-address-line-add"}>
                                  {t("BuyerOrganizationRegistration.AddressLineAdd")}
                                </StyledButton>
                              )}
                              {showAddress2Field && (
                                <StyledTextField
                                  inputProps={{
                                    maxLength: 49,
                                  }}
                                  label={t("BuyerOrganizationRegistration.Address2")}
                                  name="adminAddress2"
                                  fullWidth
                                  value={adminAddress2}
                                  onChange={(e) => setAdminAddress2(e.target.value)}
                                />
                              )}
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
                            <CountryState country={country} setCountry={setCountry} state={state} setState={setState} />
                            <StyledGrid item xs={12} sm={6}>
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
                          </>
                        )}
                        <StyledGrid item xs={12}>
                          <Divider className="top-margin-2" />
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <StyledTypography variant="h6">
                            {t("BuyerOrganizationRegistration.AccountPreferences")}
                          </StyledTypography>
                        </StyledGrid>

                        <StyledGrid item xs={12} sm={6}>
                          <StyledFormControl variant="outlined">
                            <StyledInputLabel shrink>{t("BuyerOrganizationRegistration.Language")}</StyledInputLabel>
                            <StyledSelect
                              value={`${language}`}
                              data-testid="language"
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
                            <StyledInputLabel shrink>{t("BuyerOrganizationRegistration.Currency")}</StyledInputLabel>
                            <StyledSelect
                              value={`${currency}`}
                              data-testid="currency"
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
                          <StyledGrid container justifyContent="space-between" spacing={2}>
                            <StyledGrid item>
                              <StyledButton
                                color="secondary"
                                onClick={() => {
                                  setStepperActive(0);
                                  setShowBuyerAdminRegForm(false);
                                }}
                                testId={"buyer-organization-registration-back"}>
                                {t("BuyerOrganizationRegistration.Back")}
                              </StyledButton>
                            </StyledGrid>

                            <StyledGrid item>
                              <StyledButton
                                type="submit"
                                color="primary"
                                disabled={!canCreate()}
                                testId={"buyer-organization-registration-complete-registration"}>
                                {t("BuyerOrganizationRegistration.CompleteRegistration")}
                              </StyledButton>
                            </StyledGrid>
                          </StyledGrid>
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <Divider className="top-margin-2" />
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <StyledGrid container justifyContent="center">
                            <StyledGrid item>
                              <StyledTypography variant="body1">
                                {t("BuyerOrganizationRegistration.HereAnAccount")}
                                <StyledLink className="left-margin-1" to={SIGNIN}>
                                  {t("BuyerOrganizationRegistration.SignIn")}
                                </StyledLink>
                              </StyledTypography>
                            </StyledGrid>
                          </StyledGrid>
                        </StyledGrid>
                      </StyledGrid>
                    </StyledPaper>
                  </StyledGrid>
                </StyledGrid>
              )}
            </>
          </form>
        </StyledContainer>
        <StyledDialog
          open={openSuccess}
          onClose={closeAndRedirect}
          aria-labelledby="buyer-org-registration-success-dialog">
          <StyledDialogContent>
            {t("BuyerOrganizationRegistration.Success")}
            <StyledDialogActions>
              <StyledButton color="primary" onClick={closeAndRedirect} testId={"buyer-organization-registration-ok"}>
                {t("BuyerOrganizationRegistration.OK")}
              </StyledButton>
            </StyledDialogActions>
          </StyledDialogContent>
        </StyledDialog>
      </>
    );
  }
};

export default BuyerOrganizationRegistration;
