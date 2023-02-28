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
import { Divider } from "@mui/material";
import {
  StyledBox,
  StyledButton,
  StyledGrid,
  StyledPaper,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";

interface MiniCartContentProps {
  title: string;
  orderType: string;
  orderItems: any[];
  subtotalLabel: string;
  subtotal: number | null;
  subtotalCurrency: string;
  emptyCartMsg: string;
  cartLinkLabel: string;
  checkoutLinkLabel: string;
  handleCartOnClick: (e?: any) => void;
  handleCheckoutOnClick: (e?: any) => void;
  handleClose: (e?: any) => void;
  isOrderOwner: boolean;
  isB2B: boolean;
}

const StyledMiniCartContent = React.forwardRef<any, MiniCartContentProps>((props: any, ref: any) => {
  const {
    title,
    orderType,
    orderItems,
    subtotalLabel,
    subtotal,
    subtotalCurrency,
    emptyCartMsg,
    cartLinkLabel,
    checkoutLinkLabel,
    handleCartOnClick,
    handleCheckoutOnClick,
    handleClose,
    isOrderOwner,
    isB2B,
  } = props;

  return (
    <StyledPaper ref={ref} className="mini-cart-container" data-testid="mini-cart-popper">
      {!isB2B ? (
        <StyledTypography variant="h6" className="horizontal-padding-2 top-padding-2">
          {title}
        </StyledTypography>
      ) : (
        <>
          <StyledTypography
            variant="h6"
            style={{ overflowWrap: "break-word" }}
            className="horizontal-padding-2 top-padding-2">
            {title}
          </StyledTypography>
          <StyledTypography variant="body1" className="horizontal-padding-2 bottom-padding-2">
            {orderType}
          </StyledTypography>
        </>
      )}
      <Divider className="heading" />
      {orderItems.length > 0 ? (
        <>
          <StyledBox>
            <OrderItemTable data={orderItems} preShip={true} miniCartView={true} handleMiniCartClose={handleClose} />
          </StyledBox>
          <Divider />
          <StyledGrid container className="horizontal-padding-2 vertical-padding-2">
            <StyledGrid item xs={7}>
              <StyledTypography variant="body1">{subtotalLabel}</StyledTypography>
            </StyledGrid>
            <StyledGrid item xs={5}>
              <StyledTypography variant="body1" align="right">
                <FormattedPriceDisplay min={subtotal} currency={subtotalCurrency} />
              </StyledTypography>
            </StyledGrid>
          </StyledGrid>
        </>
      ) : (
        <StyledTypography align="center" className="horizontal-padding-2 vertical-padding-10">
          {emptyCartMsg}
        </StyledTypography>
      )}
      <Divider />
      <StyledBox className="horizontal-padding-2 vertical-padding-1" textAlign="center">
        {isB2B && !isOrderOwner ? (
          <StyledButton testId="handle-cart-on-click" color="secondary" onClick={handleCartOnClick}>
            {cartLinkLabel}
          </StyledButton>
        ) : (
          <>
            <StyledButton
              testId="handle-cart-on-click"
              color="secondary"
              className="right-margin-1"
              onClick={handleCartOnClick}>
              {cartLinkLabel}
            </StyledButton>
            <StyledButton
              testId="handle-checkout-on-click"
              color="primary"
              disabled={!orderItems || orderItems.length <= 0}
              onClick={handleCheckoutOnClick}>
              {checkoutLinkLabel}
            </StyledButton>
          </>
        )}
      </StyledBox>
    </StyledPaper>
  );
});

export default StyledMiniCartContent;
