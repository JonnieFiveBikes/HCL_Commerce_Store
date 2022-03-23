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
import Axios, { Canceler } from "axios";
import { useEffect } from "react";
import getDisplayName from "react-display-name";
import { useDispatch, useSelector } from "react-redux";
import AsyncCall from "../gtm/async.service";
//redux
import eSpotService from "../apis/transaction/eSpot.service";
import contentControllerService from "../apis/dx/contentController.service";
import mLConfigControllerService from "../apis/dx/mLConfigController.service";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../redux/actions/marketingEvent";
import { ADD_ITEM_ACTION } from "../../redux/actions/order";
//custom libraries
import { DISABLED_ESPOT_LIST } from "../constants/gtm";
import { Page, Widget } from "../constants/seo-config";
import { useSite } from "./useSite";
import { CommerceEnvironment, EMPTY_STRING } from "../../constants/common";
import { LOCALE } from "../constants/common";
import { localStorageUtil } from "../utils/storageUtil";
//hcl packages
import { commonUtil, marketingConstants } from "@hcl-commerce-store-sdk/utils";

/**
 * The hook for processing eSpot data.
 * @param widget the widget that contains eSpot.
 * @param page the page that contains this widget.
 * @returns an eSpot object
 */
export const useESpotHelper = (widget: Widget, page: Page): any => {
  const widgetName = getDisplayName(widget.widgetName);
  const { mySite } = useSite();
  const CancelToken = Axios.CancelToken;
  const dispatch = useDispatch();
  const contract = useSelector(currentContractIdSelector);
  const cancels: Canceler[] = [];
  const ESPOT_TYPE_PAGE_SPECIFIC: string = "local";
  const { emsName, emsType } = widget.properties || {};
  const storeID: string = mySite ? mySite.storeID : EMPTY_STRING;
  const catalogID: string = mySite ? mySite.catalogID : EMPTY_STRING;

  const initESpot = async (pageName: string) => {
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
    let eSpotRoot;
    try {
      const res = await eSpotService.findByName(parameters);
      eSpotRoot = res.data.MarketingSpotData[0];
    } catch (e) {
      console.log("espot helper", e);
      eSpotRoot = null;
    }
    return eSpotRoot;
  };

  const allowGAEvent = (eSpotRoot) => !DISABLED_ESPOT_LIST.includes(eSpotRoot.eSpotName);

  const performClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, { eSpotDesc }: any) => {
    dispatch(
      CLICK_EVENT_TRIGGERED_ACTION({
        eSpotDesc,
        widget: widgetName,
      })
    );
    const { contentUrl: url } = eSpotDesc;
    const linkAction = commonUtil.parseContentUrl(url || EMPTY_STRING);
    if (linkAction?.action) {
      event.preventDefault();
      switch (linkAction.action) {
        case "addToCart": {
          const payload = {
            quantity: [1],
            partnumber: linkAction.partnumber,
            contractId: contract,
            cancelToken: new CancelToken((c) => cancels.push(c)),
          };
          dispatch(ADD_ITEM_ACTION(payload));
          break;
        }
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

  const processDxContent = async (dxContentId: string) => {
    const locale =
      localStorageUtil.get(LOCALE)?.split("_")[0] || CommerceEnvironment.dxLanguageMap[mySite.defaultLanguageID];
    const payload = {
      skipErrorSnackbar: true,
      content_id: dxContentId,
      access_type: "dxrest",
      locale,
      widget: widgetName,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };

    let mlcontentId;
    try {
      const res = await mLConfigControllerService.accessMLSTranslations(payload);
      mlcontentId = res?.data?.translatedItems[locale].id;
    } catch (e) {
      mlcontentId = null;
      console.log(e);
    }

    let _data;
    if (mlcontentId) {
      const payload_translation = {
        dxContentId: mlcontentId,
        access_type: "dxrest",
        widget: widgetName,
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
      };

      try {
        const res2 = await contentControllerService.webContentReadContent(payload_translation);
        _data = res2?.data;
      } catch (e) {
        _data = null;
        console.log(e);
      }
    } else {
      try {
        const res3 = await contentControllerService.webContentReadContent(payload);
        _data = res3?.data;
      } catch (e) {
        _data = null;
        console.log(e);
      }
    }

    if (_data?.content) {
      const content = _data.content;
      let contentType = EMPTY_STRING;
      let templateID = _data.links.contentTemplate.href;
      templateID = templateID.split("/content-templates/")[1];
      if (templateID === marketingConstants.CONTENT_TEMPLATE.VIDEO_TEMPLATE_ID) {
        contentType = marketingConstants.CONTENT_TYPE_VIDEO;
      }
      return { dxContentId, content, contentType };
    }
    return { dxContentId };
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    initESpot,
    allowGAEvent,
    performClick,
    processDxContent,
  };
};
