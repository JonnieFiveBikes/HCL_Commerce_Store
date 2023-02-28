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
import { StyledTypography } from "../typography";
import { StyledBox } from "../box/styled-box";

const StyledIconWithBackground = styled("div")`
  ${({ theme }) => `
    position: relative;
    flex: none;
    background-color: ${theme.palette.action.hover};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
    border-radius: 50%;
    text-align: center;

    .MuiSvgIcon-root {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      color: ${theme.palette.primary.main};
    }
  `}
`;

interface StyledIconLabelProps {
  icon: any;
  label: any;
  variant?: string;
}

const StyledIconLabel = styled(
  React.forwardRef<any, StyledIconLabelProps>((props: any, ref: any) => {
    const { icon, label } = props;
    const variant = props.variant ? props.variant : "h5";
    const isLabelString = typeof label === "string" || label instanceof String;

    const TextElements = isLabelString ? <StyledTypography variant={variant}>{label}</StyledTypography> : label;

    return (
      <StyledBox display="flex" flexDirection="row" alignItems="center" flexWrap="wrap" ref={ref}>
        <StyledBox pr={2}>
          <StyledIconWithBackground>{icon}</StyledIconWithBackground>
        </StyledBox>
        <StyledBox pr={2} py={1}>
          {TextElements}
        </StyledBox>
      </StyledBox>
    );
  })
)`
  ${({ theme }) => `

    `}
`;

export { StyledIconLabel };
