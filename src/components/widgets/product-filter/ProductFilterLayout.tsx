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
import React, { useState, useEffect, Fragment, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, batch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";

//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";

//Custom libraries
import {
  PRODUCT_LIST_FIELDS,
  PAGINATION_CONFIGS,
} from "../../../configs/catalog";
import FormattedPriceDisplay from "../formatted-price-display";

//Redux
import {
  facetsSelector,
  selectedFacetsSelector,
  selectedFacetLimitsSelector,
  selectedFacetPricesSelector,
  selectedSortOptionSelector,
} from "../../../redux/selectors/catalog";
import * as catalogActions from "../../../redux/actions/catalog";
import { currentContractIdSelector } from "../../../redux/selectors/contract";

//UI
import {
  StyledGrid,
  StyledButton,
  StyledCheckbox,
  StyledFormControlLabel,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledChip,
  StyledNumberInput,
  StyledSwatch,
  StyledSidebar,
  StyledBox,
} from "../../StyledUI";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

interface ProductFilterProps {
  cid: string;
  categoryId?: string;
  searchTerm?: string;
}

/**
 * Product Filter component
 * displays price, brand and other facets
 * @param props
 */
const ProductFilterLayout: React.FC<ProductFilterProps> = (props: any) => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [isMinPriceValid, setIsMinPriceValid] = useState<boolean>(true);
  const [isMaxPriceValid, setIsMaxPriceValid] = useState<boolean>(true);
  const [isActiveFacetId, setIsActiveFacetId] = useState<string>("");
  const isSubmitButtonEnabled = enableSubmitButton();

  const facets = useSelector(facetsSelector);
  const selectedFacets = useSelector(selectedFacetsSelector);
  const selectedFacetLimits = useSelector(selectedFacetLimitsSelector);
  const selectedFacetPrices = useSelector(selectedFacetPricesSelector);
  const selectedSortOption = useSelector(selectedSortOptionSelector);
  const contract = useSelector(currentContractIdSelector);

  const selectedMinPrice = selectedFacetPrices.min;
  const selectedMaxPrice = selectedFacetPrices.max;
  const priceSelected = selectedMinPrice > -1 && selectedMaxPrice > -1;

  const cid = props.cid;
  const categoryId: string = props.categoryId ? props.categoryId : "";
  const searchTerm: string = props.searchTerm ? props.searchTerm : "";

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { mySite } = useSite();
  const theme = useTheme();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  const locale: string = i18n.languages[0].split("-").join("_");
  const pageLimit: number = PAGINATION_CONFIGS.pageLimit;
  const pageDefaultOffset: number = PAGINATION_CONFIGS.pageDefaultOffset;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
  if (searchTerm !== "") {
    paramsBase["searchTerm"] = searchTerm;
  }

  useEffect(() => {
    if (
      mySite &&
      contract !== null &&
      (categoryId !== "" || searchTerm !== "")
    ) {
      dispatch(
        catalogActions.getProductListAction({
          parameters: paramsBase,
        })
      );
    }

    return () => {
      dispatch(catalogActions.resetProductListAction());
      cancels.forEach((cancel) => cancel());
    };
  }, [categoryId, mySite, contract]);

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
  function getFacetTitle(facet: any) {
    return facet.value === FACET_BRAND_TITLE || isCategoryFacet(facet)
      ? facet.extendedData.fname
      : facet.name;
  }

  /**
   * Whether this is a price facet
   * @param facet The facet object
   * @returns boolean flag if it is a price facet
   */
  function isPriceFacet(facet: any) {
    return facet.value.startsWith(FACET_PRICE_PREFIX);
  }

  /**
   * Whether this is a category facet
   * @param facet The facet object
   * @returns boolean flag if it is a category facet
   */
  function isCategoryFacet(facet: any) {
    return facet.value === FACET_CATEGORY_TITLE;
  }

  /**
   * Whether to display the facet
   * @param facet The facet object
   * @returns boolean flag to show or hide facet
   */
  function showFacet(facet: any) {
    return (!isCategoryFacet(facet) && categoryId !== "") || searchTerm !== "";
  }

  /**
   * Toggles the selected facet and dispatches request to get product list
   * @param selection The selected facet entry's value
   * @param label The selected facet entry's label
   */
  function onFacetChange(selection: string, label: string) {
    let newSelectedFacets = { ...selectedFacets };
    if (newSelectedFacets[selection] === undefined) {
      const newAddedSelectedFacets = {
        ...newSelectedFacets,
        [selection]: label,
      };
      newSelectedFacets = newAddedSelectedFacets;
    } else {
      const {
        [selection]: tempLabel,
        ...newRemovedSelectedFacets
      }: { [key: string]: string } = newSelectedFacets;
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

    dispatchGetProductListAction(
      newSelectedFacets,
      selectedFacetLimits,
      selectedMinPrice,
      selectedMaxPrice,
      newStates
    );
  }

  /**
   * Whether or not the facet value has been selected
   * @param value The facet value to check
   * @returns boolean flag if facet value is selected
   */
  function isFacetSelected(value: string) {
    return selectedFacets[value] !== undefined;
  }

  /**
   * Update min price based on input action
   * @param valueAsNumber The input number
   */
  function onMinPriceChange(valueAsNumber: number) {
    setMinPrice(valueAsNumber);
    setIsMinPriceValid(valueAsNumber !== null);
  }

  /**
   * Update max price based on input action
   * @param valueAsNumber The input number
   */
  function onMaxPriceChange(valueAsNumber: number) {
    setMaxPrice(valueAsNumber);
    setIsMaxPriceValid(valueAsNumber !== null);
  }

  /**
   * Validates min/max price range after both min/max prices are validated,
   * to differentiate the error between input fields or range
   * @returns boolean flag if price range is valid
   */
  function validatePriceRange() {
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
  }

  /**
   * whether or to enable price submit button dependent if min/max prices are valid
   * @returns boolean flag if button should be enabled
   */
  function enableSubmitButton() {
    return (
      isMinPriceValid &&
      isMaxPriceValid &&
      minPrice !== null &&
      maxPrice !== null &&
      validatePriceRange()
    );
  }

  /**
   * Submits the valid selected price range and dispatches request to get product list
   */
  function onPriceSubmit() {
    if (
      minPrice != null &&
      maxPrice != null &&
      isMinPriceValid &&
      isMaxPriceValid &&
      validatePriceRange()
    ) {
      batch(() => {
        const newStates = {
          minPrice: minPrice,
          maxPrice: maxPrice,
        };
        dispatchGetProductListAction(
          selectedFacets,
          selectedFacetLimits,
          minPrice,
          maxPrice,
          newStates
        );
      });
    }
  }

  /**
   * Reset the selected price range and dispatches request to get product list
   */
  function clearPriceFacet() {
    batch(() => {
      const newStates = {
        selectedFacets: selectedFacets,
        minPrice: -1,
        maxPrice: -1,
      };
      dispatchGetProductListAction(
        selectedFacets,
        selectedFacetLimits,
        -1,
        -1,
        newStates
      );
    });
  }

  /**
   * whether or display the Show More link for the given facet
   * @param facet The facet object
   * @returns boolean flag to show Show More link or not
   */
  function showMoreButton(facet: any) {
    return (
      facet.extendedData &&
      (facet.extendedData.allValuesReturned === false ||
        facet.extendedData.allValuesReturned === "false")
    );
  }

  /**
   * whether or display the Show Less link for the given facet
   * @param facet The facet object
   * @returns boolean flag to show Show Less link or not
   */
  function showLessButton(facet: any) {
    let maximumValuesToDisplay = facet?.entry?.length;
    if (facet && facet.extendedData) {
      if (typeof facet.extendedData.maximumValuesToDisplay === "string") {
        try {
          maximumValuesToDisplay = parseInt(
            facet.extendedData.maximumValuesToDisplay
          );
        } catch (error) {
          console.log("Cannot parse facet maximumValuesToDisplay");
        }
      } else {
        maximumValuesToDisplay = facet.extendedData.maximumValuesToDisplay;
      }
    }

    return (
      facet &&
      facet.extendedData &&
      (facet.extendedData.allValuesReturned === true ||
        facet.extendedData.allValuesReturned === "true") &&
      (facet.extendedData.maximumValuesToDisplay !== -1 ||
        facet.extendedData.maximumValuesToDisplay !== "-1") &&
      maximumValuesToDisplay < facet.entry.length
    );
  }

  /**
   * Toggles the show more/less facet values and dispatches request to get product list
   * @param event The event handler
   * @param facetValue The facet value to retrieve more/less of
   */
  function toggleFacetLimit(
    event: MouseEvent<HTMLAnchorElement>,
    facetValue: string
  ) {
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
    dispatchGetProductListAction(
      selectedFacets,
      newSelectedFacetLimits,
      selectedMinPrice,
      selectedMaxPrice,
      newStates
    );
  }

  /**
   * Wrapper to dispatch request to get product list
   * @param selectedFacets The updated selected facets map
   * @param selectedFacetLimits The updated selected facet limits array
   * @param selectedMinPrice The selected min price or -1, if not set
   * @param selectedMaxPrice The selected max price or -1, if not set
   * @param states The states that have changed and should be persisted back to redux
   */
  function dispatchGetProductListAction(
    selectedFacets: any,
    selectedFacetLimits: string[],
    selectedMinPrice: number,
    selectedMaxPrice: number,
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

    const newStates = { ...states };
    newStates["selectedPageOffset"] = pageDefaultOffset;

    dispatch(
      catalogActions.getProductListAction({
        parameters: parameters,
        states: newStates,
      })
    );
  }

  const onInputClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const filterList = (
    <>
      {facets &&
        facets.map(
          (facet: any, index: number) =>
            showFacet(facet) && (
              <StyledAccordion
                defaultExpanded={!isMobile}
                key={facet.value}
                expanded={!isMobile || isActiveFacetId === facet.value}
                onClick={() => {
                  if (isMobile) {
                    if (isActiveFacetId === facet.value) {
                      setIsActiveFacetId("");
                    } else {
                      setIsActiveFacetId(facet.value);
                    }
                  }
                }}>
                <StyledAccordionSummary
                  expandIcon={isMobile ? <ExpandMoreIcon /> : null}>
                  {isPriceFacet(facet)
                    ? t("ProductFilter.Labels.price")
                    : getFacetTitle(facet)}
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  {isPriceFacet(facet) ? (
                    <>
                      {priceSelected && minPrice && maxPrice ? (
                        <StyledChip
                          size="medium"
                          label={
                            <FormattedPriceDisplay
                              min={minPrice}
                              max={maxPrice}
                              currency={defaultCurrencyID}
                              locale={locale}
                            />
                          }
                          onClick={() => clearPriceFacet()}
                          onDelete={() => clearPriceFacet()}
                        />
                      ) : (
                        <div
                          className="price-filter price-filter-input"
                          id={`productFilter_div_12_${index}_${cid}`}>
                          <StyledBox pb={1} onClick={onInputClick}>
                            <StyledNumberInput
                              value={minPrice !== null ? minPrice : ""}
                              min={0}
                              precision={2}
                              placeholder={t("ProductFilter.Labels.minPrice")}
                              onChange={(valueAsNumber) =>
                                onMinPriceChange(valueAsNumber)
                              }
                              error={!validatePriceRange()}
                            />
                            <StyledNumberInput
                              value={maxPrice !== null ? maxPrice : ""}
                              min={0}
                              precision={2}
                              placeholder={t("ProductFilter.Labels.maxPrice")}
                              onChange={(valueAsNumber) =>
                                onMaxPriceChange(valueAsNumber)
                              }
                              error={!validatePriceRange()}
                            />
                          </StyledBox>
                          <StyledButton
                            disabled={!isSubmitButtonEnabled}
                            size="small"
                            className="price-go"
                            id={`productFilter_button_19_${index}_${cid}`}
                            onClick={() => onPriceSubmit()}>
                            {t("ProductFilter.Actions.Go")}
                          </StyledButton>
                        </div>
                      )}
                    </>
                  ) : (
                    <StyledGrid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start">
                      {facet.entry &&
                        facet.entry.map((entry: any, _: number) => (
                          <Fragment key={entry.value}>
                            {entry.image ? (
                              <StyledSwatch
                                style={{
                                  backgroundImage: `url("${entry.image}")`,
                                }}
                                onClick={(_) =>
                                  onFacetChange(entry.value, entry.label)
                                }
                                size="medium"
                                selected={isFacetSelected(entry.value)}
                              />
                            ) : (
                              <StyledFormControlLabel
                                className="top-margin-1 full-width"
                                control={
                                  <StyledCheckbox
                                    checked={isFacetSelected(
                                      (isCategoryFacet(facet)
                                        ? FACET_CATEGORY_VALUE_PREFIX
                                        : "") + entry.value
                                    )}
                                    onChange={(_) =>
                                      onFacetChange(
                                        (isCategoryFacet(facet)
                                          ? FACET_CATEGORY_VALUE_PREFIX
                                          : "") + entry.value,
                                        entry.label
                                      )
                                    }
                                  />
                                }
                                label={`${entry.label} (${entry.count})`}
                              />
                            )}
                          </Fragment>
                        ))}
                      <div className="top-margin-1 full-width">
                        {facet.entry && showMoreButton(facet) && (
                          <Link
                            to=""
                            className="go-link"
                            id={`productFilter_a_26_${index}_${cid}`}
                            onClick={(event) =>
                              toggleFacetLimit(event, facet.value)
                            }>
                            {t("ProductFilter.Actions.showMore")}
                          </Link>
                        )}
                        {facet.entry && showLessButton(facet) && (
                          <Link
                            to=""
                            className="go-link"
                            id={`productFilter_a_27_${index}_${cid}`}
                            onClick={(event) =>
                              toggleFacetLimit(event, facet.value)
                            }>
                            {t("ProductFilter.Actions.showLess")}
                          </Link>
                        )}
                      </div>
                    </StyledGrid>
                  )}
                </StyledAccordionDetails>
              </StyledAccordion>
            )
        )}
    </>
  );

  return (
    <StyledSidebar
      title={t("ProductFilter.Labels.filterBy")}
      sidebarContent={filterList}
      breakpoint="md"
      className="product-filter"
      scrollable={true}
    />
  );
};

export default ProductFilterLayout;
