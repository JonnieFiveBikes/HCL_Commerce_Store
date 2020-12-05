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
//UI
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

//Custom libraries
import { CONTENT_TEMPLATE } from "../../../constants/marketing";
import MarketingContent from "../marketing-content/MarketingContent";
import MarketingContentButton from "../marketing-content/MarketingContentButton";
import MarketingContentMedia from "../marketing-content/MarketingContentMedia";
import MarketingContentText from "../marketing-content/MarketingContentText";
import DXContentUtil from "../../../utils/DXContentUtil";

interface DXVideoContentProps {
  content: any;
}

/**
 * DX Video Content
 * renders DX video content
 * @param props
 */
const DXVideoContent: React.FC<DXVideoContentProps> = (props: any) => {
  const content = props.content;
  const valueMap = content ? DXContentUtil.getdataMap(content) : null;

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));
  const isTablet = !useMediaQuery(theme.breakpoints.up("md"));

  let isBGVideo: boolean = valueMap?.get(
    CONTENT_TEMPLATE.USE_AS_BACKGROUND_VIDEO
  );
  let isControlEnabled: boolean = valueMap?.get(
    CONTENT_TEMPLATE.VIDEO_CONTROLS
  );
  // Making sure that the video remains muted when the controls are disabled or when the video is played as a background video.
  let isMuted: boolean = isBGVideo
    ? true
    : isControlEnabled
    ? !valueMap?.get(CONTENT_TEMPLATE.VIDEO_VOLUME)
    : true;
  // Make sure the video auto play when in background mode
  let status = isBGVideo || valueMap?.get(CONTENT_TEMPLATE.VIDEO_AUTOPLAY);

  return (
    valueMap && (
      <MarketingContent
        useMediaBackground={isBGVideo}
        alignment={valueMap.get(CONTENT_TEMPLATE.ELEMENT_ALIGNMENT)}
        textAlignment={valueMap.get(CONTENT_TEMPLATE.TEXT_ALIGNMENT)}
        textComponent={
          <MarketingContentText content={valueMap.get(CONTENT_TEMPLATE.TEXT)} />
        }
        buttonComponent={
          <MarketingContentButton
            url={valueMap.get(CONTENT_TEMPLATE.BUTTON_LINK)}
            text={valueMap.get(CONTENT_TEMPLATE.BUTTON_TEXT_DISPLAY)}
            appearance={valueMap.get(CONTENT_TEMPLATE.BUTTON_APPEARANCE)}
          />
        }
        mediaComponent={
          <MarketingContentMedia
            media="video"
            source={valueMap.get(CONTENT_TEMPLATE.VIDEO)}
            poster={valueMap.get(CONTENT_TEMPLATE.VIDEO_POSTER)}
            title=""
            muted={isMuted}
            autoPlay={status}
            controls={!isBGVideo && isControlEnabled}
          />
        }
        containerStyles={{
          textColumns: `${valueMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_WIDTH)}`,
          textAlignment: `${valueMap.get(CONTENT_TEMPLATE.TEXT_ALIGNMENT)}`,
          borderRadius: `${valueMap.get(CONTENT_TEMPLATE.BORDER_RADIUS)}`,
          dropShadow: valueMap.get(CONTENT_TEMPLATE.DROP_SHADOW),
          padding: {
            desktop: `${valueMap.get(
              CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_DESKTOP
            )}`,
            tablet: `${valueMap.get(
              CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_TABLET
            )}`,
            mobile: `${valueMap.get(
              CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_MOBILE
            )}`,
          },
          height: {
            desktop: `${valueMap.get(CONTENT_TEMPLATE.HEIGHT_DESKTOP)}`,
            tablet: `${valueMap.get(CONTENT_TEMPLATE.HEIGHT_TABLET)}`,
            mobile: `${valueMap.get(CONTENT_TEMPLATE.HEIGHT_MOBILE)}`,
          },
        }}
      />
    )
  );
};

export { DXVideoContent };
