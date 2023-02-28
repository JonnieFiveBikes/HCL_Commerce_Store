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
import React, { lazy, useMemo } from "react";
import Axios, { Canceler } from "axios";
import { useLocation } from "react-router";
//Foundation libraries	//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
import eSpotService from "../../../../_foundation/apis/transaction/eSpot.service";
import productsService from "../../../../_foundation/apis/search/products.service";
//Custom libraries
import { CommerceEnvironment } from "../../../../constants/common";
//UI
import { WidgetProps } from "../../../../_foundation/constants/seo-config";

function useFeaturedProductRecommendation({ widget, page }: any) {
  const widgetName = widget.widgetName;

  const eSpotName = widget && widget.properties ? widget.properties.emsName : "";

  let title: string;
  let ctx: any;
  const { mySite } = useSite();
  const storeID: string = mySite ? mySite.storeID : "";
  const catalogID: string = mySite ? mySite.catalogID : "";
  const FeatureCardLayout = lazy(() => import("../../../widgets/feature-card/FeatureCardLayout"));

  let eSpot: any;
  const [recommendedProductTitle, setRecommendedProductTitle] = React.useState<string>();
  const [recommendedProductContext, setRecommendedProductContext] = React.useState<any>(null);

  const { search } = useLocation();
  const searchParams = useMemo(() => {
    return new URLSearchParams(search ?? "");
  }, [search]);

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const generateCtxFromEspot = (name: string) => {
    const eSName = name;
    const parameters: any = {
      storeId: storeID,
      name: eSName,
      catalogId: catalogID,
      widget: widgetName,
      query: {
        DM_ReturnCatalogGroupId: true,
        DM_FilterResults: false,
        /**
         * other possible eSpot parameters
         * DM_marketingSpotBehavior: 0,1, or 2,
         * -- Example of specifying the customer is viewing a set of product.
         * -- The marketing activity could then display merchandising associations
         * -- of these products.
         * productId: "12345,67890,54321",
         * DM_DisplayProducts: number of products to display,
         * DM_DisplayCategories: number of categories,
         * DM_DisplayContent: number of contents
         * Name: value (pairs, can be cookie name and value),
         * -- content Substitutions
         * DM_SubstitutionName1: ${DM_SubstitutionName1}
         * DM_SubstitutionValue1: ${DM_SubstitutionValue1}
         * -- masked content substitutions: masked values will be masked in trace output.
         * DM_SubstitutionMaskedName1: ${DM_SubstitutionMaskedName1}
         * DM_SubstitutionMaskedValue1: ${DM_SubstitutionMaskedValue1}
         */
      },
      ...payloadBase,
    };
    //for url parameters.
    searchParams.forEach((value, key) => {
      parameters.query[key] = value;
    });
    eSpotService
      .findByName(parameters)
      .then((response) => {
        eSpot = response?.data.MarketingSpotData[0];
        const prodDescriptions: any[] = eSpot.baseMarketingSpotActivityData;
        let product: string = "";
        let eSpotDescription: any;
        title = eSpot.marketingSpotDataTitle
          ? eSpot.marketingSpotDataTitle[0].marketingContentDescription[0].marketingText
          : "";
        setRecommendedProductTitle(title);
        for (const description of prodDescriptions) {
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
    const parameters: any = {
      storeId: storeID,
      catalogId: catalogID,
      partNumber: partNumber,
      ...payloadBase,
    };
    productsService
      .findProductsUsingGET(parameters)
      .then((productDescription) => {
        const c = JSON.parse(JSON.stringify(CommerceEnvironment.productSkeleton));
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
    const { recommendedProductTitle, recommendedProductContext } = useFeaturedProductRecommendation({ widget, page });
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
