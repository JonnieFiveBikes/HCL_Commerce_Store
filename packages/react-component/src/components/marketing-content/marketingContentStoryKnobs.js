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
export const argTypes = {
  alignment: {
    control: "radio",
    description: "Element Alignment",
    options: ["flex-start", "center", "flex-end"],
    defaultValue: "flex-start",
    table: { type: {}, defaultValue: { summary: "flex-start" } },
  },
  textAlignment: {
    control: "radio",
    description: "Text Alignment",
    options: ["left", "right", "center"],
    defaultValue: "left",
    table: { type: {}, defaultValue: { summary: "left" } },
  },
  useMediaBackground: {
    defaultValue: false,
    control: "boolean",
    description: "Use as background image",
    table: { type: {}, defaultValue: { summary: "false" } },
  },
  textComponent: {
    name: "content",
    defaultValue: "Placeholder text content",
    description: "Text Content",
    control: "text",
    table: { category: "textComponent", type: {} },
  },
  buttonUrl: {
    description: "Button URL",
    name: "url",
    control: "text",
    table: { category: "buttonComponent" },
  },
  buttonText: {
    description: "Button Text",
    name: "text",
    control: "text",
    table: { category: "buttonComponent" },
  },
  buttonStyle: {
    name: "appearance",
    options: ["default", "primary", "secondary", "area"],
    defaultValue: "default",
    description: "Button Style",
    control: "radio",
    table: { category: "buttonComponent", type: {}, defaultValue: { summary: "default" } },
  },
  mediaMedia: {
    name: "media",
    options: ["image", "video"],
    defaultValue: "image",
    description: "Media Type",
    control: "radio",
    table: { category: "mediaComponent", type: {}, defaultValue: { summary: "image" } },
  },
  mediaSource: {
    name: "source",
    description: "Image URL",
    control: "text",
    table: { category: "mediaComponent", type: {} },
  },
  textColumns: {
    control: { type: "range", min: 2, max: 12, step: 2 },
    defaultValue: 6,
    table: { category: "containerStyles", type: {}, defaultValue: { summary: 6 } },
    description: "Text Element Span (out of 12 columns)",
  },
  layoutDirection: {
    control: "radio",
    options: ["row", "column"],
    description: "Layout Direction",
    defaultValue: "row",
    table: { category: "containerStyles", type: {}, defaultValue: { summary: "row" } },
  },
  borderRadius: {
    control: { type: "range", min: 0, max: 25, step: 1 },
    defaultValue: 0,
    table: { category: "containerStyles", type: {}, defaultValue: { summary: 0 } },
    description: "Border Radius",
  },
  dropShadow: {
    defaultValue: false,
    control: "boolean",
    description: "Show drop shadow",
    table: { category: "containerStyles", type: {}, defaultValue: { summary: "false" } },
  },
  paddingDesktop: {
    name: "desktop",
    table: { category: "containerStyles", subcategory: "padding", type: {} },
    control: { type: "range", min: 0, max: 100, step: 8 },
    required: true,
    defaultValue: 32,
    description: "Padding (Desktop)",
  },
  paddingTablet: {
    name: "tablet",
    table: { category: "containerStyles", subcategory: "padding", type: {} },
    control: { type: "range", min: 0, max: 100, step: 8 },
    required: true,
    defaultValue: 24,
    description: "Padding (Tablet)",
  },
  paddingMobile: {
    name: "mobile",
    table: { category: "containerStyles", subcategory: "padding", type: {} },
    control: { type: "range", min: 0, max: 100, step: 8 },
    required: true,
    defaultValue: 16,
    description: "Padding (Mobile)",
  },
  heightDesktop: {
    name: "desktop",
    table: { category: "containerStyles", subcategory: "height", type: {} },
    control: { type: "range", min: 100, max: 1000, step: 25 },
    required: true,
    defaultValue: 350,
    description: "Height (Desktop)",
  },
  heightTablet: {
    name: "tablet",
    table: { category: "containerStyles", subcategory: "height", type: {} },
    control: { type: "range", min: 100, max: 1000, step: 25 },
    required: true,
    defaultValue: 300,
    description: "Height (Tablet)",
  },
  heightMobile: {
    name: "mobile",
    table: { category: "containerStyles", subcategory: "height", type: {} },
    control: { type: "range", min: 100, max: 1000, step: 25 },
    required: true,
    defaultValue: 250,
    description: "Height (Mobile)",
  },
}
