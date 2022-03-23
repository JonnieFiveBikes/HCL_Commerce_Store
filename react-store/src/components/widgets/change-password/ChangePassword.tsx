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
import React, { useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { OK } from "http-status-codes";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import personService from "../../../_foundation/apis/transaction/person.service";
import { useSite } from "../../../_foundation/hooks/useSite";
//Redux
import { forUserIdSelector } from "../../../redux/selectors/user";
//Custom libraries
import { EMPTY_STRING } from "../../../constants/common";
//UI
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledButton,
  StyledTextField,
} from "@hcl-commerce-store-sdk/react-component";

const ChangePassword: React.FC = (props: any) => {
  const widgetName = getDisplayName(ChangePassword);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
  const [passwordOld, setOldPassword] = React.useState<string>("");
  const [passwordNew, setNewPassword] = React.useState<string>("");
  const [passwordVerify, setVerifyPassword] = React.useState<string>("");

  const { mySite: site } = useSite();

  const { t } = useTranslation();
  const title = t("ChangePassword.Title");
  const currentPasswordLabel = t("ChangePassword.CurrentPasswordLabel");
  const newPasswordLabel = t("ChangePassword.NewPasswordLabel");
  const verifyPasswordLabel = t("ChangePassword.VerifyPasswordLabel");
  const saveLabel = t("ChangePassword.SaveLabel");
  const cancelLabel = t("ChangePassword.CancelLabel");
  const successLabel = t("ChangePassword.SuccessLabel");
  const forUserId = useSelector(forUserIdSelector);

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const handleOldPasswordChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const val: string | null = evt.target.value;
    setOldPassword(val);
  };

  const handleNewPasswordChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const val: string | null = evt.target.value;
    setNewPassword(val);
  };

  const handleVerifyPasswordChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const val: string | null = evt.target.value;
    setVerifyPassword(val);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOldPassword("");
    setVerifyPassword("");
    setNewPassword("");
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
      ...payloadBase,
    };
    personService.updatePerson(parameters).then((res) => {
      if (res.status === OK) {
        handleSuccess();
      }
    });
  };
  const canContinue = () => {
    if (
      passwordOld.trim() !== EMPTY_STRING &&
      passwordNew.trim() !== EMPTY_STRING &&
      passwordVerify.trim() !== EMPTY_STRING
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <StyledButton
        testId="change-password-dialog-open"
        size="small"
        color="secondary"
        onClick={handleClickOpen}
        disabled={forUserId}>
        {title}
      </StyledButton>
      <StyledDialog open={open} onClose={handleClose} aria-labelledby="change-password-dialog">
        <StyledDialogTitle title={title} onClickHandler={handleClose} />
        <StyledDialogContent>
          <form name="signInForm" noValidate onSubmit={handleSubmit}>
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
              onChange={(e) => handleVerifyPasswordChange(e, "logonPasswordVerify")}
            />
            <StyledDialogActions>
              <StyledButton
                testId="change-password-dialog-submit"
                color="primary"
                type="submit"
                disabled={!canContinue()}>
                {saveLabel}
              </StyledButton>
              <StyledButton
                testId="change-password-dialog-cancel"
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
        <StyledDialogTitle title={title} onClickHandler={handleCloseSuccessModal} />
        <StyledDialogContent className="bottom-margin-1 left-margin-1 right-margin-1 top-margin-1">
          {successLabel}
        </StyledDialogContent>
      </StyledDialog>
    </div>
  );
};

export { ChangePassword };
