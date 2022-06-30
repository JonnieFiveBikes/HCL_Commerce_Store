/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *---------------------------------------------------
 */
//Standard libraries
import React, { createContext, useContext, useState } from "react";

export interface ShipMode {
  field1?: string;
  shipModeCode: string;
  shipModeDescription: string;
  shipModeId: string;
  field2?: string;
}

/**
 * Context holding Store supported Shipping Mode information.
 */
export const StoreShippingModeContext: React.Context<any> = createContext({});

/**
 * Store level Supported Shipping Mode Context provider.
 * (not the same as order level,which can be limited based on config.)
 */
export const StoreShippingModeProvider = ({ children }: any) => {
  const [storeShippingMode, setStoreShippingMode] = useState<ShipMode[]>([]);
  const value = React.useMemo(() => ({ storeShippingMode, setStoreShippingMode }), [storeShippingMode]);

  return <StoreShippingModeContext.Provider value={value}>{children}</StoreShippingModeContext.Provider>;
};
type StoreShippingModeContextValue = {
  storeShippingMode: ShipMode[];
  setStoreShippingMode: (shipModes: ShipMode[]) => void;
};
/**
 * Hook return StoreShippingModeContext value and reducer dispatcher.
 */
export const useStoreShippingModeValue = () => useContext<StoreShippingModeContextValue>(StoreShippingModeContext);
