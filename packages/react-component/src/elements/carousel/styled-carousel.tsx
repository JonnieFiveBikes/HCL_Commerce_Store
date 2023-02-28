/*
 ***************************************************
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 ***************************************************
 */
import styled from "@mui/styled-engine-sc";
import { CarouselProvider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export const StyledCarouselProvider = styled(({ ...props }) => <CarouselProvider {...props} />)`
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
    height: ${theme.spacing(5)};
    width: ${theme.spacing(5)};
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

  .carousel__inner-slide {
    padding: 1px;
    .ribbon-ad {
      ${theme.breakpoints.up("md")} {
        display: none;
      }
    }
  }

  ${theme.breakpoints.down("md")} {
    max-height: ${theme.spacing(50)};

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
      top: ${theme.spacing(1)};
    }

    .carousel__dot {
      width: ${theme.spacing(2)};
      height: ${theme.spacing(2)};
      border-radius: ${theme.spacing(1)};
      margin: ${theme.spacing(0.5)};
      border: 1px solid ${theme.palette.grey[300]};
      background-color: ${theme.palette.grey[300]};
      transition: background-color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeIn};

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
