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

function StyledIcon({
  icon,
  iconSize,
  backgroundSize,
  iconColor,
  backgroundColor,
}: any) {
  const StyledIconWrapper = styled(({ ...props }) => <div {...props} />)`
    ${({ theme }) => `
      position: relative;
      display: inline-block;
      height: ${backgroundSize}px;
      width: ${backgroundSize}px;
      background-color: ${backgroundColor};
      border-radius: 50%;
      color: ${iconColor ? iconColor : theme.palette.primary.dark};
      opacity: 0.9;
      
      &:hover {
        opacity: 1;
      }

      .MuiSvgIcon {
        font-size: ${iconSize}px;
      }
    `}
  `;

  return (
    <StyledIconWrapper className="StyledIcon-root">{icon}</StyledIconWrapper>
  );
}

export default StyledIcon;
