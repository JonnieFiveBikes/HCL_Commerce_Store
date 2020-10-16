/*
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
import React, { forwardRef } from "react";

import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";

import MaterialTable from "material-table";
import { Icons } from "material-table";

export const StyledTableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const MaterialTableWrapper = (props: any) => (
  <div className={props.className}>
    <MaterialTable {...props} icons={StyledTableIcons} />
  </div>
);

const StyledTable = styled(MaterialTableWrapper)`
  ${({ theme }) => `
    .MuiPaper-root {
      padding: ${theme.spacing(2)}px 0 0;
      border-radius: ${theme.shape.borderRadius}px;
      box-shadow: ${theme.shadows[1]};
    }

    .MuiButtonBase-root {
      svg {
        font-size: ${theme.spacing(2)}px;
        color: ${theme.palette.text.secondary};
      }

      &:hover {
        svg {
          color: ${theme.palette.primary.main};
        }
      }
    }

    .MuiTable-root {
      table-layout: auto !important;
    }

    .MuiTableCell-root {
      border-bottom: 1px solid ${theme.palette.grey[200]};
    }

    .MuiTableBody-root {
      .MuiTableRow-root:last-child {
        .MuiTableCell-root {
          border-bottom: 0;
        }
      }
    }

    .MuiTableCell-head {
      padding: 0 0 ${theme.spacing(2)}px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      color: ${theme.palette.text.secondary};
      background: transparent;

      &:first-child {
        padding-left: ${theme.spacing(2)}px;
      }
    }

    .MuiTableCell-body {
      font-size: 0.9rem;
      font-weight: 400;

      &:not(:first-child) {
        padding-left: 0;
      }
    }

    .MuiToolbar-regular {
      margin-bottom: 24px;
      min-height: 0;
      height: 36px;

      .MuiInput-underline {
        ${theme.breakpoints.down("sm")} {
          width: 200px;
        }
      }

      &.MuiTablePagination-toolbar {
        height: ${theme.spacing(7)}px;
        margin: 0;
        border-top: 1px solid ${theme.palette.grey[200]};

        .MuiTypography-root {
          margin: 0 ${theme.spacing(0.75)}px;
        }
        .MuiIconButton-root {
          padding: ${theme.spacing(0.75)}px;

          &:not(:disabled) {
            &:hover {
              background: ${theme.palette.grey[200]};
            }
          }
        }
      }
    }

    .MuiAvatar-root {
      margin: 0 auto;
      width: 60px;
      height: 60px;
      border-radius: 0;

      img {
        max-height: 100%;
        object-fit: contain;
      }
    }

    .table-filter-button {
      position: absolute;
      padding: 0 16px;
      line-height: 36px;
      z-index: 1;
    }

    &.mini-cart-table {
      max-width: 350px;

      .MuiPaper-root {
        box-shadow: none;
        padding-top: 0px;
      }

      .MuiTableRow-root {
        td:first-child{
          padding-left: 0px;
          padding-right: 0px;
        }
        td:last-child{
          padding-right: 0px;
        }
      }

      .MuiAvatar-root {
        margin-left: 0;
        width: ${theme.spacing(13)}px;
        height: ${theme.spacing(11)}px;
        border: 1px solid ${theme.palette.grey[200]};
      }

      .qty-price-section {
        padding-top: ${theme.spacing(2)}px;
      }
    }

    &.order-item-table {
      tr:empty {
        display: none;
      }
    }
    &.review-order {
      .MuiPaper-root {
        box-shadow: none;
        border: 1px solid ${theme.palette.divider};
      }
    }
  `}
`;

export default StyledTable;
