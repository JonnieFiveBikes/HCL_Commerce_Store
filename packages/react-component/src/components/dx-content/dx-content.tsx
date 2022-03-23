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
//hcl libraries
import { marketingConstants, DXContentUtil } from "@hcl-commerce-store-sdk/utils";
//Custom libraries
import { MarketingContent } from "../marketing-content/marketing-content";
import { MarketingContentText } from "../marketing-content/marketing-content-text";
import { MarketingContentButton } from "../marketing-content/marketing-content-button";
import { MarketingContentMedia } from "../marketing-content/marketing-content-media";

type DXContentProps = {
  content: any;
};
/**
 * DX Content
 * renders non-video DX content such as images and text
 * @param props the `DXContentProps` @see {@link DXContentProps}
 */
const DXContent: React.FC<DXContentProps> = (props: any) => {
  const content = props.content;
  const valueMap = content ? DXContentUtil.getdataMap(content) : null;

  return (
    valueMap && (
      <MarketingContent
        useMediaBackground={valueMap.get(marketingConstants.CONTENT_TEMPLATE.IMAGE_USAGE)}
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
          <MarketingContentMedia media="Image" source={valueMap.get(marketingConstants.CONTENT_TEMPLATE.IMAGE)} />
        }
        containerStyles={{
          textColumns: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT_ELEMENT_WIDTH)}`,
          textAlignment: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.TEXT_ALIGNMENT)}`,
          borderRadius: `${valueMap.get(marketingConstants.CONTENT_TEMPLATE.BORDER_RADIUS)}`,
          dropShadow: valueMap.get(marketingConstants.CONTENT_TEMPLATE.DROP_SHADOW),
          layoutDirection: `${
            valueMap.get(marketingConstants.CONTENT_TEMPLATE.LAYOUT_DIRECTION)
              ? valueMap.get(marketingConstants.CONTENT_TEMPLATE.LAYOUT_DIRECTION)
              : ""
          }`,
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

export { DXContent };
