/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2023
 *
 *---------------------------------------------------
 */
//Standard libraries
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { WidgetInfo } from "../../utils/preview";
//Foundation
type Action = "PREVIEW_SHOW_PAGE_INFORMATION" | "PREVIEW_HIDE_PAGE_INFORMATION" | "PREVIEW_NO_OP";
type Message = {
  data: any;
  action: Action;
};

type PreviewInfoContentValue = {
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
};

const initMessage: Message = {
  data: null,
  action: "PREVIEW_NO_OP",
};
/**
 * Context holding preview information action.
 */
export const PreviewInfoContext = createContext<unknown>({});

export const PreviewInfoProvider = ({ children }: any) => {
  const [message, setMessage] = useState<Message>(initMessage);
  const value = React.useMemo(() => {
    return { message, setMessage };
  }, [message]);
  const receiveMessage = useCallback((event: MessageEvent<Message>) => {
    if (window === window.parent || event.source !== window.parent) {
      // from unknown source
      return;
    }
    const data = event.data;
    if (data?.action && data.action.startsWith("PREVIEW")) {
      setMessage(data);
    }
    return;
  }, []);
  useEffect(() => {
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, [receiveMessage]);

  return <PreviewInfoContext.Provider value={value}>{children}</PreviewInfoContext.Provider>;
};
/**
 * Hook return Preview info value.
 */
export const usePreviewInfoValue = () => useContext(PreviewInfoContext) as PreviewInfoContentValue;

/**
 * Widget info only used for marketing spot data
 */
type WidgetInfoContextValue = {
  widgetInfo: Omit<WidgetInfo["data"], "widget"> | null;
  setWidgetInfo: React.Dispatch<React.SetStateAction<Omit<WidgetInfo["data"], "widget"> | null>>;
};

export const PreviewWidgetInfoContext = createContext<unknown>({});
export const PreviewWidgetInfoProvider = ({ children }: any) => {
  const [widgetInfo, setWidgetInfo] = useState<Omit<WidgetInfo["data"], "widget"> | null>(null);
  const value = React.useMemo(() => ({ widgetInfo, setWidgetInfo }), [widgetInfo]);

  return <PreviewWidgetInfoContext.Provider value={value}>{children}</PreviewWidgetInfoContext.Provider>;
};

/**
 * Hook return Preview widget info value.
 */
export const usePreviewWidgetInfoValue = () => useContext(PreviewWidgetInfoContext) as WidgetInfoContextValue;
