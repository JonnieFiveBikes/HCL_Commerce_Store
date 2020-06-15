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
import { select } from "redux-saga/effects";

//Foundation libraries
import eventService from "../../../_foundation/apis/transaction/event.service";

//custom library
import { wcTokenSelector } from "../../selectors/user";

function* performClickEvent(action: any) {
  const WCToken = yield select(wcTokenSelector);
  if (!!WCToken) {
    //only tract click with guest  of register user
    const { eSpotDesc, eSpotRoot } = action.payload;
    let body = {
      evtype: "CpgnClick",
      productId: eSpotDesc.productId || "",
      categoryId: eSpotDesc.filteredResultId || "",
      DM_ReqCmd: "",
      intv_id: eSpotDesc.activityIdentifierID,
      expDataType: eSpotDesc.baseMarketingSpotDataType,
      mpe_id: eSpotRoot.marketingSpotIdentifier,
      expDataUniqueID: eSpotDesc.baseMarketingSpotActivityID,
    };
    if (eSpotDesc.experimentResult) {
      const expResult = eSpotDesc.experimentResult[0];
      const bodyExt = {
        experimentId: expResult.experimentResultId,
        testElementId: expResult.experimentResultTestElementId,
        controlElement: expResult.controlElement,
      };
      Object.assign(body, bodyExt);
    }
    const params = {
      body,
    };
    try {
      yield eventService.handleClickInfo(params);
    } catch (e) {
      console.warn(e);
    }
  }
}

function* performTriggerMarketing(action: any) {
  const WCToken = yield select(wcTokenSelector);
  if (!!WCToken) {
    //only tract click with guest  of register user
    try {
      const params = {
        body: action.payload,
      };

      yield eventService.triggerMarketing(params);
    } catch (e) {
      console.warn(e);
    }
  }
}

export { performClickEvent, performTriggerMarketing };
