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

//UI
import { CategoryCard } from "../../components";
import { StyledGrid, StyledTypography } from "../../elements";

interface ChildCategoryGridWidgetProps {
  categories: Array<any>;
  categoryTitle: string | undefined;
  breadcrumbTrail: any;
}

/**
 *  Child Pim Categories widget
 *  @summary Displays Category Cards for each sub category .
 * `@prop {any} props` have following properties:
 * `@property {Array} categories(required)` this array includes all sub categories.
 * `@property {string | undefined} categoryTitle (required)` categoryTitle has the name of this sub category.
 */
export const ChildCategoryGridWidget: React.FC<ChildCategoryGridWidgetProps> = (props: any) => {
  const { categories, categoryTitle, breadcrumbTrail } = props;
  return (
    <>
      <StyledTypography variant="h4" className="vertical-margin-4">
        {categoryTitle}
      </StyledTypography>

      <StyledGrid container spacing={2}>
        {categories.map((cat: any) => (
          <StyledGrid item xs={12} md={6} key={cat.identifier}>
            <CategoryCard category={cat} parentBreadcrumbTrail={breadcrumbTrail} />
          </StyledGrid>
        ))}
      </StyledGrid>
    </>
  );
};
