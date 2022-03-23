/*
 ***************************************************
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 ***************************************************
 */

export interface KeyLookup {
  key: string;
  label?: string;
}

export interface TableDisplaySpec {
  template?: any;
  cellStyle?: any;
  cellClass?: any;
}

export interface TableColumnDef {
  header?: any; // template display for column header
  headerClass?: string; // CSS class to apply to header
  headerStyle?: any;
  title: string; // column title
  idProp?: string; // property used to uniquely identify each row (only need in first column)
  keyLookup: KeyLookup; // property used to identify rendering text
  sortable?: any; // as-is
  display: TableDisplaySpec; // display specification or <td> elements
  filters?: Array<any>; // pre-defined filter values for this column
  current?: TableColumnDef;
}

export interface TableAction {
  label: () => string;
  action: any;
  key: string;
}

export interface TableDialogMessage {
  key: string;
  params: any;
}

export interface TableDialogOption {
  message?: TableDialogMessage;
  onConfirm: (event?: any) => void;
  onCancel: (event?: any) => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface TableHeaderProps {
  key: any;
  tableColumn: TableColumnDef;
  sortable?: boolean;
  sortOrder?: "asc" | "desc";
  orderBy?: string;
  sortAction?: (props: any) => any | void;
  [key: string]: any;
}

export interface TableRowProps {
  rData: any;
  columns: TableColumnDef[];
  actions?: TableAction[];
  [key: string]: any;
}

export const TableConstants = {
  PLUS: "+",
  DOT: ".",
  SPACE: " ",
  TABLE_KEY_ACTION: "Actions",
  PRICE: "totalPrice",
  CHECKBOX: "__checkbox__",
  PANEL: "__panel__",
  NOPANEL: "__nopanel__",
  SELECTION: "__selection__",
  DISABLED: "__disabled__",
  HEADERS: "__headers__",
  CONTEXT: "__context__",
};
export interface ClientSidePagination {
  allRecords: any[];
  numPages: number;
  paginated: any[];
  pageSize: number;
}
