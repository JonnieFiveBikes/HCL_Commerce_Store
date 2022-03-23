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

import { useEffect, useMemo } from "react";
import { useTableUtils } from "../../hooks";
import { useCustomTable } from "./custom-table-context";
import { get, set } from "lodash-es";
import { StyledCheckbox } from "../../elements";
import { TableConstants } from "../../types";

export const CheckboxCell = ({ rowData, headers, fullTable, ...props }) => {
  const { tableState: s, setTableState } = useCustomTable();
  const { getRowKey, updateSelection } = useTableUtils();

  useEffect(() => {
    updateSelection({ t: fullTable, h: headers, s, f: setTableState });
  }, [fullTable, s, setTableState, updateSelection, headers]);

  const checkAll = useMemo(
    () => (rows: any[], h, states) =>
      rows.every((row) => {
        const o = getRowKey(row, h);
        return get(states, `${o}.${TableConstants.CHECKBOX}`, false);
      }),
    [getRowKey]
  );

  return (
    <StyledCheckbox
      disabled={get(s, `${getRowKey(rowData, headers)}.${TableConstants.DISABLED}`, false)}
      checked={get(s, `${getRowKey(rowData, headers)}.${TableConstants.CHECKBOX}`, false)}
      onChange={(e) => {
        const o = getRowKey(rowData, headers);
        set(s, `${o}.${TableConstants.CHECKBOX}`, e.target.checked);
        s[TableConstants.HEADERS][TableConstants.CHECKBOX] = checkAll(fullTable, headers, s);
        setTableState({ ...s });
      }}
    />
  );
};
