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
import React, { lazy, useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
//Foundation libraries	//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
import eSpotService from "../../../../_foundation/apis/transaction/eSpot.service";
import productsService from "../../../../_foundation/apis/search/products.service";
//Custom libraries
import { CommerceEnvironment } from "../../../../constants/common";
//UI
import { WidgetProps } from "../../../../_foundation/constants/seo-config";
import { ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainer } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { get } from "lodash-es";
import { usePreviewWidgetInfoValue } from "../../../../_foundation/preview/context/preview-info-context";
import { isInManagedPreview } from "../../../../_foundation/utils/preview";

type generateCtxProps = { partNumber: string; eSpot: any; eSpotDesc?: any; parameters: any };

const generateCtx = async (props: generateCtxProps) => {
  const { partNumber, eSpot, eSpotDesc, parameters } = props;
  const FeatureCardLayout = lazy(() => import("../../../widgets/feature-card/FeatureCardLayout"));

  try {
    const productDescription = await productsService.findProductsUsingGET(parameters);
    const c = JSON.parse(JSON.stringify(CommerceEnvironment.productSkeleton));
    c.id = partNumber;
    c.productDesc = productDescription || {};
    c.eSpotInternal = eSpot;
    c.eSpotDescInternal = eSpotDesc;
    c.featuredCard = <FeatureCardLayout renderingContext={c} />;
    return c;
  } catch (e) {
    console.log("Could not retrieve Products");
    throw e;
  }
};

function useFeaturedProductRecommendation({ widget, page }: any) {
  const widgetName = widget.widgetName;

  const eSpotName = widget && widget.properties ? widget.properties.emsName : "";

  const { mySite } = useSite();
  const storeID: string = mySite ? mySite.storeID : "";
  const catalogID: string = mySite ? mySite.catalogID : "";

  const [recommendedProductTitle, setRecommendedProductTitle] = React.useState<string>();
  const [recommendedProductContext, setRecommendedProductContext] = React.useState<any>(null);
  const [marketingSpotData, setMarketingSpotData] = React.useState<any[]>([]);

  const controller = useMemo(() => new AbortController(), []);
  const payloadBase: any = useMemo(
    () => ({
      signal: controller.signal,
    }),
    [controller]
  );
  const { search } = useLocation();
  const searchParams = useMemo(() => {
    return new URLSearchParams(search ?? "");
  }, [search]);

  const generateCtxFromEspot = useCallback(
    async (name: string) => {
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
      try {
        const marketingSpotData = (await eSpotService
          .findByName(parameters)
          .then(
            (response) => response.data.MarketingSpotData
          )) as ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainer[];
        setMarketingSpotData({ ...marketingSpotData });
        const eSpot = marketingSpotData[0];

        const prodDescriptions: any[] | undefined = eSpot.baseMarketingSpotActivityData;
        const title = get(eSpot, "marketingSpotDataTitle[0].marketingContentDescription[0].marketingText", "");
        setRecommendedProductTitle(title);
        const eSpotDescription = prodDescriptions?.find((description) => description.productPartNumber !== undefined);
        const partNumber = eSpotDescription.productPartNumber;

        const ctx = await generateCtx({
          partNumber,
          eSpotDesc: eSpotDescription,
          eSpot,
          parameters: {
            storeId: storeID,
            catalogId: catalogID,
            partNumber,
            widget: widgetName,
            ...payloadBase,
          },
        });
        setRecommendedProductContext(ctx);
      } catch (e) {
        console.log("Could not retrieve Espots");
      }
    },
    [catalogID, payloadBase, searchParams, storeID, widgetName]
  );

  React.useEffect(() => {
    if (mySite && eSpotName) {
      generateCtxFromEspot(eSpotName);
    }
  }, [mySite, eSpotName, generateCtxFromEspot]);

  React.useEffect(() => {
    return () => {
      controller && controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    recommendedProductTitle,
    recommendedProductContext,
    marketingSpotData,
  };
}

export const withFeatureProductRecommendationWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page }) => {
    const { recommendedProductTitle, recommendedProductContext, marketingSpotData } = useFeaturedProductRecommendation({
      widget,
      page,
    });
    const { setWidgetInfo } = usePreviewWidgetInfoValue();
    useEffect(() => {
      setWidgetInfo && isInManagedPreview() && setWidgetInfo({ marketingSpotData });
    }, [marketingSpotData, setWidgetInfo]);
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
