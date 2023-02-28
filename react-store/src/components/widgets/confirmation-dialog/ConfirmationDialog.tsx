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
import { CONFIRMATION_CANCELLED_ACTION, CONFIRMATION_HANDLED_ACTION } from "../../../redux/actions/confirmation";
import { useDispatch, useSelector } from "react-redux";
import { confirmationCommsSelector, confirmationSelector } from "../../../redux/selectors/confirmation";
//UI
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledButton,
  StyledTypography,
  StyledGrid,
} from "@hcl-commerce-store-sdk/react-component";
import { get } from "lodash-es";

function ConfirmationDialog() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { key, messageParameters, title, props, okAction, cancelAction, labels, template } =
    useSelector(confirmationSelector);
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
        open={open}
        {...get(props, "root", {})}>
        <StyledDialogTitle title={t(title)} onClick={handleCancel} {...get(props, "title", {})} />
        <StyledDialogContent {...get(props, "content", {})}>
          {template ? T : <StyledTypography style={{ paddingTop: "16px" }}>{message}</StyledTypography>}
          <StyledDialogActions>
            <StyledGrid container spacing={2} justifyContent="center" alignItems="center">
              <StyledGrid item>
                <StyledButton
                  color="secondary"
                  disabled={comms?.cancelDisabled}
                  onClick={handleCancel}
                  {...get(props, "buttons[0]", {})}>
                  {t(labels ? labels.cancel : "Confirmation.CancelButton")}
                </StyledButton>
              </StyledGrid>
              <StyledGrid item>
                <StyledButton
                  color="primary"
                  disabled={comms?.okDisabled}
                  onClick={handleConfirm}
                  {...get(props, "buttons[1]", {})}>
                  <span>{t(labels ? labels.submit : "Confirmation.SubmitButton")}</span>
                </StyledButton>
              </StyledGrid>
            </StyledGrid>
          </StyledDialogActions>
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
}

export default ConfirmationDialog;
