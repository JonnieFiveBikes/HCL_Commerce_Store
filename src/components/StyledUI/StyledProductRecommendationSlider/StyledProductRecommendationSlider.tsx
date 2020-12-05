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
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const StyledCarouselProvider = styled(({ ...props }) => (
  <CarouselProvider {...props} />
))`
  ${({ theme }) => `
  position: relative;
  padding: 0 ${theme.spacing(8)}px;
  margin-top: ${theme.spacing(3)}px;
  height: 320px;

  .carousel__back-button,
  .carousel__next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: ${theme.spacing(5)}px;
    width: ${theme.spacing(5)}px;
    border: none;
    border-radius: 50%;
    background: none;
    border: 1px solid transparent;

    &:hover {
      cursor: pointer;
      color: ${theme.palette.primary.main};
      border-color: ${theme.palette.primary.light};
    }
  }

  .carousel__back-button {
    left: 0;
  }

  .carousel__next-button {
    right: 0;
  }

  div {
    outline: none;
  }
  `}
`;

const StyledSlide = styled(({ ...props }) => <Slide {...props} />)`
  text-align: center;

  .product-card {
    max-width: 245px;
    min-width: 225px;
    display: inline-block;
    max-height: 330px;
  }
`;

const StyledStaticSlideList = styled.div`
  ${({ theme }) => `
    margin-top: ${theme.spacing(3)}px;

    > div {
      display: inline-block;
    }

    .product-card {
      max-width: 245px;
      min-width: 225px;
      display: inline-block;
      max-height: 330px;
      margin-right: ${theme.spacing(3)}px;
    }
  `}
`;

const StyledProductRecommendationSlider = ({ slidesList }) => {
  const theme = useTheme();
  let slidesShown: number = 4;
  let disabledSliding = false;

  if (useMediaQuery(theme.breakpoints.down("md"))) {
    slidesShown = 3;
  }

  if (useMediaQuery(theme.breakpoints.down("sm"))) {
    slidesShown = 2;
  }

  if (useMediaQuery(theme.breakpoints.down("xs"))) {
    slidesShown = 1;
  }

  // Check if there are enough slides to cycle through
  if (slidesShown >= slidesList.length) {
    disabledSliding = true;
  }

  return disabledSliding ? (
    <StyledStaticSlideList>
      {slidesList.map((slide: any, i: number) => slide)}
    </StyledStaticSlideList>
  ) : (
    <StyledCarouselProvider
      naturalSlideWidth={230}
      naturalSlideHeight={300}
      visibleSlides={slidesShown}
      step={slidesShown}
      infinite={true}
      dragEnabled={false}
      totalSlides={slidesList.length}>
      <Slider>
        {slidesList.map((slide: any, i: number) => (
          <StyledSlide index={i} key={i}>
            {slide}
          </StyledSlide>
        ))}
      </Slider>
      <ButtonBack>
        <ChevronLeftIcon />
      </ButtonBack>
      <ButtonNext>
        <ChevronRightIcon />
      </ButtonNext>
    </StyledCarouselProvider>
  );
};

export default StyledProductRecommendationSlider;
