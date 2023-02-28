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

import { StyledIconButton } from "../../elements";
import { useTableUtils } from "../../hooks";
import { useCustomTable } from "./custom-table-context";
import { get, set } from "lodash-es";
import Closed from "@mui/icons-material/ChevronRight";
import Open from "@mui/icons-material/ExpandMoreOutlined";
import { TableConstants } from "../../types";

export const PanelExpanderCell = ({ rowData, current, headers, ...props }) => {
  const { tableState: s, setTableState } = useCustomTable();
  const { getRowKey } = useTableUtils();
  const k = getRowKey(rowData, headers);
  const noPanel = s[k] && s[k][TableConstants.NOPANEL];
  const O = current?.compHide ?? Open;
  const C = current?.compShow ?? Closed;
  return (
    <StyledIconButton
      color="primary"
      disabled={noPanel}
      style={{ padding: "0", textAlign: "initial" }}
      onClick={() => {
        const newState = !get(s, `${k}.${TableConstants.PANEL}`, false);
        set(s, `${k}.${TableConstants.PANEL}`, newState);
        setTableState({ ...s });
      }}
      data-testid="panel-expander-icon-button">
      {noPanel ? null : get(s, `${k}.${TableConstants.PANEL}`) ? <O /> : <C />}
    </StyledIconButton>
  );
};
