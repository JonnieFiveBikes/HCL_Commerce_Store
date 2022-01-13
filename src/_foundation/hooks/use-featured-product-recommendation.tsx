/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020,2021
 *
 *==================================================
 */
//Standard libraries	//store-packages
import React, { lazy } from "react";
import Axios, { Canceler } from "axios";
//Foundation libraries	//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import eSpotService from "../../_foundation/apis/transaction/eSpot.service";
import productsService from "../../_foundation/apis/search/products.service";
//Custom libraries
import { CommerceEnvironment } from "../../constants/common";
//UI
import { WidgetProps } from "../constants/seo-config";

function useFeaturedProductRecommendation({ widget, page }: any) {
  const widgetName = widget.widgetName;

  const eSpotName =
    widget && widget.properties ? widget.properties.emsName : "";

  let title: string;
  let ctx: any;
  const { mySite } = useSite();
  const storeID: string = mySite ? mySite.storeID : "";
  const catalogID: string = mySite ? mySite.catalogID : "";
  const FeatureCardLayout = lazy(
    () => import("../../components/widgets/feature-card/FeatureCardLayout")
  );

  let eSpot: any;
  const [recommendedProductTitle, setRecommendedProductTitle] =
    React.useState<string>();
  const [recommendedProductContext, setRecommendedProductContext] =
    React.useState<any>(null);
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const generateCtxFromEspot = (name: string) => {
    let eSName = name;
    const parameters: any = {
      storeId: storeID,
      name: eSName,
      catalogId: catalogID,
      ...payloadBase,
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
      ...payloadBase,
    };
    productsService
      .findProductsUsingGET(parameters)
      .then((productDescription) => {
        let c = JSON.parse(JSON.stringify(CommerceEnvironment.productSkeleton));
        c.id = partNumber;
        c.productDesc = productDescription || {};
        c.eSpotInternal = eSpot;
        c.eSpotDescInternal = eSpotDesc;
        c.featuredCard = <FeatureCardLayout renderingContext={c} />;
        ctx = c;
        setRecommendedProductContext(ctx);
      })
      .catch((e) => {
        console.log("Could not retrieve Products");
      });
  };

  React.useEffect(() => {
    if (mySite !== null && mySite !== undefined && eSpotName) {
      generateCtxFromEspot(eSpotName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eSpotName, mySite, eSpotName]);

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    recommendedProductTitle,
    recommendedProductContext,
  };
}

export const withFeatureProductRecommendationWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page }) => {
    const { recommendedProductTitle, recommendedProductContext } =
      useFeaturedProductRecommendation({ widget, page });
    return (
      <>
        <WrapComponent
          {...{
            recommendedProductTitle,
            recommendedProductContext,
          }}></WrapComponent>
      </>
    );
  };
