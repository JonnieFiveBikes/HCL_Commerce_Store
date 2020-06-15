/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */

export const REG_EX = {
  NUMERIC: /^[0-9]+$/,
  EMAIL: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
  PHONE: /^[0-9]{0,1}-{0,1}[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  PRICE: /^[0-9]+([.][0-9]{0,2})?$|^[.][0-9]{1,2}$/,
};

export const DEFINING = "Defining";
export const OFFER = "Offer";
export const DISPLAY = "Display";
export const SEARCHTERM = "searchTerm";

//keycodes
export const KEY_CODES = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
};

export const CommerceEnvironment = {
  categorySkeleton: {
    id: "",
    type: "Child PIM categories",
    categoryInternal: {},
    eSpotInternal: {},
    eSpotDescInternal: {},
  },
  productSkeleton: {
    id: "",
    type: "Product",
    productInternal: "",
    productDesc: {},
    eSpotInternal: {},
    eSpotDescInternal: {},
  },
  suggestionSkeleton: {
    arrIndex: "",
    id: "",
    type: "Suggestion",
    name: "",
    url: {},
  },
  errorParamsSkeleton: {
    zero: "",
    one: "",
    two: "",
  },
  defaultLang: "en_US",
  languageMap: {
    "-1": "en_US",
    "-2": "fr_FR",
    "-3": "de_DE",
    "-4": "it_IT",
    "-5": "es_ES",
    "-6": "pt_BR",
    "-7": "zh_CN",
    "-8": "zh_TW",
    "-10": "ja_JP",
    "-20": "ru_RU",
    "-21": "ro_RO",
  },
  reverseLanguageMap: {
    en_US: "-1",
    fr_FR: "-2",
    de_DE: "-3",
    it_IT: "-4",
    es_ES: "-5",
    pt_BR: "-6",
    zh_CN: "-7",
    zh_TW: "-8",
    ja_JP: "-10",
    ru_RU: "-20",
    ro_RO: "-21",
  },
  reverseLanguageMapForDateFns: {
    en_US: "en-US",
    fr_FR: "fr",
    de_DE: "de",
    it_IT: "it",
    es_ES: "es",
    pt_BR: "pt-BR",
    zh_CN: "zh-CN",
    zh_TW: "zh-TW",
    ja_JP: "ja",
    ru_RU: "ru",
    ro_RO: "ro",
  },
};

export const INVENTORY = {
  NON_ATP: -2,
};
