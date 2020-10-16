/**
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
import { createReducer, AnyAction } from "@reduxjs/toolkit";
//Custom libraries
import { PAGINATION_CONFIGS } from "../../configs/catalog";
//Redux
import * as ACTIONS from "../action-types/catalog";
import initStates from "./initStates";

/**
 * Catalog reducer
 * handles states used by catalog related components
 * @param state State object managed by catalog reducer
 * @param action The dispatched action
 */
const catalogReducer = createReducer(initStates.catalog, (builder) => {
  const pageDefaultOffset: number = PAGINATION_CONFIGS.pageDefaultOffset;

  builder.addCase(
    ACTIONS.PRODUCT_LIST_GET_REQUESTED,
    (state, action: AnyAction) => {
      const payload = action.payload;
      if (payload.states) {
        if (payload.states["selectedFacets"] !== undefined) {
          state.selectedFacets = payload.states.selectedFacets;
        }
        if (payload.states["selectedFacetLimits"] !== undefined) {
          state.selectedFacetLimits = payload.states.selectedFacetLimits;
        }
        if (payload.states["minPrice"] !== undefined) {
          state.selectedFacetPrices.min = payload.states.minPrice;
        }
        if (payload.states["maxPrice"] !== undefined) {
          state.selectedFacetPrices.max = payload.states.maxPrice;
        }

        if (payload.states["selectedPageOffset"] >= 0) {
          state.selectedPageOffset = payload.states.selectedPageOffset;
        }
        if (payload.states["selectedSortOption"] !== undefined) {
          state.selectedSortOption = payload.states.selectedSortOption;
        }
      } else {
        state.selectedFacetLimits = [];
        state.selectedFacets = {};
        state.selectedFacetPrices.min = -1;
        state.selectedFacetPrices.max = -1;
        state.selectedPageOffset = pageDefaultOffset;
        state.selectedSortOption = "0";
      }
    }
  );

  builder.addCase(
    ACTIONS.PRODUCT_LIST_GET_SUCCESS,
    (state, action: AnyAction) => {
      const response = action.response;

      if (response["facets"] && response["facets"].length > 0) {
        let newFacetPrice = null;
        response["facets"].forEach((facet: any) => {
          if (facet.value.startsWith("price_")) {
            newFacetPrice = facet;
          }
        });
        state.facets = response.facets;
        state.facetPrice = newFacetPrice;
      } else {
        state.facets = state.facetPrice ? [state.facetPrice] : [];
      }

      state.productList = response["contents"] ? response.contents : [];
      state.productListTotal = response.total;
      if (response["metaData"]) {
        state.priceMode = response.metaData.price;
      }
      state.breadcrumbs = response["breadCrumbTrailEntryView"]
        ? response.breadCrumbTrailEntryView
        : [];
    }
  );

  builder.addCase(
    ACTIONS.PRODUCT_LIST_RESET_REQUESTED,
    (state, action: AnyAction) => {
      state.productList = [];
      state.productListTotal = -1;
      state.facets = null;
      state.facetPrice = null;
      state.selectedFacets = {};
      state.selectedFacetLimits = [];
      state.selectedFacetPrices = { min: -1, max: -1 };
      state.selectedPageOffset = 1;
      state.selectedSortOption = "0";
      state.breadcrumbs = [];
    }
  );

  builder.addCase(
    ACTIONS.PRODUCT_LIST_FOR_PDP_GET_SUCCESS,
    (state, action: AnyAction) => {
      const payload = action.payload;
      const response = action.response;

      state.breadcrumbs = response["breadCrumbTrailEntryView"]
        ? response.breadCrumbTrailEntryView
        : [];
      if (
        payload.parameters.productName !== undefined &&
        state.breadcrumbs.length > 0
      ) {
        state.breadcrumbs = state.breadcrumbs.concat({
          label: payload.parameters.productName,
        });
      }
    }
  );
});

export default catalogReducer;
