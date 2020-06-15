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
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  StyledTypography,
  StyledPaper,
  StyledLink,
  StyledTooltip,
} from "../../StyledUI";

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

const StyledLinkBoxWrapper = styled(({ ...props }) => (
  <StyledPaper {...props} />
))`
  ${({ theme }) => `
  display: flex;
  padding: ${theme.spacing(2)}px;

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

const StyledLinkIcon = styled.div`
  ${({ theme }) => `
    position: relative;
    flex: none;
    background-color: ${theme.palette.action.hover};
    width: ${theme.spacing(7)}px;
    height: ${theme.spacing(7)}px;
    border-radius: 50%;
    text-align: center;
    margin-right: ${theme.spacing(2)}px;

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
  description: string;
  url: string;
  icon: any;
  disabled?: boolean;
}

export default function StyledLinkBox({
  title,
  description,
  disabled,
  icon,
  url,
}: LinkBoxProps) {
  const { t } = useTranslation();

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
    <StyledTooltip title={`${t("AccountLinks.DisabledMessage")}`}>
      <div>{LinkContent}</div>
    </StyledTooltip>
  ) : (
    <StyledAccountLink to={url} title={description}>
      {LinkContent}
    </StyledAccountLink>
  );
}
