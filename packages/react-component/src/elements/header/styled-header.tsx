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
import { dimensions } from "../../themes/variables";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const headerHeight = dimensions.header.height.desktop;
const mobileHeaderHeight = dimensions.header.height.mobile;

export const StyledHeaderIcon = styled(AccountCircleIcon)`
  ${({ theme }) => `
    color: ${theme.palette.text.secondary};
    vertical-align: middle;

    &:hover {
      color: ${theme.palette.primary.main};
    }
  `}
`;

const StyledHeader = styled("header")`
  ${({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: 0px 3px 4px 0px ${theme.palette.text.disabled};
  position: relative;
  z-index: 20;

  ${theme.breakpoints.down("md")} {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
  }

  .header-topbarSection {
    height: ${headerHeight}px;
    width: auto;

    ${theme.breakpoints.down("md")} {
      height: ${mobileHeaderHeight}px;
    }
  }

  .welcome-text {
    .MuiTypography-button {
      color: ${theme.palette.text.primary};
    }

    .MuiTypography-root {
      line-height: 1.5;
    }
  }

  .header-actionsButton {
    padding: ${theme.spacing(1)};

    &.header-actionsButton-languageToggle .MuiTypography-body1 {
      line-height: 26px;
    }
  }

  .header-branding {
    a {
      display: block;
      line-height: 1;
    }

    img {
      height: 25px;
    }

    ${theme.breakpoints.down("md")} {
      img {
        height: 20px;
      }
    }

    @media (max-width: 450px) {
      margin-left: 0px;
    }
  }

  .header-links {
    text-align: right;
    ${theme.breakpoints.up("sm")} {
      padding: 0 ${theme.spacing(2)};
    }
  }

  .menu-hamburger {
    background: none;
    border: 0;
    margin: 0;
    padding: 0;

    &:hover {
      color: ${theme.palette.primary.dark};
      cursor: pointer;
    }

    .MuiSvgIcon-root {
      vertical-align: middle;
    }
  }

  .menu-container {
    display: none;

    &.open {
      display: flex;
    }
  }

  .expanded-menu-container{
    background-color: ${theme.palette.primary.main};
    line-height: normal;
    position: relative;
    color: ${theme.palette.text.expandedMenu};
    text-align: left;
    z-index: -1;
    &.hover {
      .MuiBox-root {
        background-color:${theme.palette.background.paper};
      }
    }
  }

  .MuiTypography-body2 {
    display: inline-block;
  }

  #signin_link,
  #myaccount_link,
  #cart_link {
    color: ${theme.palette.text.primary};
    text-decoration: none;

    &:visited {
      color: ${theme.palette.text.primary};
    }

    &:hover {
      color: ${theme.palette.primary.main};

      .MuiSvgIcon-root {
        color: ${theme.palette.primary.main};
      }
    }

    .MuiSvgIcon-root {
      color: ${theme.palette.text.primary};
      vertical-align: middle;
      font-size: 1.3rem;
    }
  }

  .menu-container {
    position: absolute;
    z-index: 3;
    background: white;
    width: 100%;
    margin: 0;
    left: 0;
    border-top: 1px solid ${theme.palette.action.disabledBackground};
    box-shadow: 0px 3px 4px 0px ${theme.palette.text.disabled};
    top: ${headerHeight}px;

    ${theme.breakpoints.down("md")} {
      top: ${mobileHeaderHeight}px;
      width: 500px;
    }
  }

  .header-menu {
    .MuiDrawer-paperAnchorTop {
      margin-top: ${headerHeight}px;
    }
  }
  `}
`;

export { StyledHeader };
