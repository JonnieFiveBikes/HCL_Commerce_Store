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
import React, { useEffect, ChangeEvent, MouseEvent, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import {
  PRODUCT_LIST_FIELDS,
  PAGINATION_CONFIGS,
} from "../../../configs/catalog";
import { SORT_OPTIONS } from "../../../constants/catalog";
import FormattedPriceDisplay from "../formatted-price-display";
import { ProductCardLayout } from "../product-card";
import { SEARCH } from "../../../constants/routes";
//Redux
import {
  productListSelector,
  productListTotalSelector,
  priceModeSelector,
  selectedFacetsSelector,
  selectedFacetLimitsSelector,
  selectedFacetPricesSelector,
  selectedPageOffsetSelector,
  selectedSortOptionSelector,
} from "../../../redux/selectors/catalog";
import * as catalogActions from "../../../redux/actions/catalog";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import { keywordSelector } from "../../../redux/selectors/search";
//UI
import {
  StyledGrid,
  StyledFormControl,
  StyledChip,
  StyledSelect,
  StyledMenuItem,
  StyledPagination,
  StyledButton,
  StyledTypography,
} from "../../StyledUI";

interface ProductGridProps {
  cid: string;
  categoryId?: string;
  categoryName?: string;
  searchTerm?: string;
}

/**
 * Product Grid component
 * displays catalog entry listing, pagination and selected facets
 * @param props
 */
const ProductGridLayout: React.FC<ProductGridProps> = (props: any) => {
  const productList = useSelector(productListSelector);
  const productListTotal = useSelector(productListTotalSelector);
  const priceMode = useSelector(priceModeSelector);
  const selectedFacetLimits = useSelector(selectedFacetLimitsSelector);
  const selectedFacets = useSelector(selectedFacetsSelector);
  const selectedFacetPrices = useSelector(selectedFacetPricesSelector);
  const selectedMinPrice = selectedFacetPrices.min;
  const selectedMaxPrice = selectedFacetPrices.max;
  const priceSelected = selectedMinPrice > -1 && selectedMaxPrice > -1;
  const selectedSortOption = useSelector(selectedSortOptionSelector);
  const selectedPageOffset = useSelector(selectedPageOffsetSelector);
  const contract = useSelector(currentContractIdSelector);

  const sortOptions = getSortOptions();
  const suggestedKeywords = useSelector(keywordSelector);

  const cid = props.cid;
  const categoryId: string = props.categoryId ? props.categoryId : "";
  const searchTerm: string = props.searchTerm ? props.searchTerm : "";

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const mySite: any = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  const locale: string = i18n.languages[0].split("-").join("_");
  const pageLimit: number = PAGINATION_CONFIGS.pageLimit;
  const pageDefaultOffset: number = PAGINATION_CONFIGS.pageDefaultOffset;
  const pageCountTotal: number = Math.ceil(productListTotal / pageLimit);
  const selectedPage = selectedPageOffset / pageLimit + 1;

  const paramsBase: any = {
    currency: defaultCurrencyID,
    contractId: contract ? contract : "",
    _fields: PRODUCT_LIST_FIELDS,
    limit: pageLimit,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  if (categoryId !== "") {
    paramsBase["categoryId"] = categoryId;
  }

  if (searchTerm !== "") {
    paramsBase["searchTerm"] = searchTerm;
  }

  useEffect(() => {
    return () => {
      dispatch(catalogActions.resetProductListAction());
      cancels.forEach((cancel) => cancel());
    };
  }, []);

  /**
   * Removes selected facet and dispatches request to get product list
   * @param selection The selected facet entry's value
   */
  function onFacetRemove(selection: string) {
    let newSelectedFacets = { ...selectedFacets };
    if (newSelectedFacets[selection] !== undefined) {
      const {
        [selection]: tempLabel,
        ...newRemovedSelectedFacets
      }: { [key: string]: string } = newSelectedFacets;
      newSelectedFacets = newRemovedSelectedFacets;
    }

    const newStates = {
      selectedFacets: newSelectedFacets,
    };
    dispatchGetProductListAction(
      newSelectedFacets,
      selectedFacetLimits,
      selectedMinPrice,
      selectedMaxPrice,
      pageDefaultOffset,
      selectedSortOption,
      newStates
    );
  }

  /**
   * Removes all selected facet and dispatches request to get product list
   * @param event The event handler
   */
  function onClearAll(event: MouseEvent<HTMLAnchorElement>) {
    event?.preventDefault();
    let newSelectedFacets = {};

    const newStates = {
      selectedFacets: newSelectedFacets,
      minPrice: -1,
      maxPrice: -1,
    };
    dispatchGetProductListAction(
      newSelectedFacets,
      selectedFacetLimits,
      -1,
      -1,
      pageDefaultOffset,
      selectedSortOption,
      newStates
    );
  }

  /**
   * Gets the list of default product sort options plus price sort options if price mode allows
   * @returns List of permitted sort options
   */
  function getSortOptions() {
    let sortOptionsArray = SORT_OPTIONS.defaultSortOptions;
    if (priceMode === "1") {
      sortOptionsArray = sortOptionsArray.concat(SORT_OPTIONS.priceSortOptions);
    }

    return sortOptionsArray;
  }

  /**
   * Sets the sort option to order the product list and dispatches request to get product list
   * @param event The event handler
   */
  function onSortOptionChange(
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) {
    const selection = event.target.value as string;

    const newStates = {
      selectedSortOption: selection,
    };
    dispatchGetProductListAction(
      selectedFacets,
      selectedFacetLimits,
      selectedMinPrice,
      selectedMaxPrice,
      pageDefaultOffset,
      selection,
      newStates
    );
  }

  /**
   * Reset the selected price range and dispatches request to get product list
   */
  function clearPriceFacet() {
    const newStates = {
      minPrice: -1,
      maxPrice: -1,
    };
    dispatchGetProductListAction(
      selectedFacets,
      selectedFacetLimits,
      -1,
      -1,
      pageDefaultOffset,
      selectedSortOption,
      newStates
    );
  }

  /**
   * Sets the page offset and dispatches request to get product list
   * @param value The page number
   */
  function onPageChange(value: number) {
    value = value * pageLimit - pageLimit;

    if (value >= 0) {
      const newStates = {
        selectedPageOffset: value,
      };
      dispatchGetProductListAction(
        selectedFacets,
        selectedFacetLimits,
        selectedMinPrice,
        selectedMaxPrice,
        value,
        selectedSortOption,
        newStates
      );
    }
  }

  /**
   * Wrapper to dispatch request to get product list
   * @param selectedFacets The updated selected facets map
   * @param selectedFacetLimits The updated selected facet limits array
   * @param selectedMinPrice The selected min price or -1, if not set
   * @param selectedMaxPrice The selected max price or -1, if not set
   * @param selectedPageOffset The selected offset for pagination
   * @param selectedSortOption The selected sort option
   * @param states The states that have changed and should be persisted back to redux
   */
  function dispatchGetProductListAction(
    selectedFacets: any,
    selectedFacetLimits: string[],
    selectedMinPrice: number,
    selectedMaxPrice: number,
    selectedPageOffset: number,
    selectedSortOption: string,
    states: any
  ) {
    let parameters = { ...paramsBase };
    const selectedFacetsArray = Object.keys(selectedFacets);
    if (selectedFacetsArray.length > 0) {
      parameters["facet"] = selectedFacetsArray;
    }
    if (selectedFacetLimits.length > 0) {
      parameters["facetLimit"] = selectedFacetLimits;
    }
    if (selectedMinPrice > -1 && selectedMaxPrice > -1) {
      parameters["minPrice"] = selectedMinPrice;
      parameters["maxPrice"] = selectedMaxPrice;
    }
    if (selectedPageOffset >= 0) {
      parameters["offset"] = selectedPageOffset;
    }
    if (selectedSortOption !== "0") {
      parameters["orderBy"] = selectedSortOption;
    }

    const newStates = { ...states };
    if (newStates["selectedPageOffset"] === undefined) {
      newStates["selectedPageOffset"] = pageDefaultOffset;
    }

    dispatch(
      catalogActions.getProductListAction({
        parameters: parameters,
        states: newStates,
      })
    );
    window.scrollTo(0, 0);
  }

  return (
    <div className="product-listing-container productListingWidget top-margin-3">
      {productListTotal === 0 &&
        searchTerm !== "" &&
        suggestedKeywords.length > 0 && (
          <div id={`productGrid_div_18_${cid}`} className="suggested-keywords">
            <h4 id={`productGrid_p_19_${cid}`}>
              {t("ProductGrid.Labels.noMatches", { searchTerm: searchTerm })}
            </h4>
            <p id={`productGrid_p_21_${cid}`}>
              {t("ProductGrid.Labels.searchAgain", { searchTerm: searchTerm })}
            </p>
            <>
              {t("ProductGrid.Labels.suggestion")}
              <br />
              {suggestedKeywords?.map((keyword: string, index: number) => (
                <Link
                  key={keyword}
                  to={SEARCH + "?searchTerm=" + keyword}
                  onClick={() => {}}
                  className="suggestion-link"
                  id={`productGrid_a_22_${index}_${cid}`}>
                  {keyword} <br />
                </Link>
              ))}
            </>
          </div>
        )}

      {/* Summary info and sort options */}
      {productListTotal > 0 && (
        <StyledGrid
          container
          className="bottom-margin-1"
          justify="space-between"
          alignItems="center">
          <StyledGrid item>
            <StyledTypography variant="subtitle2">
              {categoryId !== ""
                ? t("ProductGrid.Labels.productFound", {
                    count: productListTotal,
                  })
                : t("ProductGrid.Labels.productSearchFound", {
                    count: productListTotal,
                    searchTerm: searchTerm,
                  })}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item>
            <StyledFormControl variant="outlined">
              <StyledSelect
                id={`productGrid_select_6_${cid}`}
                value={selectedSortOption}
                onChange={(event) => onSortOptionChange(event)}
                fullWidth>
                {sortOptions.map((option: any, index: number) => (
                  <StyledMenuItem
                    value={option.value}
                    key={option.value}
                    id={`productGrid_option_7_${index}_${cid}`}>
                    {t(`${option.translationKey}`)}
                  </StyledMenuItem>
                ))}
              </StyledSelect>
            </StyledFormControl>
          </StyledGrid>
        </StyledGrid>
      )}

      {/* Facet selection listing */}
      {productListTotal > 0 &&
        (Object.keys(selectedFacets).length > 0 || priceSelected) && (
          <StyledGrid
            item
            container
            direction="row"
            alignItems="center"
            className="bottom-margin-3">
            <StyledTypography variant="body2">
              {t("ProductGrid.Labels.filteredBy")}
            </StyledTypography>
            {Object.keys(selectedFacets).map((key: string, index: number) => (
              <Fragment key={key}>
                <StyledChip
                  size="medium"
                  className="left-margin-1"
                  label={selectedFacets[key]}
                  onClick={() => onFacetRemove(key)}
                  onDelete={() => onFacetRemove(key)}
                />
              </Fragment>
            ))}
            {priceSelected && (
              <StyledChip
                size="medium"
                className="left-margin-1"
                label={
                  <FormattedPriceDisplay
                    min={selectedMinPrice}
                    max={selectedMaxPrice}
                    currency={defaultCurrencyID}
                    locale={locale}
                  />
                }
                onClick={() => clearPriceFacet()}
                onDelete={() => clearPriceFacet()}
              />
            )}
            {(Object.keys(selectedFacets).length > 1 ||
              (priceSelected && Object.keys(selectedFacets).length > 0)) && (
              <StyledButton variant="text" className="left-margin-1">
                <Link
                  onClick={(event) => onClearAll(event)}
                  to=""
                  className="clear-all">
                  {t("ProductGrid.Actions.clearAll")}
                </Link>
              </StyledButton>
            )}
          </StyledGrid>
        )}

      {/* Product listing and pagination */}
      <StyledGrid container spacing={2} alignItems="stretch" direction="row">
        {productListTotal > 0 ? (
          productList.map((product: any, index: number) => (
            <StyledGrid item xs={6} sm={4} lg={3} key={product.id}>
              <ProductCardLayout product={product} />
            </StyledGrid>
          ))
        ) : (
          <>
            {productListTotal === 0 && (
              <StyledGrid item xs={12}>
                {t("ProductGrid.Labels.noProductsFoundForFilter")}
              </StyledGrid>
            )}
          </>
        )}
      </StyledGrid>
      {productListTotal > pageLimit && (
        <StyledPagination
          count={pageCountTotal}
          shape="rounded"
          page={selectedPage}
          onChange={(event: ChangeEvent<unknown>, value: number) =>
            onPageChange(value)
          }
        />
      )}
    </div>
  );
};

export default ProductGridLayout;
