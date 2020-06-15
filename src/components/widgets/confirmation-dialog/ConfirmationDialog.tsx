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
import React from "react";
import { useTranslation } from "react-i18next";
//Redux
import {
  CONFIRMATION_CANCELLED_ACTION,
  CONFIRMATION_HANDLED_ACTION,
} from "../../../redux/actions/confirmation";
import { useDispatch, useSelector } from "react-redux";
import { confirmationSelector } from "../../../redux/selectors/confirmation";
//UI
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledButton,
  StyledTypography,
} from "../../StyledUI";

function ConfirmationDialog() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { key, messageParameters, title, okAction, cancelAction } = useSelector(
    confirmationSelector
  );
  const open = title ? true : false;
  const message = t(key, messageParameters);
  const confirmButton = React.createRef<HTMLInputElement>();
  const handleEntering = () => {
    if (confirmButton.current != null) {
      confirmButton.current.focus();
    }
  };
  const handleCancel = () => {
    if (cancelAction) {
      cancelAction();
    }
    dispatch(CONFIRMATION_CANCELLED_ACTION({}));
  };
  const handleConfirm = () => {
    if (okAction) {
      okAction();
    }
    dispatch(CONFIRMATION_HANDLED_ACTION({}));
  };
  return (
    <>
      <StyledDialog
        disableBackdropClick
        disableEscapeKeyDown
        onEntering={handleEntering}
        maxWidth="sm"
        open={open}>
        <StyledDialogTitle title={t(title)} onClick={handleCancel} />
        <StyledDialogContent>
          <StyledTypography variant="body1">{t(message)}</StyledTypography>
          <StyledDialogActions>
            <StyledButton color="secondary" onClick={handleCancel}>
              {t("Confirmation.CancelButton")}
            </StyledButton>
            <StyledButton color="primary" onClick={handleConfirm}>
              <span ref={confirmButton}>{t("Confirmation.SubmitButton")}</span>
            </StyledButton>
          </StyledDialogActions>
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
}

export default ConfirmationDialog;
