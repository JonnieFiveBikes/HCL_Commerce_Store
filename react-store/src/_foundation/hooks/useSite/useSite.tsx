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
import { CommerceEnvironment, HYPHEN, UNDERSCORE, EMPTY_STRING } from "../../../constants/common";
import { localStorageUtil } from "../../utils/storageUtil";
import { LOCALE } from "../../constants/common";
import { i18n } from "i18next";

interface useSiteResponse {
  mySite: SiteInfo | any;
  storeDisplayName: string;
}

const setTranslate = (mySite: SiteInfo | any, i18n: i18n) => {
  /**
   * language preference priority
   * 1. user context, to be implemented with language toggle
   * 2. localStorage (saved for 30 days).
   * 3. store default language.
   */
  // TODO: language toggle, update user language, read language from userContext if it is registered user.
  //check if locale exists in local storage
  if (localStorageUtil.get(LOCALE) === null) {
    //locale does not exist in local storage
    //get language from site default. convert from id to string
    const locale = CommerceEnvironment.languageMap[mySite.defaultLanguageID].split(UNDERSCORE).join(HYPHEN);
    //check if language from site default matches the current store language
    //if not then change language
    i18n.changeLanguage(locale);
    //set locale into local storage
    localStorageUtil.set(LOCALE, locale.split(HYPHEN).join(UNDERSCORE));
  } else {
    const locale = localStorageUtil.get(LOCALE).split(UNDERSCORE).join(HYPHEN);
    i18n.changeLanguage(locale);
  }
};

const useSite = (): useSiteResponse => {
  const { i18n } = useTranslation();
  const mySite: SiteInfo | any = useSelector(siteSelector);
  if (mySite && i18n.languages) {
    const langId = CommerceEnvironment.reverseLanguageMap[i18n.languages[0].split(HYPHEN).join(UNDERSCORE)];
    const storeDisplayName = mySite
      ? mySite.storeCfg.description.find((d) => d.languageId === langId)?.displayName || mySite.storeName
      : EMPTY_STRING;
    return { mySite, storeDisplayName };
  } else if (mySite) {
    setTranslate(mySite, i18n);
    return { mySite, storeDisplayName: EMPTY_STRING };
  } else {
    return { mySite: null, storeDisplayName: EMPTY_STRING };
  }
};

export { useSite };
