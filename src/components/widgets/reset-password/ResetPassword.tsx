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
import React, { useEffect, ChangeEvent } from "react";
import { OK } from "http-status-codes";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import personService from "../../../_foundation/apis/transaction/person.service";
//UI
import {
  StyledDialogContent,
  StyledDialogContentText,
  StyledDialogActions,
  StyledButton,
  StyledTextField,
} from "../../StyledUI";

const ResetPassword: React.FC = (props: any) => {
  const widgetName = getDisplayName(ResetPassword);
  const [email, setEmail] = React.useState<string>("");
  const [validationCode, setValidationCode] = React.useState<string>("");
  const [passwordNew, setNewPassword] = React.useState<string>("");
  const [passwordVerify, setVerifyPassword] = React.useState<string>("");
  const { mySite: site } = useSite();

  const { t } = useTranslation();
  const validationCodeLabel = t("ResetPassword.ValidationCodeLabel");
  const newPasswordLabel = t("ResetPassword.NewPasswordLabel");
  const verifyPasswordLabel = t("ResetPassword.VerifyPasswordLabel");
  const submitButton = t("ResetPassword.SubmitButton");
  const contentText = t("ResetPassword.ContentText");
  const contentTextB2B = t("ResetPassword.ContentTextLogonID");
  const emailLabel = t("ResetPassword.EmailLabel");
  const successMsg = t("ResetPassword.SuccessMsg");
  const logonIdLabel = t("ForgotPassword.LogonIDLabel");
  const isB2b = site.isB2B;
  const [resetPasswordState, setResetPasswordState] = React.useState<boolean>(
    true
  );

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const handleEmailChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const val: string | null = evt.target.value;
    setEmail(val);
  };

  const handleValidationCodeChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const val: string | null = evt.target.value;
    setValidationCode(val);
  };

  const handleNewPasswordChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const val: string | null = evt.target.value;
    setNewPassword(val);
  };

  const handleVerifyPasswordChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const val: string | null = evt.target.value;
    setVerifyPassword(val);
  };

  const handleSuccess = () => {
    setResetPasswordState(false);
  };

  const getResetPasswordState = () => {
    return resetPasswordState;
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
        xcred_validationCode: validationCode,
        logonPassword: passwordNew,
        xcred_logonPasswordVerify: passwordVerify,
      },
      ...payloadBase,
    };
    personService
      .updatePerson(parameters, null, site.transactionContext)
      .then((res) => {
        if (res.status === OK) {
          handleSuccess();
        }
      });
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  });

  return getResetPasswordState() ? (
    <StyledDialogContent>
      <StyledDialogContentText>
        {isB2b ? contentTextB2B : contentText}
      </StyledDialogContentText>
      <form name="resetPasswordForm" onSubmit={handleSubmit}>
        <StyledTextField
          margin="normal"
          required
          fullWidth
          label={isB2b ? logonIdLabel : emailLabel}
          autoFocus
          placeholder=""
          type={isB2b ? "text" : "email"}
          name="email"
          onChange={(e) => handleEmailChange(e, "email")}
        />
        <StyledTextField
          margin="normal"
          required
          fullWidth
          label={validationCodeLabel}
          placeholder=""
          name="validationCode"
          onChange={(e) => handleValidationCodeChange(e, "validationCode")}
        />
        <StyledTextField
          margin="normal"
          required
          fullWidth
          label={newPasswordLabel}
          type="password"
          placeholder=""
          name="logonPassword"
          onChange={(e) => handleNewPasswordChange(e, "logonPassword")}
        />
        <StyledTextField
          margin="normal"
          required
          fullWidth
          label={verifyPasswordLabel}
          type="password"
          placeholder=""
          name="logonPasswordVerify"
          onChange={(e) => handleVerifyPasswordChange(e, "logonPasswordVerify")}
        />
        <StyledDialogActions>
          <StyledButton color="primary" type="submit">
            {submitButton}
          </StyledButton>
        </StyledDialogActions>
      </form>
    </StyledDialogContent>
  ) : (
    <StyledDialogContent>{successMsg}</StyledDialogContent>
  );
};

export { ResetPassword };
