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
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
//Custom libraries
import { CART } from "../../constants/routes";
//Redux
import {
  numItemsSelector,
  cartSelector,
  miniCartItemsSelector,
} from "../../redux/selectors/order";
//UI
import { ClickAwayListener } from "@material-ui/core";
import { StyledMiniCartContent, StyledPaper } from "../StyledUI";

interface MiniCartPopperContentProps {
  handleClose: Function;
}

/**
 * MiniCartPopperContent component
 * displays mini cart popper contents
 * @param props
 */
const MiniCartPopperContent: React.FC<MiniCartPopperContentProps> = (
  props: any
) => {
  const { handleClose } = props;
  const numItems = useSelector(numItemsSelector);
  const cart = useSelector(cartSelector);
  const miniCartItems = useSelector(miniCartItemsSelector);
  const { t } = useTranslation();
  const history = useHistory();

  const handleCartOnClick = () => {
    handleClose();
    history.push(CART);
  };

  const initOrderTotalSummary = () => {
    let subtotal: number | null = null;
    let subtotalCurrency: string = "";
    if (cart) {
      try {
        subtotal = cart.totalProductPrice
          ? parseFloat(cart.totalProductPrice)
          : null;
        subtotalCurrency = cart.totalProductPriceCurrency;
      } catch (e) {
        console.log("Could not parse cart totals");
      }
    }
    return {
      subtotal,
      subtotalCurrency,
    };
  };

  const { subtotal, subtotalCurrency } = useMemo(initOrderTotalSummary, [cart]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <StyledMiniCartContent
        title={t("MiniCart.Title")}
        orderItems={miniCartItems}
        subtotalLabel={t("MiniCart.Subtotal", { count: numItems })}
        subtotal={subtotal}
        subtotalCurrency={subtotalCurrency}
        emptyCartMsg={t("MiniCart.Empty")}
        cartLinkLabel={t("MiniCart.Actions.Cart")}
        handleCartOnClick={handleCartOnClick}
        handleClose={handleClose}
      />
    </ClickAwayListener>
  );
};

export default MiniCartPopperContent;
