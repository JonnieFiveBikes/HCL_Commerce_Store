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
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DirectionsRenderer, DirectionsService, GoogleMap } from "@react-google-maps/api";
//HCL libraries
import { StyledCircularProgress, StyledGrid, StyledPaper } from "@hcl-commerce-store-sdk/react-component";
//Foundation
import { useStoreLocator } from "../../../_foundation/hooks/use-store-locator";
import { GOOGLEMAPZOOM } from "../../../_foundation/constants/common";
//Custom libraries
import { StoreLocatorSideList } from "../store-locator-side-list";
import { StoreLocatorInfoBox } from "../store-locator-infobox";
import { StoreLocatorMarker } from "../store-locator-marker";

export const StoreLocatorWidget = () => {
  const {
    locator,
    isLoaded,
    display,
    clickedIndex,
    currentLocation,
    pageHeight,
    searchTerm,
    searchTextFieldRef,
    mapOnLoad,
    onPlaceChanged,
    searchBoxOnLoad,
    findNearStore,
    onMarkerClick,
    onListItemClick,
    closeInfoBox,
    clearSearch,
    directionsCallback,
    directionResponse,
    showDirection,
    getDirection,
    destination,
    expand,
    noDirectionPath,
  } = useStoreLocator();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {isLoaded ? (
        <StyledGrid container justifyContent="center" alignItems="stretch" spacing={2}>
          <StyledGrid item xs={12} md={4} style={{ height: isDesktop ? pageHeight : null }}>
            <StyledPaper style={{ height: "100%" }}>
              <StoreLocatorSideList
                locator={locator}
                currentLocation={currentLocation}
                searchTerm={searchTerm}
                onListItemClick={onListItemClick}
                findNearStore={findNearStore}
                searchBoxOnLoad={searchBoxOnLoad}
                onPlacesChanged={onPlaceChanged}
                clearSearch={clearSearch}
                searchTextFieldRef={searchTextFieldRef}
                clickedIndex={clickedIndex}
              />
            </StyledPaper>
          </StyledGrid>
          <StyledGrid
            item
            container
            xs={12}
            md={8}
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            style={{ height: pageHeight }}>
            <StyledGrid item xs>
              <GoogleMap
                mapContainerStyle={{
                  height: "100%",
                  width: "100%",
                }}
                zoom={GOOGLEMAPZOOM.INIT}
                center={locator ? locator.center : currentLocation}
                onLoad={mapOnLoad}>
                {!showDirection
                  ? locator?.storeList.map((store, index) => {
                      return (
                        <StoreLocatorMarker
                          clickedIndex={clickedIndex}
                          key={store.id}
                          store={store}
                          index={index}
                          onMarkerClick={onMarkerClick}
                        />
                      );
                    })
                  : null}
                {showDirection && destination && !directionResponse ? (
                  <DirectionsService
                    options={{
                      destination: destination,
                      origin: searchTerm ? locator.center : currentLocation,
                      travelMode: google.maps.TravelMode.DRIVING,
                      provideRouteAlternatives: true,
                    }}
                    callback={directionsCallback}
                  />
                ) : null}
                {showDirection && directionResponse ? (
                  <DirectionsRenderer
                    options={{
                      directions: directionResponse,
                      suppressInfoWindows: true,
                    }}
                  />
                ) : null}
              </GoogleMap>
            </StyledGrid>
            <StyledGrid item>
              <StoreLocatorInfoBox
                {...{
                  isHidden: display,
                  expand,
                  closeInfoBox,
                  locator,
                  index: clickedIndex,
                  currentLocation,
                  searchTerm,
                  getDirection,
                  showDirection,
                  noDirectionPath,
                }}
              />
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      ) : (
        <StyledCircularProgress />
      )}
    </>
  );
};
