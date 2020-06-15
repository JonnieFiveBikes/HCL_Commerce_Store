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
import React, { useEffect } from "react";
import styled from "styled-components";
import * as NumericInput from "react-numeric-input";
import { useDebouncedCallback } from "use-debounce";
import { dimensions } from "../../../themes/variables";
import { StyledTypography, StyledCircularProgress } from "../";

const quantitySpinnerWidth = 5;

function NumberInputWrapper(props: any) {
  const {
    value,
    stopLoadingOnUpdateValue,
    onChange,
    className,
    mobile,
    disabled,
    debounceTiming,
    error,
    ...remainingProps
  } = props;

  const [loading, setLoading] = React.useState(false);
  const timing = debounceTiming ? debounceTiming : 0;
  const [debouncedCallback] = useDebouncedCallback((value) => {
    setLoading(true);
    onChange(value);
  }, timing);

  const callback = (_value) => {
    if (debounceTiming) {
      debouncedCallback(_value);
    } else {
      setLoading(true);
      onChange(_value);
    }
  };

  const classList = `StyledNumberInput 
    ${className} ${mobile ? " mobile" : ""} ${disabled ? " disabled" : ""} ${
    error ? " error" : ""
  }`;

  useEffect(() => {
    setLoading(false);
  }, [stopLoadingOnUpdateValue]);

  return loading && stopLoadingOnUpdateValue ? (
    <StyledCircularProgress />
  ) : (
    <StyledTypography variant="body2" className={classList}>
      <NumericInput
        {...remainingProps}
        mobile={mobile}
        onChange={(_value) => {
          callback(_value);
        }}
        value={value}
        style={false}
      />
    </StyledTypography>
  );
}

const StyledNumberInput = styled(NumberInputWrapper)`
  ${({ theme }) => `
  display: inline-block;
  min-width: 80px;

  &:hover:not(.disabled) {
    input:not(.error) {
      border-color: ${theme.palette.text.secondary};
    }   
  }

  &.error {
      input {
        border-color: ${theme.palette.text.highlight};
        outline: none;

        &:hover:not(:disabled) {
          border-color: ${theme.palette.text.highlight};
        }
      
        &:focus:not(:disabled) {
          border-color: ${theme.palette.text.highlight};
          outline: none;
        }        
      }
  }   

  .react-numeric-input {
    display: block;
    position: relative;

    &:focus {
      outline: none;
    }
  }

  input {
    border-radius: ${theme.shape.borderRadius}px;
    border: 2px solid ${theme.palette.text.disabled};
    padding: 0 ${theme.spacing(2)}px;
    font-weight: 500;
    color: ${theme.palette.text.primary};
    height: ${dimensions.inputFields.height}px;
    font-family: inherit;
    text-align: left;
    width: 100%;

    &:hover:not(:disabled) {
      border-color: ${theme.palette.text.secondary};
    }
  
    &:focus:not(:disabled) {
      border-color: ${theme.palette.primary.main};
      outline: none;
    }
  }

  b {
    font-family: inherit;
    cursor: pointer;
    box-shadow: none;
    border: 0;
    border-radius: 0;
    transition: all ${theme.transitions.duration.standard}ms ease-in-out;
    display: inline-block;
    position: absolute;

    i {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  &:not(.disabled) {
    b:hover {
      background: ${theme.palette.primary.main};
    }
  }

  &:not(.mobile) {
    b {
        height: ${dimensions.inputFields.height / 2 - 2}px;
        width: ${theme.spacing(3)}px;
        right: 2px;
        background: rgba(0,0,0,0.05);
        
        &:nth-child(2) {
          top: 2px;
        }
        
        &:nth-child(3) {
          bottom: 2px;

          i {
            border-width: 0.6ex 0.6ex 0px;
            border-color: ${
              theme.palette.text.secondary
            } transparent transparent;
          }
        }

        i {
          width: 0px;
          height: 0px;
          border-width: 0px 0.6ex 0.6ex;
          border-color: transparent transparent ${theme.palette.text.secondary};
          border-style: solid;
          margin: -0.3ex 0px 0px -0.56ex;
        }

        &:hover {
          i {
            border-color: transparent transparent white;
          }
          
          &:nth-child(3) i {
            border-color: white transparent transparent;
          }
        }
    }
  } 

  &.disabled b {
    cursor: default;
  }
  
  &.mobile {
    width: 160px;

    input {
      padding: 0 ${theme.spacing(quantitySpinnerWidth + 1)}px;
      text-align: center;
    }

    b {
      width: ${theme.spacing(quantitySpinnerWidth)}px;
      height: auto;
      background: transparent;
      border-radius: 2px;
      border: 0;
      border-left: 1px solid ${theme.palette.text.disabled};
      top: 2px;
      bottom: 2px;
      right: 2px;
      
      &:last-child {
        left: 2px;
        right: unset;
        border-left: 0;
        border-right: 1px solid ${theme.palette.text.disabled};
      }

      i {
        background: ${theme.palette.primary.main};
        width: 10px;
        height: 2px;
        margin: -1px 0px 0px -5px;
        
        &:nth-child(2) {
          width: 2px;
          height: 10px;
          margin: -5px 0px 0px -1px;
        }
      }
    }

    &:not(.disabled) b:hover {
      i {
        background: white;
      }
    }
  }
  `}
`;

export default StyledNumberInput;
