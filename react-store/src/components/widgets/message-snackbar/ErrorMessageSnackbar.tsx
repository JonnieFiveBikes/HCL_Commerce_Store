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
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
//Custom libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import MessageSnackbar from "./MesssageSnackbar";
import { useCSRForUser } from "../../../_foundation/hooks/useCSRForUser";
//Redux
import { RESET_ERROR_ACTION } from "../../../redux/actions/error";
import { genericErrorSelector } from "../../../redux/selectors/error";
//UI
import { SnackbarOrigin } from "@material-ui/core";

const useErrorMessageSnackbar = () => {
  const anchorOrigin: SnackbarOrigin = {
    horizontal: "center",
    vertical: "bottom",
  };

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { mySite } = useSite();
  const error: any = useSelector(genericErrorSelector);
  const { handleLockOrderError, isOrderLockError } = useCSRForUser();

  const errorKeys: string[] = [];
  let errorKey = error.errorKey || "";
  const errorCode = error.errorCode;
  let errorParameters = error.errorParameters;
  let errorParameterKey: string | undefined = undefined;

  if (typeof errorParameters === "string") {
    errorParameters = errorParameters.split(",");
  }
  if (!errorParameters) {
    errorParameters = [];
  }

  if (errorCode && errorCode !== errorKey) {
    errorKey = errorKey + "_" + errorCode;
  }

  if (errorParameters.length > 0) {
    //user first item in parameters as part of key
    errorParameterKey = errorKey + "_" + errorParameters[0];
  }
  if (mySite?.isB2B) {
    //get b2b key
    const errorKeyB2B = `error-message.B2B.${errorKey}`;
    if (errorParameterKey) {
      const errorParameterKeyB2B = `error-message.B2B.${errorParameterKey}`;
      if (i18n.exists(errorParameterKeyB2B)) {
        errorKeys.push(errorParameterKeyB2B);
      }
    }
    if (i18n.exists(errorKeyB2B)) {
      errorKeys.push(errorKeyB2B);
    }
  }
  if (errorParameterKey) {
    const _errorParameterKey = `error-message.${errorParameterKey}`;
    if (i18n.exists(_errorParameterKey)) {
      errorKeys.push(_errorParameterKey);
    }
  }
  if (i18n.exists(`error-message.${errorKey}`)) {
    errorKeys.push(`error-message.${errorKey}`);
  }

  let errorMessage = error.errorMessage || error.message;
  if (errorKeys.length > 0) {
    errorMessage = t(errorKeys, { ...errorParameters });
  }

  const handleClose = () => {
    dispatch(RESET_ERROR_ACTION());
  };

  return {
    anchorOrigin,
    handleClose,
    errorMessage,
    error,
    isOrderLockError,
    handleLockOrderError,
  };
};

const ErrorMessageSnackbar = () => {
  const { anchorOrigin, handleClose, errorMessage, error, isOrderLockError, handleLockOrderError } =
    useErrorMessageSnackbar();
  if (isOrderLockError(error)) {
    handleLockOrderError(error);
  }
  return (
    <>
      {!isOrderLockError(error) && (
        <MessageSnackbar
          handleClose={handleClose}
          anchorOrigin={anchorOrigin}
          severity="error"
          message={errorMessage}
          ClickAwayListenerProps={{
            mouseEvent: "onMouseDown",
          }}></MessageSnackbar>
      )}
    </>
  );
};

export default ErrorMessageSnackbar;
