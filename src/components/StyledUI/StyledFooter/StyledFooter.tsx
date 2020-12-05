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
import styled from "styled-components";

const StyledFooter = styled.footer`
  ${({ theme }) => `
  background: ${theme.palette.text.primary};
  color: ${theme.palette.text.disabled};
  margin-top: ${theme.spacing(7)}px;

  ${theme.breakpoints.down("sm")} {
    margin-top: ${theme.spacing(4)}px;
  }

  .footer-logo {
    padding-bottom: ${theme.spacing(1)}px;

    img {
      height: ${theme.spacing(3)}px;
    }
  }

  .footer-nav,
  .contact-us {
    line-height: 2;

    a {    
      color: ${theme.palette.text.disabled};
text-decoration: none;
      &:hover {
        color: ${theme.palette.text.disabled};
      }
      &:visited {
        color: ${theme.palette.text.disabled};
      }
    }

    div {
      padding-top: ${theme.spacing(0.5)}px;
    }
  }

  .footer-top {
    padding: ${theme.spacing(5)}px 0;

    ${theme.breakpoints.down("sm")} {
      padding: ${theme.spacing(3)}px 0 ${theme.spacing(2)}px;
    }
  }

  .footer-bottom {
    border-top: 1px solid #888;
    padding: ${theme.spacing(2)}px 0;

    ${theme.breakpoints.down("sm")} {
      padding: ${theme.spacing(1)}px 0;
    }
  }

  .footer-social-link {
    background: ${theme.palette.text.secondary};
    display: inline-block;
    height: ${theme.spacing(5)}px;
    width: ${theme.spacing(5)}px;
    border-radius: 50%;
    margin-right: ${theme.spacing(1)}px;
    margin-top: ${theme.spacing(1)}px;
    position: relative;
    color: #ddd;
    opacity: 0.5;

    &:hover {
      opacity: 0.9;
    }

    svg {
      font-size: ${theme.spacing(2)}px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      cursor: pointer;
    }
  }
  `}
`;

export default StyledFooter;
