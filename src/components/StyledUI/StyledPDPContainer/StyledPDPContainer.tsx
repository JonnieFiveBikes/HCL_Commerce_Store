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
import { StyledPaper } from "../../StyledUI";

const StyledPDPContainer = styled(({ ...props }) => <StyledPaper {...props} />)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(4)}px;

    .MuiTypography-body2 {
      margin: ${theme.spacing(2)}px 0 ${theme.spacing(0.5)}px;
    }

    .product-name {
      margin-top: ${theme.spacing(2)}px;
    }

    .product-sku {
      margin: ${theme.spacing(2)}px 0 ${theme.spacing(1)}px;
    }

    .product-shortDescription {
      margin: ${theme.spacing(1)}px 0 ${theme.spacing(2)}px;
    }

    .product-price-container {
      margin-bottom: ${theme.spacing(2)}px;
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
      margin: ${theme.spacing(2)}px 0;
    }

    .product-image {
      text-align: center;
    }
  `}
`;

export default StyledPDPContainer;
