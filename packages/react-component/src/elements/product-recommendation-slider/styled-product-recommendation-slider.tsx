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
import React, { Fragment } from "react";
import styled from "@mui/styled-engine-sc";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const StyledCarouselProvider = styled(({ ...props }) => <CarouselProvider {...props} />)`
  ${({ theme }) => `
  position: relative;
  padding: 0 ${theme.spacing(8)};
  margin-top: ${theme.spacing(3)};
  height: 320px;

  ${theme.breakpoints.down(410)} {
    .carousel__slider.carousel__slider--horizontal {
      height: inherit;
      > .carousel__slider-tray-wrapper.carousel__slider-tray-wrap--horizontal {
        height: inherit;
        > .carousel__slider-tray.carousel__slider-tray--horizontal {
          height: inherit;
          > .carousel__slide {
            height: inherit;
          }
        }
      }
    }
  }

  .carousel__back-button,
  .carousel__next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: ${theme.spacing(5)};
    width: ${theme.spacing(5)};
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
  ${({ theme }) => `
    text-align: center;

    .product-card {
      max-width: 245px;
      ${theme.breakpoints.down(410)} {
        min-width: 195px;
      }
      ${theme.breakpoints.up(410)} {
        min-width: 225px;
      }
      display: inline-block;
      max-height: 330px;
    }
  `}
`;

const StyledStaticSlideList = styled("div")`
  ${({ theme }) => `
    margin-top: ${theme.spacing(3)};

    display: flex;
    justify-content: center;
    align-items: stretch;

    .product-card {
      max-width: 245px;
      min-width: 225px;
      display: inline-block;
      max-height: 330px;
      margin-right: ${theme.spacing(3)};
    }
  `}
`;

const StyledProductRecommendationSlider = ({ slidesList }: any) => {
  const theme = useTheme();
  let slidesShown = 4;
  let disabledSliding = false;

  if (useMediaQuery(theme.breakpoints.down("lg"))) {
    slidesShown = 3;
  }

  if (useMediaQuery(theme.breakpoints.down("md"))) {
    slidesShown = 2;
  }

  if (useMediaQuery(theme.breakpoints.down("sm"))) {
    slidesShown = 1;
  }

  // Check if there are enough slides to cycle through
  if (slidesShown >= slidesList.length) {
    disabledSliding = true;
  }

  return disabledSliding ? (
    <StyledStaticSlideList>
      {slidesList.map((slide: any, i: number) => (
        <Fragment key={i}>{slide}</Fragment>
      ))}
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

export { StyledProductRecommendationSlider };
