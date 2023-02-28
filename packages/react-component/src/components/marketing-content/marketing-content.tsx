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
//standard libraries
import React from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//local libraries
import { StyledContainer, StyledGrid, StyledMarketingContent } from "../../elements";

/**
 * Marketing content props type definition
 */
type MarketingContentProps = {
  /**
   * The text component for the MarketingContent
   */
  textComponent?: any;
  /**
   * The media component for the MarketingContent.
   */
  mediaComponent?: any;
  /**
   * Button component.
   */
  buttonComponent?: any;
  /**
   * Indicates whether to use media background for media component if mediaComponent exists.
   */
  useMediaBackground?: boolean;
  /**
   * The style for the MarketingContent.
   */
  containerStyles: any;
  /**
   * The text alignment attribute for the MarketingContent. If not defined, "left" is used.
   */
  textAlignment?: string;
  /**
   * The `alignItems` attribute for `StyleGrid` component used in the MarketingContent.
   */
  alignment?: string;
};

/**
 * Marketing content component to render marketing content.
 * @param props see props type definition {@link MarketingContentProps}
 */
const MarketingContent: React.FC<MarketingContentProps> = ({
  textComponent,
  mediaComponent,
  buttonComponent,
  useMediaBackground,
  containerStyles,
  textAlignment,
  alignment,
  ...props
}: any) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "xl"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  let height = containerStyles.height.desktop;
  let padding = containerStyles.padding.desktop;

  function checkValue(value: any) {
    if (value && value !== "undefined" && value !== "NaN") {
      return true;
    }
    return false;
  }

  function setResponsiveValue(originalValue: any, responsiveValue: any) {
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

  const textColumns = checkValue(containerStyles.textColumns) ? parseInt(containerStyles.textColumns) : 6;

  const textAlign = textAlignment ? textAlignment : "left";

  const direction = containerStyles.layoutDirection ? containerStyles.layoutDirection : "row";

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
        <StyledGrid container spacing={2} direction={direction} alignItems={alignment}>
          {textComponent && (
            <StyledGrid item xs={textColumns}>
              <div style={textWrapperStyles}>
                {textComponent}
                {buttonComponent}
              </div>
            </StyledGrid>
          )}
          {mediaComponent && !useMediaBackground && (
            <StyledGrid item xs={textColumns !== 12 ? 12 - textColumns : 12} className="mediaArea">
              {mediaComponent}
            </StyledGrid>
          )}
        </StyledGrid>
      </StyledContainer>
      {mediaComponent && useMediaBackground && <div className="mediaBackground">{mediaComponent}</div>}
    </StyledMarketingContent>
  );
};

export { MarketingContent };
