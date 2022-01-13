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
import {
  confirmationCommsSelector,
  confirmationSelector,
} from "../../../redux/selectors/confirmation";
//UI
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledButton,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";

function ConfirmationDialog() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    key,
    messageParameters,
    title,
    okAction,
    cancelAction,
    labels,
    template,
  } = useSelector(confirmationSelector);
  const comms = useSelector(confirmationCommsSelector);
  const open = title ? true : false;
  const message = template ? null : t(key, messageParameters);
  const confirmButton = React.createRef<HTMLInputElement>();
  const handleEntering = () => {
    if (confirmButton.current != null) {
      confirmButton.current.focus();
    }
  };
  const handleCancel = () => {
    if (cancelAction) {
      cancelAction({ ...comms });
    }
    dispatch(CONFIRMATION_CANCELLED_ACTION({}));
  };
  const handleConfirm = () => {
    if (okAction) {
      okAction({ ...comms });
    }
    dispatch(CONFIRMATION_HANDLED_ACTION({}));
  };
  const T = template;
  return (
    <>
      <StyledDialog
        TransitionProps={{ onEntering: handleEntering }}
        disableEscapeKeyDown
        maxWidth="sm"
        onClose={(e, r) => r !== "backdropClick" && handleCancel()}
        open={open}>
        <StyledDialogTitle title={t(title)} onClick={handleCancel} />
        <StyledDialogContent>
          {template ? (
            T
          ) : (
            <StyledTypography variant="body1">{message}</StyledTypography>
          )}
          <StyledDialogActions>
            <StyledButton
              color="secondary"
              disabled={comms?.cancelDisabled}
              onClick={handleCancel}>
              {t(labels ? labels.cancel : "Confirmation.CancelButton")}
            </StyledButton>
            <StyledButton
              color="primary"
              disabled={comms?.okDisabled}
              onClick={handleConfirm}>
              <span ref={confirmButton}>
                {t(labels ? labels.submit : "Confirmation.SubmitButton")}
              </span>
            </StyledButton>
          </StyledDialogActions>
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
}

export default ConfirmationDialog;
