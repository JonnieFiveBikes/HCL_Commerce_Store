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
import { useNavigate } from "react-router";
//Custom libraries
import { CART, CHECKOUT, IP_ORDER_DETAILS, SIGNIN } from "../../constants/routes";
import { MINICART_CONFIGS } from "../../configs/order";
import { PRIVATE_ORDER_TYPE } from "../../constants/order";
//Redux
import { numItemsSelector, cartSelector, orderItemsSelector } from "../../redux/selectors/order";
import { forUserIdSelector, userIdSelector, loginStatusSelector } from "../../redux/selectors/user";
//UI
import { ClickAwayListener } from "@mui/material";
import { StyledMiniCartContent } from "../StyledUI";
import { useSite } from "../../_foundation/hooks/useSite";

interface MiniCartPopperContentProps {
  handleClose: (e?: any) => void;
}

/**
 * MiniCartPopperContent component
 * displays mini cart popper contents
 * @param props
 */
const MiniCartPopperContent: React.FC<MiniCartPopperContentProps> = (props: any) => {
  const { handleClose } = props;
  const numItems = useSelector(numItemsSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const cart = useSelector(cartSelector);
  const orderItems = useSelector(orderItemsSelector);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mySite } = useSite();
  const isB2B = mySite?.isB2B;
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;

  const handleCartOnClick = () => {
    if (!isB2B) {
      handleClose();
      navigate(CART);
    } else {
      if (!cart || userId === cart.buyerId) {
        handleClose();
        navigate(CART);
      } else {
        handleClose();
        navigate(`${IP_ORDER_DETAILS}/${cart.orderId}`);
      }
    }
  };

  const handleCheckoutOnClick = () => {
    handleClose();
    if (loginStatus) {
      navigate(CHECKOUT);
    } else {
      navigate(SIGNIN, { state: { checkoutFlow: true } });
    }
  };

  const initOrderTotalSummary = () => {
    let subtotal: number | null = null;
    let subtotalCurrency: string = "";
    if (cart) {
      try {
        subtotal = cart.totalProductPrice ? parseFloat(cart.totalProductPrice) : null;
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
  const miniCartItems = useMemo(() => orderItems.slice(MINICART_CONFIGS.maxItemsToShow * -1).reverse(), [orderItems]);
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <StyledMiniCartContent
        title={
          !isB2B
            ? t("MiniCart.Title")
            : !cart
            ? t("MiniCart.MyOrder")
            : cart.orderDescription
            ? cart.orderDescription
            : cart.orderId
        }
        orderType={
          !cart
            ? t("MiniCart.PrivateOrder")
            : cart.orderTypeCode === PRIVATE_ORDER_TYPE
            ? t("MiniCart.PrivateOrder")
            : userId === cart.buyerId
            ? t("MiniCart.SharedOrderAdmin")
            : t("MiniCart.SharedOrderConributor")
        }
        orderItems={miniCartItems}
        subtotalLabel={t("MiniCart.Subtotal", { count: numItems })}
        subtotal={subtotal}
        subtotalCurrency={subtotalCurrency}
        emptyCartMsg={t("MiniCart.Empty")}
        cartLinkLabel={
          !isB2B
            ? t("MiniCart.Actions.Cart")
            : !cart
            ? t("MiniCart.Actions.Cart")
            : userId === cart.buyerId
            ? t("MiniCart.Actions.Cart")
            : t("MiniCart.Actions.ViewOrderDetails")
        }
        checkoutLinkLabel={t("MiniCart.Actions.CheckOut")}
        handleCartOnClick={handleCartOnClick}
        handleCheckoutOnClick={handleCheckoutOnClick}
        handleClose={handleClose}
        isOrderOwner={!cart ? true : userId === cart.buyerId}
        isB2B={isB2B}
      />
    </ClickAwayListener>
  );
};

export default MiniCartPopperContent;
