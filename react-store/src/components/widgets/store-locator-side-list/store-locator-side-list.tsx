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
import { useTranslation } from "react-i18next";
import { InputAdornment } from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SearchIcon from "@mui/icons-material/Search";
import { getDistance } from "geolib";
import { Autocomplete } from "@react-google-maps/api";
//HCL libraries
import {
  MarkerIcon,
  StyledButton,
  StyledGrid,
  StyledList,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
  StyledTextField,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
//Foundation
import { KILOMETERS } from "../../../_foundation/constants/common";
import { useStoreLocatorValue } from "../../../_foundation/context/store-locator-context";

export interface StoreLocatorSideListProps {
  searchTerm: string;
  locator: any;
  clearSearch: any;
  onListItemClick: any;
  currentLocation: any;
  findNearStore: any;
  searchBoxOnLoad: any;
  onPlacesChanged: any;
  searchTextFieldRef: any;
  clickedIndex: any;
}

export const StoreLocatorSideList: React.FC<StoreLocatorSideListProps> = (props) => {
  const {
    locator,
    clearSearch,
    onListItemClick,
    currentLocation,
    findNearStore,
    searchBoxOnLoad,
    onPlacesChanged,
    searchTerm,
    searchTextFieldRef,
    clickedIndex,
  } = props;
  const { t } = useTranslation();

  const { storeLocator } = useStoreLocatorValue();

  const scrollStyle = {
    flex: "initial",
    overflowY: "scroll",
  };

  const textImageCenterStyle = {
    flex: "auto",
    textAlign: "center",
  };

  return (
    <StyledGrid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      style={{ height: "100%" }}>
      <StyledGrid item xs={12} style={scrollStyle}>
        <StyledList disablePadding>
          <StyledListItem>
            <StyledListItemText
              primary={<StyledTypography variant="subtitle2">{t("StoreLocator.searchAPickUpStore")}</StyledTypography>}
            />
            <StyledButton
              testId="store-locator-find-nearest-store"
              variant="text"
              className="left-margin-1"
              color="secondary"
              style={{ whiteSpace: "nowrap" }}
              onClick={findNearStore}>
              {t("StoreLocator.findNearestStore")}
            </StyledButton>
          </StyledListItem>
          <StyledListItem>
            <Autocomplete onLoad={searchBoxOnLoad} onPlaceChanged={onPlacesChanged} className="full-width">
              <StyledTextField
                data-testid="store-locator-store-search-text-field"
                fullWidth
                autoFocus
                autoComplete="off"
                type="text"
                placeholder={t("StoreLocator.searchStore")}
                name="searchTerm"
                inputRef={searchTextFieldRef}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Autocomplete>
          </StyledListItem>
          {locator?.storeList.length > 0 && !locator.noSearch && (
            <StyledListItem divider>
              <StyledListItemText
                primary={
                  searchTerm
                    ? t("StoreLocator.searchResults", {
                        n: locator?.storeList.length,
                        p: searchTerm,
                      })
                    : t("StoreLocator.searchResultsNearYou", { n: locator?.storeList.length })
                }
              />
              <StyledButton
                testId="store-locator-side-list-clear-search"
                className="left-margin-1 alert-color-text-button"
                variant="text"
                style={{ whiteSpace: "nowrap" }}
                onClick={clearSearch}>
                {t("StoreLocator.clearSearch")}
              </StyledButton>
            </StyledListItem>
          )}
          {currentLocation &&
            locator?.storeList?.map((store, index) => {
              return (
                <StyledListItem
                  data-testid={`pickup-store-${store?.storeName.toLowerCase()}-list-button`}
                  button
                  key={store?.id}
                  onClick={(e) => onListItemClick(e, index)}
                  divider>
                  <StyledListItemIcon>
                    <MarkerIcon label={String(index + 1)} />
                  </StyledListItemIcon>
                  <StyledListItemText
                    primary={
                      <StyledTypography className={clickedIndex === index ? "selected" : null} variant="subtitle2">
                        {store?.storeName}
                        {store?.id === storeLocator.selectedStore?.id && (
                          <CheckCircleRoundedIcon
                            htmlColor="#6393F2"
                            className="left-margin-1"
                            style={{ verticalAlign: "text-bottom" }}
                          />
                        )}
                      </StyledTypography>
                    }
                    secondary={
                      <StyledTypography className={clickedIndex === index ? "selected" : null} variant="caption">
                        {store?.storeFullAddress}
                      </StyledTypography>
                    }></StyledListItemText>
                  <StyledTypography className={clickedIndex === index ? "selected" : null} variant="caption">
                    {getDistance(searchTerm ? locator.center : currentLocation, store?.coordinates, 100) / 1000 +
                      KILOMETERS}
                  </StyledTypography>
                </StyledListItem>
              );
            })}
        </StyledList>
      </StyledGrid>
      {!locator && (
        <StyledGrid item container justifyContent="center" alignItems="center" xs={12} style={textImageCenterStyle}>
          <StyledGrid item xs={2}>
            <SearchIcon htmlColor="lightgrey" style={{ fontSize: 70 }} />
          </StyledGrid>
        </StyledGrid>
      )}
      {locator?.storeList && locator?.storeList.length === 0 && (
        <StyledGrid item container justifyContent="center" alignItems="center" xs={12} style={textImageCenterStyle}>
          <StyledGrid item xs={12}>
            <NotInterestedIcon htmlColor="lightgrey" style={{ fontSize: 70 }} />
            <StyledTypography variant="subtitle2">
              {searchTerm ? t("StoreLocator.noResults", { p: searchTerm }) : t("StoreLocator.noResultsNearYou")}
            </StyledTypography>
          </StyledGrid>
        </StyledGrid>
      )}
    </StyledGrid>
  );
};
