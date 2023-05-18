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
import { Suspense } from "react";
import HTMLReactParser from "html-react-parser";
import { LazyLoadComponent } from "react-lazy-load-image-component";
//Custom libraries
import { CategoryCard } from "../../components/category-card";
//UI libraries
import { StyledGrid, StyledTypography, StyledProgressPlaceholder } from "../../elements";
import { EMarketingSpotWidgetProps } from "../../types";

/**
 * Category recommendation widget.
 * For props definition, @see {@link EMarketingSpotWidgetProps}.
 * @param props The props for `CategoryRecommendationWidgetProps`, which contains an eSpot object.
 */
export const CategoryRecommendationWidget: React.FC<EMarketingSpotWidgetProps> = ({ eSpot, ...props }) => {
  const { category } = eSpot;

  return (
    <>
      {category.id && (
        <>
          {category.title && (
            <StyledTypography variant="h4" className="vertical-margin-4">
              {HTMLReactParser(category.title)}
            </StyledTypography>
          )}
        </>
      )}
      <StyledGrid container spacing={2} className="vertical-margin-2">
        {category.categories?.map((e: any) => (
          <StyledGrid
            item
            xs={12}
            md={6}
            key={e.identifier}
            id={`categoryRecommendation_div_2_${e.identifier}`}
            className="category-recommendation">
            <Suspense fallback={<StyledProgressPlaceholder className="vertical-padding-20" />}>
              <LazyLoadComponent
                visibleByDefault={(window as any).__isPrerender__ || false}
                placeholder={<StyledProgressPlaceholder className="vertical-padding-20" />}>
                <CategoryCard category={e} />
              </LazyLoadComponent>
            </Suspense>
          </StyledGrid>
        ))}
      </StyledGrid>
    </>
  );
};
