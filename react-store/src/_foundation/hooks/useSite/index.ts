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
import { Dispatch } from "react";
//Foundation libraries
import { useSite } from "./useSite";
import { SiteInfoService, SiteInfoArgs } from "./SiteInfoService";
//Redux
import { SiteInfo } from "../../../redux/reducers/reducerStateInterface";

function getSite(): SiteInfo | null {
  return SiteInfoService.getSiteInfo().getSiteValue();
}

function initSite(s: SiteInfoArgs, dispatch: Dispatch<any>) {
  return SiteInfoService.getSiteInfo().setSite(s, dispatch);
}

export { useSite, getSite, initSite };
