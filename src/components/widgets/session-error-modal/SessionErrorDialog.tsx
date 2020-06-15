/**
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
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
//Custom libraries
import { HOME } from "../../../constants/routes";
//Redux
import { seessionErrorSelector } from "../../../redux/selectors/error";
import { SESSION_ERROR_LOGIN_REQUESTED_ACTION } from "../../../redux/actions/user";
import {
  RESET_SESSION_ERROR_ACTION,
  CANCEL_SESSION_ERROR_ACTION,
} from "../../../redux/actions/error";
import { logonIdSelector } from "../../../redux/selectors/user";
import { siteSelector } from "../../../redux/selectors/site";
//UI
import {
  StyledButton,
  StyledTextField,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledTypography,
} from "../../StyledUI";

export const SessionErrorDialog = () => {
  const un = useSelector(logonIdSelector);
  const mySite = useSelector(siteSelector);

  const [username, setUsername] = React.useState(un);
  const [password, setPassword] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [logonInputProps, setLogonInputProps] = React.useState<any>({});

  const { t, i18n } = useTranslation();
  const history = useHistory();

  const { errorTitleKey, errorMsgKey, handled, errorMessage } = useSelector(
    seessionErrorSelector
  );
  const dispatch = useDispatch();

  const usernameInput = React.createRef<HTMLInputElement>();

  const handleEntering = () => {
    if (usernameInput.current != null) {
      usernameInput.current.focus();
    }
  };
  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>, type: string) => {
    evt.persist();
    const value: string | null = evt.target.value;
    if (type === "username") {
      setUsername(value || "");
    }
    if (type === "password") {
      setPassword(value || "");
    }
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    dispatch(
      SESSION_ERROR_LOGIN_REQUESTED_ACTION({
        body: {
          logonId: username,
          logonPassword: password,
        },
        skipErrorSnackbar: true,
      })
    );
  };
  const handleCancel = () => {
    setOpen(false);
    dispatch(CANCEL_SESSION_ERROR_ACTION());
  };

  useEffect(() => {
    setUsername(un);
    setOpen(handled === false);
    if (handled === true) {
      dispatch(RESET_SESSION_ERROR_ACTION());
      history.push(HOME);
    }
    if (mySite) {
      if (mySite.isB2B) {
        setLogonInputProps({
          maxLength: 100,
          type: "text",
          label: t(`SignIn.Label.B2B`),
        });
      } else {
        setLogonInputProps({
          maxLength: 100,
          type: "email",
          placeholder: "name@domain.com",
          label: t(`SignIn.Label.Email`),
        });
      }
    }
  }, [handled, dispatch, mySite]);
  if (handled === undefined || handled === null) {
    return <></>;
  } else {
    return (
      <>
        <StyledDialog
          disableBackdropClick
          disableEscapeKeyDown
          onEntering={handleEntering}
          maxWidth="sm"
          open={open}>
          <form onSubmit={handleSubmit} name="signInForm">
            <StyledDialogTitle
              title={t(errorTitleKey)}
              onClickHandler={handleCancel}
            />
            <StyledDialogContent>
              <StyledTypography variant="body1">
                {i18n.exists(errorMsgKey) ? t(errorMsgKey) : errorMessage}
              </StyledTypography>
              <StyledTextField
                name="username"
                onChange={(e) => handleOnChange(e, "username")}
                innerRef={usernameInput}
                value={username}
                required
                margin="normal"
                fullWidth
                inputProps={logonInputProps}
                label={logonInputProps.label}
              />
              <StyledTextField
                label={t("SessionError.Password")}
                type="password"
                onChange={(e) => handleOnChange(e, "password")}
                name="password"
                required
                margin="normal"
                fullWidth
              />
              <StyledDialogActions>
                <StyledButton
                  color="secondary"
                  size="small"
                  onClick={handleCancel}>
                  {t("SessionError.CancelButton")}
                </StyledButton>
                <StyledButton color="primary" size="small" type="submit">
                  {t("SessionError.SubmitButton")}
                </StyledButton>
              </StyledDialogActions>
            </StyledDialogContent>
          </form>
        </StyledDialog>
      </>
    );
  }
};
