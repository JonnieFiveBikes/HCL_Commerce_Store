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
import { StyledPaper } from "../paper";
import { StyledLink } from "../link";
import { StyledTooltip } from "../tooltip";

const StyledAccountLink = styled(({ ...props }) => <StyledLink {...props} />)`
  ${({ theme }) => `
    color: ${theme.palette.text.primary};
    display: block;

    &:hover {
      h6, p {
        color: ${theme.palette.primary.dark};
      }
    }
  `}
`;

const StyledLinkBoxWrapper = styled(({ ...props }) => <StyledPaper {...props} />)`
  ${({ theme }) => `
  display: flex;
  padding: ${theme.spacing(2)};

  &.disabled {
    h6, p {
      color: ${theme.palette.text.disabled};
    }

    .MuiSvgIcon-root {
      color: ${theme.palette.text.disabled};
    }
  }
  `}
`;

const StyledLinkIcon = styled("div")`
  ${({ theme }) => `
    position: relative;
    flex: none;
    background-color: ${theme.palette.action.hover};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
    border-radius: 50%;
    text-align: center;
    margin-right: ${theme.spacing(2)};

    .MuiSvgIcon-root {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      color: ${theme.palette.primary.main};
    }
  `}
`;

interface LinkBoxProps {
  title: string;
  disabledTitle: string;
  description: string;
  url: string;
  icon: any;
  disabled?: boolean;
}

export function StyledLinkBox({ title, disabledTitle, description, disabled, icon, url }: LinkBoxProps) {
  const LinkTextElements = (
    <>
      <StyledTypography variant="subtitle1">{title}</StyledTypography>
      <StyledTypography variant="body1">{description}</StyledTypography>
    </>
  );

  const LinkContent = (
    <StyledLinkBoxWrapper className={disabled ? "disabled" : ""}>
      <StyledLinkIcon>{icon}</StyledLinkIcon>
      <div>{LinkTextElements}</div>
    </StyledLinkBoxWrapper>
  );

  return disabled ? (
    <StyledTooltip title={disabledTitle}>
      <div>{LinkContent}</div>
    </StyledTooltip>
  ) : (
    <StyledAccountLink to={url} title={description}>
      {LinkContent}
    </StyledAccountLink>
  );
}
