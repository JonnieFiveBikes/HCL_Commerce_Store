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

import { argTypes } from "./marketingContentStoryKnobs";
import { MarketingContent } from "./marketing-content";
import { MarketingContentText } from "./marketing-content-text";
import { MarketingContentButton } from "./marketing-content-button";
import { MarketingContentMedia } from "./marketing-content-media";

const textContent = `<h4 class="MuiTypography-root MuiTypography-overline">Use Promo Code: LIGHTING15</h4><p class="MuiTypography-root MuiTypography-h4 bottom-margin-1">Receive 15% Off Lighting orders over $2000</p>`;

export default { title: "Widgets/Marketing", argTypes };

export const MarketingContentDynamicValues = (args) => {
  const {
    alignment,
    textAlignment,
    useMediaBackground,
    textComponent,
    buttonUrl,
    buttonText,
    buttonStyle,
    mediaMedia,
    mediaSource,
    textColumns,
    layoutDirection,
    borderRadius,
    dropShadow,
    paddingDesktop,
    paddingTablet,
    paddingMobile,
    heightDesktop,
    heightTablet,
    heightMobile,
  } = args;
  const containerStyles = {
    textColumns,
    layoutDirection,
    borderRadius,
    dropShadow,
    padding: { desktop: paddingDesktop, tablet: paddingTablet, mobile: paddingMobile },
    height: { desktop: heightDesktop, tablet: heightTablet, mobile: heightMobile },
  };
  return (
    <MarketingContent
      {...{ alignment, textAlignment, useMediaBackground, containerStyles }}
      textComponent={<MarketingContentText content={textComponent} />}
      buttonComponent={<MarketingContentButton url={buttonUrl} text={buttonText} appearance={buttonStyle} />}
      mediaComponent={<MarketingContentMedia media={mediaMedia} source={mediaSource} />}
    />
  );
};
MarketingContentDynamicValues.args = {
  alignment: "center",
  useMediaBackground: true,
  buttonStyle: "secondary",
  buttonText: "Shop our Furniture",
  mediaSource:
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  buttonUrl:
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  textColumns: 6,
  borderRadius: 6,
  dropShadow: true,
  paddingDesktop: 32,
  paddingTablet: 24,
  paddingMobile: 16,
  heightDesktop: 350,
  heightTablet: 300,
  heightMobile: 250,
};

export const MarketingContentExample = (args) => {
  return (
    <MarketingContent
      useMediaBackground={false}
      alignment="center"
      textAlignment="left"
      textComponent={<MarketingContentText content={textContent} />}
      buttonComponent={
        <MarketingContentButton
          url="https://unsplash.com/photos/BlIhVfXbi9s"
          text="Photo Credits"
          appearance="secondary"
        />
      }
      mediaComponent={
        <MarketingContentMedia
          media="image"
          source="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
      }
      containerStyles={{
        textColumns: 6,
        textAlignment: "left",
        borderRadius: 6,
        dropShadow: true,
        padding: {
          desktop: 40,
          tablet: 30,
          mobile: 20,
        },
        height: {
          desktop: 400,
          tablet: 350,
          mobile: 200,
        },
      }}
    />
  );
};
MarketingContentExample.parameters = { controls: { hideNoControlsWarning: true, include: [] } };

export const MarketingVideoContentExample = (args) => {
  return (
    <MarketingContent
      useMediaBackground={false}
      alignment="center"
      textAlignment="left"
      textComponent={<MarketingContentText content={textContent} />}
      buttonComponent={
        <MarketingContentButton
          url="https://unsplash.com/photos/BlIhVfXbi9s"
          text="Photo Credits"
          appearance="secondary"
        />
      }
      mediaComponent={
        <MarketingContentMedia
          media="video"
          source="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
          poster="https://images.unsplash.com/photo-01604917538193-34a3111252f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          title=""
          autoPlay={true}
          muted
        />
      }
      containerStyles={{
        textColumns: 6,
        textAlignment: "left",
        borderRadius: 6,
        dropShadow: true,
        padding: {
          desktop: 40,
          tablet: 30,
          mobile: 20,
        },
        height: {
          desktop: 400,
          tablet: 350,
          mobile: 200,
        },
      }}
    />
  );
};
MarketingVideoContentExample.parameters = { controls: { hideNoControlsWarning: true, include: [] } };
