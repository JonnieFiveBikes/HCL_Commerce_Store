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
//Standard libraries
import React from "react";
//Custom libraries
import { OrderItemTable } from "../../widgets/order-item-table";
import FormattedPriceDisplay from "../../widgets/formatted-price-display";
//UI
import { Divider } from "@material-ui/core";
import {
  StyledBox,
  StyledButton,
  StyledGrid,
  StyledPaper,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";

interface MiniCartContentProps {
  title: string;
  orderItems: any[];
  subtotalLabel: string;
  subtotal: number | null;
  subtotalCurrency: string;
  emptyCartMsg: string;
  cartLinkLabel: string;
  handleCartOnClick: Function;
  handleClose: Function;
}

const StyledMiniCartContent = React.forwardRef<any, MiniCartContentProps>(
  (props: any, ref: any) => {
    const {
      title,
      orderItems,
      subtotalLabel,
      subtotal,
      subtotalCurrency,
      emptyCartMsg,
      cartLinkLabel,
      handleCartOnClick,
      handleClose,
    } = props;

    return (
      <StyledPaper
        ref={ref}
        className="mini-cart-container"
        data-testid="mini-cart-popper">
        <StyledTypography
          variant="h6"
          className="horizontal-padding-2 vertical-padding-2">
          {title}
        </StyledTypography>
        <Divider className="heading" />
        {orderItems.length > 0 ? (
          <>
            <StyledBox className="horizontal-padding-2">
              <OrderItemTable
                data={orderItems}
                miniCartView={true}
                handleMiniCartClose={handleClose}
              />
            </StyledBox>
            <Divider />
            <StyledGrid
              container
              className="horizontal-padding-2 vertical-padding-2">
              <StyledGrid item xs={7}>
                <StyledTypography variant="body1">
                  {subtotalLabel}
                </StyledTypography>
              </StyledGrid>
              <StyledGrid item xs={5}>
                <StyledTypography variant="body1" align="right">
                  <FormattedPriceDisplay
                    min={subtotal}
                    currency={subtotalCurrency}
                  />
                </StyledTypography>
              </StyledGrid>
            </StyledGrid>
          </>
        ) : (
          <StyledTypography
            align="center"
            className="horizontal-padding-2 vertical-padding-10">
            {emptyCartMsg}
          </StyledTypography>
        )}
        <Divider />
        <StyledBox
          className="horizontal-padding-2 vertical-padding-1"
          align="center">
          <StyledButton color="secondary" onClick={handleCartOnClick}>
            {cartLinkLabel}
          </StyledButton>
        </StyledBox>
      </StyledPaper>
    );
  }
);

export default StyledMiniCartContent;
