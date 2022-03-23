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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
//Custom libraries
import MiniCartPopperContent from "./MiniCartPopperContent";
//Redux
import { numItemsSelector } from "../../redux/selectors/order";
//UI
import {
  StyledAccountPopper,
  StyledButton,
  StyledTypography,
  StyledHeaderActions,
} from "@hcl-commerce-store-sdk/react-component";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useWinDimsInEM } from "../../_foundation/hooks/use-win-dims-in-em";
import { S_MOBILE_W, XS_MOBILE_W } from "../../constants/common";

interface MiniCartProps {
  id: string;
  open: boolean;
  handleClick: (e?: any) => void;
  handleClose: (e?: any) => void;
}

/**
 * MiniCart component
 * displays number of cart items icon
 * @param props
 */
const MiniCart = React.forwardRef<HTMLButtonElement | null, MiniCartProps>((props: any, ref: any) => {
  const { id, open, handleClick, handleClose } = props;
  const { t } = useTranslation();
  const numItems = useSelector(numItemsSelector);
  const [arrowRef, setArrowRef] = useState<any>(null);
  const { w } = useWinDimsInEM();
  const xSmall = XS_MOBILE_W;
  const small = S_MOBILE_W;
  const offset = w <= xSmall ? { offset: "-48" } : undefined;

  return (
    <>
      <StyledButton
        testId="header-mini-cart-button"
        ref={ref}
        className="header-actionsButton"
        variant="text"
        color="secondary"
        onClick={handleClick}>
        <StyledHeaderActions>
          <ShoppingCartIcon />
          <StyledTypography variant="body1" component="p">
            {t("MiniCart.Items", { count: numItems })}
          </StyledTypography>
        </StyledHeaderActions>
      </StyledButton>

      <StyledAccountPopper
        id={id}
        open={open}
        anchorEl={ref?.current}
        onClose={handleClose}
        placement={w <= xSmall ? "bottom-start" : w <= small ? "bottom" : "bottom-end"}
        modifiers={{
          offset,
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: false,
            boundariesElement: "scrollParent",
          },
          hide: {
            enabled: false,
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
        className="mini-cart-popper">
        <span className="arrow" ref={setArrowRef} />
        <MiniCartPopperContent handleClose={handleClose} />
      </StyledAccountPopper>
    </>
  );
});

export default MiniCart;
