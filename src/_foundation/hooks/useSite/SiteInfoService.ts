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
import { sessionStorageUtil, localStorageUtil } from "../../utils/storageUtil";
import { WC_PREVIEW_TOKEN, NEW_PREVIEW_SESSION } from "../../constants/common";
import { CURRENT_USER } from "../../constants/user";
import { SiteInfo } from "../../../redux/reducers/reducerStateInterface";
//Redux
import { INIT_SITE_SUCCESS_ACTION } from "../../../redux/actions/site";

declare var HCL_STORE_ID;
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

    //preview token
    const storeviewURL = new URL(window.location.href);
    const wcPreviewToken = {};
    const previewtoken = storeviewURL.searchParams.get(WC_PREVIEW_TOKEN);
    if (previewtoken !== null) {
      wcPreviewToken[WC_PREVIEW_TOKEN] = previewtoken;
      sessionStorageUtil.set(WC_PREVIEW_TOKEN, wcPreviewToken);
      const newPreviewSession = storeviewURL.searchParams.get(
        NEW_PREVIEW_SESSION
      );
      if ("true" === newPreviewSession) {
        sessionStorageUtil.remove(CURRENT_USER);
      }
    }
  }

  private initializeSite(s: SiteInfoArgs): Promise<SiteInfo> {
    const _site: SiteInfoArgs = Object.assign({}, s);
    let storeId = typeof HCL_STORE_ID === undefined ? undefined : HCL_STORE_ID;
    if (!storeId) {
      //at this point, the sessionkey does not have storename prefix.
      storeId = sessionStorageUtil.getStoreId();
    } else {
      sessionStorageUtil.setStoreId(storeId);
    }
    if (!storeId) {
      //no store ID, lookup default name first.
      return this.getStoreData({ ..._site })
        .then((cfg: any) => {
          _site.storeID = cfg.storeId;
          _site.inventorySystem = cfg.inventorySystem;
          return this.getOnlineStoreData({
            ..._site,
          });
        })
        .then((storeCfg: any) => {
          const caStore = storeCfg.relatedStores.find(
            (s: any) =>
              s.relationshipType === "-4" && s.relatedStoreId !== _site.storeID
          ); // -4 is catalog-asset-store
          _site.storeName = storeCfg.identifier;
          _site.storeID = storeCfg.storeId;
          _site.catalogStoreID = caStore.relatedStoreId;
          _site.catalogID =
            storeCfg.defaultCatalog[0].catalogIdentifier?.uniqueID;
          _site.defaultCurrencyID =
            storeCfg.supportedCurrencies.defaultCurrency;
          _site.defaultLanguageID =
            storeCfg.supportedLanguages.defaultLanguageId;
          _site.storeType = storeCfg.storeType;
          _site.isB2B =
            _site.storeType === this.B2B || _site.storeType === this.BMH;
          _site.storeCfg = storeCfg;
          _site.supportedLanguages =
            storeCfg.supportedLanguages.supportedLanguages;
          _site.supportedCurrencies =
            storeCfg.supportedCurrencies.supportedCurrencies;
          this.initStorage(_site as SiteInfo);
          return _site as SiteInfo;
        });
    } else {
      //has storeId, use StoreId.
      _site.storeID = storeId;
      return this.getOnlineStoreData({
        ..._site,
      }).then((storeCfg: any) => {
        const caStore = storeCfg.relatedStores.find(
          (s: any) =>
            s.relationshipType === "-4" && s.relatedStoreId !== _site.storeID
        ); // -4 is catalog-asset-store
        _site.storeName = storeCfg.identifier;
        _site.storeID = storeCfg.storeId;
        _site.catalogStoreID = caStore.relatedStoreId;
        _site.catalogID =
          storeCfg.defaultCatalog[0].catalogIdentifier?.uniqueID;
        _site.defaultCurrencyID = storeCfg.supportedCurrencies.defaultCurrency;
        _site.defaultLanguageID = storeCfg.supportedLanguages.defaultLanguageId;
        _site.storeType = storeCfg.storeType;
        _site.isB2B =
          _site.storeType === this.B2B || _site.storeType === this.BMH;
        _site.storeCfg = storeCfg;
        _site.supportedLanguages =
          storeCfg.supportedLanguages.supportedLanguages;
        _site.supportedCurrencies =
          storeCfg.supportedCurrencies.supportedCurrencies;
        return this.getStoreData({ ..._site }).then((cfg: any) => {
          _site.inventorySystem = cfg.inventorySystem;
          this.initStorage(_site as SiteInfo);
          return _site as SiteInfo;
        });
      });
    }
  }

  private getStoreData(s: any | SiteInfo) {
    const config: AxiosRequestConfig = {
      params: {
        q: "findByStoreIdentifier",
        storeIdentifier: s.storeName,
      },
    };
    return Axios.get(
      `${s.transactionContext}/store/0/adminLookup`,
      config
    ).then((r) => r.data.resultList[0]);
  }

  private getOnlineStoreData(s: any | SiteInfo) {
    return Axios.get(
      `${s.transactionContext}/store/${s.storeID}/online_store`
    ).then((r) => r.data.resultList[0]);
  }
}
