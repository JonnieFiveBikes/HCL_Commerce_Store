/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2023
 *
 *==================================================
 */
import cartService from "_foundation/apis/transaction/cart.service";
import { RequestPayload } from "_foundation/types/request-payload";
import { ResponseError } from "_foundation/types/response-error";

export const resolvePurchaseOrder = async (poNumber: string, payload: RequestPayload) => {
  let po = poNumber;
  try {
    const r = await cartService.getBuyerPurchaseOrderDataBean({
      buyerPurchaseOrderId: po,
      ...payload,
    });
    po = r.data?.resultList?.at(0)?.purchaseOrderNumber ?? po;
  } catch (e: any) {
    const error: ResponseError = e;
    // it's possible that we are now at the version of TS where the buyer PO number
    //   is returned directly from the order API instead of the PO number -- just display
    //   what's in the response -- otherwise throw the error
    if (error?.response?.status !== 404) {
      throw e;
    }
  }
  return po;
};
