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

import { useEffect } from "react";
import { StyledCheckbox } from "../../elements";
import { useCustomTable } from "./custom-table-context";
import { set } from "lodash-es";
import { useTableUtils } from "../../hooks";
import { TableConstants } from "../../types";

export const CheckboxHeader = ({ fullTable, headers, ...props }) => {
  const { tableState: s, setTableState: f } = useCustomTable();
  const { getRowKey, updateSelection } = useTableUtils();

  useEffect(() => {
    updateSelection({ t: fullTable, h: headers, s, f });
  }, [fullTable, s, f, updateSelection, headers]);

  return (
    <StyledCheckbox
      disabled={!!s[TableConstants.HEADERS][TableConstants.DISABLED]}
      checked={!!s[TableConstants.HEADERS][TableConstants.CHECKBOX]}
      onChange={(e) => {
        s[TableConstants.HEADERS][TableConstants.CHECKBOX] = e.target.checked;
        fullTable?.forEach((row) => {
          const o = getRowKey(row, headers);
          set(s, `${o}.${TableConstants.CHECKBOX}`, e.target.checked);
        });
        f({ ...s });
      }}
    />
  );
};
