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
import React, { ChangeEvent } from "react";
import { OK } from "http-status-codes";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import personService from "../../../_foundation/apis/transaction/person.service";
//Custom libraries
import { ResetPassword } from "../reset-password";
//UI
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogContentText,
  StyledDialogActions,
  StyledButton,
  StyledTextField,
  StyledTypography,
} from "../../StyledUI";

const ForgotPassword: React.FC = (props: any) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [forgotPasswordState, setForgotPasswordState] = React.useState<boolean>(
    true
  );
  const { mySite: site } = useSite();
  const { t } = useTranslation();
  const forgotPasswordTitle = t("ForgotPassword.Title");
  const resetPasswordTitle = t("ResetPassword.Title");
  const logonIdLabel = t("ForgotPassword.LogonIDLabel");
  const emailLabel = t("ForgotPassword.EmailLabel");
  const submitButton = t("ForgotPassword.SubmitButton");
  const contentText = t("ForgotPassword.ContentText");
  const contentTextB2B = t("ForgotPassword.ContentTextLogonID");
  const validationCodeButton = t("ForgotPassword.ValidationCodeButton");
  const orLabel = t("ForgotPassword.ORLabel");

  const isB2b = site.isB2B;

  const handleEmail = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const val: string | null = evt.target.value;
    setEmail(val);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForgotPasswordState(true);
  };

  const handleForgotPasswordState = () => {
    setForgotPasswordState(false);
  };

  const handleSuccess = () => {
    handleForgotPasswordState();
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
    };
    personService
      .updatePerson(parameters, null, site.transactionContext)
      .then((res) => {
        if (res.status === OK) {
          handleSuccess();
        }
      });
  };

  const getForgotPasswordState = () => {
    return forgotPasswordState;
  };

  return (
    <div>
      <StyledButton
        onClick={handleClickOpen}
        variant="text"
        color="primary"
        className="bottom-margin-1">
        {forgotPasswordTitle}
      </StyledButton>

      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="forgot-password-dialog">
        <StyledDialogTitle
          onClickHandler={handleClose}
          title={
            getForgotPasswordState() ? forgotPasswordTitle : resetPasswordTitle
          }
        />
        {getForgotPasswordState() ? (
          <StyledDialogContent>
            <StyledDialogContentText>
              {isB2b ? contentTextB2B : contentText}
            </StyledDialogContentText>
            <form name="forgotPasswordForm" onSubmit={handleSubmit}>
              <StyledTextField
                margin="normal"
                required
                size="small"
                label={isB2b ? logonIdLabel : emailLabel}
                autoFocus
                fullWidth
                name="email"
                type={isB2b ? "text" : "email"}
                onChange={(e) => handleEmail(e, "email")}
              />
              <StyledDialogActions>
                <StyledButton color="primary" type="submit">
                  {submitButton}
                </StyledButton>
                <StyledTypography variant="body1">{orLabel}</StyledTypography>
                <StyledButton
                  color="secondary"
                  onClick={handleForgotPasswordState}>
                  {validationCodeButton}
                </StyledButton>
              </StyledDialogActions>
            </form>
          </StyledDialogContent>
        ) : (
          <ResetPassword />
        )}
      </StyledDialog>
    </div>
  );
};

export { ForgotPassword };
