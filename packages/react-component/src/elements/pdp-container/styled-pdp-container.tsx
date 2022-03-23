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
import { StyledPaper } from "../paper";

const StyledPDPContainer = styled(({ ...props }) => <StyledPaper {...props} />)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px ${theme.spacing(3)}px;

    .product-name {
      margin-top: ${theme.spacing(2)}px;
      word-break: break-word;
    }

    .product-seller,
    .product-sku,
    .product-color,
    .product-quantity,
    .product-availability {
      margin: ${theme.spacing(2)}px 0 ${theme.spacing(1)}px;
      font-weight: bold;
    }

    .product-shortDescription {
      margin: ${theme.spacing(1)}px 0 ${theme.spacing(2)}px;
    }

    .product-price-container {
      margin-bottom: ${theme.spacing(2)}px;
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
      margin-right: ${theme.spacing(2)}px;
    }

    .strikethrough {
      color: ${theme.palette.text.secondary};
      text-decoration: line-through;
      font-size: 0.9em;
    }

    .product-add-to-cart {
      margin-top: ${theme.spacing(1)}px;
      margin-bottom: ${theme.spacing(1)}px;
    }

    .product-imageB2B,
    .product-image {
      text-align: center;
      position: relative;
    }
  `}
`;

export { StyledPDPContainer };
