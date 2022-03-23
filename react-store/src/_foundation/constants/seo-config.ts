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
/**
 * Page type
 */
export type Page = any;
/**
 * Represents a widget in a {@link Slot}
 * @public
 */
export interface Widget {
  /**
   * Unique ID of the widget.
   */
  id: string;
  /**
   * Name of the widget.
   */
  name: string;
  /**
   * Indicates React component filename that renders this widget.
   */
  widgetName: string;
  /**
   * Name value paired properties of the widget.
   */
  properties: {
    [key: string]: any;
  };
  [extraProp: string]: any;
}
/**
 * Represents a slot in {@link Layout}
 * @public
 */
export interface Slot {
  id: string;
  widgets: Widget[];
  [extraProp: string]: any;
}
/**
 * Represents layout for {@link SeoConfig}
 * @public
 */
export interface Layout {
  /**
   * Unique ID of the layout.
   */
  id: string;
  /**
   * Name of the layout.
   */
  name: string;
  /**
   * Filename of the React component that renders this layout.
   */
  containerName: string;
  /**
   * Slots of the layout.
   */
  slots: Slot[];
  /**
   * Additional properties.
   */
  [extraProp: string]: any;
}

/**
 * Represents SeoConfig for a SEO enabled page.
 * @public
 */
export interface SeoConfig {
  /**
   * Identifier of the SEO URL keyword
   */
  identifier: string;
  /**
   * ID of the SEO URL keyword
   */
  id: number;
  /**
   * Page associated with this SEO
   */
  page: Page;
  /**
   * The URL that this SEO URL keyword redirecting to.
   */
  redirect?: any;
  /**
   * Layout definition for the page.
   */
  layout: Layout;
  /**
   * Additional properties.
   */
  [extraProp: string]: any;
}
/**
 * Layout component props type
 */
export interface LayoutProps {
  slots: Slot[];
  page: Page;
}

/**
 * Widget component props type.
 */
export interface WidgetProps {
  widget: Widget;
  page: Page;
}
