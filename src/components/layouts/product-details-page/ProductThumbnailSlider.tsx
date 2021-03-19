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
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ProductImage from "./ProductImage";
//Custom libraries
import commonUtil from "../../../_foundation/utils/commonUtil";

const StyledCarouselProvider = styled(({ ...props }) => (
  <CarouselProvider {...props} />
))`
  ${({ theme }) => `
  position: relative;
  text-align: center;

  .slide {
    box-sizing:unset;
  }

  div, button {
    outline: none;
  }

  .carousel__back-button,
  .carousel__next-button {
    height: ${theme.spacing(5)}px;
    width: ${theme.spacing(5)}px;
    border: none;
    background: none;
    border-radius: 50%;
    background: none;
    border: 1px solid transparent;

    &:hover {
      cursor: pointer;
      color: ${theme.palette.primary.main};
      border-color: ${theme.palette.primary.light};
    }
  }

  ${theme.breakpoints.down("sm")} {
    max-height: ${theme.spacing(50)}px;
    
    .carousel__back-button,
    .carousel__next-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .carousel__back-button {
      left: 0;
    }

    .carousel__next-button {
      right: 0;
    }

    .carousel__dot-group {
      position: absolute;
      left: 0;
      top: ${theme.spacing(1)}px;
    }

    .carousel__dot {
      width: ${theme.spacing(2)}px;
      height: ${theme.spacing(2)}px;
      border-radius: ${theme.spacing(1)}px;
      margin: ${theme.spacing(0.5)}px;
      border: 1px solid ${theme.palette.grey[300]};
      background-color: ${theme.palette.grey[300]};
      transition: background-color ${theme.transitions.duration.standard}ms ${
    theme.transitions.easing.easeIn
  };

      &:hover {
        background-color: ${theme.palette.secondary.light};
      }

      &.carousel__dot--selected {
        background-color: ${theme.palette.grey[200]};
        border-color: ${theme.palette.grey[300]};
      }
    }
  }
  `}
`;

const ProductThumbnailSlider = ({ slidesList, chooseImage, index }) => {
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
              isThumbnail={mobile ? false : true}
              isSelected={i === index ? true : false}
              fullImage={commonUtil.getThumbnailImagePath(
                e.thumbnail,
                e.fullImage
              )}
              isAngleImage={false}
              alt={e.name}
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

export default ProductThumbnailSlider;
