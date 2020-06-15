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
//Redux
import { RootReducerState } from "../reducers";

export const productListSelector = (state: RootReducerState) =>
  state.catalog.productList;
export const productListTotalSelector = (state: RootReducerState) =>
  state.catalog.productListTotal;
export const priceModeSelector = (state: RootReducerState) =>
  state.catalog.priceMode;

export const facetsSelector = (state: RootReducerState) => state.catalog.facets;
export const facetPriceSelector = (state: RootReducerState) =>
  state.catalog.facetPrice;

export const selectedFacetsSelector = (state: RootReducerState) =>
  state.catalog.selectedFacets;
export const selectedFacetPricesSelector = (state: RootReducerState) =>
  state.catalog.selectedFacetPrices;
export const selectedFacetLimitsSelector = (state: RootReducerState) =>
  state.catalog.selectedFacetLimits;
export const selectedPageOffsetSelector = (state: RootReducerState) =>
  state.catalog.selectedPageOffset;
export const selectedSortOptionSelector = (state: RootReducerState) =>
  state.catalog.selectedSortOption;

export const breadcrumbsSelector = (state: RootReducerState) =>
  state.catalog.breadcrumbs;
