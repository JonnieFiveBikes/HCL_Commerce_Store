/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2023
 *
 *==================================================
 */
import { ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainer } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { SeoConfig, Widget } from "../constants/seo-config";
import { storageSessionHandler } from "./storageUtil";
import { WC_PREVIEW_TOKEN } from "../constants/common";

export type LayoutInfo = {
  data?: SeoConfig;
  action: "PREVIEW_LAYOUT_INITIALIZED";
};

export type WidgetInfo = {
  data: {
    widget: Widget;
    marketingSpotData?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainer[];
  };
  action: "PREVIEW_SHOW_WIDGET_INFO";
};

type MessageBody = {
  layout?: LayoutInfo;
  widget?: WidgetInfo;
};

export const postMessageIfInPreview = ({ layout, widget }: MessageBody) => {
  if (window.self !== window.parent && (layout || widget) && isInManagedPreview()) {
    window.parent.postMessage(layout ?? widget, "*");
  }
};

/**
 * Managed preview means preview session within an iframe from parent window, e.g. CMC
 */
export const isInManagedPreview = () => {
  const previewToken = (storageSessionHandler.getPreviewToken() ?? {})[WC_PREVIEW_TOKEN];
  return previewToken !== undefined && window.parent !== window.self;
};
