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
import React from "react";
import { useTranslation } from "react-i18next";
import {
  LazyComponentProps,
  trackWindowScroll,
} from "react-lazy-load-image-component";
//Foundation libraries
import { useProductGridLayout } from "../../_foundation/hooks/use-product-grid-layout";
//Custom libraries
import { CatalogEntryListWidget as CatalogEntryList } from "@hcl-commerce-store-sdk/react-component";
import { SEARCH } from "../../constants/routes";
import useProductCardWidget from "../widgets/product-card/ProductCardWidget";
import FormattedPriceDisplay from "../widgets/formatted-price-display";

interface ProductGridProps extends LazyComponentProps {
  cid: string;
  page?: any;
  searchTerm?: string;
}
/**
 * Product Grid component
 * displays catalog entry listing, pagination and selected facets
 * @summary Displays Product Card List in Grid Layout.
 * `@prop {any} props` have following properties:
 * `@property {String} cid(required)` Unique identifier used for layouts.`
 * `@property {String} page(optional)`  page object has category info such as category identifier.`
 * `@property {String} searchTerm(optional)` The input string for searching.`
 */
const CatalogEntryListWidget: React.FC<ProductGridProps> = (props: any) => {
  const cid = props.cid;
  const categoryId: string =
    props.page && props.page.tokenValue ? props.page.tokenValue : "";
  const searchTerm: string = props.searchTerm ? props.searchTerm : "";

  const {
    isValidUrl,
    onPageChange,
    clearPriceFacet,
    onSortOptionChange,
    onClearAll,
    onFacetRemove,
    priceSelected,
    selectedFacets,
    productListTotal,
    selectedSortOption,
    pageLimit,
    selectedPageOffset,
    defaultCurrencyID,
    selectedMaxPrice,
    productList,
    selectedMinPrice,
    sortOptions,
    suggestedKeywords,
    selectFacetRemove,
  } = useProductGridLayout({ categoryId, searchTerm, CatalogEntryListWidget });

  const ProductCards = useProductCardWidget({
    productListTotal,
    productList,
    categoryId,
  });

  const formattedPriceDisplay = (
    <FormattedPriceDisplay
      min={selectedMinPrice}
      max={selectedMaxPrice}
      currency={defaultCurrencyID}
    />
  );
  const { t } = useTranslation();

  // Translation File values
  const translation = {
    ProductGridLabelsnoMatches: t("ProductGrid.Labels.noMatches", {
      searchTerm: searchTerm,
    }),
    ProductGridLabelssearchAgain: t("ProductGrid.Labels.searchAgain", {
      searchTerm: searchTerm,
    }),
    ProductGridLabelssuggestion: t("ProductGrid.Labels.suggestion"),
    ProductGridLabelsproductFound: t("ProductGrid.Labels.productFound", {
      count: productListTotal,
    }),
    ProductGridLabelsproductSearchFound: t(
      "ProductGrid.Labels.productSearchFound",
      {
        count: productListTotal,
        searchTerm: searchTerm,
      }
    ),
    ProductGridLabelsfilteredBy: t("ProductGrid.Labels.filteredBy"),
    ProductGridActionsclearAll: t("ProductGrid.Actions.clearAll"),
    optiontranslationKey: sortOptions?.map((option: any) =>
      t(`${option.translationKey}`)
    ),
  };
  return (
    <CatalogEntryList
      {...{
        cid,
        categoryId,
        searchTerm,
        isValidUrl,
        onPageChange,
        clearPriceFacet,
        onSortOptionChange,
        onClearAll,
        onFacetRemove,
        priceSelected,
        selectedFacets,
        productListTotal,
        selectedSortOption,
        pageLimit,
        productList,
        sortOptions,
        selectedPageOffset,
        suggestedKeywords,
        SEARCH,
        formattedPriceDisplay,
        ProductCards,
        translation,
        selectFacetRemove,
      }}
    />
  );
};

export default trackWindowScroll(CatalogEntryListWidget);
