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
import React from "react";

//Custom libraries
import { marketingConstants, DXContentUtil } from "@hcl-commerce-store-sdk/utils";
import { MarketingContent } from "../marketing-content/marketing-content";
import { MarketingContentButton } from "../marketing-content/marketing-content-button";
import { MarketingContentMedia } from "../marketing-content/marketing-content-media";
import { MarketingContentText } from "../marketing-content/marketing-content-text";

type DXVideoContentProps = {
  /**
   * The DX Video content.
   */
  content: any;
};

/**
 * DX Video Content
 * renders DX video content
 * @param props the `DXVideoContentProps` @see {@link DXVideoContentProps}
 */
const DXVideoContent: React.FC<DXVideoContentProps> = (props: any) => {
  const content = props.content;
  const valueMap = content ? DXContentUtil.getdataMap(content) : null;

  const isBGVideo: boolean = valueMap?.get(marketingConstants.CONTENT_TEMPLATE.USE_AS_BACKGROUND_VIDEO);
  const isControlEnabled: boolean = valueMap?.get(marketingConstants.CONTENT_TEMPLATE.VIDEO_CONTROLS);
  // Making sure that the video remains muted when the controls are disabled or when the video is played as a background video.
  const isMuted: boolean = isBGVideo
    ? true
    : isControlEnabled
    ? !valueMap?.get(marketingConstants.CONTENT_TEMPLATE.VIDEO_VOLUME)
    : true;
  // Make sure the video auto play when in background mode
  const status = isBGVideo || valueMap?.get(marketingConstants.CONTENT_TEMPLATE.VIDEO_AUTOPLAY);

  return (
    valueMap && (
      <MarketingContent
        useMediaBackground={isBGVideo}
        alignment={valueMap.get(marketingConstants.CONTENT_TEMPLATE.ELEMENT_ALIGNMENT)}
        textAlignment={valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT_ALIGNMENT)}
        textComponent={<MarketingContentText content={valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT)} />}
        buttonComponent={
          <MarketingContentButton
            url={valueMap.get(marketingConstants.CONTENT_TEMPLATE.BUTTON_LINK)}
            text={valueMap.get(marketingConstants.CONTENT_TEMPLATE.BUTTON_TEXT_DISPLAY)}
            appearance={valueMap.get(marketingConstants.CONTENT_TEMPLATE.BUTTON_APPEARANCE)}
          />
        }
        mediaComponent={
          <MarketingContentMedia
            media="video"
            source={valueMap.get(marketingConstants.CONTENT_TEMPLATE.VIDEO)}
            poster={valueMap.get(marketingConstants.CONTENT_TEMPLATE.VIDEO_POSTER)}
            title=""
            muted={isMuted}
            autoPlay={status}
            controls={!isBGVideo && isControlEnabled}
          />
        }
        containerStyles={{
          textColumns: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT_ELEMENT_WIDTH)}`,
          textAlignment: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT_ALIGNMENT)}`,
          borderRadius: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.BORDER_RADIUS)}`,
          dropShadow: valueMap.get(marketingConstants.CONTENT_TEMPLATE.DROP_SHADOW),
          padding: {
            desktop: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_DESKTOP)}`,
            tablet: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_TABLET)}`,
            mobile: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_MOBILE)}`,
          },
          height: {
            desktop: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.HEIGHT_DESKTOP)}`,
            tablet: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.HEIGHT_TABLET)}`,
            mobile: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.HEIGHT_MOBILE)}`,
          },
        }}
      />
    )
  );
};

export { DXVideoContent };
