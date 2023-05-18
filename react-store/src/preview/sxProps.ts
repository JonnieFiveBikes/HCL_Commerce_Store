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
import { SxProps, Theme } from "@mui/material";
type PreviewWidgetSx = {
  previewInfoFrameSx: SxProps<Theme>;
  previewInfoFrameParentSx: SxProps<Theme>;
};
const facetNavigationWidgetSx: PreviewWidgetSx = {
  previewInfoFrameSx: (theme: Theme) => ({
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      top: "auto",
      bottom: 0,
      height: theme.spacing(6),
      lineHeight: theme.spacing(6),
      padding: `0 ${theme.spacing(2)}`,
      zIndex: theme.zIndex.appBar + 1,
    },
  }),
  previewInfoFrameParentSx: (theme: Theme) => ({
    [theme.breakpoints.down("md")]: {
      minHeight: "unset",
    },
  }),
};

export const previewSxProps = {
  "facet-navigation-widget": facetNavigationWidgetSx,
};
