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

//standard libraries
import React, { createContext, useContext } from "react";
//HCL SDK
import { PageLayoutProps } from "@hcl-commerce-store-sdk/react-component";

/**
 * Context holding b2b product information.
 */
export const ProductContext: React.Context<any> = createContext({});

/**
 * Context provider holds the state used in child component.
 */
export const ProductProvider = ({ children }: any) => {
  const [tableBodyData, setTableBodyData] = React.useState<Array<any>>([]);
  const [tableHeaderData, setTableHeaderData] = React.useState<Array<any>>([]);
  const [tableDetailHeaderData, setTableDetailHeaderData] = React.useState<
    Array<any>
  >([]);
  const [productOfferPrice, setProductOfferPrice] = React.useState<number>(0);
  const [prodDisplayPrice, setProdDisplayPrice] = React.useState<number>(0);
  const [currentProdSelect, setCurrentProdSelect] = React.useState<any>(null);
  const [skuAndQuantities, setSkuAndQuantities] = React.useState<Map<any, any>>(
    () => new Map()
  );
  const [filterSkuState, setFilterSkuState] = React.useState<Array<any>>([]);
  const [definingAttributeList, setDefiningAttributeList] = React.useState<
    Array<object>
  >([]);
  const [attributeState, setAttributeState] = React.useState<Map<any, any>>(
    () => new Map()
  );

  return (
    <ProductContext.Provider
      value={{
        tableBodyData,
        setTableBodyData,
        tableHeaderData,
        setTableHeaderData,
        tableDetailHeaderData,
        setTableDetailHeaderData,
        productOfferPrice,
        setProductOfferPrice,
        prodDisplayPrice,
        setProdDisplayPrice,
        currentProdSelect,
        setCurrentProdSelect,
        skuAndQuantities,
        setSkuAndQuantities,
        filterSkuState,
        setFilterSkuState,
        definingAttributeList,
        setDefiningAttributeList,
        attributeState,
        setAttributeState,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductValue = () => useContext(ProductContext);

/**
 * High order component that wraps a component with Product context provider.
 * @param Component the wrapping component
 * @returns A component wrapped with Product context provider.
 */
export const withProductContext = (
  Component: React.ComponentType<any>
): React.FC<PageLayoutProps> => (props) => {
  return (
    <ProductProvider>
      <Component {...props}></Component>
    </ProductProvider>
  );
};
