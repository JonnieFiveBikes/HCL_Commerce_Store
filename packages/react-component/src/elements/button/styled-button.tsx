/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021, 2022
 *
 *==================================================
 */
import React, { useCallback, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import MatButton, { ButtonProps } from "@material-ui/core/Button";
import { debounce } from "lodash-es";

type StyledButtonProps = Omit<
  JSX.IntrinsicElements["a"] &
    JSX.IntrinsicElements["button"] &
    ButtonProps & {
      testId: string;
      component?: any;
      to?: any;
      onClick?: any;
    },
  "css"
>;
const CustomMatButton = React.forwardRef((props: StyledButtonProps, ref: any) => {
  const { variant, className = "", color, testId, onClick, disabled, ...re } = props;
  const dataTestId = testId ? { "data-testid": `button-${testId}` } : {};
  const [iDisabled, setIDisabled] = useState<boolean>(false);

  const debounced = useMemo(
    () =>
      //debounce to prevent double click
      debounce(() => {
        setIDisabled(false);
      }, 2000),
    [setIDisabled]
  );

  const iClassName = useMemo(() => {
    return iDisabled ? `${className} Mui-disabled` : className;
  }, [iDisabled, className]);

  const onClickWrapper = useCallback(
    (event: any) => {
      if (!iDisabled) {
        setIDisabled(true);
        onClick && onClick(event);
        debounced();
      }
    },
    [onClick, iDisabled, debounced]
  );

  useEffect(() => {
    setIDisabled(false);
    //React virtual dom try to reuse the component,
    //if the component was reused, the unmount event/initialize is not happenning.
    //to fix the iDisabled state issue, we can
    //1. set it to false upon testId changes.
    //2. add `key` prop to the component(so that React know this is complete different component)
    //here we are using #1 approach.
  }, [testId]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MatButton
      {...dataTestId}
      {...re}
      ref={ref}
      variant={variant || "contained"}
      color={color || "primary"}
      className={iClassName}
      disabled={disabled}
      onClick={onClickWrapper}
    />
  );
});

const StyledButton = styled(CustomMatButton)`
  ${({ theme }) => `
    font-weight: 500;

    &.MuiButton-containedPrimary.Mui-disabled {
      background: ${theme.palette.primary.dark};
      color: ${theme.palette.white};
      opacity: 0.5;
    }

    &.accordion-show-expanded {
      display: none;
    }

    .MuiAccordionSummary-expandIcon.Mui-expanded & {
      &.accordion-show-summary {
        display: none;
      }

      &.accordion-show-expanded {
        display:flex;
        transform: rotate(180deg);
      }
    }

    &.MuiButtonBase-root {
      border-radius: ${theme.shape.borderRadius}px;
      padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
      letter-spacing: 0.02rem;

      &:not(.MuiButton-text) {
        border-radius: ${theme.shape.borderRadius}px;
        padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
        letter-spacing: 0.01rem;
        box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.005);

        &:hover {
          box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.0025);
        }
      }
    }

    &.secondary-color-text-button {
      color: ${theme.palette.text.secondary};
    }

    &.alert-color-text-button {
      color: ${theme.palette.text.alert};
    }

    &.MuiButton-text {
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0;
      box-shadow: none;
      min-width: unset;
      &:not(.Mui-disabled):not(.secondary-color-text-button):not(.alert-color-text-button) {
        color: ${theme.palette.primary.main};
      }
      background: none;
    }

    &.MuiButton-containedPrimary {
      border: 2px solid ${theme.palette.primary.main};

      &:hover {
        border: 2px solid ${theme.palette.primary.dark};
      }

      &.Mui-disabled {
        background: ${theme.palette.primary.dark};
        border: 2px solid ${theme.palette.primary.dark};
        color: white;
        opacity: 0.5;
      }
    }

    &.MuiButton-outlinedPrimary {
      &.Mui-disabled {
        border: 1px solid ${theme.palette.primary.main};
        color: ${theme.palette.primary.main};
        opacity: 0.5;
      }
    }

    &.MuiButton-containedSecondary {
      background: white;
      color: ${theme.palette.primary.dark};
      border: 2px solid ${theme.palette.primary.main};
      padding: ${theme.spacing(1) - 2}px ${theme.spacing(2) - 2}px;

      &:hover {
        border-color: ${theme.palette.primary.dark};
        color: ${theme.palette.primary.dark};
        background: ${theme.palette.grey[100]};
      }

      &.Mui-disabled {
        opacity: 0.5;
        border-color: ${theme.palette.grey[500]};
        color: ${theme.palette.grey[500]};
      }
    }

    &.accordion-show-expanded {
      display: none;
    }

    .MuiAccordionSummary-expandIcon.Mui-expanded &{
      &.accordion-show-summary {
        display: none;
      }

      &.accordion-show-expanded {
        display:flex;
        transform: rotate(180deg);
      }
    }

    &.border-solid-bold  {
      font-weight: bold;
      border: 1.35px solid;
    }

    &.confirm-action-button,
    &.cancel-action-button {
      background-color: ${theme.palette.background.paper};
      font-weight: 600;
    }

    &.confirm-action-button {
      border: ${theme.spacing(0.25)}px solid ${theme.palette.border.alert};
      color: ${theme.palette.text.alert};
    }

    &.cancel-action-button {
      border: ${theme.spacing(0.25)}px solid;
    }

    &.login-process-button {
      width: ${theme.spacing(31)}px;
      @media (max-width: 320px) {
        width: ${theme.spacing(25.5)}px;
      }
    }
    `}
`;

export { StyledButton };
