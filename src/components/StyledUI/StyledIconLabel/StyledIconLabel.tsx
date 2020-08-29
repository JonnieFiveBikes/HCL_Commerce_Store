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
import { StyledGrid, StyledTypography } from "../index";

const StyledIconWithBackground = styled.div`
  ${({ theme }) => `
    position: relative;
    flex: none;
    background-color: ${theme.palette.action.hover};
    width: ${theme.spacing(7)}px;
    height: ${theme.spacing(7)}px;
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
  label: string;
  variant?: string;
}

const StyledIconLabel = styled(
  React.forwardRef<any, StyledIconLabelProps>((props: any, ref: any) => {
    const { icon, label } = props;
    const variant = props.variant ? props.variant : "h5";

    const TextElements = (
      <StyledTypography variant={variant}>{label}</StyledTypography>
    );

    return (
      <StyledGrid
        item
        xs
        container
        spacing={2}
        direction="row"
        alignItems="center"
        ref={ref}>
        <StyledGrid item>
          <StyledIconWithBackground>{icon}</StyledIconWithBackground>
        </StyledGrid>
        <StyledGrid item>{TextElements}</StyledGrid>
      </StyledGrid>
    );
  })
)`
  ${({ theme }) => `

    `}
`;

export default StyledIconLabel;
