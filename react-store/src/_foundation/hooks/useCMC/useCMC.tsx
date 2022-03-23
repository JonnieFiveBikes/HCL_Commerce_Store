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
import { Dispatch, RefObject } from "react";
//foundation
import { storageSessionHandler } from "../../utils/storageUtil";
import { site } from "../../constants/site";
//redux
import { CMC_SESSION_ERROR_ACTION } from "../../../redux/actions/error";

import { CMCService } from "@hcl-commerce-store-sdk/utils";

const useCMC = (iframeRef: RefObject<HTMLIFrameElement>, locale: string, dispatch: Dispatch<any>) => {
  return CMCService.getCMCMessageService(
    iframeRef,
    locale,
    dispatch,
    site,
    storageSessionHandler,
    CMC_SESSION_ERROR_ACTION
  );
};

export default useCMC;
