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
import { StyledButton } from "@hcl-commerce-store-sdk/react-component";
import { Info } from "@mui/icons-material";
import { FC, PropsWithChildren, useCallback, useMemo } from "react";
import { WidgetInfo, isInManagedPreview, postMessageIfInPreview } from "../../utils/preview";
import {
  PreviewWidgetInfoProvider,
  usePreviewInfoValue,
  usePreviewWidgetInfoValue,
} from "../context/preview-info-context";
import { Box, SxProps, Theme } from "@mui/material";
import { Widget } from "../../constants/seo-config";
import { previewSxProps } from "../../../preview/sxProps";

const previewWidgetInfoButtonSx: SxProps<Theme> = (theme) => ({
  boxShadow: "0 1px 3px 0 #00000033 !important",
  minHeight: "30px",
  minWidth: "30px",
  pointerEvents: "auto",
  float: "right",
  padding: `${theme.spacing(0.25)} !important`,
  borderRadius: "4px",
  borderColor: "info.main",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "white",
    borderColor: "info.main",
  },
});

const previewWidgetInfoIconSx: SxProps = {
  color: "info.dark",
};

const previewInfoFrameParentSx = (widgetName: string): SxProps<Theme> => [
  (theme) => ({
    position: "relative",
    minHeight: theme.spacing(6),
  }),
  previewSxProps[widgetName]?.previewInfoFrameParentSx ?? {},
];

const previewInfoFrameSx = (showInfo: boolean, widgetName: string): SxProps<Theme> => [
  (theme) => ({
    position: "absolute",
    border: "2px dashed",
    borderRadius: "4px",
    borderColor: "info.light",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 5,
    pointerEvents: "none",
    "&:hover": {
      backgroundColor: `${theme.palette.info.dark}55`,
    },
    ...(!showInfo && { display: "none" }),
  }),
  previewSxProps[widgetName]?.previewInfoFrameSx ?? {},
];

type PreviewWidgetInfoButtonProps = {
  widget: Widget;
};

type PreviewWidgetInfoProps = {
  widget: Widget & {
    dataId: string;
  };
};

const PreviewWidgetInfoButton: FC<PreviewWidgetInfoButtonProps> = ({ widget }) => {
  const { widgetInfo: marketingSpotData } = usePreviewWidgetInfoValue();
  const onClick = useCallback(() => {
    const widgetInfo: WidgetInfo = {
      data: marketingSpotData ? { ...marketingSpotData, widget } : { widget },
      action: "PREVIEW_SHOW_WIDGET_INFO",
    };
    postMessageIfInPreview({ widget: widgetInfo });
  }, [marketingSpotData, widget]);
  return widget ? (
    <StyledButton
      id={`widgetinfo-button-${widget.id}`}
      data-testid={`widgetinfo-button-${widget.id}`}
      variant="outlined"
      onClick={onClick}
      sx={previewWidgetInfoButtonSx}>
      <Info sx={previewWidgetInfoIconSx} fontSize="small" />
    </StyledButton>
  ) : null;
};

export const PreviewWidgetInfoFrame: FC<PropsWithChildren<PreviewWidgetInfoProps>> = ({ widget, children }) => {
  const { message } = usePreviewInfoValue();
  const showInfo = useMemo(() => message?.action === "PREVIEW_SHOW_PAGE_INFORMATION", [message]);
  return (
    <PreviewWidgetInfoProvider>
      {isInManagedPreview() ? (
        <Box sx={previewInfoFrameParentSx(widget.widgetName)}>
          {children}
          <Box sx={previewInfoFrameSx(showInfo, widget.widgetName)}>
            <PreviewWidgetInfoButton widget={widget}></PreviewWidgetInfoButton>
          </Box>
        </Box>
      ) : (
        children
      )}
    </PreviewWidgetInfoProvider>
  );
};
