/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
//Redux
import { orderMethodIsPickupSelector, shipInfosSelector } from "../../../redux/selectors/order";
import * as orderActions from "../../../redux/actions/order";
//UI
import {
  StyledGrid,
  StyledTypography,
  StyledPaper,
  StyledToggleButton,
  StyledToggleButtonGroup,
  StyledAlert,
} from "@hcl-commerce-store-sdk/react-component";
//Custom libraries
import { DELIVERY, PICKUP } from "../../../constants/order";
import { useNavigate } from "react-router";
import { CHECKOUT_SHIPPING, CHECKOUT_PICKUP_STORE } from "../../../constants/routes";
import { useMediaQuery, useTheme } from "@mui/material";
import { SHIPMODE } from "../../../constants/order";

const OrderMethod: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const orderMethodIsPickup = useSelector(orderMethodIsPickupSelector);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const handleAlignment = (_event, newAlignment) => {
    if (newAlignment === PICKUP) {
      dispatch(orderActions.ORDER_METHOD_SET_PICKUP_ACTION(null));
      navigate(CHECKOUT_PICKUP_STORE);
    } else {
      dispatch(orderActions.ORDER_METHOD_RESET_ACTION(null));
      navigate(CHECKOUT_SHIPPING);
    }
  };
  const alignment = useMemo(() => (orderMethodIsPickup ? PICKUP : DELIVERY), [orderMethodIsPickup]);
  const usableShipInfos: any = useSelector(shipInfosSelector);
  const activatePickup = useMemo(() => {
    const items: any[] = usableShipInfos?.orderItem;
    //all items in cart need to be able pickup in store.
    return (
      !items ||
      items.every(
        (e) =>
          !e.usableShippingMode ||
          (e.usableShippingMode as any[]).some((m) => m.shipModeCode === SHIPMODE.shipModeCode.PickUp)
      )
    );
  }, [usableShipInfos]);

  return (
    <StyledPaper className="vertical-margin-4">
      <StyledGrid container alignItems="center" spacing={2} justifyContent="center" className="vertical-margin-5">
        <StyledGrid item xs={12}>
          <StyledTypography variant="h4" className="text-align-center horizontal-padding-1">
            {t("OrderMethod.Message")}
          </StyledTypography>
        </StyledGrid>
        <StyledGrid item>
          <StyledToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            size="large"
            orientation={isMobile ? "vertical" : "horizontal"}>
            <StyledToggleButton
              data-testid="order-method-delivery"
              className={orderMethodIsPickup ? "" : "pointer-event-none"}
              value={DELIVERY}>
              {t("OrderMethod.Delivery")}
            </StyledToggleButton>
            <StyledToggleButton
              disabled={!activatePickup}
              data-testid="order-method-pickup"
              className={orderMethodIsPickup ? "pointer-event-none" : ""}
              value={PICKUP}>
              {t("OrderMethod.Pickup")}
            </StyledToggleButton>
          </StyledToggleButtonGroup>
          {activatePickup ? null : (
            <StyledAlert className="vertical-margin-1" severity="warning">
              {t("Checkout.PickupNotAvailable")}
            </StyledAlert>
          )}
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
};

export default OrderMethod;
