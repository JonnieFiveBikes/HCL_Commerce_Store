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
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import { SKIP_WC_TOKEN_HEADER } from "../../../_foundation/constants/common";
//Custom libraries
import { FORGOT_PASSWORD, CHECKOUT, SIGNIN } from "../../../constants/routes";
import { EMPTY_STRING } from "../../../constants/common";
import addressUtil from "../../../../src/utils/addressUtil";
//Redux
import * as userAction from "../../../redux/actions/user";
import { RESET_ERROR_ACTION } from "../../../redux/actions/error";
import { passwordExpiredErrorSelector } from "../../../redux/selectors/error";
import { loginStatusSelector } from "../../../redux/selectors/user";
//UI
import {
  StyledTextField,
  StyledButton,
  StyledTypography,
  StyledPaper,
  StyledBox,
  StyledLink,
  StyledFormControlLabel,
  StyledCheckbox,
} from "@hcl-commerce-store-sdk/react-component";
import Divider from "@material-ui/core/Divider";
//GA360
import AsyncCall from "../../../_foundation/gtm/async.service";

interface SignInContext {
  cid: string;
  redirectRoute?: string;
  hideRegistrationPage: any;
  checkoutFlow?: any;
}

function SignInLayout({ cid, hideRegistrationPage, ...props }: SignInContext) {
  const widgetName = getDisplayName(SignInLayout);
  const passwordExpiredError: any = useSelector(passwordExpiredErrorSelector);
  const { redirectRoute, checkoutFlow } = props;
  const loginStatus = useSelector(loginStatusSelector);
  const { mySite } = useSite();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [logonInputProps, setLogonInputProps] = useState<any>({});
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [logonPassword, setLogonPassword] = useState<string>(EMPTY_STRING);
  const [logonPasswordNew, setLogonPasswordNew] = useState<string>(EMPTY_STRING);
  const [logonPasswordVerify, setLogonPasswordVerify] = useState<string>(EMPTY_STRING);
  const [errorMessageKey, setErrorMessageKey] = useState<string>(EMPTY_STRING);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const logonIdLabel = t("SignIn.Label.B2B");
  const emailLabel = t("SignIn.Label.Email");
  const isB2B: boolean = mySite?.isB2B ? mySite.isB2B : false;
  const navigate = useNavigate();
  const signInTitle = checkoutFlow ? t("SignIn.SignInAndCheckoutTitle") : t("SignIn.SignInButton");
  const signInButton = checkoutFlow ? t("SignIn.SignInAndCheckoutButton") : t("SignIn.SignInButton");
  const noAccountMsg = checkoutFlow ? t("SignIn.CheckoutAsGuestMsg") : t("SignIn.noAccount");
  const registerButton = checkoutFlow ? t("SignIn.CheckoutAsGuestButton") : t("SignIn.registerNow");

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
   * Return true when all mandatory field has been entered and are valid
   * else false
   */
  const canContinue = (): boolean => {
    let flag: boolean = false;
    if (errorMessageKey) {
      if (
        email.trim() !== EMPTY_STRING &&
        logonPassword !== EMPTY_STRING &&
        logonPasswordNew !== EMPTY_STRING &&
        logonPasswordVerify !== EMPTY_STRING
      ) {
        const isEmail = isB2B ? true : addressUtil.validateEmail(email);
        flag = isEmail && logonPasswordNew.trim() === logonPasswordVerify.trim();
      }
    } else {
      if (email.trim() !== EMPTY_STRING && logonPassword !== EMPTY_STRING) {
        flag = isB2B ? true : addressUtil.validateEmail(email);
      }
    }
    return flag;
  };

  const onRegisterClick = () => hideRegistrationPage(false);
  const onCheckoutAsGuestClick = () => navigate(CHECKOUT);

  const onRememberMeChecked = useCallback((_event: any, value: boolean) => {
    setRememberMe(value);
  }, []);

  const handleSubmit = (props: any) => {
    props.preventDefault();

    const checkoutFn = checkoutFlow ? () => navigate(CHECKOUT) : null;
    const payload = {
      body: {
        logonId: email,
        logonPassword,
      },
      checkoutFn,
      ...payloadBase,
    };
    if (rememberMe) payload.query.rememberMe = rememberMe;
    dispatch(userAction.LOGIN_REQUESTED_ACTION(payload));
  };
  const handleLogonAndChangePasswordSubmit = (props: any) => {
    props.preventDefault();
    dispatch(
      userAction.LOGON_AND_CHANGE_PASSWORD_ACTION({
        body: {
          logonId: email,
          logonPassword,
          logonPasswordNew,
          logonPasswordVerify,
        },
        [SKIP_WC_TOKEN_HEADER]: true,
        skipErrorSnackbar: true,
        ...payloadBase,
      })
    );
  };
  const goToSignInPage = () => {
    dispatch(RESET_ERROR_ACTION());
    navigate(SIGNIN);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);

  useEffect(() => {
    if (passwordExpiredError.errorKey && passwordExpiredError.errorCode) {
      setErrorMessageKey("error-message." + passwordExpiredError.errorKey + "_" + passwordExpiredError.errorCode);
      setLogonPassword(EMPTY_STRING);
      setLogonPasswordNew(EMPTY_STRING);
      setLogonPasswordVerify(EMPTY_STRING);
    } else {
      setErrorMessageKey(EMPTY_STRING);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordExpiredError]);

  useEffect(() => {
    return () => {
      dispatch(RESET_ERROR_ACTION());
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pwSetter = (e) => setLogonPassword(e.target.value);

  if (loginStatus === true) {
    //GA360
    if (mySite.enableGA) {
      AsyncCall.sendFormCompletionEvent("Sign In", {
        enableUA: mySite.enableUA,
        enableGA4: mySite.enableGA4,
      });
    }

    // return fragment if no redirection specified (login-guard will take us HOME) -- otherwise redirect
    return redirectRoute ? <Navigate replace to={redirectRoute} /> : <></>;
  } else {
    return (
      <StyledPaper className="top-margin-5 horizontal-padding-2 vertical-padding-3">
        {errorMessageKey ? (
          <>
            <StyledTypography component="h1" variant="h4" className="bottom-margin-1">
              {t("SignIn.ChangPassword")}
            </StyledTypography>
            <StyledTypography component="p" className="error">
              {t(errorMessageKey)}
            </StyledTypography>
            <form noValidate name="changePasswordForm" onSubmit={handleLogonAndChangePasswordSubmit}>
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                name="password"
                label={t("SignIn.CurrentPassword")}
                onChange={(e) => setLogonPassword(e.target.value)}
                value={logonPassword}
                inputProps={{
                  maxLength: 100,
                  type: "password",
                }}
              />
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={t("SignIn.Password")}
                type="password"
                placeholder={EMPTY_STRING}
                name="logonPasswordNew"
                maxLength="100"
                value={logonPasswordNew}
                onChange={(e) => setLogonPasswordNew(e.target.value)}
              />
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={t("SignIn.PasswordVerify")}
                type="password"
                placeholder={EMPTY_STRING}
                name="logonPasswordVerify"
                value={logonPasswordVerify}
                maxLength="100"
                onChange={(e) => setLogonPasswordVerify(e.target.value)}
                error={logonPasswordVerify.trim().length > 0 && logonPasswordNew.trim() !== logonPasswordVerify.trim()}
                helperText={
                  logonPasswordVerify.trim().length > 0 && logonPasswordNew.trim() !== logonPasswordVerify.trim()
                    ? t("SignIn.Msgs.PasswordNotMatch")
                    : EMPTY_STRING
                }
              />
              <StyledBox mt={2}>
                <StyledButton testId="sign-in-submit" color={"primary"} type="submit" disabled={!canContinue()}>
                  {t("SignIn.Submit")}
                </StyledButton>
                <StyledButton
                  testId="sign-in-cancel"
                  color="secondary"
                  style={{ float: "right" }}
                  onClick={goToSignInPage}>
                  {t("SignIn.Cancel")}
                </StyledButton>
              </StyledBox>
            </form>
          </>
        ) : (
          <>
            <StyledTypography component="h1" variant="h4" className="bottom-margin-1">
              {signInTitle}
            </StyledTypography>
            <form onSubmit={handleSubmit} noValidate>
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                autoComplete="email"
                label={mySite.isB2B ? logonIdLabel : emailLabel}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                inputProps={logonInputProps}
                error={isB2B ? false : !addressUtil.validateEmail(email)}
                helperText={!addressUtil.validateEmail(email) && !isB2B ? t("SignIn.Msgs.InvalidFormat") : EMPTY_STRING}
              />
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                autoComplete="current-password"
                label={t("SignIn.Password")}
                onChange={pwSetter}
                value={logonPassword}
                inputProps={{
                  maxLength: 100,
                  type: "password",
                }}
              />
              {process.env.REACT_APP_PERSISTENT_SESSION?.toLowerCase() === "true" ? (
                <StyledFormControlLabel
                  className="vertical-padding-1"
                  control={<StyledCheckbox checked={rememberMe} color="primary" onChange={onRememberMeChecked} />}
                  label={t("SignIn.Label.rememberMe")}
                />
              ) : null}
              <StyledTypography variant="body1" color="primary" className="vertical-margin-1">
                <StyledLink to={FORGOT_PASSWORD}>{t("SignIn.ForgotPassword")}</StyledLink>
              </StyledTypography>
              <StyledBox align="center">
                <StyledButton
                  testId="sign-in-submit"
                  type="submit"
                  color="primary"
                  disabled={!canContinue()}
                  className="login-process-button vertical-margin-2">
                  {signInButton}
                </StyledButton>
                {!isB2B ? (
                  <>
                    <Divider className="vertical-margin-2" />
                    <StyledTypography variant="body1" className="bottom-margin-1  top-margin-3">
                      {noAccountMsg}
                    </StyledTypography>
                    <StyledButton
                      testId="sign-in-register"
                      color="secondary"
                      onClick={checkoutFlow ? onCheckoutAsGuestClick : onRegisterClick}
                      className="login-process-button  bottom-margin-1">
                      {registerButton}
                    </StyledButton>
                  </>
                ) : null}
              </StyledBox>
            </form>
          </>
        )}
      </StyledPaper>
    );
  }
}

export { SignInLayout };
