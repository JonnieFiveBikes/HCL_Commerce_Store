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
import { Marker } from "@react-google-maps/api";

export interface StoreLocatorMarkerProps {
  store: any;
  index: number;
  onMarkerClick: any;
  clickedIndex: number;
}

export const StoreLocatorMarker: React.FC<StoreLocatorMarkerProps> = (props) => {
  const { store, index, onMarkerClick, clickedIndex } = props;
  const fillColor = clickedIndex === index ? "#009874" : "#6393F2";
  const googleMapSymbol: google.maps.Symbol = {
    path: "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z",
    fillColor: fillColor,
    strokeWeight: 0,
    fillOpacity: 1,
    rotation: 0,
    scale: 2,
    labelOrigin: new google.maps.Point(12, 9),
    anchor: new google.maps.Point(15, 30),
  };

  const googleMapMarkerLabel: google.maps.MarkerLabel = {
    color: "white",
    text: String(index + 1),
  };

  return (
    <Marker
      label={googleMapMarkerLabel}
      icon={googleMapSymbol}
      position={store.coordinates}
      onClick={(e) => onMarkerClick(e, index)}
    />
  );
};
