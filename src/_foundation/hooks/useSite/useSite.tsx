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
import { useTranslation } from "react-i18next";
//Redux
import { SiteInfo } from "../../../redux/reducers/reducerStateInterface";
import { siteSelector } from "../../../redux/selectors/site";
import { CommerceEnvironment } from "../../../constants/common";

interface useSiteResponse {
  mySite: SiteInfo;
  storeDisplayName: string;
}

const useSite = (): useSiteResponse => {
  const { i18n } = useTranslation();
  const mySite: SiteInfo | any = useSelector(siteSelector);

  const langId =
    CommerceEnvironment.reverseLanguageMap[
      i18n.languages[0].split("-").join("_")
    ];
  const storeDisplayName = mySite
    ? mySite.storeCfg.description.filter((d) => d.languageId === langId)[0]
        ?.displayName ||
      mySite.storeCfg.description.filter(
        (d) => d.languageId === mySite.defaultLanguageID
      )[0]?.displayName ||
      mySite.storeName
    : "";
  return { mySite, storeDisplayName };
};

export { useSite };
