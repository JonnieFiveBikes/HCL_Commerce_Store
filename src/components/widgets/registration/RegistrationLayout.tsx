/**
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
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import addressUtil from "../../../utils/addressUtil";
import { HOME } from "../../../constants/routes";
//Redux
import { registrationStatusSelector } from "../../../redux/selectors/user";
import * as userAction from "../../../redux/actions/user";
//UI
import {
  StyledTextField,
  StyledButton,
  StyledTypography,
  StyledFormControlLabel,
  StyledCheckbox,
} from "../../StyledUI";
//GA360
import GADataService from "../../../_foundation/gtm/gaData.service";

interface RegistrationContext {
  cid: string;
}

function RegistrationLayout({ cid, ...props }: RegistrationContext) {
  const widgetName = getDisplayName(RegistrationLayout);
  const dispatch = useDispatch();
  const registrationStatus = useSelector(registrationStatusSelector);
  const { t } = useTranslation();
  const { mySite } = useSite();
  const storeId: string = mySite ? mySite.storeID : "";
  const catalogId: string = mySite ? mySite.catalogID : "";
  const preferredLanguage: string = mySite ? mySite.defaultLanguageID : "";
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [receiveEmail, setReceiveEmail] = useState<boolean>(true);

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
    dispatch(
      userAction.registrationAction({
        body: {
          firstName: firstName,
          lastName: lastName,
          logonId: email,
          logonPassword: password1,
          logonPasswordVerify: password2,
          registerType: "G",
          profileType: "C",
          email1: email,
          phone1: phone.trim(),
          storeId,
          catalogId,
          preferredLanguage,
          receiveEmail: receiveEmail,
          challengeQuestion: "-",
          challengeAnswer: "-",
        },
        ...payloadBase,
      })
    );
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  });

  if (registrationStatus) {
    //GA360
    if (mySite.enableGA) GADataService.sendFormCompletionEvent("Register");
    return <Redirect to={HOME} />;
  } else {
    return (
      <div>
        <StyledTypography
          component="h1"
          variant="h4"
          className="bottom-margin-1">
          {t("RegistrationLayout.NewCustomer")}
        </StyledTypography>
        <form
          name="registrationForm"
          id={`registration_form_5_${cid}`}
          onSubmit={handleSubmit}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label={t("RegistrationLayout.Email")}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            inputProps={{
              maxLength: 35,
              type: "email",
              placeholder: "name@domain.com",
            }}
            error={!addressUtil.validateEmail(email)}
            helperText={
              !addressUtil.validateEmail(email)
                ? t("RegistrationLayout.Msgs.InvalidFormat")
                : ""
            }
          />
          <StyledTextField
            margin="normal"
            fullWidth
            required
            label={t("RegistrationLayout.FirstName")}
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            inputProps={{
              maxLength: 40,
            }}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label={t("RegistrationLayout.LastName")}
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            inputProps={{
              maxLength: 40,
            }}
          />
          <StyledTextField
            margin="normal"
            fullWidth
            label={t("RegistrationLayout.Phone")}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            inputProps={{
              maxLength: 32,
              type: "tel",
            }}
            error={!addressUtil.validatePhoneNumber(phone)}
            helperText={
              !addressUtil.validatePhoneNumber(phone)
                ? t("RegistrationLayout.Msgs.InvalidFormat")
                : ""
            }
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label={t("RegistrationLayout.Password")}
            name="password1"
            onChange={(e) => setPassword1(e.target.value)}
            value={password1}
            inputProps={{
              maxLength: 50,
              type: "password",
            }}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label={t("RegistrationLayout.VerifyPassword")}
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            inputProps={{
              maxLength: 50,
              type: "password",
            }}
          />
          <div>
            <StyledFormControlLabel
              control={
                <StyledCheckbox
                  value="receiveEmail"
                  color="primary"
                  defaultChecked
                  onChange={(e) => setReceiveEmail(e.target.checked)}
                />
              }
              label={t("RegistrationLayout.TextContent")}
            />
          </div>
          <StyledButton type="submit" color="primary">
            {t("RegistrationLayout.Register")}
          </StyledButton>
        </form>
      </div>
    );
  }
}

export { RegistrationLayout };
