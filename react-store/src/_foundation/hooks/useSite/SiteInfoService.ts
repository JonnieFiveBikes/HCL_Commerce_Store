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
import Axios, { AxiosRequestConfig } from "axios";
//Foundation libraries
import {
  sessionStorageUtil,
  localStorageUtil,
  storageSessionHandler,
  windowRegistryHandler,
  storageStoreIdHandler,
} from "../../utils/storageUtil";
import { WC_PREVIEW_TOKEN, NEW_PREVIEW_SESSION, LANGID, LOCALE, SHOW_API_FLOW } from "../../constants/common";
import { GTM_ID, GTM_AUTH, GTM_PREVIEW, GA_VERSIONS, GA_VERSION_UA, GA_VERSION_GA4 } from "../../constants/gtm";
//custom library
import { SiteInfo } from "../../../redux/reducers/reducerStateInterface";
import { CommerceEnvironment } from "../../../constants/common";
import { PERMANENT_STORE_DAYS } from "../../../configs/common";
//Redux
import { INIT_SITE_SUCCESS_ACTION } from "../../../redux/actions/site";

export interface SiteInfoArgs {
  storeName?: string;
  searchContext: string;
  transactionContext?: string;
  storeID?: string;
  [extraPros: string]: any;
}

export class SiteInfoService {
  private static mySiteInfo: SiteInfoService = new SiteInfoService();
  private readonly B2B = "B2B";
  private readonly BMH = "BMH";
  private siteInfo: SiteInfo | null = null;

  public static getSiteInfo(): SiteInfoService {
    return SiteInfoService.mySiteInfo;
  }

  public getSiteValue(): SiteInfo | null {
    return this.siteInfo;
  }

  public setSite(s: SiteInfoArgs, dispatch: any) {
    if (!this.siteInfo) {
      this.initializeSite(s).then((site: SiteInfo) => {
        this.siteInfo = site;
        dispatch(INIT_SITE_SUCCESS_ACTION(site));
      });
    }
  }

  private initStorage(site: SiteInfo) {
    sessionStorageUtil.setStoreName(site.storeName);
    localStorageUtil.setStoreName(site.storeName);
    storageStoreIdHandler.setStoreId(site.storeID);
    windowRegistryHandler.registerWindow();
    window.addEventListener("unload", function (event) {
      windowRegistryHandler.unRegisterWindow();
    });
    window.addEventListener("contextmenu", function (this, event) {
      storageStoreIdHandler.verifyActiveStoreId();
    });
    //preview token
    const storeviewURL = new URL(window.location.href);
    const wcPreviewToken = {};
    const previewtoken = storeviewURL.searchParams.get(WC_PREVIEW_TOKEN);
    if (previewtoken !== null) {
      wcPreviewToken[WC_PREVIEW_TOKEN] = previewtoken;
      storageSessionHandler.savePreviewToken(wcPreviewToken);
      const newPreviewSession = storeviewURL.searchParams.get(NEW_PREVIEW_SESSION);
      if ("true" === newPreviewSession) {
        storageSessionHandler.removeCurrentUser();
      }
    }
    const langId = storeviewURL.searchParams.get(LANGID);
    const locale = storeviewURL.searchParams.get(LOCALE);
    const showAPIFlow = storeviewURL.searchParams.get(SHOW_API_FLOW);

    if (langId !== null) {
      //check if it is part supported language.
      if (site.supportedLanguages.includes(langId)) {
        localStorageUtil.set(LOCALE, CommerceEnvironment.languageMap[langId], 30);
      } else {
        console.warn(`${langId} is not supported language of store ${site.storeName}`);
      }
    } else if (locale != null) {
      //
      const langId = CommerceEnvironment.reverseLanguageMap[locale];
      if (site.supportedLanguages.includes(langId)) {
        localStorageUtil.set(LOCALE, locale, PERMANENT_STORE_DAYS);
      } else {
        console.warn(`${locale} is not supported language of store ${site.storeName}`);
      }
    } else {
      //verify if locale is one of supported language, remove it if is not supported.
      const locale = localStorageUtil.get(LOCALE);
      const langId = CommerceEnvironment.reverseLanguageMap[locale];
      if (!site.supportedLanguages.includes(langId)) {
        localStorageUtil.remove(LOCALE);
      }
    }

    if (showAPIFlow !== null) {
      localStorageUtil.set(SHOW_API_FLOW, showAPIFlow, PERMANENT_STORE_DAYS);
    }
  }

  private assign(target: SiteInfo, source) {
    const { storeID } = target;
    const { relatedStores: rel = [] } = source;

    // GA360
    const gtmID = source.userData[GTM_ID];
    const gtmAuth = source.userData[GTM_AUTH];
    const gtmPreview = source.userData[GTM_PREVIEW];
    const gaVersions = source.userData[GA_VERSIONS];

    if (gtmID && gtmAuth && gtmPreview) {
      const enableUA = gaVersions?.includes(GA_VERSION_UA) ?? false;
      const enableGA4 = gaVersions?.includes(GA_VERSION_GA4) ?? false;
      Object.assign(target, { enableGA: true, enableUA, enableGA4, gtmID, gtmAuth, gtmPreview });
    }

    // -4 is catalog-asset-store
    const caStore = rel.find(({ relationshipType: r, relatedStoreId: s }) => r === "-4" && s !== storeID);
    // -11 is storefront-asset-store
    const saStore = rel.find(({ relationshipType: r, relatedStoreId: s }) => r === "-11" && s !== storeID);

    Object.assign(target, {
      storeName: source.identifier,
      catalogStoreID: caStore?.relatedStoreId,
      saStoreID: saStore?.relatedStoreId,
      catalogID: source.defaultCatalog?.at(0)?.catalogIdentifier?.uniqueID,
      defaultCurrencyID: source.supportedCurrencies?.defaultCurrency,
      defaultLanguageID: source.supportedLanguages?.defaultLanguageId,
      storeType: source.storeType,
      isB2B: source.storeType === this.B2B || source.storeType === this.BMH,
      storeCfg: source,
      supportedLanguages: source.supportedLanguages?.supportedLanguages ?? [],
      supportedCurrencies: source.supportedCurrencies?.supportedCurrencies ?? [],
    });
  }

  private async initializeSite(s: SiteInfoArgs): Promise<SiteInfo> {
    const _site = Object.assign({}, s) as SiteInfo;

    let storeId = typeof window["HCL_STORE_ID"] === undefined ? undefined : window["HCL_STORE_ID"];
    if (!storeId) {
      storeId = storageStoreIdHandler.getStoreId4Initialization();
    }

    let cfg;
    if (!storeId) {
      cfg = await this.getStoreData(_site); // no store ID, lookup default name first.
      storeId = cfg.storeId;
    }

    _site.storeID = storeId;
    const storeCfg = await this.getOnlineStoreData(_site);
    this.assign(_site, storeCfg);

    if (!cfg) {
      cfg = await this.getStoreData(_site);
    }

    _site.inventorySystem = cfg.inventorySystem;
    this.initStorage(_site);
    return _site;
  }

  private getStoreData(s: SiteInfoArgs) {
    const config: AxiosRequestConfig = {
      params: { q: "findByStoreIdentifier", storeIdentifier: s.storeName },
    };
    return Axios.get(`${s.transactionContext}/store/0/adminLookup`, config).then((r) => r.data.resultList[0]);
  }

  private getOnlineStoreData(s: SiteInfoArgs) {
    return Axios.get(`${s.transactionContext}/store/${s.storeID}/online_store`).then((r) => r.data.resultList[0]);
  }
}
