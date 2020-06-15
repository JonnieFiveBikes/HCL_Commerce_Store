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
import personService from "../../../../_foundation/apis/transaction/person.service";
import { useSite } from "../../../../_foundation/hooks/useSite";
//UI
import {
  StyledButton,
  StyledTextField,
  StyledTypography,
  StyledDialog,
  StyledDialogContent,
} from "../../../StyledUI";

const ChangePasswordSection: React.FC = (props: any) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
  const [err_text, setErrorText] = React.useState<string>("");
  const [passwordOld, setOldPassword] = React.useState<string>("");
  const [passwordNew, setNewPassword] = React.useState<string>("");
  const [passwordVerify, setVerifyPassword] = React.useState<string>("");

  const site = useSite();

  const { t } = useTranslation();
  const title = t("ChangePasswordSection.Title");
  const currentPasswordLabel = t("ChangePasswordSection.CurrentPasswordLabel");
  const newPasswordLabel = t("ChangePasswordSection.NewPasswordLabel");
  const verifyPasswordLabel = t("ChangePasswordSection.VerifyPasswordLabel");
  const saveLabel = t("ChangePasswordSection.SaveLabel");
  const successLabel = t("ChangePasswordSection.SuccessLabel");
  const okLabel = t("ChangePasswordSection.OkLabel");

  const clearForm = () => {
    setOldPassword("");
    setNewPassword("");
    setVerifyPassword("");
  };
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

  const handleClose = () => {
    setErrorText("");
    setOpen(false);
  };

  const handleSuccess = () => {
    handleClose();
    setOpenSuccess(true);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccess(false);
    clearForm();
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
      <StyledTypography variant="body2" className="bottom-margin-2">
        {title}
      </StyledTypography>
      <form name="signInForm" onSubmit={handleSubmit}>
        <StyledTextField
          margin="normal"
          required
          fullWidth
          label={currentPasswordLabel}
          type="password"
          placeholder=""
          name="logonPasswordOld"
          value={passwordOld}
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
          value={passwordNew}
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
          value={passwordVerify}
          onChange={(e) => handleVerifyPasswordChange(e, "logonPasswordVerify")}
        />
        <StyledButton type="submit">{saveLabel}</StyledButton>
      </form>
      <StyledDialog
        open={openSuccess}
        onClose={handleCloseSuccessModal}
        aria-labelledby="change-password-success-dialog">
        <StyledDialogContent>{successLabel}</StyledDialogContent>
        <StyledButton
          variant="text"
          color="secondary"
          onClick={handleCloseSuccessModal}>
          {okLabel}
        </StyledButton>
      </StyledDialog>
    </div>
  );
};

export { ChangePasswordSection };
