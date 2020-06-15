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
import { useTranslation } from "react-i18next";
import { OK } from "http-status-codes";
//Foundation libraries
import personService from "../../../_foundation/apis/transaction/person.service";
import { useSite } from "../../../_foundation/hooks/useSite";
//UI
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledButton,
  StyledTextField,
} from "../../StyledUI";

const ChangePassword: React.FC = (props: any) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
  const [err_text, setErrorText] = React.useState<string>("");
  const [passwordOld, setOldPassword] = React.useState<string>("");
  const [passwordNew, setNewPassword] = React.useState<string>("");
  const [passwordVerify, setVerifyPassword] = React.useState<string>("");

  const site = useSite();

  const { t } = useTranslation();
  const title = t("ChangePassword.Title");
  const currentPasswordLabel = t("ChangePassword.CurrentPasswordLabel");
  const newPasswordLabel = t("ChangePassword.NewPasswordLabel");
  const verifyPasswordLabel = t("ChangePassword.VerifyPasswordLabel");
  const saveLabel = t("ChangePassword.SaveLabel");
  const cancelLabel = t("ChangePassword.CancelLabel");
  const successLabel = t("ChangePassword.SuccessLabel");
  const okLabel = t("ChangePassword.OkLabel");

  const handleOldPasswordChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const val: string | null = evt.target.value;
    setOldPassword(val);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorText("");
    setOpen(false);
  };

  const handleErrors = (err: any) => {
    setErrorText(err);
  };

  const handleSuccess = () => {
    handleClose();
    setOpenSuccess(true);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccess(false);
  };

  const handleSubmit = (props: any) => {
    props.preventDefault();
    const storeID = site.storeID;
    const parameters: any = {
      responseFormat: "application/json",
      storeId: storeID,
      body: {
        resetPassword: "true",
        xcred_logonPasswordOld: passwordOld,
        logonPassword: passwordNew,
        xcred_logonPasswordVerify: passwordVerify,
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

  return (
    <div>
      <StyledButton size="small" color="secondary" onClick={handleClickOpen}>
        {title}
      </StyledButton>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="change-password-dialog">
        <StyledDialogTitle title={title} onClickHandler={handleClose} />
        <StyledDialogContent>
          <form name="signInForm" onSubmit={handleSubmit}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              label={currentPasswordLabel}
              autoFocus
              type="password"
              placeholder=""
              name="logonPasswordOld"
              onChange={(e) => handleOldPasswordChange(e, "logonPasswordOld")}
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
              onChange={(e) =>
                handleVerifyPasswordChange(e, "logonPasswordVerify")
              }
            />
            <StyledDialogActions>
              <StyledButton color="primary" type="submit">
                {saveLabel}
              </StyledButton>
              <StyledButton
                color="secondary"
                onClick={handleClose}
                className="right-margin-2">
                {cancelLabel}
              </StyledButton>
            </StyledDialogActions>
          </form>
        </StyledDialogContent>
      </StyledDialog>

      <StyledDialog
        open={openSuccess}
        onClose={handleCloseSuccessModal}
        aria-labelledby="change-password-success-dialog">
        <StyledDialogContent>{successLabel}</StyledDialogContent>
        <StyledButton onClick={handleCloseSuccessModal}>{okLabel}</StyledButton>
      </StyledDialog>
    </div>
  );
};

export { ChangePassword };
