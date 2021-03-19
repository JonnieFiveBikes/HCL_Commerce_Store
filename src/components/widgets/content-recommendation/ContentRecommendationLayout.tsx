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
import React, { useState, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import HTMLReactParser, { DomElement, domToReact } from "html-react-parser";
import { withRouter } from "react-router-dom";
import Axios, { Canceler } from "axios";
import { Link } from "react-router-dom";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import eSpotService from "../../../_foundation/apis/transaction/eSpot.service";
import commonUtil from "../../../_foundation/utils/commonUtil";
//Custom libraries
import { HCL_Dx_PREFIX, CONTENT_FORMAT_ID } from "../../../constants/marketing";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import { ADD_ITEM_ACTION } from "../../../redux/actions/order";
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../../redux/actions/marketingEvent";
//UI
import { StyledProgressPlaceholder } from "../../StyledUI";
//GA360
import { DISABLED_ESPOT_LIST } from "../../../_foundation/constants/gtm";
import AsyncCall from "../../../_foundation/gtm/async.service";

function ContentRecommendationLayout({ cid, eSpot, ...props }: any) {
  const widgetName = getDisplayName(ContentRecommendationLayout);
  const ESPOT_TYPE_PAGE_PREFIX: string = "page-prefix";
  const ESPOT_TYPE_PAGE_SUFFIX: string = "page-suffix";

  const { eSpotName, type } = eSpot;
  const { page } = props;

  const dispatch = useDispatch();
  const { mySite } = useSite();
  const [content, setContent] = useState<any>(null);
  const contract = useSelector(currentContractIdSelector);

  const storeID: string = mySite ? mySite.storeID : "";
  const catlogID: string = mySite ? mySite.catalogID : "";
  const CancelToken = Axios.CancelToken;

  const DXContentWrapper = lazy(
    () => import("../dx-content-wrapper/DXContentWrapper")
  );

  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const allowGAEvent = (eSpotRoot) =>
    !DISABLED_ESPOT_LIST.includes(eSpotRoot.eSpotName);

  const initESpot = (pageName: string) => {
    let eSName = eSpotName;
    if (type === ESPOT_TYPE_PAGE_SUFFIX) {
      eSName = eSName + pageName; // pagename
    } else if (type === ESPOT_TYPE_PAGE_PREFIX) {
      eSName = pageName + eSName;
    }
    const parameters: any = {
      storeId: storeID,
      name: eSName,
      catalogId: catlogID,
      ...payloadBase,
    };
    eSpotService
      .findByName(parameters)
      .then((res) => {
        const eSpotRoot = res.data.MarketingSpotData[0];
        const title = eSpotRoot.marketingSpotDataTitle
          ? eSpotRoot.marketingSpotDataTitle[0].marketingContentDescription[0]
              .marketingText
          : "";
        const templates = processMarketingSpotData(eSpotRoot, title);
        setContent({ templates, title });
        //GA360
        if (
          mySite.enableGA &&
          eSpotRoot.baseMarketingSpotActivityData &&
          allowGAEvent(eSpotRoot)
        ) {
          AsyncCall.sendPromotionImpression(eSpotRoot, {
            enableUA: mySite.enableUA,
            enableGA4: mySite.enableGA4,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const processMarketingSpotData = (eSpotRoot: any, title: any): string[] => {
    const d: any[] = [];
    const eSpotData = eSpotRoot.baseMarketingSpotActivityData || [];
    for (const eSpotDesc of eSpotData) {
      // Define the component using Component decorator.
      let currentTemplate: any = {
        id: null,
        template: null,
        isDxContent: false,
      };
      const desc = eSpotDesc.marketingContentDescription;
      const assetSrc =
        eSpotDesc.attachmentAsset && eSpotDesc.attachmentAsset[0]
          ? eSpotDesc.attachmentAsset[0]["attachmentAssetPath"]
          : "";
      const assetName =
        eSpotDesc.attachmentDescription && eSpotDesc.attachmentDescription[0]
          ? eSpotDesc.attachmentDescription[0]["attachmentName"]
          : "";

      const replace = (node: DomElement) => {
        if (
          node.type &&
          node.type === "tag" &&
          node.name &&
          node.name === "a"
        ) {
          return (
            <Link
              key={`a_${eSpotDesc.contentId}}`}
              to={eSpotDesc.contentUrl}
              onClick={(event) =>
                performClick(event, { eSpotRoot, eSpotDesc })
              }>
              {node.children && domToReact(node.children)}
            </Link>
          );
        } else {
          return;
        }
      };

      if (eSpotDesc.contentFormatId === CONTENT_FORMAT_ID.EXTERNAL) {
        currentTemplate.isDxContent = true;
        //dx content using url field to save content reference.
        if (
          eSpotDesc.contentUrl &&
          eSpotDesc.contentUrl.startsWith(HCL_Dx_PREFIX)
        ) {
          currentTemplate.template = eSpotDesc.contentUrl.substr(
            HCL_Dx_PREFIX.length
          );
        } else {
          currentTemplate.template = eSpotDesc.contentUrl || "";
        }
      } else if (
        desc &&
        desc[0] &&
        desc[0]["marketingText"] &&
        desc[0]["marketingText"].length > 0
      ) {
        const marketingText = desc[0].marketingText.trim();

        //each template text suppose to only have one <a> tag
        currentTemplate.template = HTMLReactParser(marketingText, {
          replace,
        });
      } else {
        currentTemplate.template = (
          <div>
            <Link
              to={eSpotDesc.contentUrl}
              onClick={(event) =>
                performClick(event, { eSpotRoot, eSpotDesc })
              }>
              <LazyLoadComponent
                placeholder={
                  <StyledProgressPlaceholder className="vertical-padding-20" />
                }>
                <img alt={assetName} src={assetSrc}></img>
              </LazyLoadComponent>
            </Link>
          </div>
        );
      }
      currentTemplate.id = eSpotDesc.contentId;

      d.push(currentTemplate);
    }
    return d;
  };

  const performClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    { eSpotRoot, eSpotDesc }: any
  ) => {
    event.preventDefault();
    dispatch(
      CLICK_EVENT_TRIGGERED_ACTION({ eSpotRoot, eSpotDesc, ...payloadBase })
    );
    const linkAction = commonUtil.parseConentUrl(eSpotDesc.contentUrl || "");
    if (linkAction) {
      switch (linkAction["action"]) {
        case "navigate":
          if (
            linkAction.toLink.length > 0 &&
            linkAction.toLink !== props.history.location.pathname
          ) {
            props.history.push(linkAction.toLink);
          }
          break;
        case "addToCart":
          const payload = {
            quantity: [1],
            partnumber: linkAction.partnumber,
            contractId: contract,
          };
          dispatch(ADD_ITEM_ACTION(payload));
          break;
        case "addToWishlist":
          //TODO
          break;
      }
    }
    //GA360
    if (mySite.enableGA && allowGAEvent(eSpotRoot)) {
      AsyncCall.sendPromotionClick(eSpotRoot, {
        enableUA: mySite.enableUA,
        enableGA4: mySite.enableGA4,
      });
    }
  };

  React.useEffect(() => {
    if (mySite && page) {
      let pageName = page.name;
      if (page.externalContext?.identifier) {
        pageName = page.externalContext.identifier;
      }
      initESpot(pageName);
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, mySite]);

  return (
    <>
      {content && (
        <>
          <LazyLoadComponent
            placeholder={
              <StyledProgressPlaceholder className="vertical-padding-20" />
            }>
            {content.title && <h2>{HTMLReactParser(content.title)}</h2>}
            {content.templates.map((t: any) => {
              return t.isDxContent ? (
                <DXContentWrapper key={t.id} contentId={t.template} />
              ) : (
                <React.Fragment key={t.id}>{t.template}</React.Fragment>
              );
            })}
          </LazyLoadComponent>
        </>
      )}
    </>
  );
}
ContentRecommendationLayout.propTypes = {
  cid: PropTypes.string.isRequired,
  eSpot: PropTypes.object.isRequired,
  page: PropTypes.object,
};
export default withRouter(ContentRecommendationLayout);
