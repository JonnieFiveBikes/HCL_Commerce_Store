/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
import styled from "@mui/styled-engine-sc";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export const StyledTable = styled(Table)`
  ${({ theme }) => `
     text-align: left;
     font-size: 14px;
     background: #FFFFFF;
     border-radius: ${theme.shape.borderRadius}px;
     border-color: ${theme.palette.text.disabled};
     border-collapse: collapse;

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

     &.mini-cart-table, &.order-item-table {
       td {
         vertical-align: middle;
       }
     }

     &.mini-cart-table {
       border: 0;

       td {
        padding: 8px;
       }

       thead {
         display: none;
       }

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
         width: ${theme.spacing(13)};
         height: ${theme.spacing(11)};
         border: 1px solid ${theme.palette.grey[200]};
       }

       .qty-price-section {
         padding-top: ${theme.spacing(2)};
       }
     }

     &.detailPanel {
       thead {
         > tr {
           border: 0;
           text-transform: uppercase;
         }
       }
     }

     @media screen and (max-width: 40em) {
       &.responsiveTable {
         background: none;
         border: 0;

         tbody {
           tr {
              border: 1px solid ${theme.palette.text.disabled};
              padding: .25em;
              margin-bottom: 16px;
              background: none;
           }

           td {
             &:nth-child(odd) {
               background: #fafafa;
             }
           }
         }
       }
     }
   `}
`;

export const StyledThead = styled(Thead)`
  ${({ theme }) => `
     tr {
       border-bottom: 1px solid ${theme.palette.text.disabled};
     }
   `}
`;

export const StyledTbody = styled(Tbody)`
  ${({ theme }) => `
     tr:nth-child(odd) {
       background: #fafafa;
     }
   `}
`;

export const StyledTr = styled(Tr)`
  ${({ theme }) => `
     line-height: 1.25rem;
     vertical-align: baseline;
     @media screen and (max-width: 40em) {
       &.detailPanel {
         display: none;
       }
     }
   `}
`;

export const StyledTh = styled(Th)`
  ${({ theme }) => `
     font-weight: 700;
     padding: ${theme.spacing(1.5)} ${theme.spacing(2)};

     @media screen and (max-width: 40em) {
       &.hideOnMobile {
         display: none;
       }
     }
   `}
`;

export const StyledTd = styled(Td)`
  ${({ theme }) => `
     font-weight: 400;
     word-break: break-word;
     padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
     > div.tdBefore {
       line-height: normal;
     }
     @media screen and (min-width: 40em) {
       > div.tdBefore {
         display: none;
       }
     }
     @media screen and (max-width: 40em) {
       &.hideOnMobile {
         display: none;
       }
     }
   `}
`;
