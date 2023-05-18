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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
//Custom libraries
import MessageSnackbar from "./MesssageSnackbar";
//Redux
import { successSelector } from "../../../redux/selectors/success";
import { SuccessMessageReducerState } from "../../../redux/reducers/reducerStateInterface";
import { RESET_SUCCESS_MESSAGE_ACTION } from "../../../redux/actions/success";
//UI
import { SnackbarOrigin } from "@mui/material";
import { forUserIdSelector } from "../../../redux/selectors/user";

const useMessageSnackbar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const success: SuccessMessageReducerState = useSelector(successSelector);

  const forUserId = useSelector(forUserIdSelector);
  const anchorOrigin: SnackbarOrigin = {
    horizontal: "center",
    vertical: forUserId ? "top" : "bottom",
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

  // in CSR mode, snackbars are shown at the top of the iframe -- scroll there as necessary
  useEffect(() => {
    if (message && forUserId) {
      // useEffect is already async -- no need to use setTimeout
      window["topOrSelf"] && window["topOrSelf"].scrollTo(0, 0);
    }
  }, [message, forUserId]);

  return {
    anchorOrigin,
    handleClose,
    message,
    linkAction,
  };
};

const SuccessMessageSnackbar = () => {
  const { anchorOrigin, handleClose, message, linkAction } = useMessageSnackbar();
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
