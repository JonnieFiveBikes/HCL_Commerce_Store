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
import Axios, { Canceler } from "axios";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import eSpotService from "../../../_foundation/apis/transaction/eSpot.service";
import productsService from "../../../_foundation/apis/search/products.service";
//Custom libraries
import { CommerceEnvironment } from "../../../constants/common";
//UI
import { StyledTypography, StyledProgressPlaceholder } from "../../StyledUI";

function FeaturedProductRecommendationLayout({
  cid,
  eSpotName,
  renderingContext,
  ...props
}: any) {
  let title: string;
  let ctx: any;
  const { mySite } = useSite();
  const storeID: string = mySite ? mySite.storeID : "";
  const catalogID: string = mySite ? mySite.catalogID : "";
  const FeatureCardLayout = lazy(
    () => import("../feature-card/FeatureCardLayout")
  );

  let eSpot: any;
  const [recommendedProductTitle, setRecommendedProductTitle] = React.useState<
    string
  >();
  const [
    recommendedProductContext,
    setRecommendedProductContext,
  ] = React.useState<any>(null);
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];
  const generateCtxFromEspot = (name: string) => {
    let eSName = name;
    const parameters: any = {
      storeId: storeID,
      name: eSName,
      catalogId: catalogID,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    eSpotService
      .findByName(parameters)
      .then((response) => {
        eSpot = response?.data.MarketingSpotData[0];
        let prodDescriptions: any[] = eSpot.baseMarketingSpotActivityData;
        let product: string = "";
        let eSpotDescription: any;
        title = eSpot.marketingSpotDataTitle
          ? eSpot.marketingSpotDataTitle[0].marketingContentDescription[0]
              .marketingText
          : "";
        setRecommendedProductTitle(title);
        for (let description of prodDescriptions) {
          if (description.productPartNumber) {
            product = description.productPartNumber;
            eSpotDescription = description;
            break;
          }
        }
        generateCtx(product, eSpotDescription);
      })
      .catch((e) => console.log("Could not retrieve Espots"));
  };

  const generateCtx = (partNumber: string, eSpotDesc?: any) => {
    let parameters: any = {
      storeId: storeID,
      catalogId: catalogID,
      partNumber: partNumber,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };

    productsService
      .findProductsUsingGET(parameters)
      .then((productDescription) => {
        let c = JSON.parse(JSON.stringify(CommerceEnvironment.productSkeleton));
        c.id = partNumber;
        c.productDesc = productDescription || {};
        c.eSpotInternal = eSpot;
        c.eSpotDescInternal = eSpotDesc;
        ctx = c;
        setRecommendedProductContext(ctx);
      })
      .catch((e) => {
        console.log("Could not retrieve Products");
      });
  };

  React.useEffect(() => {
    if (mySite !== null && mySite !== undefined) {
      generateCtxFromEspot(eSpotName);
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [eSpotName, mySite]);
  return (
    <>
      {recommendedProductTitle && (
        <StyledTypography variant="h4" className="vertical-margin-4">
          {ReactHtmlParser(recommendedProductTitle)}
        </StyledTypography>
      )}
      {recommendedProductContext && (
        <Suspense
          fallback={
            <StyledProgressPlaceholder className="vertical-padding-20" />
          }>
          <FeatureCardLayout renderingContext={recommendedProductContext} />
        </Suspense>
      )}
    </>
  );
}

export default FeaturedProductRecommendationLayout;
