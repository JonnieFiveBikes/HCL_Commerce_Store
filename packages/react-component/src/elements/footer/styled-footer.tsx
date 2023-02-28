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
import styled from "@mui/styled-engine-sc";

const StyledFooter = styled("footer")`
  ${({ theme }) => `
  background: ${theme.palette.text.primary};
  color: ${theme.palette.text.disabled};
  margin-top: ${theme.spacing(7)};

  ${theme.breakpoints.down("md")} {
    margin-top: ${theme.spacing(4)};
  }

  .footer-logo {
    padding-bottom: ${theme.spacing(1)};

    img {
      height: ${theme.spacing(3)};
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
      padding-top: ${theme.spacing(0.5)};
    }
  }

  .footer-top {
    padding: ${theme.spacing(5)} 0;

    ${theme.breakpoints.down("md")} {
      padding: ${theme.spacing(3)} 0 ${theme.spacing(2)};
    }
  }

  .footer-bottom {
    border-top: 1px solid #888;
    padding: ${theme.spacing(2)} 0;

    ${theme.breakpoints.down("md")} {
      padding: ${theme.spacing(1)} 0;
    }
  }

  .footer-social-link {
    background: ${theme.palette.text.secondary};
    display: inline-block;
    height: ${theme.spacing(5)};
    width: ${theme.spacing(5)};
    border-radius: 50%;
    margin-right: ${theme.spacing(1)};
    margin-top: ${theme.spacing(1)};
    position: relative;
    color: #ddd;
    opacity: 0.5;

    &:hover {
      opacity: 0.9;
    }

    svg {
      font-size: ${theme.spacing(2)};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      cursor: pointer;
    }
  }
  `}
`;

export { StyledFooter };
