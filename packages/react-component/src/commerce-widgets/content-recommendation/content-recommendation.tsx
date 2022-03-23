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
import HTMLReactParser from "html-react-parser";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
//hcl libraries
import { marketingConstants } from "@hcl-commerce-store-sdk/utils";
//local
import { DXContent, DXVideoContent } from "../../components";
import { StyledProgressPlaceholder } from "../../elements";
import { EMarketingSpotWidgetProps } from "../../types";

/**
 * Content recommendation widget.
 * For props definition, @see {@link EMarketingSpotWidgetProps}.
 * @param props The props for `ContentRecommendationWidget`, which contains an eSpot object.
 */
export const ContentRecommendationWidget: React.FC<EMarketingSpotWidgetProps> = ({ eSpot, ...props }) => {
  const { content } = eSpot;
  return (
    <>
      {content && (
        <>
          <LazyLoadComponent
            visibleByDefault={(window as any).__isPrerender__ || false}
            placeholder={<StyledProgressPlaceholder className="vertical-padding-20" />}>
            {content.title && <h2>{HTMLReactParser(content.title)}</h2>}
            {content.templates.map((t: any) => {
              return t.isDxContent ? (
                t.contentType === marketingConstants.CONTENT_TYPE_VIDEO ? (
                  <DXVideoContent key={t.id} {...t} />
                ) : (
                  <DXContent key={t.id} {...t} />
                )
              ) : (
                <React.Fragment key={t.id}>{t.template}</React.Fragment>
              );
            })}
          </LazyLoadComponent>
        </>
      )}
    </>
  );
};
