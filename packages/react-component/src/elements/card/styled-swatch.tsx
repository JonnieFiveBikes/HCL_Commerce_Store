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
import styled from "@mui/styled-engine-sc";
import CheckIcon from "@mui/icons-material/Check";

const StyledSwatchButton = styled("button")`
  ${({ theme }) => `
    padding: 0;
    display: inline-block;
    width: ${theme.spacing(3)};
    height: ${theme.spacing(3)};
    margin-right: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
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
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
    }

    &.selected {
      border-color: ${theme.palette.primary.main};
      position: relative;
      box-shadow: ${theme.shadows[4]};

      svg {
        color: white;
        font-size: ${theme.spacing(2)};
      }

      &.product-swatch-medium,
      &.medium {
        svg {
          font-size: ${theme.spacing(2.5)};
        }
      }
    }

    &:last-child {
      margin-right: 0;
    }
  `}
`;

function StyledSwatch(props: {
  className?: string;
  selected?: boolean;
  size?: string;

  [extraPrps: string]: any;
}) {
  const { className, selected, size } = props;
  const classList = `${className ? className : ""} ${selected ? "selected" : ""} ${size ? size : ""}`;
  return (
    <StyledSwatchButton {...props} className={classList}>
      {selected && <CheckIcon className="full-center" />}
    </StyledSwatchButton>
  );
}

export { StyledSwatch };
