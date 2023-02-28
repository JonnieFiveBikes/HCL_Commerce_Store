/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *---------------------------------------------------
 */

//handle ESpot user status including available store list
//standard libraries
import React, { createContext, useContext, useReducer } from "react";
//HCL packages
import { ESpotState } from "@hcl-commerce-store-sdk/react-component";

import { WidgetProps } from "../../../../_foundation/constants/seo-config";

/**
 * ESpot context reducer action.
 */
export const ESPOT_ACTIONS = {
  GET_ESPOT_CONTENT_CATEGORY_SUCCESS: "GET_ESPOT_CONTENT_CATEGORY_SUCCESS",
  GET_ESPOT_PRODUCT_SLIDES_SUCCESS: "GET_ESPOT_PRODUCT_SLIDES_SUCCESS",
};
/**
 * ESpot init state.
 */
const eSpotInitstate: ESpotState = {
  behavior: "0",
  content: {
    title: "",
    templates: [],
  },
  category: {
    title: "",
    categories: [],
    id: "",
  },
  catEntry: {
    title: "",
    catEntries: [],
    slides: [],
  },
};
/**
 * Reducer to be used in ESpotContext.
 * @param state current state of eSpot.
 * @param action reducer action.
 * @returns eSpot state.
 */
const ESpotReducer = (state: ESpotState, action: any): ESpotState => {
  switch (action.type) {
    case ESPOT_ACTIONS.GET_ESPOT_CONTENT_CATEGORY_SUCCESS: {
      const { slides, title } = state.catEntry;
      const catEntry = { ...action.payload.catEntry, slides, title };
      const eSpot = {
        ...action.payload,
        catEntry,
      };
      return eSpot;
    }

    case ESPOT_ACTIONS.GET_ESPOT_PRODUCT_SLIDES_SUCCESS: {
      const catEntry = {
        ...state.catEntry,
        ...action.payload,
      };
      const eSpot = {
        ...state,
        catEntry,
      };
      return eSpot;
    }

    default:
      throw new Error(`Action is not supported: ${action.type}`);
  }
};
/**
 * Context holding eSpot information.
 */
export const ESpotContext: React.Context<any> = createContext({});
/**
 * ESpot context provider.
 */
export const ESpotProvider = ({ children }: any) => {
  const [eSpot, dispatch] = useReducer(ESpotReducer, eSpotInitstate);
  const value = React.useMemo(() => ({ eSpot, dispatch }), [eSpot]);

  return <ESpotContext.Provider value={value}>{children}</ESpotContext.Provider>;
};
type ESpotContextValue = {
  eSpot: ESpotState;
  dispatch: React.Dispatch<any>;
};
/**
 * Hook return eSpot value and reducer dispatcher.
 */
export const useESpotValue = () => useContext<ESpotContextValue>(ESpotContext);
/**
 * High order component that wraps a component with ESpot context provider.
 * @param Component the wrapping component
 * @returns A component wrapped with ESpot context provider.
 */
export const withESpotContext =
  (Component: React.ComponentType<any>): React.FC<WidgetProps> =>
  (props) => {
    return (
      <ESpotProvider>
        <Component {...props}></Component>
      </ESpotProvider>
    );
  };
