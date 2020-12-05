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
import { dimensions } from "../../../themes/variables";

const searchBarWidth = dimensions.searchBar.width;
const searchBarHeight = dimensions.searchBar.height;
const headerHeight = dimensions.header.height.desktop;
const mobileHeaderHeight = dimensions.header.height.mobile;

const StyledSearchBar = styled.div`
  ${({ theme }) => `
  position: relative;

  .searchBar-results {
    position: absolute;
    top: ${(headerHeight - searchBarHeight) * 0.5 + searchBarHeight}px;
    left: 0;
    width: 100%;
    text-align: left;
    border-radius: ${theme.shape.borderRadius}px;
    background-color: ${theme.palette.background.paper};
    box-shadow: 0px 3px 4px 0px ${theme.palette.text.disabled};
    padding: ${theme.spacing(1)}px 0;
    
    ${theme.breakpoints.down("sm")} {
      top: ${
        (mobileHeaderHeight - searchBarHeight) * 0.5 + mobileHeaderHeight
      }px;
    }

    .MuiListItem-root {
      border-radius: ${theme.shape.borderRadius}px;
      margin-right: ${theme.spacing(1)}px;
      margin-left: ${theme.spacing(1)}px;
      padding-right: ${theme.spacing(1)}px;
      padding-left: ${theme.spacing(1)}px;
    }
  }

  .MuiInputBase-root {
    height: ${searchBarHeight}px;
  }

  .MuiFormControl-root {
    width: ${searchBarWidth}px;
    margin: 0;

    ${theme.breakpoints.down("sm")} {
      width: 100%;
    }
  
    .MuiOutlinedInput-input {
      height: ${searchBarHeight}px;
    }
  }

  .MuiOutlinedInput-root {
    padding-right: 0;
  }

  .MuiInputBase-input {
    padding-right: 0;
    padding-left: 0;
  }

  `}
`;

export default StyledSearchBar;

export const StyledSearchBarButton = styled.button`
  ${({ theme }) => `
    background: none;
    border: none;
    cursor: pointer;
    width: ${theme.spacing(4.5)}px;
    height: ${theme.spacing(4.5)}px;
    border-radius: 50%;

    ${theme.breakpoints.down("sm")} {
      width: ${theme.spacing(4)}px;
      height: ${theme.spacing(4)}px;
    }

    .MuiSvgIcon-root {
      color: ${theme.palette.text.secondary};
      vertical-align: middle;
    }
    
    &:hover {
      .MuiSvgIcon-root {
        color: ${theme.palette.primary.main};
      }
    }

    &.active {
      background-color: ${theme.palette.action.disabledBackground};

      .MuiSvgIcon-root {
        color: ${theme.palette.primary.main};
      }
    }

    &:focus {
      outline: none;
    }
  `}
`;
