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
import React, { createContext, useContext, useReducer } from "react";
//Foundation
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import { STORELOCATORACTIONS, SELECTED_STORE } from "../constants/common";

export interface StoreLocatorStateProp {
  selectedStore?: any;
}

/**
 * StoreLocator init state.
 */
const storeLocatorState: StoreLocatorStateProp = {
  selectedStore: null,
};
/**
 * Reducer to be used in StoreLocator.
 * @param state current state of StoreLocator.
 * @param action reducer action.
 * @returns StoreLocator state.
 */
const StoreLocatorReducer = (state: StoreLocatorStateProp, action: any): any => {
  switch (action.type) {
    case STORELOCATORACTIONS.UPDATE_SELECTION_SUCCESS: {
      const { selectedStore } = action.payload;
      if (selectedStore) {
        localStorageUtil.set(SELECTED_STORE, selectedStore);

        return Object.assign(
          {},
          { ...state },
          {
            selectedStore,
          }
        );
      }
      return state;
    }

    case STORELOCATORACTIONS.RESET_STORE_SELECTOR: {
      localStorageUtil.remove(SELECTED_STORE);
      state.selectedStore = null;
      return state;
    }

    default:
      throw new Error(`Action is not supported: ${action.type}`);
  }
};
/**
 * Context holding StoreLocator information.
 */
export const StoreLocatorContext: React.Context<any> = createContext({});

const initializer = (initstate: StoreLocatorStateProp) => {
  const selectedStore = localStorageUtil.get(SELECTED_STORE);
  const ss = { ...initstate };
  if (selectedStore) {
    ss.selectedStore = selectedStore;
  }
  return ss;
};
/**
 * StoreLocator Context provider.
 */
export const StoreLocatorProvider = ({ children }: any) => {
  const [storeLocator, dispatch] = useReducer(StoreLocatorReducer, storeLocatorState, initializer);
  const value = React.useMemo(() => ({ storeLocator, dispatch }), [storeLocator]);

  return <StoreLocatorContext.Provider value={value}>{children}</StoreLocatorContext.Provider>;
};
type StoreLocatorContextValue = {
  storeLocator: StoreLocatorStateProp;
  dispatch: React.Dispatch<any>;
};
/**
 * Hook return StoreLocator value and reducer dispatcher.
 */
export const useStoreLocatorValue = () => useContext<StoreLocatorContextValue>(StoreLocatorContext);
