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
//Standard libraries
import React, { lazy, Suspense } from "react";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import eSpotService from "../../../_foundation/apis/transaction/eSpot.service";
import productsService from "../../../_foundation/apis/search/products.service";
//Custom libraries
import { CommerceEnvironment } from "../../../constants/common";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
//UI
import {
  StyledTypography,
  PureReactSlider,
  StyledProgressPlaceholder,
} from "../../StyledUI";

function ProductRecommendationLayout({
  cid,
  eSpotName,
  renderingContext,
  ...props
}: any) {
  let title: string;
  const mySite: any = useSite();
  const contractId = useSelector(currentContractIdSelector);
  const storeID: string = mySite ? mySite.storeID : "";
  const [productList, setProductList] = React.useState<Array<object>>();
  const [showEspot, setShowEspot] = React.useState<boolean>(true);
  const CancelToken = Axios.CancelToken;
  const [recommendedProductTitle, setRecommendedProductTitle] = React.useState<
    string
  >();

  let cancels: Canceler[] = [];
  const initESpot = (name: string) => {
    let eSName = name;
    const parameters: any = {
      storeId: storeID,
      name: eSName,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
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
        for (const productDescription of productsDescription) {
          if (productDescription.productId) {
            productsId.push(productDescription.productId);
            productsEspot.push(productDescription);
          }
        }
        const prodList = generateProductListsFromESpot(eSpotObject);
        setProductList(prodList);
        findProductsByUniqueId(prodList);
      })
      .catch((e) => {
        console.log(
          `Could not retrieve Espots${e.message ? " due to " + e.message : ""}`
        );
        if (!(e instanceof Axios.Cancel)) {
          //shall not update component on cancel.
          setShowEspot(false);
        }
      });
  };
  const findProductsByUniqueId = (prods: any[]) => {
    const plist = [...prods];
    if (plist && plist.length > 0) {
      let requestParameters = {
        storeId: storeID,
        id: plist.map((p) => p.id),
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
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
          .replace("/wcsstore", "")
          .replace("/hclstore", "");
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
          thumbnail:
            product.description[0].thumbnail.indexOf("/") === 0
              ? `/${storePath}${product.description[0].thumbnail}`
              : `/${storePath}${product.description[0].thumbnail}`,
          seo: { href: "#" },
          price: [
            {
              usage: "Offer",
              value: contractId
                ? product.contractPrice.filter(
                    (p) => p.contractID === contractId
                  )[0]?.contractPrice
                : product.contractPrice[0].contractPrice,
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
  }, [eSpotName, mySite]);

  let slides: JSX.Element[] = [];
  const ProductRecCard = lazy(() =>
    import("../productCard-recommendation/ProductRecCard")
  );

  productList?.map((e: any) => {
    slides.push(
      <Suspense
        fallback={
          <StyledProgressPlaceholder className="vertical-padding-20" />
        }>
        <ProductRecCard renderingContext={e} />
      </Suspense>
    );
  });

  return showEspot ? (
    <StyledProductRecommendationLayout>
      {slides && slides.length > 0 ? (
        <>
          {recommendedProductTitle && (
            <StyledTypography variant="h4">
              {ReactHtmlParser(recommendedProductTitle)}
            </StyledTypography>
          )}
          <PureReactSlider slidesList={slides} />
        </>
      ) : (
        <StyledProgressPlaceholder className="vertical-padding-5" />
      )}
    </StyledProductRecommendationLayout>
  ) : null;
}

const StyledProductRecommendationLayout = styled.div`
  ${({ theme }) => `
    margin: ${theme.spacing(4)}px 0;
  `}
`;

export default ProductRecommendationLayout;
