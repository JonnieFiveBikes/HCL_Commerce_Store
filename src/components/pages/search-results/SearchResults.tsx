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
import { useLocation } from "react-router-dom";
//Custom libraries
import { TwoColumnsLeftFilterLayout } from "../../layouts/two-colums-left-filter";
import { SectionContent } from "../../layouts/sectionContentType";
import { ProductFilterLayout } from "../../widgets/product-filter";
import { ProductGridLayout } from "../../widgets/product-grid";
import { SEARCHTERM } from "../../../constants/common";
//UI
import { StyledContainer } from "../../StyledUI";

const SearchResults: React.FC = (props: any) => {
  const { page } = props;
  const location = useLocation();

  let searchTerm = "";
  let searchParam = location.search;
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
        return (
          <ProductGridLayout
            cid={`search-results-${searchTerm}`}
            searchTerm={searchTerm}
          />
        );
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
        return (
          <ProductFilterLayout
            cid={`search-results-${searchTerm}`}
            searchTerm={searchTerm}
          />
        );
      },
    },
  ];

  return (
    <StyledContainer className="page">
      <TwoColumnsLeftFilterLayout
        cid={`search-results-${searchTerm}`}
        leftNavigationSection={leftNavigationSection}
        rightContentSection={rightContentSection}
        page={page}
      />
    </StyledContainer>
  );
};

export default SearchResults;
