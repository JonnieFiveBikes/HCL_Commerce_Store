/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
//Custom libraries
import { PRODUCT_LIST_FIELDS, PAGINATION_CONFIGS } from "../../../../configs/catalog";
//Redux
import {
  facetsSelector,
  selectedFacetsSelector,
  selectedFacetLimitsSelector,
  selectedFacetPricesSelector,
  selectedSortOptionSelector,
} from "../../../../redux/selectors/catalog";
import * as catalogActions from "../../../../redux/actions/catalog";
import { currentContractIdSelector } from "../../../../redux/selectors/contract";
import { Page, WidgetProps } from "../../../../_foundation/constants/seo-config";
import FormattedPriceDisplay from "../../../widgets/formatted-price-display";
import { selectedSellersSelector } from "../../../../redux/selectors/sellers";
import {
  SEARCH_FIND_PROFILE,
  SEARCH_PLP_PROFILE,
  STRING_TRUE,
  STRING_FALSE,
  MANUFACTURER,
} from "../../../../constants/common";
import { isEmpty } from "lodash-es";

/**
 * Product Filter component
 * displays price, brand and other facets
 * @param props
 */
const useProductFilter = (page: Page, extra: any) => {
  const widgetName = getDisplayName("facet-navigation-widget");
  const { t } = useTranslation();

  const priceLabel = t("ProductFilter.Labels.price");
  const maxPriceLabel = t("ProductFilter.Labels.maxPrice");
  const minPriceLabel = t("ProductFilter.Labels.minPrice");
  const filterLabel = t("ProductFilter.Actions.Filter");
  const showMoreLabel = t("ProductFilter.Actions.showMore");
  const showLessLabel = t("ProductFilter.Actions.showLess");
  const filterByLabel = t("ProductFilter.Labels.filterBy");

  const [isMaxPriceValid, setIsMaxPriceValid] = useState<boolean>(() => true);
  const [isMinPriceValid, setIsMinPriceValid] = useState<boolean>(() => true);
  const [minPrice, setMinPrice] = useState<number | null>(() => null);
  const [maxPrice, setMaxPrice] = useState<number | null>(() => null);
  const facets = useSelector(facetsSelector);
  const selectedFacets = useSelector(selectedFacetsSelector);
  const selectedFacetLimits = useSelector(selectedFacetLimitsSelector);
  const selectedFacetPrices = useSelector(selectedFacetPricesSelector);
  const selectedSortOption = useSelector(selectedSortOptionSelector);
  const contract = useSelector(currentContractIdSelector);
  const selectedSellers = useSelector(selectedSellersSelector);
  const selectedMinPrice = selectedFacetPrices.min;
  const selectedMaxPrice = selectedFacetPrices.max;
  const priceSelected = selectedMinPrice > -1 && selectedMaxPrice > -1;

  const categoryId: string = React.useMemo(() => {
    if (page?.tokenName === "CategoryToken") {
      return page.tokenValue ? page.tokenValue : "";
    } else {
      return "";
    }
  }, [page]);
  const searchTerm: string = extra?.searchTerm ? extra.searchTerm : "";
  const location: any = useLocation();
  const params = new URLSearchParams(location?.search);
  const manufacturer = params?.get(MANUFACTURER) ?? STRING_FALSE;

  const dispatch = useDispatch();

  const { mySite } = useSite();
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const pageLimit: number = PAGINATION_CONFIGS.pageLimit;
  const pageDefaultOffset: number = PAGINATION_CONFIGS.pageDefaultOffset;

  const FACET_BRAND_TITLE = "mfName_ntk_cs";
  const FACET_PRICE_PREFIX = "price_";
  const FACET_CATEGORY_TITLE = "parentCatgroup_id_search";
  const FACET_CATEGORY_VALUE_PREFIX = "path.tree:";

  const paramsBase: any = {
    currency: defaultCurrencyID,
    contractId: contract,
    _fields: PRODUCT_LIST_FIELDS,
    offset: pageDefaultOffset,
    limit: pageLimit,
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  if (categoryId !== "") {
    paramsBase["categoryId"] = categoryId;
  }
  if (selectedSortOption !== "0") {
    paramsBase["orderBy"] = selectedSortOption;
  }
  if (selectedSortOption === "0" && paramsBase["orderBy"]) {
    delete paramsBase["orderBy"];
  }
  if (searchTerm !== "") {
    paramsBase["searchTerm"] = manufacturer === STRING_TRUE ? "*" : searchTerm;
  }

  useEffect(() => {
    if (mySite && contract !== null && (!isEmpty(categoryId) || !isEmpty(searchTerm))) {
      const parameters = { ...paramsBase };
      const query = !isEmpty(selectedFacets) ? { facet: Object.keys(selectedFacets) } : {};
      const states = !isEmpty(selectedFacets) ? { selectedFacets } : undefined;
      Object.assign(query, {
        profileName: isEmpty(parameters.searchTerm) ? SEARCH_PLP_PROFILE : SEARCH_FIND_PROFILE,
        ...(manufacturer === STRING_TRUE && { manufacturer: searchTerm }),
      });
      Object.assign(parameters, { query });
      dispatch(catalogActions.getProductListAction({ parameters, selectedSellers, states }));
    }

    return () => {
      dispatch(catalogActions.resetProductListAction());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, mySite, contract, selectedSellers]);

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedMinPrice === -1 && selectedMaxPrice === -1) {
      setMinPrice(null);
      setMaxPrice(null);
    }
  }, [selectedMinPrice, selectedMaxPrice]);

  /**
   * Returns the appropriate facet title
   * @param facet The facet object
   */
  const getFacetTitle = (facet: any): string => {
    return facet.value === FACET_BRAND_TITLE || isCategoryFacet(facet) ? facet.extendedData.fname : facet.name;
  };

  /**
   * Whether this is a price facet
   * @param facet The facet object
   * @returns boolean flag if it is a price facet
   */
  const isPriceFacet = (facet: any) => {
    return (facet.value as string).startsWith(FACET_PRICE_PREFIX);
  };

  /**
   * Whether this is a category facet
   * @param facet The facet object
   * @returns boolean flag if it is a category facet
   */
  const isCategoryFacet = (facet: any) => {
    return facet.value === FACET_CATEGORY_TITLE;
  };

  /**
   * Whether to display the facet
   * @param facet The facet object
   * @returns boolean flag to show or hide facet
   */
  const showFacet = (facet: any) => {
    return (!isCategoryFacet(facet) && categoryId !== "") || searchTerm !== "";
  };

  /**
   * Toggles the selected facet and dispatches request to get product list
   * @param event invocation event
   * @param selection The selected facet entry's value
   * @param label The selected facet entry's label
   */
  const onFacetChange = (event: any, selection: string, label: string) => {
    event.stopPropagation();
    event.preventDefault();
    let newSelectedFacets = { ...selectedFacets };
    if (newSelectedFacets[selection] === undefined) {
      const newAddedSelectedFacets = {
        ...newSelectedFacets,
        [selection]: label,
      };
      newSelectedFacets = newAddedSelectedFacets;
    } else {
      const { [selection]: tempLabel, ...newRemovedSelectedFacets }: { [key: string]: string } = newSelectedFacets;
      newSelectedFacets = newRemovedSelectedFacets;
    }

    let newStates = {};
    if (priceSelected) {
      newStates = {
        selectedFacets: newSelectedFacets,
        minPrice: selectedMinPrice,
        maxPrice: selectedMaxPrice,
      };
    } else {
      newStates = {
        selectedFacets: newSelectedFacets,
      };
    }

    dispatchGetProductListAction(newSelectedFacets, selectedFacetLimits, selectedMinPrice, selectedMaxPrice, newStates);
  };

  /**
   * Whether or not the facet value has been selected
   * @param value The facet value to check
   * @returns boolean flag if facet value is selected
   */
  const isFacetSelected = (value: string) => {
    return selectedFacets[value] !== undefined;
  };

  /**
   * Update min price based on input action
   * @param valueAsNumber The input number
   */
  const onMinPriceChange = (valueAsNumber: number) => {
    setMinPrice(valueAsNumber);
    setIsMinPriceValid(valueAsNumber !== null);
  };

  /**
   * Update max price based on input action
   * @param valueAsNumber The input number
   */
  const onMaxPriceChange = (valueAsNumber: number) => {
    setMaxPrice(valueAsNumber);
    setIsMaxPriceValid(valueAsNumber !== null);
  };

  /**
   * Validates min/max price range after both min/max prices are validated,
   * to differentiate the error between input fields or range
   * @returns boolean flag if price range is valid
   */
  const validatePriceRange = () => {
    if (minPrice === null || maxPrice === null) return true;
    if (!isMinPriceValid || !isMaxPriceValid) return true;

    if (isMinPriceValid && isMaxPriceValid) {
      try {
        if (minPrice <= maxPrice) {
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    }
    return false;
  };

  /**
   * whether or to enable price submit button dependent if min/max prices are valid
   * @returns boolean flag if button should be enabled
   */
  const enableSubmitButton = () => {
    return isMinPriceValid && isMaxPriceValid && minPrice !== null && maxPrice !== null && validatePriceRange();
  };

  const isSubmitButtonEnabled = enableSubmitButton();

  /**
   * Submits the valid selected price range and dispatches request to get product list
   */
  const onPriceSubmit = () => {
    if (minPrice != null && maxPrice != null && isMinPriceValid && isMaxPriceValid && validatePriceRange()) {
      batch(() => {
        const newStates = {
          minPrice: minPrice,
          maxPrice: maxPrice,
        };
        dispatchGetProductListAction(selectedFacets, selectedFacetLimits, minPrice, maxPrice, newStates);
      });
    }
  };

  /**
   * Reset the selected price range and dispatches request to get product list
   */
  const clearPriceFacet = () => {
    batch(() => {
      const newStates = {
        selectedFacets: selectedFacets,
        minPrice: -1,
        maxPrice: -1,
      };
      dispatchGetProductListAction(selectedFacets, selectedFacetLimits, -1, -1, newStates);
    });
  };

  /**
   * whether or display the Show More link for the given facet
   * @param facet The facet object
   * @returns boolean flag to show Show More link or not
   */
  const showMoreButton = (facet: any) => {
    return (
      facet.extendedData &&
      (facet.extendedData.allValuesReturned === false || facet.extendedData.allValuesReturned === "false")
    );
  };

  /**
   * whether or display the Show Less link for the given facet
   * @param facet The facet object
   * @returns boolean flag to show Show Less link or not
   */
  const showLessButton = (facet: any) => {
    let maximumValuesToDisplay = facet?.entry?.length;
    let allValuesReturned = false;
    if (facet && facet.extendedData) {
      maximumValuesToDisplay = Number(facet.extendedData.maximumValuesToDisplay);
      allValuesReturned = Boolean(facet.extendedData.allValuesReturned);
    }

    return allValuesReturned === true && maximumValuesToDisplay !== -1 && maximumValuesToDisplay < facet.entry.length;
  };

  /**
   * Toggles the show more/less facet values and dispatches request to get product list
   * @param event The event handler
   * @param facetValue The facet value to retrieve more/less of
   */
  const toggleFacetLimit = (
    event: any, //: MouseEvent<HTMLAnchorElement>,
    facetValue: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const selection = facetValue + ":-1";
    let newSelectedFacetLimits = [...selectedFacetLimits];
    const index = newSelectedFacetLimits.indexOf(selection);
    if (index === -1) {
      newSelectedFacetLimits = newSelectedFacetLimits.concat(selection);
    } else {
      newSelectedFacetLimits.splice(index, 1);
    }

    const newStates = {
      selectedFacetLimits: newSelectedFacetLimits,
    };
    dispatchGetProductListAction(selectedFacets, newSelectedFacetLimits, selectedMinPrice, selectedMaxPrice, newStates);
  };

  /**
   * Wrapper to dispatch request to get product list
   * @param selectedFacets The updated selected facets map
   * @param selectedFacetLimits The updated selected facet limits array
   * @param selectedMinPrice The selected min price or -1, if not set
   * @param selectedMaxPrice The selected max price or -1, if not set
   * @param states The states that have changed and should be persisted back to redux
   */
  const dispatchGetProductListAction = (
    selectedFacets: any,
    selectedFacetLimits: string[],
    selectedMinPrice: number | null,
    selectedMaxPrice: number | null,
    states: any
  ) => {
    const parameters = {
      ...paramsBase,
      query: {
        profileName: isEmpty(paramsBase.searchTerm) ? SEARCH_PLP_PROFILE : SEARCH_FIND_PROFILE,
        ...(manufacturer === STRING_TRUE && { manufacturer: searchTerm }),
      },
    };
    const { query } = parameters;

    if (parameters["orderBy"]) {
      Object.assign(query, { orderBy: parameters["orderBy"] });
    }

    const selectedFacetsArray = Object.keys(selectedFacets);
    if (selectedFacetsArray.length > 0) {
      Object.assign(query, { facet: selectedFacetsArray });
    }

    if (selectedFacetLimits.length > 0) {
      Object.assign(query, { facetLimit: selectedFacetLimits });
    }

    if (selectedMinPrice !== null && selectedMinPrice > -1 && selectedMaxPrice !== null && selectedMaxPrice > -1) {
      Object.assign(query, { minPrice: selectedMinPrice, maxPrice: selectedMaxPrice });
    }

    const newStates = { ...states, selectedPageOffset: pageDefaultOffset };

    dispatch(
      catalogActions.getProductListAction({
        parameters,
        states: newStates,
        selectedSellers,
      })
    );
  };

  const onInputClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return {
    onInputClick,
    toggleFacetLimit,
    showMoreButton,
    showLessButton,
    clearPriceFacet,
    isSubmitButtonEnabled,
    validatePriceRange,
    onMaxPriceChange,
    onMinPriceChange,
    isFacetSelected,
    onFacetChange,
    showFacet,
    isCategoryFacet,
    isPriceFacet,
    getFacetTitle,
    facets,
    priceSelected,
    defaultCurrencyID,
    onPriceSubmit,
    FACET_CATEGORY_VALUE_PREFIX,
    priceLabel,
    maxPriceLabel,
    minPriceLabel,
    filterLabel,
    showMoreLabel,
    showLessLabel,
    filterByLabel,
    minPrice,
    maxPrice,
  };
};

export const withFacetNavigationWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  (props: any) => {
    const { page, ...extra } = props;
    const productFilter = useProductFilter(page, extra);
    const { minPrice, maxPrice, defaultCurrencyID } = productFilter;
    const formattedPriceDisplay = <FormattedPriceDisplay min={minPrice} max={maxPrice} currency={defaultCurrencyID} />;
    const productFilterProps = {
      ...productFilter,
      formattedPriceDisplay,
    };
    return <WrapComponent {...productFilterProps}></WrapComponent>;
  };
