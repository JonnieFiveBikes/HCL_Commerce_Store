/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *---------------------------------------------------
 */

import { ClientSidePagination, TableConstants } from "../types/super-responsive-table-types";
import { chunk, get, set } from "lodash-es";

export const useTableUtils = () => {
  /**
   * A hook for resolving dot-notation object-path on some input, e.g., given:
   * ```
   * keyLookup: 'a.b.c.d'
   * row: { a: { b: { c: { d: 'value' } } } }
   * ```
   * Invocation of this function return 'value'
   * @returns a function that resolves dot-notation object-path on the input row, i.e., data
   */
  const getCellDisplay = (keyLookup: any, row: any) => {
    const { key: lookupKey } = keyLookup;
    //two property path
    const multiples = lookupKey.split(TableConstants.PLUS);
    const displayValue = multiples.reduce((o: string, k: string) => {
      const value = get(row, k, "");
      return o ? `${o} ${value}` : value;
    }, "");
    return displayValue;
  };

  const setCurrentContextValue = (k, v, s, f) => {
    set(s, `${TableConstants.CONTEXT}.${k}`, v);
    f({ ...s });
  };

  const getCurrentContext = (s) => get(s, TableConstants.CONTEXT);

  /**
   * For a cell denoted by given key in given row, get (if it exists) value from state
   * @param key the cell identifier (use the `keyLookup.key` value from the cell's header)
   * @param row the row for which to get the value
   * @param headers column headers (used for row retrieval from state)
   * @param s state object
   * @returns value for cell stored in state if it exists, otherwise undefined
   */
  const getValueForCell = (key, row, headers, s, def?) => get(s, `${getRowKey(row, headers)}.${key}`);

  /**
   * For a cell denoted by given key in given row, store value in state
   * @param key the cell identifier (use the `keyLookup.key` value from the cell's header)
   * @param value the value to store in state
   * @param row the row for which to set the value
   * @param headers colum headers (used for row indexing into state)
   * @param s state object
   * @param f state object updater
   */
  const setValueForCell = (key, value, row, headers, s, f) => {
    set(s, `${getRowKey(row, headers)}.${key}`, value);
    f({ ...s });
  };

  const getRowKey = (row, columnDescs) => get(row, columnDescs[0].idProp);

  const updateSelection = ({ t, h, s, f }) => {
    let c = 0;
    t?.forEach((r) => {
      if (getValueForCell(TableConstants.CHECKBOX, r, h, s)) {
        ++c;
      }
    });
    if (c !== s[TableConstants.SELECTION].count) {
      s[TableConstants.SELECTION].count = c;
      f({ ...s });
    }
  };

  const cancelSelection = ({ s, f }) => {
    Object.keys(s)
      .filter((k) => k !== TableConstants.SELECTION)
      .forEach((k) => set(s, `${k}.${TableConstants.CHECKBOX}`, false));
    s[TableConstants.SELECTION].count = 0;
    f({ ...s });
  };

  const findSelectedKeys = (s) => {
    const exclude = {
      [TableConstants.HEADERS]: 1,
      [TableConstants.SELECTION]: 1,
    };
    const keys = Object.keys(s).filter((k) => !exclude[k] && s[k][TableConstants.CHECKBOX]);
    return keys;
  };

  const paginateArray = (inputRecords: Array<any>, pageSize: number) => {
    const allRecords = inputRecords ?? [];
    const numPages = Math.ceil(allRecords.length / pageSize);
    const paginated = chunk(allRecords, pageSize);
    const rc: ClientSidePagination = {
      allRecords,
      numPages,
      paginated,
      pageSize,
    };
    return rc;
  };

  return {
    getCellDisplay,
    getRowKey,
    updateSelection,
    cancelSelection,
    findSelectedKeys,
    setValueForCell,
    getValueForCell,
    setCurrentContextValue,
    getCurrentContext,
    paginateArray,
  };
};
