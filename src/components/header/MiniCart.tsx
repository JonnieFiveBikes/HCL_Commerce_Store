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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
//Custom libraries
import { CART } from "../../constants/routes";
//Redux
import { numItemsSelector } from "../../redux/selectors/order";
//UI
import { StyledTypography, StyledMiniCart } from "../StyledUI";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

/**
 * MiniCart component
 * displays number of cart items icon
 * @param props
 */
const MiniCart: React.FC = (props: any) => {
  const numItems = useSelector(numItemsSelector);
  const { t } = useTranslation();
  //addToCart action upon success shall call fetchCart action, and then the mini cart will be updated
  return (
    <StyledTypography variant="caption">
      <Link
        to={CART}
        id="cart_link"
        className={
          "tool-button tool-button-cart " + (numItems === 0 ? "" : "show-badge")
        }
        data-cart-length={numItems}>
        <StyledMiniCart>
          <ShoppingCartIcon />
          {numItems}
          <span> {t("MiniCart.Items")}</span>
        </StyledMiniCart>
      </Link>
    </StyledTypography>
  );
};

export default MiniCart;
