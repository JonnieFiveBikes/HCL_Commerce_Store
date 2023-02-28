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
import React, { useEffect, ChangeEvent, useMemo } from "react";
import { useDispatch } from "react-redux";
import * as ROUTES from "../../../constants/routes";
import { OK } from "http-status-codes";
import { useTranslation } from "react-i18next";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import personService from "../../../_foundation/apis/transaction/person.service";
//Custom libraries
import { ResetPassword } from "../../widgets/reset-password";
import addressUtil from "../../../utils/addressUtil";
import { EMPTY_STRING } from "../../../constants/common";
//UI
import {
  StyledButton,
  StyledTextField,
  StyledTypography,
  StyledPaper,
  StyledBox,
  StyledGrid,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@mui/material";
//redux
import * as successActions from "../../../redux/actions/success";

const ForgotPasswordLayout: React.FC = (props: any) => {
  const widgetName = getDisplayName(ForgotPasswordLayout);
  const [email, setEmail] = React.useState<string>(EMPTY_STRING);
  const [forgotPasswordState, setForgotPasswordState] = React.useState<boolean>(true);
  const dispatch = useDispatch();
  const { mySite: site } = useSite();
  const { t } = useTranslation();
  const forgotPasswordTitle = t("ForgotPassword.Title");
  const resetPasswordTitle = t("ResetPassword.Title");
  const logonIdLabel = t("ForgotPassword.LogonIDLabel");
  const emailLabel = t("ForgotPassword.EmailLabel");
  const sendCodeButton = t("ForgotPassword.SendVerificationCodeButton");
  const contentText = t("ForgotPassword.ContentText");
  const contentTextB2B = t("ForgotPassword.ContentTextLogonID");
  const validationCodeButton = t("ForgotPassword.ValidationCodeButton");
  const CodeRecieved = t("ForgotPassword.CodeRecieved");
  const isB2B = site.isB2B;

  const controller = useMemo(() => new AbortController(), []);

  const payloadBase: any = {
    widget: widgetName,
    signal: controller.signal,
  };

  const handleEmail = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const val: string | null = evt.target.value;
    setEmail(val);
  };

  const handleForgotPasswordState = () => {
    setForgotPasswordState(false);
  };

  const handleSuccess = () => {
    handleForgotPasswordState();
  };

  /**
   * Form validation function
   * Return true when all mandatory field has been entered and are valid
   * else false
   */
  const canContinue = (): boolean => {
    return email !== EMPTY_STRING && (isB2B || addressUtil.validateEmail(email));
  };
  const handleSubmit = (props: any) => {
    props.preventDefault();
    props.stopPropagation();
    const storeID = site.storeID;
    const parameters: any = {
      responseFormat: "application/json",
      storeId: storeID,
      body: {
        logonId: email,
        resetPassword: "true",
        challengeAnswer: "-",
      },
      ...payloadBase,
    };
    personService
      .updatePerson(parameters)
      .then((res) => {
        if (res.status === OK) {
          handleSuccess();
          const successMessage = {
            key: "success-message.RESEND_VERIFICATION_CODE",
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
        }
      })
      .catch((err) => {
        return;
      });
  };

  const getForgotPasswordState = () => {
    return forgotPasswordState;
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledGrid container justifyContent="center">
      <StyledGrid item xs={12}>
        <StyledPaper className="top-margin-5 horizontal-padding-2 vertical-padding-3">
          {getForgotPasswordState() ? (
            <StyledTypography variant="h4" className="bottom-margin-1">
              {forgotPasswordTitle}
            </StyledTypography>
          ) : (
            <StyledTypography variant="h4" className="bottom-margin-1">
              {resetPasswordTitle}
            </StyledTypography>
          )}
          {getForgotPasswordState() ? (
            <>
              {isB2B ? (
                <StyledTypography variant="body1">{contentTextB2B}</StyledTypography>
              ) : (
                <StyledTypography variant="body1">{contentText}</StyledTypography>
              )}
              <form name="forgotPasswordForm" noValidate onSubmit={handleSubmit}>
                <StyledTextField
                  margin="normal"
                  required
                  size="small"
                  label={
                    isB2B ? (
                      <StyledTypography variant="body1">{logonIdLabel}</StyledTypography>
                    ) : (
                      <StyledTypography variant="body1">{emailLabel}</StyledTypography>
                    )
                  }
                  autoFocus
                  fullWidth
                  name="email"
                  maxLength="100"
                  type={isB2B ? "text" : "email"}
                  onChange={(e) => handleEmail(e, "email")}
                  error={isB2B ? false : !addressUtil.validateEmail(email)}
                  inputProps={{
                    maxLength: 100,
                    placeholder: isB2B ? EMPTY_STRING : "name@domain.com",
                  }}
                  helperText={
                    !addressUtil.validateEmail(email) && !isB2B ? t("ForgotPassword.Msgs.InvalidFormat") : EMPTY_STRING
                  }
                />
                <StyledBox className="vertical-padding-3" textAlign="center">
                  <StyledButton
                    testId="forgot-password-send-validation-code"
                    color="primary"
                    type="submit"
                    className="login-process-button"
                    disabled={!canContinue()}>
                    {sendCodeButton}
                  </StyledButton>
                </StyledBox>
                <StyledGrid container alignItems="center" direction="row" justifyContent="center" spacing={6}>
                  <StyledGrid item xs={12}>
                    <StyledGrid container alignItems="center" direction="column" justifyContent="center" spacing={1}>
                      <StyledGrid item xs={12}>
                        <StyledTypography variant="body1">{CodeRecieved}</StyledTypography>
                      </StyledGrid>
                      <StyledGrid item xs={12}>
                        <StyledButton
                          testId="forgot-password-verification-code"
                          color="secondary"
                          className="border-solid-bold login-process-button"
                          onClick={handleForgotPasswordState}
                          disabled={!canContinue()}>
                          {validationCodeButton}
                        </StyledButton>
                      </StyledGrid>
                    </StyledGrid>
                  </StyledGrid>
                  <StyledGrid item xs={12}>
                    <Divider className="vertical-margin-2" />
                    <StyledGrid container alignItems="center" direction="row" justifyContent="center">
                      <StyledGrid item>
                        <StyledTypography variant="body1" component="span">
                          {t("ForgotPassword.AccountInfoRemember")}
                        </StyledTypography>
                        <StyledTypography variant="body1" component="span">
                          <StyledLink to={ROUTES.SIGNIN}>{t("ForgotPassword.SignIn")}</StyledLink>
                        </StyledTypography>
                      </StyledGrid>
                    </StyledGrid>
                  </StyledGrid>
                </StyledGrid>
              </form>
            </>
          ) : (
            <ResetPassword email={email} setEmail={setEmail} resendCode={handleSubmit} />
          )}
        </StyledPaper>
      </StyledGrid>
    </StyledGrid>
  );
};

export default ForgotPasswordLayout;
