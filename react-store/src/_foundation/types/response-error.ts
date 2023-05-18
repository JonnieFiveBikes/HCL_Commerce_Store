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

export type ResponseError = {
  isAxiosError: boolean;
  config: {
    url: string;
    method: string;
  };
  response: {
    status: number;
    data: {
      errorCode?: string;
      errorMessage?: string;
      code?: string;
      errors: {
        errorCode: string;
        errorKey: string;
      }[];
    };
  };
};
