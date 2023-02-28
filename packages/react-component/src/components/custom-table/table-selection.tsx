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

import Cancel from "@mui/icons-material/CancelOutlined";
import { StyledGrid, StyledIconButton, StyledTypography } from "../../elements";
import { useTableUtils } from "../../hooks";
import { TableConstants } from "../../types";
import { useCustomTable } from "./custom-table-context";

export const TableSelection = (props) => {
  const { t, labels, selectionActions, data, columns } = props;
  const { tableState, setTableState } = useCustomTable();
  const { cancelSelection } = useTableUtils();

  return (
    <StyledGrid
      container
      spacing={2}
      className="hideOnMobile bottom-margin-1"
      style={{ justifyContent: "space-between" }}>
      <StyledGrid
        item
        style={{
          display: "flex",
          alignItems: "center",
        }}>
        <StyledIconButton
          color="primary"
          onClick={() => cancelSelection({ s: tableState, f: setTableState })}
          data-testid="table-selection-cancel-icon-button">
          <Cancel style={{ display: "flex", alignItems: "center" }} />
        </StyledIconButton>
        <StyledTypography style={{ marginLeft: "0.25rem" }} variant="h4" component="p">
          {t(labels.selected, {
            n: tableState[TableConstants.SELECTION].count,
          })}
        </StyledTypography>
      </StyledGrid>
      <StyledGrid item>
        {selectionActions?.length > 0
          ? selectionActions.map((A, i) => <A key={i} fullTable={data} headers={columns} />)
          : null}
      </StyledGrid>
    </StyledGrid>
  );
};
