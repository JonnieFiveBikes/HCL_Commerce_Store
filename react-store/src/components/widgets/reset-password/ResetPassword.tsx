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
import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import * as ROUTES from "../../../constants/routes";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { OK } from "http-status-codes";
import { useTranslation } from "react-i18next";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import personService from "../../../_foundation/apis/transaction/person.service";
// Custom libraries
import addressUtil from "../../../../src/utils/addressUtil";
import { EMPTY_STRING } from "../../../constants/common";

//UI
import {
  StyledButton,
  StyledTextField,
  StyledGrid,
  StyledTypography,
  StyledLink,
  StyledBox,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@mui/material";
//redux
import * as successActions from "../../../redux/actions/success";

function ResetPassword(props) {
  const navigate = useNavigate();
  const widgetName = getDisplayName(ResetPassword);
  const [validationCode, setValidationCode] = React.useState<string>(EMPTY_STRING);
  const [passwordNew, setNewPassword] = React.useState<string>(EMPTY_STRING);
  const [passwordVerify, setVerifyPassword] = React.useState<string>(EMPTY_STRING);
  const [logonInputProps, setLogonInputProps] = useState<any>({});
  const { mySite: site } = useSite();

  const { t } = useTranslation();
  const validationCodeLabel = t("ResetPassword.ValidationCodeLabel");
  const newPasswordLabel = t("ResetPassword.NewPasswordLabel");
  const verifyPasswordLabel = t("ResetPassword.VerifyPasswordLabel");
  const submitButton = t("ResetPassword.SubmitButton");
  const emailLabel = t("ResetPassword.EmailLabel");
  const logonIdLabel = t("ResetPassword.LogonIDLabel");
  const contentText = t("ResetPassword.ContentText");
  const isB2B = site.isB2B;
  const dispatch = useDispatch();

  const controller = useMemo(() => new AbortController(), []);

  const payloadBase: any = {
    widget: widgetName,

    signal: controller.signal,
  };

  const handleValidationCodeChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const val: string | null = evt.target.value;
    setValidationCode(val);
  };
  useEffect(() => {
    if (site) {
      if (site.isB2B) {
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
  }, [site]);

  const handleEmailLogonIdChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const val: string | null = evt.target.value;
    props.setEmail(val);
  };
  const handleNewPasswordChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const val: string | null = evt.target.value;
    setNewPassword(val);
  };

  const handleVerifyPasswordChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const val: string | null = evt.target.value;
    setVerifyPassword(val);
  };

  /**
   * Form validation function
   * Return true when all mandatory field has been entered and are valid
   * else false
   */
  const canContinue = (): boolean => {
    let flag: boolean = false;
    if (validationCode !== EMPTY_STRING && passwordNew !== EMPTY_STRING && passwordVerify !== EMPTY_STRING) {
      flag = isB2B ? true : addressUtil.validateEmail(props.email);
    }
    return flag;
  };

  const canResendVerificationCodeButtonContinue = (): boolean => {
    return props.email ? (isB2B ? true : addressUtil.validateEmail(props.email)) : false;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const storeID = site.storeID;
    const parameters: any = {
      responseFormat: "application/json",
      storeId: storeID,
      body: {
        logonId: props.email,
        resetPassword: "true",
        xcred_validationCode: validationCode,
        logonPassword: passwordNew,
        xcred_logonPasswordVerify: passwordVerify,
      },
      ...payloadBase,
    };
    personService
      .updatePerson(parameters)
      .then((res) => {
        if (res.status === OK) {
          navigate(ROUTES.SIGNIN);
          const successMessage = {
            key: "success-message.PASSWORD_RESET_SUCCESS",
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
        }
      })
      .catch((err) => {
        return;
      });
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form noValidate>
      <StyledGrid container justifyContent="center" alignItems="center" spacing={1}>
        <StyledGrid item xs={12}>
          <StyledTypography variant="body1">{contentText}</StyledTypography>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label={isB2B ? logonIdLabel : emailLabel}
            inputProps={logonInputProps}
            value={props.email}
            placeholder={EMPTY_STRING}
            name="email"
            error={isB2B ? false : !addressUtil.validateEmail(props.email)}
            helperText={
              !addressUtil.validateEmail(props.email) && !isB2B ? t("SignIn.Msgs.InvalidFormat") : EMPTY_STRING
            }
            onChange={(e) => handleEmailLogonIdChange(e, "email")}
          />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label={validationCodeLabel}
            autoFocus
            placeholder={EMPTY_STRING}
            name="validationCode"
            onChange={(e) => handleValidationCodeChange(e, "validationCode")}
          />
        </StyledGrid>

        <StyledGrid item xs={12} md={6}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label={newPasswordLabel}
            type="password"
            placeholder={EMPTY_STRING}
            name="logonPassword"
            onChange={(e) => handleNewPasswordChange(e, "logonPassword")}
          />
        </StyledGrid>
        <StyledGrid item xs={12} md={6}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label={verifyPasswordLabel}
            type="password"
            placeholder={EMPTY_STRING}
            name="logonPasswordVerify"
            onChange={(e) => handleVerifyPasswordChange(e, "logonPasswordVerify")}
          />
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            testId="reset-password-submit"
            color="primary"
            type="button"
            className="login-process-button vertical-margin-2"
            disabled={!canContinue()}
            onClick={handleSubmit}>
            {submitButton}
          </StyledButton>
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StyledGrid container spacing={1} justifyContent="center" alignItems="center" direction="row">
            <StyledGrid item xs={12}>
              <StyledTypography variant="body1" align="center">
                {t("ResetPassword.PasswordNotRecieved")}
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item xs={12}>
              <StyledBox textAlign="center">
                <StyledButton
                  testId="reset-password-resend-verification-code"
                  color="secondary"
                  className="login-process-button border-solid-bold"
                  disabled={!canResendVerificationCodeButtonContinue()}
                  onClick={props.resendCode}>
                  {t("ResetPassword.ResendVerificationCode")}
                </StyledButton>
              </StyledBox>
            </StyledGrid>
            <StyledGrid item xs={12}>
              <Divider className="top-margin-6" />
            </StyledGrid>
            <StyledGrid item>
              <StyledTypography variant="body1" component="span">
                {t("ResetPassword.AccountInfoRemember")}
              </StyledTypography>
              <StyledTypography variant="body1" component="span">
                <StyledLink to={ROUTES.SIGNIN}>{t("ResetPassword.SignIn")}</StyledLink>
              </StyledTypography>
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
    </form>
  );
}

export { ResetPassword };
