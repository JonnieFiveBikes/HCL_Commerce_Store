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
import styled from "@mui/styled-engine-sc";
import { StyledContentCarouselSlider, StyledProgressPlaceholder } from "../../elements";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const StyledContentCarouselLayout = styled("div")`
  ${({ theme }) => `
    margin: ${theme.spacing(4)} 0;
  `}
`;

interface CarouselWidgetProps {
  slideList: any[];
  controls: any;
}

/**
 * Content Carousel Widget
 * For props definition, @see {@link CarouselWidgetProps}.
 * @param controls The controls prop which contains the carousel controls.
 * @param slideList The slideList prop which contains an Carousel Slides.
 */

const ContentCarouselWidget: React.FC<CarouselWidgetProps> = ({ slideList, controls }) => {
  return (
    <>
      <StyledContentCarouselLayout>
        {slideList && slideList.length > 0 ? (
          <LazyLoadComponent placeholder={<StyledProgressPlaceholder className="vertical-padding-20" />}>
            <StyledContentCarouselSlider slidesList={slideList} controls={controls} />
          </LazyLoadComponent>
        ) : null}
      </StyledContentCarouselLayout>
    </>
  );
};

export { ContentCarouselWidget };
