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
  PHONE: /^[-+() ]*[0-9][-+() 0-9]*$/,
  PRICE: /^[0-9]+([.][0-9]{0,2})?$|^[.][0-9]{1,2}$/,
  NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR: /^[a-zA-Z0-9 ]*$/,
  CARD_NUMBER_MASK: /[0-9](?=([0-9]{4}))/g,
};

export const DEFINING = "Defining";
export const DESCRIPTIVE = "Descriptive";
export const SELLER = "Seller";
export const OFFER = "Offer";
export const DISPLAY = "Display";
export const SEARCHTERM = "searchTerm";

export const EMPTY_STRING = "";
export const STRING_TRUE = "true";
export const STRING_FALSE = "false";
export const SLOTID = "id";

//Address Form
export const CHECKOUT = "checkout";
export const ADDRESS_BOOK = "address-book";
export const ADDRESS_SHIPPING = "Shipping";
export const ADDRESS_BILLING = "Billing";
export const ADDRESS_SHIPPING_BILLING = "ShippingAndBilling";
export const ADDRESS_LINE = "addressLine";
export const ADDRESSLINE1 = "addressLine1";
export const ADDRESSLINE2 = "addressLine2";
export const PHONE1 = "phone1";

//Admin Tools
export const IBM_ASSIGNED_ROLE_DETAILS = "IBM_Assigned_Roles_Details";
export const BUYER_ADMIN_ROLE = "-21";
export const BUYER_APPROVAL_ROLE = "-22";

export const ADDRESS_TYPE_MAP = new Map();
ADDRESS_TYPE_MAP.set(ADDRESS_SHIPPING, "AddressBook.ShippingLabel");
ADDRESS_TYPE_MAP.set(ADDRESS_BILLING, "AddressBook.BillingLabel");
ADDRESS_TYPE_MAP.set(ADDRESS_SHIPPING_BILLING, "AddressBook.ShippingBillingLabel");

//keycodes
export const KEY_CODES = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
};

export const CommerceEnvironment = {
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
    "-9": "ko_KR",
    "-22": "pl_PL",
    "-23": "ar_EG",
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
    ko_KR: "-9",
    pl_PL: "-22",
    ar_EG: "-23",
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
    ko_KR: "ko",
    pl_PL: "pl",
    ar_EG: "ar",
  },
  dxLanguageMap: {
    "-1": "en",
    "-2": "fr",
    "-3": "de",
    "-4": "it",
    "-5": "es",
    "-6": "pt",
    "-7": "zh",
    "-8": "zh-TW",
    "-10": "ja",
    "-20": "ru",
    "-21": "ro",
    "-9": "ko",
    "-22": "pl",
    "-23": "ar",
  },
};

export const INVENTORY = {
  NON_ATP: -2,
};

export const SUCCESS_MSG_PREFIX = "success-message.";
export const DEFAULT_LANG_ID = "-1";

// Shipping
export const IS_PERSONAL_ADDRESS_ALLOWED = "x_isPersonalAddressesAllowedForShipping";
export const ORG_ADDRESS_DETAILS = "orgAddressDetails";
export const ORG_ADDRESS = "orgAddress";
export const ORDER_ID = "orderid";
export const HYPHEN = "-";
export const UNDERSCORE = "_";
export const SLASH = "/";

// Discover
export const DISCOVER_FEATURE = "Discover";

export const CARD_NUMBER_MASK_CHAR = "*";

//Requisition List, inprogress order
export const PRIVATE_ORDER = "private";
export const SHARED_ORDER = "shared";

export const PAGINATION = {
  sizes: [
    { size: 5, label: "commonTable.pageSz.five" },
    { size: 10, label: "commonTable.pageSz.ten" },
    { size: 20, label: "commonTable.pageSz.twenty" },
  ],
};

export const RF_JSON = "json";

export const CPROF = {
  EXPMTH_PATH: "billingData.expire_month.value",
  EXPYR_PATH: "billingData.expire_year.value",
};

export const OK = "OK";
export const CVV = "CVV";
export const CREATED = "Created";
export const Y = "Y";

export const XS_MOBILE_W = 25.6;
export const S_MOBILE_W = 40.0;
export const M_TABLET_W = 60.0;

//Requisition List action
export const UPLOAD = "upload";

//CSV file Upload Requisition List
export const URL = "URL";
export const UPLOADED_FILE = "UpLoadedFile";
export const CSV_FILE_EXTENSION = ".csv";
export const FILE_REQUEST_HEADERS = {
  "Content-Type": "multipart/form-data",
};
export const EXCLUSIVE = "exclusive";
export const SELLER_FACET = "seller.raw";
export const SELLER_STORAGE_KEY = "seller";
export const AVAILABLE_KEY = "Available";
export const CS = ", "; // comma-space

export const SEARCH_PLP_PROFILE = "HCL_V2_findProductsByCategoryWithPriceRange";
export const SEARCH_FIND_PROFILE = "HCL_V2_findProductsBySearchTermWithPrice";

export const SELF_PICKUP = "1";
export const PICKUP_ONBEHALF = "2";
export const ACOMP = {
  input: "input",
  reset: "reset",
};
export const PICKUP_PREFIX = "pickup_";
export const MP_ENABLED = "hcl.marketplace.enabled";
