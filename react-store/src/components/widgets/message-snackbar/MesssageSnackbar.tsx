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
import { useLocation } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
//UI
import { SnackbarOrigin } from "@mui/material";
import { StyledSnackbar, StyledAlert, StyledLink } from "@hcl-commerce-store-sdk/react-component";

interface MessageSnackbarProperty {
  anchorOrigin: SnackbarOrigin;
  handleClose: () => void;
  message: string | null;
  severity: "success" | "info" | "warning" | "error" | undefined;
  linkAction?: { url: string; text: string };
  autoHideDuration?: number;
  ClickAwayListenerProps?: any;
}
const MessageSnackbar = ({
  anchorOrigin,
  handleClose,
  message,
  severity,
  linkAction,
  autoHideDuration,
  ClickAwayListenerProps,
}: MessageSnackbarProperty) => {
  const location: any = useLocation();
  const open = !!message;
  let clickAway = {};
  if (ClickAwayListenerProps) {
    clickAway = { ClickAwayListenerProps };
  }
  const MessageToDisplay = () => {
    return (
      <>
        {linkAction === null || linkAction === undefined ? (
          message && HTMLReactParser(message)
        ) : (
          <span>
            {message && HTMLReactParser(message)}
            <StyledLink to={linkAction.url}>{linkAction.text}</StyledLink>
          </span>
        )}
      </>
    );
  };
  const onClose = () => {
    if (open) {
      handleClose();
    }
  };

  React.useEffect(() => {
    //close on location change.
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <>
      <StyledSnackbar
        open={open}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        autoHideDuration={autoHideDuration}
        {...clickAway}>
        <StyledAlert variant="filled" severity={severity} onClose={onClose}>
          <MessageToDisplay />
        </StyledAlert>
      </StyledSnackbar>
    </>
  );
};

export default MessageSnackbar;
