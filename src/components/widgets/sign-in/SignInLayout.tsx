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
import { ForgotPassword } from "../forgot-password";
import { HOME } from "../../../constants/routes";
//Redux
import * as userAction from "../../../redux/actions/user";
import { loginStatusSelector } from "../../../redux/selectors/user";
//UI
import {
  StyledTextField,
  StyledButton,
  StyledTypography,
} from "../../StyledUI";
//GA360
import GADataService from "../../../_foundation/gtm/gaData.service";

interface SignInContext {
  cid: string;
  redirectRoute?: string;
}

function SignInLayout({ cid, ...props }: SignInContext) {
  const widgetName = getDisplayName(SignInLayout);
  const redirectRoute = props.redirectRoute ? props.redirectRoute : HOME;
  const loginStatus = useSelector(loginStatusSelector);
  const { mySite } = useSite();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [logonInputProps, setLogonInputProps] = useState<any>({});
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const logonIdLabel = t("SignIn.Label.B2B");
  const emailLabel = t("SignIn.Label.Email");

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
      userAction.LOGIN_REQUESTED_ACTION({
        body: {
          logonId: email,
          logonPassword: password,
        },
        ...payloadBase,
      })
    );
  };

  useEffect(() => {
    if (mySite) {
      if (mySite.isB2B) {
        setLogonInputProps({
          maxLength: 100,
          type: "text",
        });
      } else {
        setLogonInputProps({
          maxLength: 100,
          type: "email",
          placeholder: "name@domain.com",
        });
      }
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite]);

  if (loginStatus === true) {
    //GA360
    mySite.enableGA && GADataService.sendFormCompletionEvent("Sign In");
    return <Redirect to={redirectRoute} />;
  } else {
    return (
      <>
        <StyledTypography
          component="h1"
          variant="h4"
          className="bottom-margin-1">
          {t("SignIn.ReturningCustomer")}
        </StyledTypography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label={mySite.isB2B ? logonIdLabel : emailLabel}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            inputProps={logonInputProps}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("SignIn.Password")}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            inputProps={{
              maxLength: 100,
              type: "password",
            }}
          />
          <ForgotPassword />
          <StyledButton type="submit" color="primary">
            {t("SignIn.SignInButton")}
          </StyledButton>
        </form>
      </>
    );
  }
}

export { SignInLayout };
