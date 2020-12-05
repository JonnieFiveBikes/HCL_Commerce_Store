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
//Standard libraries
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import LazyLoadComponent from "react-intersection-observer-lazy-load";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Redux
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../../redux/actions/marketingEvent";
//UI
import styled from "styled-components";
import {
  StyledBox,
  StyledGrid,
  StyledPaper,
  StyledTypography,
  StyledLink,
  StyledProgressPlaceholder,
} from "../../StyledUI";

const StyledCategoryCard = styled(({ ...props }) =>
  props.to ? <StyledLink {...props} /> : <StyledBox {...props} />
)`
  ${({ theme }) => `
  display: block;

  img {
    display: block;
    transition: transform ${theme.transitions.duration.standard}ms ${
    theme.transitions.easing.easeIn
  };
  }

  a&:hover {
    .MuiPaper-root {
      box-shadow: ${theme.shadows[2]};
    }

    img {
      transform: scale(0.92);
      border-radius: ${theme.shape.borderRadius}px;
    }

    .MuiTypography-root  {
      color: ${theme.palette.primary.main};
    }
  }

  ${theme.breakpoints.down("sm")} {
    .category-card-text {
      &.MuiTypography-h3 {
        font-size: 1.5rem;
      }
      &.MuiTypography-subtitle2 {
        font-size: 0.9rem;
        margin-top: ${theme.spacing(1)}px;
      }
    }
  }
  `}
`;

function CategoryCardLayout({ renderingContext }: any) {
  const widgetName = getDisplayName(CategoryCardLayout);
  const dispatch = useDispatch();
  const {
    eSpotDescInternal: eSpotDesc,
    eSpotInternal: eSpotRoot,
    categoryInternal: category,
  } = renderingContext;
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const payload = {
    ...payloadBase,
  };

  const informMarketingOfClick = (event) => {
    if (
      renderingContext.eSpotDescInternal &&
      !isEmpty(renderingContext.eSpotDescInternal)
    ) {
      dispatch(
        CLICK_EVENT_TRIGGERED_ACTION({ eSpotRoot, eSpotDesc, ...payloadBase })
      );
    }
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  });

  return (
    <>
      {category && category.name && (
        <StyledCategoryCard
          onClick={informMarketingOfClick}
          to={category.seo?.href}>
          <StyledPaper>
            <StyledGrid container spacing={2} alignItems="center">
              <LazyLoadComponent
                placeholder={
                  <StyledProgressPlaceholder className="vertical-padding-20" />
                }>
                {" "}
                <StyledGrid item xs={5} sm={4} md={6}>
                  {category.thumbnail && (
                    <img alt="" src={category.thumbnail}></img>
                  )}
                </StyledGrid>
              </LazyLoadComponent>
              <StyledGrid
                item
                xs={7}
                sm={6}
                className="horizontal-padding-2 vertical-padding-1">
                <StyledTypography variant="h3" className="category-card-text">
                  {category.name}
                </StyledTypography>
                <StyledTypography
                  variant="subtitle2"
                  className="top-margin-2 category-card-text">
                  {category.description}
                </StyledTypography>
              </StyledGrid>
            </StyledGrid>
          </StyledPaper>
        </StyledCategoryCard>
      )}
    </>
  );
}
export default CategoryCardLayout;
