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
import MessageSnackbar from "./MesssageSnackbar";
//Redux
import { successSelector } from "../../../redux/selectors/success";
import { SuccessMessageReducerState } from "../../../redux/reducers/reducerStateInterface";
import { RESET_SUCCESS_MESSAGE_ACTION } from "../../../redux/actions/success";
//UI
import { SnackbarOrigin } from "@material-ui/core";

const useMessageSnackbar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const success: SuccessMessageReducerState = useSelector(successSelector);

  const anchorOrigin: SnackbarOrigin = {
    horizontal: "center",
    vertical: "bottom",
  };
  let message = null;
  if (success.key) {
    message = t(success.key, success.messageParameters);
  }
  let linkAction: any = null;
  if (success.link) {
    linkAction = {
      url: success.link.url,
      text: t(success.link.textKey),
    };
  }

  const handleClose = () => {
    dispatch(RESET_SUCCESS_MESSAGE_ACTION());
  };

  return {
    anchorOrigin,
    handleClose,
    message,
    linkAction,
  };
};

const SuccessMessageSnackbar = () => {
  const {
    anchorOrigin,
    handleClose,
    message,
    linkAction,
  } = useMessageSnackbar();
  const link = linkAction !== null ? { linkAction: linkAction } : {};
  return (
    <>
      <MessageSnackbar
        handleClose={handleClose}
        anchorOrigin={anchorOrigin}
        severity="success"
        message={message}
        {...link}></MessageSnackbar>
    </>
  );
};

export default SuccessMessageSnackbar;
