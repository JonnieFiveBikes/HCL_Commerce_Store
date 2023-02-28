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
import React, { useState, Fragment } from "react";

//UI
import {
  StyledGrid,
  StyledButton,
  StyledCheckbox,
  StyledChip,
  StyledSidebar,
  StyledFormControlLabel,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledSwatch,
  StyledNumberInput,
  StyledLink,
} from "../../elements";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

interface ProductFilterProps {
  onInputClick: (event: object) => void;
  toggleFacetLimit: (
    event: any, //: MouseEvent<HTMLAnchorElement>,
    facetValue: string
  ) => void;
  showMoreButton: (facet: any) => any;
  showLessButton: (facet: any) => any;
  clearPriceFacet: () => void;
  validatePriceRange: () => boolean;
  onMaxPriceChange: (v: number) => void;
  onMinPriceChange: (v: number) => void;
  isFacetSelected: (v: string) => boolean;
  onFacetChange: (selection: string, label: string) => void;
  showFacet: (facet: any) => boolean;
  isCategoryFacet: (facet: any) => boolean;
  isPriceFacet: (facet: any) => boolean;
  getFacetTitle: (facet: any) => string;
  onPriceSubmit: () => void;
  isSubmitButtonEnabled: boolean;
  facets: Array<any> | null;
  priceSelected: boolean;
  FACET_CATEGORY_VALUE_PREFIX: string;
  cid: string;
  priceLabel: string;
  maxPriceLabel: string;
  minPriceLabel: string;
  filterLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  filterByLabel: string;
  minPrice: number | null;
  maxPrice: number | null;
  formattedPriceDisplay: any;
}

/**
 * Product Filter component
 * displays price, brand and other facets
 * @param props
 */
export const ProductFilterWidget: React.FC<ProductFilterProps> = (props: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isActiveFacetId, setIsActiveFacetId] = useState<string>(() => "");

  const {
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
    onPriceSubmit,
    FACET_CATEGORY_VALUE_PREFIX,
    cid,
    priceLabel,
    maxPriceLabel,
    minPriceLabel,
    filterByLabel,
    filterLabel,
    showMoreLabel,
    showLessLabel,
    minPrice,
    maxPrice,
    formattedPriceDisplay,
  } = props;

  const filterList = (
    <>
      {facets?.map((facet: any, index: number) =>
        showFacet(facet) ? (
          <StyledAccordion
            testId={`productFilter-facet-${facet.name}`}
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
            <StyledAccordionSummary className="top-padding-1" expandIcon={isMobile ? <ExpandMoreIcon /> : null}>
              {isPriceFacet(facet) ? priceLabel : getFacetTitle(facet)}
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              {isPriceFacet(facet) ? (
                <>
                  {priceSelected && minPrice > -1 && maxPrice > -1 ? (
                    <StyledChip
                      size="medium"
                      label={formattedPriceDisplay}
                      onClick={() => clearPriceFacet()}
                      onDelete={() => clearPriceFacet()}
                      data-testid="product-filter-formatted-price-chip"
                    />
                  ) : (
                    <StyledGrid
                      container
                      className="price-filter price-filter-input"
                      id={`productFilter_div_12_${index}`}>
                      <StyledGrid xs={12} container item spacing={1} onClick={onInputClick}>
                        <StyledGrid item xs={12} sm>
                          <StyledNumberInput
                            value={minPrice !== null ? minPrice : ""}
                            min={0}
                            precision={2}
                            placeholder={minPriceLabel}
                            onChange={(valueAsNumber: number) => onMinPriceChange(valueAsNumber)}
                            error={!validatePriceRange()}
                          />
                        </StyledGrid>
                        <StyledGrid item xs={12} sm>
                          <StyledNumberInput
                            value={maxPrice !== null ? maxPrice : ""}
                            min={0}
                            precision={2}
                            placeholder={maxPriceLabel}
                            onChange={(valueAsNumber: number) => onMaxPriceChange(valueAsNumber)}
                            error={!validatePriceRange()}
                          />
                        </StyledGrid>
                      </StyledGrid>
                      <StyledGrid xs={12} item>
                        <StyledButton
                          testId={`productFilter_price_facet`}
                          disabled={!isSubmitButtonEnabled}
                          size="small"
                          className="price-go"
                          id={`productFilter_button_19_${index}`}
                          onClick={() => onPriceSubmit()}>
                          {filterLabel}
                        </StyledButton>
                      </StyledGrid>
                    </StyledGrid>
                  )}
                </>
              ) : (
                <StyledGrid container justifyContent="flex-start" alignItems="flex-start">
                  <StyledGrid item container>
                    {/* Container make it flex so that swatch image behaves properly after select */}
                    {facet.entry?.map((entry: any, _: number) => (
                      <Fragment key={entry.value}>
                        {entry.image ? (
                          <StyledSwatch
                            style={{
                              backgroundImage: `url("${entry.image}")`,
                            }}
                            onClick={(e) => onFacetChange(e, entry.value, entry.label)}
                            size="medium"
                            selected={isFacetSelected(entry.value)}
                            data-testid={`product-filter-${entry.value.toLowerCase()}-swatch`}
                          />
                        ) : (
                          <StyledFormControlLabel
                            className="top-margin-1 full-width"
                            control={
                              <StyledCheckbox
                                checked={isFacetSelected(
                                  (isCategoryFacet(facet) ? FACET_CATEGORY_VALUE_PREFIX : "") + entry.value
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) =>
                                  onFacetChange(
                                    e,
                                    (isCategoryFacet(facet) ? FACET_CATEGORY_VALUE_PREFIX : "") + entry.value,
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
                  </StyledGrid>
                  <StyledGrid item className="top-margin-1 full-width">
                    {facet.entry && showMoreButton(facet) ? (
                      <StyledLink
                        to=""
                        className="go-link"
                        id={`productFilter_a_26_${index}_${cid}`}
                        testId={`productFilter_${showMoreLabel}`}
                        onClick={(event) => toggleFacetLimit(event, facet.value)}>
                        {showMoreLabel}
                      </StyledLink>
                    ) : facet.entry && showLessButton(facet) ? (
                      <StyledLink
                        to=""
                        className="go-link"
                        id={`productFilter_a_27_${index}_${cid}`}
                        testId={`productFilter_${showLessLabel}`}
                        onClick={(event) => toggleFacetLimit(event, facet.value)}>
                        {showLessLabel}
                      </StyledLink>
                    ) : null}
                  </StyledGrid>
                </StyledGrid>
              )}
            </StyledAccordionDetails>
          </StyledAccordion>
        ) : null
      )}
    </>
  );

  return facets && facets.length > 0 ? (
    <StyledSidebar
      title={filterByLabel}
      sidebarContent={filterList}
      breakpoint="md"
      className="product-filter"
      scrollable={true}
    />
  ) : null;
};
