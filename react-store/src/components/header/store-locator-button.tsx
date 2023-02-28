/**
 * ==================================================
 *  Licensed Materials - Property of HCL Technologies
 *
 *  HCL Commerce
 *
 *  (C) Copyright HCL Technologies Limited 2022
 *
 * ==================================================
 */
//Standard libraries
import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTranslation } from "react-i18next";
import { Hidden } from "@mui/material";
//HCL librarie
import {
  StyledButton,
  StyledHeaderActions,
  StyledLink,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
//Foundation
import { useStoreLocatorValue } from "../../_foundation/context/store-locator-context";
import { useSite } from "../../_foundation/hooks/useSite";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import { SELECTED_STORE, STORELOCATORACTIONS } from "../../_foundation/constants/common";
import { STORE_LOCATOR } from "../../constants/routes";
import { ORDER_METHOD_RESET_ACTION, ORDER_METHOD_SET_PICKUP_ACTION } from "../../redux/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { shipInfosSelector } from "../../redux/selectors/order";
import { SHIPMODE } from "../../constants/order";

export const StoreLocatorButton = () => {
  const { mySite } = useSite();
  const { storeLocator, dispatch } = useStoreLocatorValue();
  const { t } = useTranslation();
  const iDispatch = useDispatch();

  const usableShipInfos: any = useSelector(shipInfosSelector);

  const canPickup = React.useMemo<boolean>(() => {
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

  React.useEffect(() => {
    if (!storeLocator.selectedStore || !canPickup) {
      iDispatch(ORDER_METHOD_RESET_ACTION(null));
    } else {
      iDispatch(ORDER_METHOD_SET_PICKUP_ACTION(null));
    }
  }, [iDispatch, storeLocator.selectedStore, canPickup]);

  React.useEffect(() => {
    const selectedStore = localStorageUtil.get(SELECTED_STORE);
    dispatch({
      type: STORELOCATORACTIONS.UPDATE_SELECTION_SUCCESS,
      payload: { selectedStore },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);
  return (
    <StyledLink to={STORE_LOCATOR}>
      <StyledButton
        testId="store-locator-invoker-button"
        className="header-actionsButton"
        variant="text"
        color="secondary">
        <StyledHeaderActions>
          <LocationOnOutlinedIcon />
          <Hidden smDown>
            {storeLocator.selectedStore?.storeName ? (
              <StyledTypography>{storeLocator.selectedStore?.storeName}</StyledTypography>
            ) : (
              <StyledTypography>{t("StoreLocator.locateStore")}</StyledTypography>
            )}
          </Hidden>
        </StyledHeaderActions>
      </StyledButton>
    </StyledLink>
  );
};
