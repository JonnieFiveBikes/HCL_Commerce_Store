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
//Standard libraries
import React from "react";
import { Link } from "react-router-dom";
import { CustomTable } from "../../components";
//UI
import { StyledButton, StyledGrid } from "../../elements";

type SkuListWidgetProps = {
  productDetails: any;
  [extraProps: string]: any;
};

/**
 * B2B SKU table content display component
 * @description Displays product information ,prize ,quantity ,detailed info for each sku.
 * ` @prop { any } productDetails` The product details object has following properties:
 * ` @property { any } productPartNumber (required)` The productPartNumber of product in string.
 * ` @property { object } translation (required)`  A object which holds multiple string values for transation purpose .
 * ` @property { any[] } tableHeaderData (required)` contains State data for header part of table.
 * ` @property { any[] } tableBodyData (required)` contains State data for table body .
 * ` @property { any[] } tableDetailHeaderData (required)` contains state data for table details header .
 * ` @property { any } loginNotRequired (required)` flag indicate whether login is required or not.
 * ` @property { Function } addToCart (required)`function for Adding the selected product and its quantities to the shopping cart
 * ` @property { boolean } disabledButtonFlag (required)` flag for disabled button.
 * ` @property { string } SIGNIN (required)` Sign In is string for path .
 */
export const SkuListWidget: React.FC<SkuListWidgetProps> = ({ productDetails, ...props }) => {
  const {
    productPartNumber,
    translation,
    loginNotRequired,
    addToCart,
    disabledButtonFlag,
    SIGNIN,
    tableData,
    isSharedOrder,
    addToRLButton,
    isB2B,
  } = productDetails;
  const key = !loginNotRequired
    ? "productDetailSignIn"
    : isSharedOrder
    ? "productDetailaddToSharedOrder"
    : "productDetailaddToCurrentOrder";

  return tableData?.data?.length > 0 ? (
    <>
      <CustomTable {...tableData} />
      <StyledGrid container item xs={12} spacing={1} justifyContent="flex-end" alignItems="center">
        <StyledGrid item>
          <StyledButton
            testId={`product_add_to_cart_${productPartNumber}`}
            color="primary"
            size="small"
            className="top-margin-1"
            style={{ float: "right" }}
            id={`product_add_to_cart_${productPartNumber}`}
            disabled={disabledButtonFlag}
            {...(loginNotRequired ? { onClick: addToCart } : { component: Link, to: SIGNIN })}>
            {translation[key]}
          </StyledButton>
        </StyledGrid>
        {isB2B && loginNotRequired ? (
          <StyledGrid item xs={12} sm="auto">
            {addToRLButton}
          </StyledGrid>
        ) : null}
      </StyledGrid>
    </>
  ) : null;
};
