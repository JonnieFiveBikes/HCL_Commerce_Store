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
import { CommerceEnvironment, SELLER_FACET } from "../../constants/common";
import { getSite } from "../../_foundation/hooks/useSite";
//Redux
import * as ACTIONS from "../action-types/catalog";
import initStates from "./initStates";
import i18n from "../../i18n";

const getStoreName = (site) => {
  let rc = "";
  if (site) {
    const loc = i18n.languages[0];
    const key = `__storeName_${loc}`;

    if (site[key]) {
      rc = site[key];
    } else if (site?.storeName) {
      const { storeCfg, defaultLanguageID: def, storeName } = site;
      const { description: d } = storeCfg ?? {};
      const id = CommerceEnvironment.reverseLanguageMap[loc.split("-").join("_")];
      const byLang = d?.find(({ languageId: l }) => l === id)?.displayName;
      const name = byLang ?? d?.find(({ languageId: l }) => l === def)?.displayName;
      rc = name ?? storeName;
      Object.assign(site, { [key]: rc });
    }
  }

  return rc;
};

const adjustFacets = ({ state, facets, selectedSellers: sellers, site }) => {
  if (facets?.length > 0) {
    const newFacetPrice = facets.find((f) => f.value.startsWith("price_"));
    state.facetPrice = newFacetPrice;

    if (sellers?.length === 1 || site?.isB2B) {
      state.facets = facets.filter((f) => f.value !== SELLER_FACET);
    } else {
      const f = facets.find((f) => f.value === SELLER_FACET);
      const empty = f?.entry?.find((e) => !e.label);
      if (empty) {
        empty.label = getStoreName(site);
      }
      state.facets = facets;
    }
  } else {
    state.facets = state.facetPrice ? [state.facetPrice] : [];
  }
};

/**
 * Catalog reducer
 * handles states used by catalog related components
 * @param state State object managed by catalog reducer
 * @param action The dispatched action
 */
const catalogReducer = createReducer(initStates.catalog, (builder) => {
  const pageDefaultOffset: number = PAGINATION_CONFIGS.pageDefaultOffset;

  builder.addCase(ACTIONS.PRODUCT_LIST_GET_REQUESTED, (state, action: AnyAction) => {
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
  });

  builder.addCase(ACTIONS.PRODUCT_LIST_GET_SUCCESS, (state, action: AnyAction) => {
    const response = action.response;
    const payload = action.payload;
    const { selectedSellers } = payload;
    const { facets } = response;
    const site = getSite();

    adjustFacets({ state, facets, selectedSellers, site });

    state.productList = response["contents"] ? response.contents : [];
    state.productListTotal = response.total ?? 0;
    if (response["metaData"]) {
      state.priceMode = response.metaData.price;
    }
    state.breadcrumbs = response["breadCrumbTrailEntryView"] ? response.breadCrumbTrailEntryView : [];
    state.selectFacetRemove = payload.states ? true : false;
  });

  builder.addCase(ACTIONS.PRODUCT_LIST_RESET_REQUESTED, (state, action: AnyAction) => {
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
  });

  builder.addCase(ACTIONS.PRODUCT_LIST_FOR_PDP_GET_SUCCESS, (state, action: AnyAction) => {
    const payload = action.payload;
    const response = action.response;

    state.breadcrumbs = response["breadCrumbTrailEntryView"] ? response.breadCrumbTrailEntryView : [];
    if (payload.parameters.productName !== undefined && state.breadcrumbs.length > 0) {
      state.breadcrumbs = state.breadcrumbs.concat({
        label: payload.parameters.productName,
      });
    }
  });

  // this will maintain a cache of products responses (full products response)
  builder.addCase(ACTIONS.PRODUCT_LIST_DEETS_S, (state, action: AnyAction) => {
    const { response } = action;
    const { contents } = response;
    const cache: any = state.productCache;
    const max = cache.MAX;
    const n = contents.length >= max ? max : contents.length;
    let start = contents.length >= max ? 0 : cache.idx;

    // for products in response
    for (let i = 0; i < n; ++i) {
      const pNew = contents[i];
      const pOld = cache.container[start];

      // update or add to array
      if (pOld) {
        delete cache.byId[pOld.id];
        cache.container[start] = pNew;
      } else {
        cache.container.push(pNew);
      }

      // add to map for easy indexing
      cache.byId[pNew.id] = pNew;

      // remember to modulo max so that we do a return trip to the start of the array
      start = (start + 1) % max;
    }

    // update the index for next cache attempt
    cache.idx = start;
  });
});

export default catalogReducer;
