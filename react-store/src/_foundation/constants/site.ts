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
export const site = {
  storeName: process.env.REACT_APP_STORENAME as string,
  transactionContext: process.env.REACT_APP_TRANSACTION_CONTEXT as string,
  searchContext: process.env.REACT_APP_SEARCH_CONTEXT as string,
  dxContext: process.env.REACT_APP_DX_CONTEXT as string,
  cmcPath: "/lobtools/cmc/ManagementCenterMain",
  approvalsContext: process.env.REACT_APP_APPROVALS_CONTEXT as string,
};
