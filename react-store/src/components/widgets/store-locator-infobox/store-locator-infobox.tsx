/**
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
import React from "react";
import HTMLReactParser from "html-react-parser";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getDistance } from "geolib";
//HCL libraries
import { StyledButton, StyledGrid, StyledPaper, StyledTypography } from "@hcl-commerce-store-sdk/react-component";
import { MarkerIcon } from "@hcl-commerce-store-sdk/react-component";
//Foundation
import { KILOMETERS, STORELOCATORACTIONS } from "../../../_foundation/constants/common";
import { useStoreLocatorValue } from "../../../_foundation/context/store-locator-context";

export interface StoreLocatorInfoBoxProps {
  locator: any;
  isHidden: string;
  closeInfoBox: any;
  index: number;
  currentLocation: any;
  searchTerm: string;
  getDirection: any;
  showDirection: boolean;
  expand: boolean;
  noDirectionPath: boolean;
}

export const StoreLocatorInfoBox: React.FC<StoreLocatorInfoBoxProps> = (props) => {
  const {
    locator,
    isHidden,
    closeInfoBox,
    index,
    currentLocation,
    searchTerm,
    getDirection,
    showDirection,
    expand,
    noDirectionPath,
  } = props;

  const { dispatch, storeLocator } = useStoreLocatorValue();
  const { t } = useTranslation();

  const store = locator?.storeList[index];
  const storeName = store?.storeName;
  const address = store?.storeFullAddress;
  const storeHours = store?.attributes?.find((attribute) => attribute.name === "StoreHours");

  const setMyStore = () => {
    dispatch({
      type: STORELOCATORACTIONS.UPDATE_SELECTION_SUCCESS,
      payload: { selectedStore: store },
    });
  };

  return (
    <StyledPaper style={{ marginTop: "-4px", display: isHidden }}>
      <StyledGrid container spacing={2} justifyContent="center" alignItems="flex-start" className="vertical-padding-2">
        <StyledGrid item container xs={1} justifyContent="center">
          <MarkerIcon label={String(index + 1)} />
        </StyledGrid>
        <StyledGrid item container xs={7} justifyContent="flex-start" alignItems="stretch" spacing={1}>
          <StyledGrid item xs={12}>
            {storeName ? (
              <>
                <StyledTypography variant="h6">
                  {storeName}
                  <StyledTypography variant="caption" className="left-margin-2">
                    {getDistance(searchTerm ? locator.center : currentLocation, store?.coordinates, 100) / 1000 +
                      KILOMETERS}
                  </StyledTypography>
                </StyledTypography>
              </>
            ) : null}
          </StyledGrid>
          <StyledGrid item xs={12}>
            {address ? <StyledTypography variant="body1">{address}</StyledTypography> : null}
          </StyledGrid>
          {expand && (
            <>
              <StyledGrid item xs={12}>
                <StyledButton
                  className={showDirection ? "alert-color-text-button" : ""}
                  testId="store-locator-info-box-get-directions"
                  variant="text"
                  onClick={getDirection}>
                  {showDirection ? t("StoreLocator.stopDirections") : t("StoreLocator.getDirections")}
                </StyledButton>
              </StyledGrid>
              {noDirectionPath && showDirection ? (
                <StyledGrid item xs={12}>
                  <StyledTypography variant="caption" color="textSecondary">
                    {t("StoreLocator.directionNotAvailable")}
                  </StyledTypography>
                </StyledGrid>
              ) : null}
              <StyledGrid item xs={12}>
                {storeHours ? (
                  <>
                    <StyledTypography variant="body1">{storeHours.displayName}:</StyledTypography>
                    <StyledTypography variant="body1">{HTMLReactParser(storeHours.displayValue)}</StyledTypography>
                  </>
                ) : null}
              </StyledGrid>
            </>
          )}
        </StyledGrid>
        <StyledGrid item container xs={4} justifyContent="flex-end" alignItems="baseline" spacing={2}>
          <StyledGrid item>
            <StyledButton
              testId="store-locator-set-as-my-store"
              color="primary"
              variant="outlined"
              size="small"
              onClick={setMyStore}
              disabled={store?.id === storeLocator.selectedStore?.id}
              className="button">
              {store?.id === storeLocator.selectedStore?.id
                ? t("StoreLocator.selected")
                : t("StoreLocator.setAsMyStore")}
            </StyledButton>
          </StyledGrid>

          <StyledGrid item>
            <StyledButton
              testId="store-locator-info-box-hide-button"
              className="secondary-color-text-button"
              variant="text"
              onClick={closeInfoBox}
              endIcon={expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}>
              {expand ? t("StoreLocator.hide") : t("StoreLocator.expand")}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
};
