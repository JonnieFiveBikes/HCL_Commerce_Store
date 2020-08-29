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
} from "../StyledUI";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

interface MiniCartProps {
  id: string;
  open: boolean;
  handleClick: Function;
  handleClose: Function;
}

/**
 * MiniCart component
 * displays number of cart items icon
 * @param props
 */
const MiniCart = React.forwardRef<HTMLButtonElement | null, MiniCartProps>(
  (props: any, ref: any) => {
    const { id, open, handleClick, handleClose } = props;
    const { t } = useTranslation();
    const numItems = useSelector(numItemsSelector);
    const [arrowRef, setArrowRef] = useState<any>(null);

    return (
      <>
        <StyledButton
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
          anchorEl={ref.current}
          onClose={handleClose}
          placement="bottom-end"
          modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: false,
              boundariesElement: "scrollParent",
            },
            hide: {
              enabled: true,
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
  }
);

export default MiniCart;
