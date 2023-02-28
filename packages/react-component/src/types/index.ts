/*
 ***************************************************
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 ***************************************************
 */
export * from "./page-layout-props";
export * from "./super-responsive-table-types";

export interface ESpotState {
  behavior: string;
  content: {
    title: string;
    templates: any[];
  };
  category: {
    title?: string;
    categories: any[];
    id: string;
  };
  catEntry: {
    title?: string;
    catEntries: any[];
    slides: JSX.Element[];
  };
}

export interface EMarketingSpotWidgetProps {
  /**
   * The eSpot object that contains `title`, `espot`
   * `id`, `categories` to be rendered.
   */
  eSpot: ESpotState;
  [extraProps: string]: any;
}
