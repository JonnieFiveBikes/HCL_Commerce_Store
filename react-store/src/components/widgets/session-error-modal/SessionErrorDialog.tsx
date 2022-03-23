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
import React, { useEffect, ChangeEvent, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Custom libraries
//Redux
import { sessionErrorSelector } from "../../../redux/selectors/error";
import { SESSION_ERROR_LOGIN_REQUESTED_ACTION } from "../../../redux/actions/user";
import {
  RESET_SESSION_ERROR_ACTION,
  CANCEL_SESSION_ERROR_ACTION,
  CANCEL_REMEMBER_ME_SESSION_ERROR_ACTION,
} from "../../../redux/actions/error";
import {
  loginStatusSelector,
  logonIdSelector,
  userInitStatusSelector,
  forUserIdSelector,
  rememberMeSelector,
} from "../../../redux/selectors/user";
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
} from "@hcl-commerce-store-sdk/react-component";
import { useCSRForUser } from "../../../_foundation/hooks/useCSRForUser";
import { HOME } from "../../../constants/routes";

export const SessionErrorDialog = () => {
  const un = useSelector(logonIdSelector);
  const forUserId = useSelector(forUserIdSelector);
  const mySite = useSelector(siteSelector);
  const formRef = useRef<HTMLFormElement>(null);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const [logonInputProps, setLogonInputProps] = React.useState<any>({});

  const { t, i18n } = useTranslation();

  const { errorTitleKey, errorMsgKey, handled, errorMessage } = useSelector(sessionErrorSelector);
  const widgetName = getDisplayName(SessionErrorDialog);
  const dispatch = useDispatch();

  const loginStatus = useSelector(loginStatusSelector);
  const userInitStatus = useSelector(userInitStatusSelector);
  const rememberMe = useSelector(rememberMeSelector);

  const { handleForUserSessionError } = useCSRForUser();

  const usernameInput = React.createRef<HTMLInputElement>();

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];
  const navigate = useNavigate();

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

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
    setDisabled(!formRef.current || !formRef.current.checkValidity());
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
        ...payloadBase,
      })
    );
  };
  const handleCancel = useCallback(() => {
    setOpen(false);
    const payload = {
      widget: widgetName,
    };
    if (rememberMe) {
      navigate(HOME);
      dispatch(CANCEL_REMEMBER_ME_SESSION_ERROR_ACTION(payload));
    } else {
      dispatch(CANCEL_SESSION_ERROR_ACTION(payload));
    }
  }, [dispatch, navigate, rememberMe, widgetName]);

  useEffect(() => {
    if (userInitStatus && !loginStatus && handled === false) {
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus, userInitStatus, handled]);

  useEffect(() => {
    setOpen(handled === false);
    if (handled === true) {
      dispatch(RESET_SESSION_ERROR_ACTION());
      navigate(0);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handled, dispatch, mySite]);

  useEffect(() => {
    setUsername(un);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [un]);

  useEffect(() => {
    setDisabled(!formRef.current || !formRef.current.checkValidity());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef.current]);

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (handled === undefined || handled === null || !loginStatus) {
    return <></>;
  } else if (forUserId) {
    handleForUserSessionError(errorMsgKey);
    return <></>;
  } else {
    return (
      <>
        <StyledDialog disableBackdropClick disableEscapeKeyDown onEntering={handleEntering} maxWidth="sm" open={open}>
          <form onSubmit={handleSubmit} name="signInForm" noValidate ref={formRef}>
            <StyledDialogTitle title={t(errorTitleKey)} onClickHandler={handleCancel} />
            <StyledDialogContent>
              <StyledTypography variant="body1">
                {errorMsgKey && i18n.exists(errorMsgKey) ? t(errorMsgKey) : errorMessage}
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
                <StyledButton testId="session-error-cancel" color="secondary" size="small" onClick={handleCancel}>
                  {t("SessionError.CancelButton")}
                </StyledButton>
                <StyledButton
                  testId="session-error-submit"
                  color="primary"
                  size="small"
                  type="submit"
                  disabled={disabled}>
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
