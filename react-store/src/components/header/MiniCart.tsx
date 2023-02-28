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
import { MCW_NUMBER, ZERO_NUMBER } from "../../constants/common";
//Redux
import { numItemsSelector } from "../../redux/selectors/order";
//UI
import {
  StyledAccountPopper,
  StyledButton,
  StyledTypography,
  StyledHeaderActions,
} from "@hcl-commerce-store-sdk/react-component";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

  // keep mini-cart placement always as "bottom" and just adjust the offset from the left depending on where the anchor is
  const calcOffset = () => {
    const mcw = MCW_NUMBER;
    const left = ref?.current?.offsetLeft;
    const rc = left < mcw ? mcw - left : ZERO_NUMBER;
    return [rc, ZERO_NUMBER];
  };
  const offset = calcOffset();

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
        placement="bottom"
        modifiers={[
          {
            name: "offset",
            options: {
              offset,
            },
          },
          { name: "flip", enabled: false },
          { name: "preventOverflow", enabled: false },
          { name: "hide", enabled: false },
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}
        className="mini-cart-popper">
        <span className="arrow" ref={setArrowRef} />
        <MiniCartPopperContent handleClose={handleClose} />
      </StyledAccountPopper>
    </>
  );
});

export default MiniCart;
