/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Slider, Slide, ButtonBack, ButtonNext, DotGroup } from "pure-react-carousel";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// Custom libraries
import { commonUtil } from "@hcl-commerce-store-sdk/utils";
import { StyledCarouselProvider } from "../../elements/carousel";
import { ProductImage } from "../product-image";

interface ProductThumbnailSliderProps {
  slidesList: any[];
  chooseImage: (e: any) => any;
  index?: number;
}

export const ProductThumbnailSlider: React.FC<ProductThumbnailSliderProps> = ({ slidesList, chooseImage, index }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const mobile = isSm || isXs;
  const visibleSlides = 4;

  const clickSlide = (e: any) => {
    chooseImage(e);
  };

  let slideWidth = 12;
  let slideHeight = 15;

  if (isSm) {
    slideWidth = 5;
    slideHeight = 3;
  }

  if (isXs) {
    slideWidth = 1;
    slideHeight = 1;
  }

  return (
    <StyledCarouselProvider
      naturalSlideWidth={slideWidth}
      naturalSlideHeight={slideHeight}
      visibleSlides={mobile ? 1 : visibleSlides}
      step={mobile ? 1 : visibleSlides}
      infinite={true}
      dragEnabled={mobile ? true : false}
      totalSlides={slidesList.length}
      orientation={mobile ? "horizontal" : "vertical"}>
      {slidesList.length > visibleSlides && !mobile && (
        <ButtonBack>
          <ExpandLessIcon />
        </ButtonBack>
      )}
      <Slider>
        {slidesList.map((e: any, i: number) => (
          <Slide index={i} key={i} onFocus={() => clickSlide(i)}>
            <ProductImage
              {...{
                fullImage: commonUtil.getThumbnailImagePath(e.thumbnail, e.fullImage),
                alt: e.name,
                isThumbnail: !mobile,
                isSelected: i === index,
              }}
            />
          </Slide>
        ))}
      </Slider>
      {mobile && <DotGroup />}
      {slidesList.length > 3 && !mobile && (
        <ButtonBack>
          <ExpandMoreIcon />
        </ButtonBack>
      )}
      {slidesList.length > 1 && mobile && (
        <>
          <ButtonBack>
            <ChevronLeftIcon />
          </ButtonBack>

          <ButtonNext>
            <ChevronRightIcon />
          </ButtonNext>
        </>
      )}
    </StyledCarouselProvider>
  );
};
