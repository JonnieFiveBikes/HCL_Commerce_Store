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
import { useSelector } from "react-redux";
//Redux
import { SiteInfo } from "../../../redux/reducers/reducerStateInterface";
import { siteSelector } from "../../../redux/selectors/site";

const useSite = (): SiteInfo => {
  const site: SiteInfo | any = useSelector(siteSelector);
  return site;
};

export { useSite };
