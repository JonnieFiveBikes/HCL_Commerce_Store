/**
 * ==================================================
 *  Licensed Materials - Property of HCL Technologies
 *
 *  HCL Commerce
 *
 *  (C) Copyright HCL Technologies Limited 2022
 *
 * ==================================================
 */

export interface SearchOption {
  name: string;
  [extraProp: string]: any;
}

export interface SelectedValue {
  value: any;
  quantity?: number;
}
