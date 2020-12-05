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
export const knobs = {
  text: {
    groupId: "text",
    content: {
      default: "Placeholder text content",
      label: "Text Content",
    },
  },
  image: {
    groupId: "image",
    url: {
      default:
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      label: "Image URL",
    },
    imageUsage: {
      default: true,
      label: "Use as background image",
    },
  },
  button: {
    groupId: "button",
    url: {
      default:
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      label: "Button URL",
    },
    text: {
      default: "Shop our Furniture",
      label: "Button Text",
    },
    style: {
      options: {
        Primary: "primary",
        Secondary: "secondary",
        Text: "text",
        Area: "area",
      },
      default: "secondary",
      label: "Button Style",
    },
  },
  general: {
    groupId: "general",
    textAlignment: {
      options: {
        Left: "left",
        Right: "right",
        Center: "center",
      },
      default: "left",
      label: "Text Alignment",
    },
    borderRadius: {
      options: {
        range: true,
        min: 0,
        max: 25,
        step: 1,
      },
      default: 6,
      label: "Border Radius",
    },
    dropShadow: {
      default: true,
      label: "Show drop shadow",
    },
    alignment: {
      options: {
        Start: "flex-start",
        Center: "center",
        End: "flex-end",
      },
      default: "center",
      label: "Element Alignment",
    },
    direction: {
      options: {
        Row: "row",
        Column: "column",
      },
      default: "row",
      label: "Layout Direction",
    },
    media: {
      options: {
        Image: "image",
        Video: "video",
      },
      default: "image",
      label: "Media Type",
    },
    height: {
      desktop: {
        options: {
          range: true,
          min: 100,
          max: 1000,
          step: 25,
        },
        default: 350,
        label: "Height (Desktop)",
      },
      tablet: {
        options: {
          range: true,
          min: 100,
          max: 1000,
          step: 25,
        },
        default: 300,
        label: "Height (Tablet)",
      },
      mobile: {
        options: {
          range: true,
          min: 100,
          max: 1000,
          step: 25,
        },
        default: 250,
        label: "Height (Mobile)",
      },
    },
    padding: {
      desktop: {
        options: {
          range: true,
          min: 0,
          max: 100,
          step: 8,
        },
        default: 32,
        label: "Padding (Desktop)",
      },
      tablet: {
        options: {
          range: true,
          min: 0,
          max: 100,
          step: 8,
        },
        default: 24,
        label: "Padding (Tablet)",
      },
      mobile: {
        options: {
          range: true,
          min: 0,
          max: 100,
          step: 8,
        },
        default: 16,
        label: "Padding (Mobile)",
      },
    },
    textColumns: {
      options: {
        range: true,
        min: 2,
        max: 12,
        step: 2,
      },
      default: 6,
      label: "Text Element Span (out of 12 columns)",
    },
  },
};
