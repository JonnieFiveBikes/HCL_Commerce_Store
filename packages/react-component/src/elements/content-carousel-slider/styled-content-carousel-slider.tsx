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
import styled from "@mui/styled-engine-sc";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMediaQuery } from "@mui/material";

const StyledCarouselProvider = styled(({ ...props }) => <CarouselProvider {...props} />)`
  ${({ theme }) => `
    position: relative;
    padding: 0 ${theme.spacing(0)};

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
   ${useMediaQuery(theme.breakpoints.down("lg")) ? "height: 444px;" : ""}
   ${useMediaQuery(theme.breakpoints.down("md")) ? "height: 205px;" : ""}
   ${useMediaQuery(theme.breakpoints.down("sm")) ? "height: 170px;" : ""}
   text-align: center;
   > .carousel__inner-slide {
     height: -moz-available;
     height: -webkit-fill-available;
     height: stretch;
   }
   `}
`;

const StyledContentCarouselSlider = ({ slidesList, controls }: any) => {
  const { interval, isPlaying, playDirection, infinite } = controls;
  const totalSlides = slidesList.length;
  return (
    <StyledCarouselProvider
      {...{ totalSlides, interval, isPlaying, playDirection, infinite }}
      naturalSlideWidth={100}
      naturalSlideHeight={40}>
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
export { StyledContentCarouselSlider };
