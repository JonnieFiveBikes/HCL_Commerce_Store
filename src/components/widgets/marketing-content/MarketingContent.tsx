/*
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
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  StyledContainer,
  StyledGrid,
  StyledMarketingContent,
} from "../../StyledUI";

const MarketingContent = ({
  textComponent,
  mediaComponent,
  buttonComponent,
  useMediaBackground,
  containerStyles,
  textAlignment,
  alignment,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let height = containerStyles.height.desktop;
  let padding = containerStyles.padding.desktop;

  function checkValue(value) {
    if (value && value !== "undefined" && value !== "NaN") {
      return true;
    }
    return false;
  }

  function setResponsiveValue(originalValue, responsiveValue) {
    if (checkValue(responsiveValue)) {
      return responsiveValue;
    }
    return originalValue;
  }

  if (isMobile) {
    height = setResponsiveValue(height, containerStyles.height.mobile);
    padding = setResponsiveValue(padding, containerStyles.padding.mobile);
  }

  if (isTablet) {
    height = setResponsiveValue(height, containerStyles.height.tablet);
    padding = setResponsiveValue(padding, containerStyles.padding.tablet);
  }

  const boxShadow = containerStyles.dropShadow ? theme.shadows[2] : "none";

  const textColumns = checkValue(containerStyles.textColumns)
    ? parseInt(containerStyles.textColumns)
    : 6;

  const textAlign = textAlignment ? textAlignment : "left";

  const direction = containerStyles.layoutDirection
    ? containerStyles.layoutDirection
    : "row";

  const wrapperStyles = {
    height: `${parseInt(height)}px`,
    borderRadius: `${containerStyles.borderRadius}px`,
    boxShadow: boxShadow,
    textAlign: textAlign,
    background: useMediaBackground ? "" : "#ffffff",
  };

  const textWrapperStyles = {
    padding: `${padding}px`,
  };

  return (
    <StyledMarketingContent style={wrapperStyles}>
      <StyledContainer>
        <StyledGrid
          container
          spacing={2}
          direction={direction}
          alignItems={alignment}>
          {textComponent && (
            <StyledGrid item xs={textColumns}>
              <div style={textWrapperStyles}>
                {textComponent}
                {buttonComponent}
              </div>
            </StyledGrid>
          )}
          {mediaComponent && !useMediaBackground && (
            <StyledGrid
              item
              xs={textColumns !== 12 ? 12 - textColumns : 12}
              className="mediaArea">
              {mediaComponent}
            </StyledGrid>
          )}
        </StyledGrid>
      </StyledContainer>
      {mediaComponent && useMediaBackground && (
        <div className="mediaBackground">{mediaComponent}</div>
      )}
    </StyledMarketingContent>
  );
};

MarketingContent.propTypes = {
  textComponent: PropTypes.node,
  mediaComponent: PropTypes.node,
  buttonComponent: PropTypes.node,
  imageUrl: PropTypes.string,
  useMediaBackground: PropTypes.bool,
  containerStyles: PropTypes.object.isRequired,
  textAlignment: PropTypes.string,
  alignment: PropTypes.string,
};

export default MarketingContent;
