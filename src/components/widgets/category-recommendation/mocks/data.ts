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
import { RootReducerState } from "../../../../redux/reducers";

export const initStates: RootReducerState = {
  account: {
    orders: null,
    address: null,
  },
  api: {
    apiFlowList: [],
  },
  catalog: {
    productList: [],
    productListTotal: -1,
    priceMode: "1",
    facets: null,
    facetPrice: null,
    selectedFacets: {},
    selectedFacetLimits: [],
    selectedFacetPrices: {
      min: -1,
      max: -1,
    },
    selectedPageOffset: 1,
    selectedSortOption: "0",
    breadcrumbs: [],
  },
  user: {
    WCToken: "",
    WCTrustedToken: "",
    lastUpdated: 1111,
  },
  order: {
    cart: null,
    numItems: 0,
    orderItems: [],
    catentries: null,
    isCheckoutDisabled: false,
    shipInfos: null,
    shipModes: [],
    payMethods: [],
    isRecurringOrderDisabled: false,
  },
  error: {
    errorKey: null,
    errorCode: null,
    errorTitleKey: null,
    errorMsgKey: null,
    handled: null,
    errorMessage: "",
    errorParameters: "",
  },
  seo: {},
  contract: {
    "-11005": "-11005",
  },
  search: {
    keywords: [],
  },
  context: {
    globalization: {
      preferredCurrency: "USD",
      languageId: -1,
      currency: "USD",
      preferredLanguageId: -1,
    },
    catalog: {
      catalogId: 11501,
      masterCatalog: false,
    },
    entitlement: {
      eligibleTradingAgreementIds: ["-11005"],
      hostingContractId: "-11004",
      currentTradingAgreementIds: ["-11005"],
      activeOrganizationId: "-2000",
      sessionTradingAgreementIds: null,
    },
    isPartiallyAuthenticated: false,
    basicInfo: {
      runAsId: -1002,
      callerId: -1002,
      registerType: "G",
      storeId: 11,
      channelId: -4,
    },
  },
  organization: {
    entitledOrganizations: [],
    organizationDetails: {},
    accountCheck: true,
  },
  success: { key: "" },
  confirmation: { key: "", title: "" },
  recurringOrder: {
    resultList: [],
  },
  orderDetails: {},
  site: {
    currentSite: {
      storeName: "Emerald",
      transactionContext: "/wcs/resources",
      searchContext: "/search/resources",
      storeID: "11",
      catalogStoreID: "12001",
      catalogID: "11501",
      defaultCurrencyID: "USD",
      defaultLanguageID: "-1",
      storeType: "MHS",
      isB2B: false,
      storeCfg: {
        identifier: "Emerald",
        locationInfo: [
          {
            address: {
              country: "CA",
              city: "Clothesville",
              zipOrPostalCode: "Lxx 1xx",
              addressLine: ["12xx Martindale Avenue", "Suite 9xx", null],
              stateOrProvinceName: "ON",
            },
            languageId: "-1",
            emailAddress1: "info@Emerald.xxx",
            telephone1: "1-800-555-1234",
            contactInfoIdentifier: {
              contactPersonNickName: "Emerald location_en_US",
              contactInfoId: "13002",
            },
            fax1: "1-800-555-4321",
            contactPersonBusinessTitle: "Emerald",
          },
        ],
        relatedStores: [
          {
            relationshipType: "-34",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-34",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-33",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-33",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-32",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-32",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-31",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-31",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-29",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-29",
            relatedStoreId: "12001",
            relationshipSequence: "2.0",
            state: "1",
          },
          {
            relationshipType: "-29",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-26",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-26",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-25",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-25",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-24",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-24",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-23",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-23",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-22",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-22",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-21",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-21",
            relatedStoreId: "12001",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-20",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-20",
            relatedStoreId: "12001",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-19",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-19",
            relatedStoreId: "12001",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-18",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-18",
            relatedStoreId: "12001",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-17",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-17",
            relatedStoreId: "12001",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-16",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-16",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-14",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-14",
            relatedStoreId: "12001",
            relationshipSequence: "2.0",
            state: "1",
          },
          {
            relationshipType: "-14",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-11",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-11",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-10",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-10",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-9",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-9",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-7",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-7",
            relatedStoreId: "12001",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-5",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-5",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-4",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-4",
            relatedStoreId: "12001",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-3",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-3",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-2",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-2",
            relatedStoreId: "12501",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-1",
            relatedStoreId: "11",
            relationshipSequence: "0.0",
            state: "1",
          },
          {
            relationshipType: "-1",
            relatedStoreId: "12001",
            relationshipSequence: "1.0",
            state: "1",
          },
          {
            relationshipType: "-1",
            relatedStoreId: "12501",
            relationshipSequence: "2.0",
            state: "1",
          },
        ],
        storeType: "MHS",
        userData: {
          "wc.search.priceMode.compatiblePriceIndex": "1.0",
          headlessStore: "true",
          "headlessStore.storeContextRoot": "/Emerald",
        },
        contactInfo: [
          {
            address: {
              country: "CA",
              city: "Clothesville",
              zipOrPostalCode: "Lxx 1xx",
              addressLine: ["12xx Martindale Avenue", "Suite 9xx", null],
              stateOrProvinceName: "ON",
            },
            languageId: "-1",
            emailAddress1: "info@Emerald.xxx",
            telephone1: "1-800-555-1234",
            contactInfoIdentifier: {
              contactPersonNickName: "Emerald contact_en_US",
              contactPersonId: "-11000",
              contactInfoId: "13001",
            },
            fax1: "1-800-555-4321",
            contactPersonBusinessTitle: "Emerald",
          },
        ],
        description: [
          {
            displayName: "Emerald",
            languageId: "-1",
            description: "Commerce Model Store entity",
          },
        ],
        defaultCatalog: [
          {
            userData: {
              userDataField: [],
            },
            catalogIdentifier: {
              externalIdentifier: null,
              uniqueID: "11501",
            },
            storeIdentifier: {
              externalIdentifier: null,
              uniqueID: "11",
            },
            uniqueID: "11001",
          },
        ],
        storeId: "11",
        ownerId: "-11000",
        supportedCurrencies: {
          supportedCurrencies: ["USD"],
          defaultCurrency: "USD",
        },
        supportedLanguages: {
          supportedLanguages: ["-1"],
          defaultLanguageId: "-1",
        },
        state: "open",
      },
      supportedLanguages: ["-1"],
      supportedCurrencies: ["USD"],
      inventorySystem: -2,
    },
  },
};

export const cidIValue = "home-home-category-rec";
export const eSpotIValue = {
  eSpotName: "Home_CategoryRec",
};
export const page = {
  pageName: "home",
};
