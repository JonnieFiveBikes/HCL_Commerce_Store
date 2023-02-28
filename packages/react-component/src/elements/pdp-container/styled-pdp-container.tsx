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
import { StyledPaper } from "../paper";

const StyledPDPContainer = styled(({ ...props }) => <StyledPaper {...props} />)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)} ${theme.spacing(3)};

    .product-name {
      margin-top: ${theme.spacing(2)};
      word-break: break-word;
    }

    .product-seller,
    .product-sku,
    .product-color,
    .product-quantity,
    .product-availability {
      margin: ${theme.spacing(2)} 0 ${theme.spacing(1)};
      font-weight: bold;
    }

    .product-shortDescription {
      margin: ${theme.spacing(1)} 0 ${theme.spacing(2)};
    }

    .product-price-container {
      margin-bottom: ${theme.spacing(2)};
    }

    .textalign {
      display:block;
      width:7em;
      text-align:right;
    }

    .MuiCardHeader-subheader{
      height: 3em;
    }

    .attachment{
      display: inline;
    }

    .product-attachment {
      vertical-align: middle;
      background-color: #F2F2F2;
    }

    .selectType{
      -webkit-appearance: none;
      -moz-appearance: none;
      border:0px;
    }

    input:focus, select:focus, textarea:focus, form:focus, button:focus {
      outline:0;
    }

    .product-price {
      margin-right: ${theme.spacing(2)};
    }

    .strikethrough {
      color: ${theme.palette.text.secondary};
      text-decoration: line-through;
      font-size: 0.9em;
    }

    .product-add-to-cart {
      margin-top: ${theme.spacing(1)};
      margin-bottom: ${theme.spacing(1)};
    }

    .product-imageB2B,
    .product-image {
      text-align: center;
      position: relative;
    }
  `}
`;

export { StyledPDPContainer };
