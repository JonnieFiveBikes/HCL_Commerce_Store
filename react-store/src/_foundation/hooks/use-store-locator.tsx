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
import { useDispatch } from "react-redux";
import getDisplayName from "react-display-name";
import { useTranslation } from "react-i18next";
import { useJsApiLoader } from "@react-google-maps/api";
//Foundation
import storeLocatorService from "../apis/transaction/storeLocator.service";
import { useStoreLocatorValue } from "../context/store-locator-context";
import { getSite } from "./useSite";
import {
  DEFAULT_LOCATION,
  GOOGLEMAPREGION,
  GOOGLEMAPZOOM,
  STORELISTRADIUS,
  STORELOCATORLIBRARY,
} from "../constants/common";
import { EMPTY_STRING } from "../../constants/common";
//Redux
import * as errorActions from "../../redux/actions/error";

export const useStoreLocator = () => {
  const widgetName = getDisplayName("StoreLocatorPage");
  const controller = useMemo(() => new AbortController(), []);
  const { t } = useTranslation();
  const site = getSite();
  const dispatch = useDispatch();

  const { storeLocator } = useStoreLocatorValue();
  const [locator, setLocator] = React.useState<any>(null);
  const [searchBoxRef, setSearchBoxRef] = React.useState<any>(null);
  const [searchTerm, setSearchTerm] = React.useState<any>(null);

  const pageHeight = "740px";
  const cssDisplay = {
    none: "none",
    block: "block",
  };
  const [display, setDisplay] = React.useState<string>(cssDisplay.none);
  const [expand, setExpand] = React.useState<boolean>(true);

  const [clickedIndex, setClickedIndex] = React.useState<any>(null);
  const [currentLocation, setCurrentLocation] = React.useState<any>(null);
  const [directionResponse, setDirectionResponse] = React.useState<any>(null);
  const [showDirection, setShowDirection] = React.useState<boolean>(false);
  const [destination, setDestination] = React.useState<any>(null);

  const noSearch = true;
  const searchTextFieldRef = React.useRef<any>(null);
  const [mapInstance, setMapInstance] = React.useState<any>(null);
  const [noDirectionPath, setNoDirectionPath] = React.useState<boolean>(false);

  const payloadBase: any = {
    widget: widgetName,
    signal: controller.signal,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
    region: GOOGLEMAPREGION,
    libraries: STORELOCATORLIBRARY,
    // ...otherOptions
  });

  const transformGeoJson = (stores) => {
    const physicalStores = stores.map((s) => {
      const coordinates = { lng: Number(s.longitude.trim()), lat: Number(s.latitude.trim()) };
      return {
        coordinates,
        storeName: s.Description[0].displayStoreName,
        physicalStoreName: s.storeName,
        storeFullAddress: `${s.addressLine[0]}, ${s.city} ${s.stateOrProvinceName} ${s.postalCode}`,
        attributes: s.Attribute,
        phone: s.telephone1,
        id: s.uniqueID,
      };
    });
    return physicalStores;
  };

  const getStoreList = async (lat: number, lng: number, radius = STORELISTRADIUS) => {
    const parameters: any = {
      latitude: String(lat),
      longitude: String(lng),
      storeId: site?.storeID || "",
      radius: radius,
      siteLevelStoreSearch: false,
      ...payloadBase,
    };

    try {
      const res = await storeLocatorService.findStores(parameters);
      if (res.data?.PhysicalStore) {
        setLocator({
          storeList: transformGeoJson(res.data?.PhysicalStore),
          center: { lat, lng },
        });
      } else {
        setLocator({
          storeList: [],
          center: { lat, lng },
        });
      }
    } catch (e) {
      console.log("could not retreive the store list", e);
      setLocator({
        storeList: [],
        center: { lat, lng },
      });
    }
  };

  const mapOnLoad = (mapInstance: google.maps.Map) => {
    setMapInstance(mapInstance);
    if (storeLocator.selectedStore) {
      setLocator({
        storeList: [storeLocator.selectedStore],
        center: storeLocator.selectedStore.coordinates,
        noSearch: noSearch,
      });
    }
  };

  const onPlaceChanged = async () => {
    const place = searchBoxRef?.getPlace();
    if (place?.geometry) {
      await getStoreList(place.geometry.location.lat(), place.geometry.location.lng());
      setSearchTerm(searchTextFieldRef?.current.value);
      setDisplay(cssDisplay.none);
      stopDirection();
      mapInstance.setZoom(GOOGLEMAPZOOM.INIT);
    }
  };

  const searchBoxOnLoad = (searchBox) => {
    setSearchBoxRef(searchBox);
  };

  const findNearStore = () => {
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        await getStoreList(position.coords.latitude, position.coords.longitude);
        clearSearchTermAndCloseEverything();
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  const closeInfoBox = () => {
    if (expand) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  };

  const onMarkerClick = (e, index) => {
    setClickedIndex(index);
    setDisplay(cssDisplay.block);
    zoomCenterMap(GOOGLEMAPZOOM.ZOOMIN, locator?.storeList[index].coordinates);
    stopDirection();
  };

  const onListItemClick = (e, index: any) => {
    setDisplay(cssDisplay.block);
    setClickedIndex(index);
    zoomCenterMap(GOOGLEMAPZOOM.ZOOMIN, locator?.storeList[index].coordinates);
    stopDirection();
  };

  const zoomCenterMap = (zoom, center) => {
    mapInstance.setZoom(zoom);
    mapInstance.setCenter(center);
  };

  const clearSearch = () => {
    clearSearchTermAndCloseEverything();
    if (storeLocator.selectedStore) {
      setLocator({
        storeList: [storeLocator.selectedStore],
        center: storeLocator.selectedStore.coordinates,
        noSearch: noSearch,
      });
    } else {
      setLocator(null);
    }
  };

  const clearSearchTermAndCloseEverything = () => {
    if (searchTerm) {
      setSearchTerm(null);
    }
    if (searchTextFieldRef.current) {
      searchTextFieldRef.current.value = EMPTY_STRING;
    }
    setDisplay(cssDisplay.none);
    stopDirection();
    mapInstance.setZoom(GOOGLEMAPZOOM.INIT);
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirectionResponse(response);
      } else {
        setNoDirectionPath(true);
        console.log("Could not get direction information ", response);
      }
    }
  };

  const getDirection = () => {
    if (!showDirection) {
      setDestination(locator.storeList[clickedIndex].coordinates);
      setShowDirection(true);
    } else {
      stopDirection();
      zoomCenterMap(GOOGLEMAPZOOM.ZOOMIN, locator?.storeList[clickedIndex].coordinates);
    }
  };

  const stopDirection = () => {
    setShowDirection(false);
    setDestination(null);
    setDirectionResponse(null);
    setNoDirectionPath(false);
  };

  React.useEffect(() => {
    if (!navigator.geolocation) {
      const msg = { errorKey: "_ERR_GOOGLE_MAP_NOT_SUPPORT" };
      dispatch(errorActions.GENERIC_ERROR_ACTION(msg));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (err: any) => {
          console.log("Ecountering error ", err);
          console.log("Use default location instead.");
          setCurrentLocation(DEFAULT_LOCATION);
        }
      );
    }
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    t,
    locator,
    isLoaded,
    display,
    currentLocation,
    pageHeight,
    clickedIndex,
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
  };
};
