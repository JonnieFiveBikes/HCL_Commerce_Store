/*
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
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
//hcl libraries
import { commonUtil } from "@hcl-commerce-store-sdk/utils";
//UI
import {
  StyledGrid,
  StyledPaper,
  StyledTypography,
  StyledProgressPlaceholder,
  StyledCategoryCard,
} from "../../elements";

type CategoryCardProps = {
  category: any;
  parentBreadcrumbTrail?: any;
};

/**
 * The layout for Category Card, which is used in Category Recommendation
 * widget layout.
 * @param category - a category object that contains category's info such as name, description, link, thumbnail etc
 */
export const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { category, parentBreadcrumbTrail } = props;
  const linkState = React.useMemo(() => {
    if (parentBreadcrumbTrail) {
      return {
        state: {
          breadCrumbTrailEntryView: [
            ...parentBreadcrumbTrail,
            { label: category.name, value: category.id, seo: category.seo },
          ],
        },
      };
    } else {
      return {};
    }
  }, [parentBreadcrumbTrail, category]);
  return (
    <>
      <StyledCategoryCard
        {...(category.performClick ? { onClick: category.performClick } : {})}
        to={category.seo?.href}
        {...linkState}>
        <StyledPaper>
          <StyledGrid container spacing={2} alignItems="center">
            <LazyLoadComponent
              visibleByDefault={(window as any).__isPrerender__ || false}
              placeholder={<StyledProgressPlaceholder className="vertical-padding-20" />}>
              <StyledGrid item xs={5} sm={4} md={6}>
                <img alt="" src={commonUtil.getThumbnailImagePath(category.thumbnail, category.fullImage)}></img>
              </StyledGrid>
            </LazyLoadComponent>
            <StyledGrid item xs={7} sm={6} className="horizontal-padding-2 vertical-padding-1">
              <StyledTypography variant="h3" className="category-card-text">
                {category.name}
              </StyledTypography>
              <StyledTypography variant="subtitle2" className="top-margin-2 category-card-text">
                {category.description}
              </StyledTypography>
            </StyledGrid>
          </StyledGrid>
        </StyledPaper>
      </StyledCategoryCard>
    </>
  );
};
