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
import MarketingContent from "../marketing-content/MarketingContent";
import MarketingContentText from "../marketing-content/MarketingContentText";
import MarketingContentButton from "../marketing-content/MarketingContentButton";
import MarketingContentMedia from "../marketing-content/MarketingContentMedia";
import { CONTENT_TEMPLATE } from "../../../constants/marketing";
import DXContentUtil from "../../../utils/DXContentUtil";

interface DXContentProps {
  content: any;
}
/**
 * DX Content
 * renders non-video DX content such as images and text
 * @param props
 */
const DXContent: React.FC<DXContentProps> = (props: any) => {
  const content = props.content;
  const valueMap = content ? DXContentUtil.getdataMap(content) : null;

  return (
    valueMap && (
      <MarketingContent
        useMediaBackground={valueMap.get(CONTENT_TEMPLATE.IMAGE_USAGE)}
        imageUrl={valueMap.get(CONTENT_TEMPLATE.IMAGE)}
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
            media="Image"
            source={valueMap.get(CONTENT_TEMPLATE.IMAGE)}
          />
        }
        containerStyles={{
          textColumns: `${valueMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_WIDTH)}`,
          textAlignment: `${valueMap.get(CONTENT_TEMPLATE.TEXT_ALIGNMENT)}`,
          borderRadius: `${valueMap.get(CONTENT_TEMPLATE.BORDER_RADIUS)}`,
          dropShadow: valueMap.get(CONTENT_TEMPLATE.DROP_SHADOW),
          layoutDirection: `${
            valueMap.get(CONTENT_TEMPLATE.LAYOUT_DIRECTION)
              ? valueMap.get(CONTENT_TEMPLATE.LAYOUT_DIRECTION)
              : ""
          }`,
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

export { DXContent };
