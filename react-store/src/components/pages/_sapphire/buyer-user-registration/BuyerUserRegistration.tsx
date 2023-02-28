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
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CREATED } from "http-status-codes";
import { Navigate } from "react-router-dom";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import personService from "../../../../_foundation/apis/transaction/person.service";
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
  StyledFormControl,
  StyledInputLabel,
  StyledDialog,
  StyledDialogContent,
  StyledTextField,
  StyledButton,
  StyledPaper,
  StyledTypography,
  StyledSelect,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";
import Divider from "@mui/material/Divider";
//GA360
import AsyncCall from "../../../../_foundation/gtm/async.service";

const BuyerUserRegistration = (props: any) => {
  const widgetName = getDisplayName(BuyerUserRegistration);
  const { mySite } = useSite();
  const defaultLanguageID = mySite?.defaultLanguageID;
  const defaultCurrencyID = mySite?.defaultCurrencyID;
  const supportedLanguages = mySite?.supportedLanguages;
  const supportedCurrencies = mySite?.supportedCurrencies;
  const { t } = useTranslation();
  const [orgName, setOrgName] = useState<string>(EMPTY_STRING);
  const [logonId, setLogonId] = useState<string>(EMPTY_STRING);
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [passwordVerify, setPasswordVerify] = useState<string>(EMPTY_STRING);
  const [firstName, setFirstName] = useState<string>(EMPTY_STRING);
  const [lastName, setLastName] = useState<string>(EMPTY_STRING);
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [phone, setPhone] = useState<string>(EMPTY_STRING);
  const [address1, setAddress1] = useState<string>(EMPTY_STRING);
  const [address2, setAddress2] = useState<string>(EMPTY_STRING);
  const [showAddress2Field, setShowAddress2Field] = useState<boolean>(false);
  const [city, setCity] = useState<string>(EMPTY_STRING);
  const [country, setCountry] = useState<string>(EMPTY_STRING);
  const [state, setState] = useState<string>(EMPTY_STRING);
  const [zipCode, setZipCode] = useState<string>(EMPTY_STRING);
  const [language, setLanguage] = useState<string>(defaultLanguageID);
  const [currency, setCurrency] = useState<string>(defaultCurrencyID);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  let parentOrg = EMPTY_STRING;

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

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
  const canCreate = (): boolean => {
    if (
      orgName !== EMPTY_STRING &&
      logonId !== EMPTY_STRING &&
      firstName !== EMPTY_STRING &&
      lastName !== EMPTY_STRING &&
      password !== EMPTY_STRING &&
      passwordVerify !== EMPTY_STRING &&
      email !== EMPTY_STRING &&
      address1 !== EMPTY_STRING &&
      zipCode !== EMPTY_STRING &&
      state !== EMPTY_STRING &&
      city !== EMPTY_STRING &&
      country !== EMPTY_STRING &&
      addressUtil.validatePhoneNumber(phone)
    ) {
      return true;
    }
    return false;
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
        email1: email,
        phone1: phone.trim(),
        addressLine: [address1, address2],
        city: city,
        country: country,
        state: state,
        zipCode: zipCode,
        preferredLanguage: language,
        preferredCurrency: currency,
        organizationDistinguishedName: parentOrg,
        ancestorOrgs: orgName,
        appendRootOrganizationDN: "true",
      },
      ...payloadBase,
    };

    personService.registerPerson(parameters).then((res) => {
      if (res.status === CREATED) {
        setOpenSuccess(true);
        clearAll();
      }
    });
  };

  const clearAll = () => {
    setOrgName(EMPTY_STRING);
    setLogonId(EMPTY_STRING);
    setFirstName(EMPTY_STRING);
    setLastName(EMPTY_STRING);
    setPassword(EMPTY_STRING);
    setPasswordVerify(EMPTY_STRING);
    setEmail(EMPTY_STRING);
    setPhone(EMPTY_STRING);
    setAddress1(EMPTY_STRING);
    setAddress2(EMPTY_STRING);
    setZipCode(EMPTY_STRING);
    setState(EMPTY_STRING);
    setCity(EMPTY_STRING);
    setCountry(EMPTY_STRING);
    setLanguage(defaultLanguageID);
    setCurrency(defaultCurrencyID);
  };

  const closeAndRedirect = () => {
    setOpenSuccess(false);
    setRedirect(true);
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) {
    //GA360
    if (mySite.enableGA) {
      AsyncCall.sendFormCompletionEvent("Register as a buyer in your organization", {
        enableUA: mySite.enableUA,
        enableGA4: mySite.enableGA4,
      });
    }
    return <Navigate replace to={SIGNIN} />;
  } else {
    return (
      <StyledContainer>
        <StyledGrid container justifyContent="center" spacing={2}>
          <StyledGrid item xs={12} md={6}>
            <StyledPaper className="top-margin-5 horizontal-padding-2 vertical-padding-3">
              <StyledTypography variant="h4" className="bottom-margin-4">
                {t("BuyerUserRegistration.Title")}
              </StyledTypography>
              <form noValidate name="buyerAdminUserRegistrationForm" onSubmit={handleSubmit}>
                <StyledGrid container item spacing={2}>
                  <StyledGrid item xs={12}>
                    <StyledTextField
                      required
                      inputProps={{
                        maxLength: 254,
                      }}
                      label={t("BuyerUserRegistration.OrgName")}
                      name="orgName"
                      autoFocus
                      fullWidth
                      variant="outlined"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </StyledGrid>
                  <StyledGrid item xs={12}>
                    <StyledTextField
                      required
                      inputProps={{
                        maxLength: 128,
                      }}
                      label={t("BuyerUserRegistration.LogonId")}
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
                      fullWidth
                      label={t("BuyerUserRegistration.Email")}
                      inputProps={{ maxLength: 100, type: "email" }}
                      name="email"
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
                      label={t("BuyerUserRegistration.Phone")}
                      name="phone"
                      fullWidth
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      error={!addressUtil.validatePhoneNumber(phone)}
                      helperText={
                        !addressUtil.validatePhoneNumber(phone)
                          ? t("BuyerUserRegistration.Msgs.InvalidFormat")
                          : EMPTY_STRING
                      }
                    />
                  </StyledGrid>
                </StyledGrid>
                <Divider className="top-margin-3 bottom-margin-2" />
                <StyledTypography variant="h5" className="bottom-margin-2">
                  {t("BuyerUserRegistration.AddressDetails")}
                </StyledTypography>
                <StyledGrid container item spacing={2}>
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
                    {!showAddress2Field && (
                      <StyledButton
                        variant="text"
                        color="primary"
                        onClick={() => {
                          setShowAddress2Field(true);
                        }}
                        testId={"buyer-user-registration-address-line-add"}>
                        {t("BuyerUserRegistration.AddressLineAdd")}
                      </StyledButton>
                    )}
                    {showAddress2Field && (
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
                    )}
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
                  <CountryState country={country} setCountry={setCountry} state={state} setState={setState} />
                  <StyledGrid item xs={12} sm={6}>
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
                </StyledGrid>
                <Divider className="top-margin-3 bottom-margin-2" />
                <StyledTypography variant="h5" className="bottom-margin-2">
                  {t("BuyerUserRegistration.AccountPreferences")}
                </StyledTypography>
                <StyledGrid container item spacing={2}>
                  <StyledGrid item xs={12} sm={6}>
                    <StyledFormControl variant="outlined">
                      <StyledInputLabel shrink>{t("BuyerUserRegistration.Language")}</StyledInputLabel>
                      <StyledSelect
                        value={language}
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
                      <StyledInputLabel shrink>{t("BuyerUserRegistration.Currency")}</StyledInputLabel>
                      <StyledSelect
                        value={currency}
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

                  <StyledGrid container justifyContent="center" className="top-margin-2">
                    <StyledGrid item>
                      <StyledButton
                        testId="buyer-user-registration-submit"
                        type="submit"
                        color="primary"
                        disabled={!canCreate()}>
                        {t("BuyerUserRegistration.Submit")}
                      </StyledButton>
                    </StyledGrid>
                  </StyledGrid>
                </StyledGrid>
              </form>

              <StyledDialog
                open={openSuccess}
                onClose={closeAndRedirect}
                aria-labelledby="buyer-user-registration-success-dialog">
                <StyledDialogContent>{t("BuyerUserRegistration.Success")}</StyledDialogContent>
                <StyledButton testId="buyer-user-registration-ok" onClick={closeAndRedirect} color="primary">
                  {t("BuyerUserRegistration.OK")}
                </StyledButton>
              </StyledDialog>

              <Divider className="top-margin-3 bottom-margin-2" />

              <StyledTypography variant="body1" className="text-align-center">
                {t("BuyerUserRegistration.HaveAccount")}
                <StyledLink className="left-margin-1" to={SIGNIN}>
                  {t("BuyerUserRegistration.SignIn")}
                </StyledLink>
              </StyledTypography>
            </StyledPaper>
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    );
  }
};
export default BuyerUserRegistration;
