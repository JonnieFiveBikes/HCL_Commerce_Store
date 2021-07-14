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
//Standard libraries
import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "./useSite";
import eSpotService from "../apis/transaction/eSpot.service";
import productsService from "../apis/search/products.service";
//Custom libraries
import { CommerceEnvironment, EMPTY_STRING } from "../../constants/common";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
//UI
import { StyledProgressPlaceholder } from "@hcl-commerce-store-sdk/react-component";

/**
 * Custom hooks for recommended products
 * ` @prop { ​​​​​any } props` Have following properties:
 * ` @property { string } cid(optional)`: The unique catalog identifier.
 * ` @property { string } eSpotName`: The E-marketing spot name.
 * ` @property { any } page(optional)`: The page object.
 */
export const useProductRecommendationLayout = (props: any) => {
  const eSpotName = props.eSpotName;

  const widgetName = getDisplayName("ProductRecommendationLayout");
  let title: string;
  const { mySite } = useSite();
  const contractId = useSelector(currentContractIdSelector);
  const storeID: string = mySite ? mySite.storeID : EMPTY_STRING;
  const [productList, setProductList] = React.useState<Array<object>>();
  const [showEspot, setShowEspot] = React.useState<boolean>(true);
  const [
    recommendedProductTitle,
    setRecommendedProductTitle,
  ] = React.useState<string>();

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];
  const initESpot = (name: string) => {
    const payloadBase: any = {
      widget: widgetName,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    let eSName = name;
    const parameters: any = {
      storeId: storeID,
      name: eSName,
      ...payloadBase,
    };
    eSpotService
      .findByName(parameters)
      .then((res) => {
        const eSpotObject = res?.data.MarketingSpotData[0];
        const productsDescription: any[] =
          eSpotObject.baseMarketingSpotActivityData;
        const productsId: string[] = [];
        const productsEspot: object[] = [];
        title = eSpotObject.marketingSpotDataTitle
          ? eSpotObject.marketingSpotDataTitle[0].marketingContentDescription[0]
              .marketingText
          : "Recommended Products";
        if (title) {
          setRecommendedProductTitle(title);
        }
        if (productsDescription) {
          for (const productDescription of productsDescription) {
            if (productDescription.productId) {
              productsId.push(productDescription.productId);
              productsEspot.push(productDescription);
            }
          }
        }
        const prodList = generateProductListsFromESpot(eSpotObject);
        if (prodList) {
          setProductList(prodList);
          findProductsByUniqueId(prodList);
        }
      })
      .catch((e) => {
        console.log(
          `Could not retrieve Espots${
            e.message ? " due to " + e.message : EMPTY_STRING
          }`
        );
        if (!(e instanceof Axios.Cancel)) {
          //shall not update component on cancel.
          setShowEspot(false);
        }
      });
  };

  const findProductsByUniqueId = (prods: any[]) => {
    const payloadBase: any = {
      widget: widgetName,
    };
    const plist = [...prods];
    if (plist && plist.length > 0) {
      let requestParameters = {
        storeId: storeID,
        id: plist.map((p) => p.id),
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
        ...payloadBase,
      };
      productsService
        .findProductsUsingGET(requestParameters)
        .then((res) => {
          const products = res?.data.contents;
          if (products) {
            generateProductLists(products, plist);
          }
        })
        .catch((e) => console.log("Could not retrieve products"));
    }
  };
  const generateProductLists = (products: any[], plist: any[]) => {
    for (let product of products) {
      if (product) {
        const p = plist.filter((p) => p.id === product.id)[0];

        //remove wcsstore and hclstore prefix to match the thumbnail url created by eSpot data
        //so that we will not see flickering on page.
        product.thumbnail = product.thumbnail
          .replace("/wcsstore", EMPTY_STRING)
          .replace("/hclstore", EMPTY_STRING);
        Object.assign(p, { productInternal: product });
        p.seoUrl = product.seo?.href;
      }
    }
    setProductList(plist);
  };

  const generateProductListsFromESpot = (eSpotObject: any) => {
    const lists: object[] = [];
    for (let product of eSpotObject.baseMarketingSpotActivityData) {
      if (product) {
        let productSkeleton = JSON.parse(
          JSON.stringify(CommerceEnvironment.productSkeleton)
        );
        productSkeleton.id = product.productId;

        const storePath = product.attributes.filter(
          (a) => a.name === "rootDirectory"
        )[0].stringValue;
        const prod = {
          id: product.productId,
          name: product.description[0].productName,
          thumbnail: product.description[0].thumbnail
            ? product.description[0].thumbnail.indexOf("/") === 0
              ? `/${storePath}${product.description[0].thumbnail}`
              : `/${storePath}/${product.description[0].thumbnail}`
            : EMPTY_STRING,
          seo: { href: "#" },
          price: [
            {
              usage: "Offer",
              value: product.contractPrice
                ? contractId
                  ? product.contractPrice.filter(
                      (p) => p.contractID === contractId
                    )[0]?.contractPrice
                  : product.contractPrice[0].contractPrice
                : EMPTY_STRING,
            },
          ],
        };
        productSkeleton.productInternal = prod;
        productSkeleton.eSpotInternal = eSpotObject;
        productSkeleton.eSpotDescInternal = product;
        productSkeleton.seoUrl = prod.seo?.href;
        lists.push(productSkeleton);
      }
    }
    return lists;
  };

  React.useEffect(() => {
    if (mySite !== null && mySite !== undefined) {
      initESpot(eSpotName);
    }
    return () => {
      cancels.forEach((cancel) => cancel("Cancel due to component unmounted"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eSpotName, mySite]);

  let slides: JSX.Element[] = [];
  const ProductRecCard = lazy(
    () =>
      import(
        "../../components/widgets/product-recommendation-card/product-recommendation-card"
      )
  );

  productList?.forEach((e: any) => {
    slides.push(
      <Suspense
        fallback={
          <StyledProgressPlaceholder className="vertical-padding-20" />
        }>
        <ProductRecCard renderingContext={e} />
      </Suspense>
    );
  });

  return {
    showEspot,
    recommendedProductTitle,
    slides,
  };
};
