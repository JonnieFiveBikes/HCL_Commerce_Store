/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020, 2021
 *
 *==================================================
 */
//Standard libraries
import React from "react";
import { useLocation } from "react-router-dom";
import getDisplayName from "react-display-name";
import { useDispatch } from "react-redux";
//Custom libraries
import { SectionContent } from "../../../_foundation/constants/section-content-type";
import FacetNavigationWidget from "../../commerce-widgets/facet-navigation-widget/facet-navigation-widget";
import CatalogEntryListWidget from "../../commerce-widgets/catalog-entry-list-widget/catalog-entry-list-widget";
import { SEARCHTERM } from "../../../constants/common";
import { TRIGGER_MARKETING_ACTION } from "../../../redux/actions/marketingEvent";
//UI
import { StyledContainer } from "@hcl-commerce-store-sdk/react-component";
import { ProductListingPageLayout } from "@hcl-commerce-store-sdk/react-component";

const SearchResults: React.FC = (props: any) => {
  const { widget, page } = props;
  const location: any = useLocation();
  const widgetName = getDisplayName(SearchResults);
  const dispatch = useDispatch();

  let searchTerm = "";
  const searchParam = location.search;
  if (searchParam) {
    const params = new URLSearchParams(searchParam);
    const searchTermValue = params.get(SEARCHTERM);
    if (searchTermValue !== null && searchTermValue !== undefined) {
      searchTerm = searchTermValue;
    }
  }

  const rightContentSection: SectionContent[] = [
    {
      key: `search-results-rightContentSection-product-grid-${searchTerm}`,
      CurrentComponent: () => {
        return <CatalogEntryListWidget cid={`search-results-${searchTerm}`} page={page} searchTerm={searchTerm} />;
      },
    },
    {
      key: `search-results-rightContentSection-product-recommendation-${searchTerm}`,
      CurrentComponent: () => {
        //place holder for product-recommendation layout.
        return <></>;
      },
    },
  ];

  const leftNavigationSection: SectionContent[] = [
    {
      key: `search-results-leftNavigationSection-product-filter-${searchTerm}`,
      CurrentComponent: () => {
        return <FacetNavigationWidget widget={widget} page={page} {...{ searchTerm }} />;
      },
    },
  ];

  const slots: { [key: string]: SectionContent[] } = {
    2: leftNavigationSection,
    3: rightContentSection,
  };

  React.useEffect(() => {
    if (searchTerm) {
      dispatch(
        TRIGGER_MARKETING_ACTION({
          searchTerm,
          DM_ReqCmd: "SearchDisplay",
          widget: widgetName,
        })
      );
    }
    // only care about searchTerm.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <StyledContainer className="page">
      <ProductListingPageLayout cid={`search-results-${searchTerm}`} slots={slots} />
    </StyledContainer>
  );
};

export default SearchResults;
