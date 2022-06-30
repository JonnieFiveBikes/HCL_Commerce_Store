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
import { debounce } from "lodash-es";
import React, { createContext, useCallback, useContext } from "react";

import productsService from "../apis/search/products.service";
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
  const [associatedProductList, setAssociatedProductList] = React.useState<Array<any>>([]);
  const [products, setProducts] = React.useState<Array<any>>([]);
  const [tableBodyData, setTableBodyData] = React.useState<Array<any>>([]);
  const [tableHeaderData, setTableHeaderData] = React.useState<Array<any>>([]);
  const [tableDetailHeaderData, setTableDetailHeaderData] = React.useState<Array<any>>([]);
  const [productOfferPrice, setProductOfferPrice] = React.useState<number>(0);
  const [prodDisplayPrice, setProdDisplayPrice] = React.useState<number>(0);
  const [currentProdSelect, setCurrentProdSelect] = React.useState<any>(null);
  const [skuAndQuantities, setSkuAndQuantities] = React.useState<Map<any, any>>(() => new Map());
  const [filterSkuState, setFilterSkuState] = React.useState<Array<any>>([]);
  const [definingAttributeList, setDefiningAttributeList] = React.useState<Array<object>>([]);
  const [attributeState, setAttributeState] = React.useState<Map<any, any>>(() => new Map());
  const [skuAndPickupMode, setSkuAndPickupMode] = React.useState<Map<any, any>>(() => new Map());

  /**
   * Get product information from part number
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProductDetails = useCallback(
    //Product context is for a product page. We should only need
    //to fetch A product once.
    debounce((parameters) => {
      productsService
        .findProductsUsingGET(parameters)
        .then((productData: any) => {
          const productDetails = productData.data.contents;
          setProducts(productDetails);
        })
        .catch((e) => {
          console.log("Could not retrieve product details page informarion", e);
        });
    }, 50),
    []
  );

  const getMerchandisingAssociationDetails = useCallback(
    (pdpData: any) => {
      const productList: any[] = [];
      if (pdpData && pdpData[0]?.merchandisingAssociations) {
        const merchandisingDetails = pdpData[0]?.merchandisingAssociations;
        for (const p of merchandisingDetails) {
          const c = {
            id: "",
            name: "Product",
            thumbnail: "",
            attributes: [],
            seo: {
              href: "",
            },
            price: [],
          };
          c.id = p.id;
          c.name = p.name;
          c.thumbnail = p.thumbnail;
          c.attributes = p.attributes;
          c.seo.href = p.seo?.href; // TODO, need to implement
          c.price = p.price;
          productList.push(c);
        }
        setAssociatedProductList(productList);
      }
    },
    [setAssociatedProductList]
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
        skuAndPickupMode,
        setSkuAndPickupMode,
        filterSkuState,
        setFilterSkuState,
        definingAttributeList,
        setDefiningAttributeList,
        attributeState,
        setAttributeState,
        associatedProductList,
        setAssociatedProductList,
        fetchProductDetails,
        products,
        getMerchandisingAssociationDetails,
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
export const withProductContext =
  (Component: React.ComponentType<any>): React.FC<PageLayoutProps> =>
  (props) => {
    return (
      <ProductProvider>
        <Component {...props}></Component>
      </ProductProvider>
    );
  };
