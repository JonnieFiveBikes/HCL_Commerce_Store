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
import { Link, useLocation } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
//UI
import { SnackbarOrigin } from "@material-ui/core";
import { StyledSnackbar, StyledAlert } from "../../StyledUI";

interface MessageSnackbarProperty {
  anchorOrigin: SnackbarOrigin;
  handleClose: Function;
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
  const location = useLocation();
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
            <Link to={linkAction.url}>{linkAction.text}</Link>
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
        <StyledAlert
          variant="filled"
          severity={severity}
          onClose={() => {
            onClose();
          }}>
          <MessageToDisplay />
        </StyledAlert>
      </StyledSnackbar>
    </>
  );
};

export default MessageSnackbar;
