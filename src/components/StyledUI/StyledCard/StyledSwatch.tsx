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
import React from "react";
import styled from "styled-components";
import CheckIcon from "@material-ui/icons/Check";

const StyledSwatchButton = styled.button`
  ${({ theme }) => `
    padding: 0;
    display: inline-block;
    width: ${theme.spacing(3)}px;
    height: ${theme.spacing(3)}px;
    margin-right: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(1)}px;
    border-radius: 50%;
    border: 2px solid white;
    overflow: hidden;
    box-shadow: ${theme.shadows[3]};
    border-radius: 50%;
    background-repeat: repeat;
    cursor: pointer;
    outline: none;
    transition: border-color 300ms ease-in;

    &.product-swatch-medium,
    &.medium {
      width: ${theme.spacing(4)}px;
      height: ${theme.spacing(4)}px;
    }

    &.selected {
      border-color: ${theme.palette.primary.main};
      position: relative;
      box-shadow: ${theme.shadows[4]};
      
      svg {
        color: white;
        font-size: ${theme.spacing(2)}px;
      }

      &.product-swatch-medium,
      &.medium {
        svg {
          font-size: ${theme.spacing(2.5)}px;
        }
      }
    }

    &:last-child {
      margin-right: 0;
    }
  `}
`;

function StyledSwatch(props) {
  const { className, selected, size } = props;
  let classList = `${className ? className : ""} ${
    selected ? "selected" : ""
  } ${size ? size : ""}`;
  return (
    <StyledSwatchButton {...props} className={classList}>
      {selected && <CheckIcon className="full-center" />}
    </StyledSwatchButton>
  );
}

export default StyledSwatch;
