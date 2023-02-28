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

//Standard libraries
import { AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { PaymentInstructionApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const paymentInstructionApiInstance = new PaymentInstructionApi(undefined, site.transactionContext);
const paymentInstructionService = {
  /**
   * Adds payment instruction to the shopping cart.
   * `@method`
   * `@name PaymentInstruction#addPaymentInstruction`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` body data required for rest method
   */
  addPaymentInstruction(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return paymentInstructionApiInstance.paymentInstructionAddPaymentInstruction(
      storeId,
      responseFormat,
      body,
      options
    );
  },

  /**
   * Deletes all payment Instructions from the shopping cart.
   * `@method`
   * `@name PaymentInstruction#deleteAllPaymentInstructions`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   */
  deleteAllPaymentInstructions(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return paymentInstructionApiInstance.paymentInstructionDeleteAllPaymentInstructions(
      storeId,
      responseFormat,
      options
    );
  },
};

export default paymentInstructionService;
