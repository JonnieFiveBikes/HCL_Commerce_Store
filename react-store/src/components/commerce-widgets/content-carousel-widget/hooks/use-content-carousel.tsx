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
//standard libraries
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HTMLReactParser, { Element, domToReact, DOMNode } from "html-react-parser";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { LazyLoadComponent } from "react-lazy-load-image-component";

//hcl packages
import { ContentCarouselWidget, StyledProgressPlaceholder, StyledLink } from "@hcl-commerce-store-sdk/react-component";
import { commonUtil } from "@hcl-commerce-store-sdk/utils";

//Foundation libraries
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../../../redux/actions/marketingEvent";
import { ADD_ITEM_ACTION } from "../../../../redux/actions/order";
import { useSite } from "../../../../_foundation/hooks/useSite";
import { DISABLED_ESPOT_LIST } from "../../../../_foundation/constants/gtm";
import AsyncCall from "../../../../_foundation/gtm/async.service";
import { Page, Widget, WidgetProps } from "../../../../_foundation/constants/seo-config";
import eSpotService from "../../../../_foundation/apis/transaction/eSpot.service";

//custom
import { currentContractIdSelector } from "../../../../redux/selectors/contract";
import { EMPTY_STRING } from "../../../../constants/common";
import { usePreviewWidgetInfoValue } from "../../../../_foundation/preview/context/preview-info-context";
import { isInManagedPreview } from "../../../../_foundation/utils/preview";

export const useContentCarousel = (widget: Widget, page: Page) => {
  const ESPOT_TYPE_PAGE_SPECIFIC: string = "local";
  const [slideList, setSlideList] = React.useState<Array<any>>([]);
  const [marketingSpotData, setMarketingSpotData] = React.useState<any[]>([]);
  const { emsName, emsType, interval, isPlaying, playDirection, infinite } = widget.properties || {};
  const controls = {
    interval: parseInt(interval),
    isPlaying: JSON.parse(isPlaying),
    playDirection: playDirection,
    infinite: JSON.parse(infinite),
  };
  const widgetName = getDisplayName(ContentCarouselWidget);
  const cancels: Canceler[] = [];
  const { mySite } = useSite();
  const dispatch = useDispatch();
  const contract = useSelector(currentContractIdSelector);
  const storeID: string = mySite ? mySite.storeID : EMPTY_STRING;
  const catalogID: string = mySite ? mySite.catalogID : EMPTY_STRING;
  const CancelToken = Axios.CancelToken;

  const allowGAEvent = (eSpotRoot) => !DISABLED_ESPOT_LIST.includes(eSpotRoot.eSpotName);

  const initMarketingContent = (pageName) => {
    let eSName = emsName;
    if (emsType === ESPOT_TYPE_PAGE_SPECIFIC) {
      eSName = pageName + eSName;
    }
    const parameters: any = {
      storeId: storeID,
      name: eSName,
      catalogId: catalogID,
      widget: widgetName,
      query: {
        DM_ReturnCatalogGroupId: true,
        DM_FilterResults: false,
      },
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    eSpotService
      .findByName(parameters)
      .then((res) => {
        const eSpot = res.data.MarketingSpotData;
        setMarketingSpotData(eSpot);
        const eSpotRoot = eSpot[0];
        processMarketingContent(eSpotRoot);
        //GA360
        if (mySite.enableGA && eSpotRoot.baseMarketingSpotActivityData && allowGAEvent(eSpotRoot)) {
          AsyncCall.sendPromotionImpression(eSpotRoot, {
            enableUA: mySite.enableUA,
            enableGA4: mySite.enableGA4,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const processMarketingContent = (content: any) => {
    content.baseMarketingSpotActivityData.forEach((obj) => {
      const description: any[] = obj.marketingContentDescription;
      const attachmentAsset: any[] = obj.attachmentAsset;
      const contentUrl: string = obj.contentUrl || EMPTY_STRING;
      const contentId: string = obj.contentId || EMPTY_STRING;

      const replace = (node: DOMNode): any => {
        return (
          node instanceof Element &&
          node.type === "tag" &&
          node?.name === "a" && (
            <StyledLink
              key={`a_${contentId}}`}
              to={contentUrl}
              onClick={(event) => performClick(event, { eSpotDesc: content })}>
              {node.children && domToReact(node.children)}
            </StyledLink>
          )
        );
      };

      if (obj.contentFormatName === "Text") {
        const p = HTMLReactParser(description[0].marketingText, { replace });
        setSlideList((slideList) => [...slideList, p]);
      } else if (obj.contentFormatName === "File") {
        let src;
        let isUrl;
        const style = { maxHeight: "100%", maxWidth: "100%" };
        attachmentAsset.forEach((a) => {
          src = a.attachmentAssetPath;
          isUrl = /^https?:\/\//.test(src);

          a.name = isUrl ? src : src.replace(/.+\/(.+)/, "$1").replace(/\?(\w+=\w+&?)+/, "");
          a.mimeType = isUrl ? "content/url" : a.attachmentAssetMimeType || "content/unknown";
          a.attachmentAssetPath = src;

          const attachmentData = (
            <StyledLink to={contentUrl} onClick={(event) => performClick(event, { eSpotDesc: content })}>
              <LazyLoadComponent placeholder={<StyledProgressPlaceholder className="vertical-padding-20" />}>
                <img {...{ style, src }} alt={src}></img>
              </LazyLoadComponent>
            </StyledLink>
          );
          setSlideList((slideList) => [...slideList, attachmentData]);
        });
      }
    });
  };

  const performClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, { eSpotDesc }: any) => {
    dispatch(
      CLICK_EVENT_TRIGGERED_ACTION({
        eSpotDesc,
        widget: widgetName,
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
      })
    );
    const { contentUrl: url } = eSpotDesc;
    const linkAction = commonUtil.parseContentUrl(url || EMPTY_STRING);
    if (linkAction?.action) {
      event.preventDefault();
      switch (linkAction.action) {
        case "addToCart":
          dispatch(
            ADD_ITEM_ACTION({
              quantity: [1],
              partnumber: linkAction.partnumber,
              contractId: contract,
            })
          );
          break;
        case "addToWishlist":
          //TODO
          break;
      }
    }
    //GA360
    if (mySite.enableGA && allowGAEvent(eSpotDesc)) {
      AsyncCall.sendPromotionClick(eSpotDesc, {
        enableUA: mySite.enableUA,
        enableGA4: mySite.enableGA4,
      });
    }
  };

  React.useEffect(() => {
    if (mySite && page && emsName) {
      let pageName = page.name;
      if (page.externalContext?.identifier) {
        pageName = page.externalContext.identifier;
      }
      initMarketingContent(pageName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, mySite, emsName]);

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    slideList,
    controls,
    marketingSpotData,
  };
};

/**
 * A high order component that wraps a component needs processed maketing content data.
 * @param Component the wrapping component.
 * @returns A component that has ability to process marketing content data for carousel.
 */

export const withContentCarouselWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }) => {
    const { slideList, controls, marketingSpotData } = useContentCarousel(widget, page);
    const { setWidgetInfo } = usePreviewWidgetInfoValue();
    useEffect(() => {
      setWidgetInfo && isInManagedPreview() && setWidgetInfo({ marketingSpotData });
    }, [marketingSpotData, setWidgetInfo]);
    return (
      <>
        {slideList && slideList.length > 0 && <WrapComponent {...{ slideList, controls }} {...props}></WrapComponent>}
      </>
    );
  };
