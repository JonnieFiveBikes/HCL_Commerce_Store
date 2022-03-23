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
export const SORT_OPTIONS = {
  defaultSortOptions: [
    {
      key: "SN_NO_SORT",
      value: "0",
      translationKey: "CommerceEnvironment.listSettings.relevance",
    },
    {
      key: "SN_SORT_BY_BRANDS",
      value: "1",
      translationKey: "CommerceEnvironment.listSettings.brands",
    },
    {
      key: "SN_SORT_BY_NAME",
      value: "2",
      translationKey: "CommerceEnvironment.listSettings.name",
    },
  ],
  priceSortOptions: [
    {
      key: "SN_SORT_LOW_TO_HIGH",
      value: "3",
      translationKey: "CommerceEnvironment.listSettings.priceLowToHigh",
    },
    {
      key: "SN_SORT_HIGH_TO_LOW",
      value: "4",
      translationKey: "CommerceEnvironment.listSettings.priceHighToLow",
    },
  ],
};

export const ATTR_IDENTIFIER = {
  PickUp: "PickUpInStore",
};
