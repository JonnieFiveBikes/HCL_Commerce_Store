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
import React, { useMemo } from "react";
import { TableRow as SRTableRow } from "./table-row";
import { TableHeader as SRTableHeader } from "./table-header";
import { SRTable, SRThead, SRTbody, SRTr } from "../../elements/super-responsive-table";
import { TableAction, TableConstants } from "../../types/super-responsive-table-types";
import { useCustomTable } from "./custom-table-context";
import { useEffect } from "react";
import { StyledPaper } from "../../elements";
import { useTableUtils } from "../../hooks";
import { CheckboxHeader } from "./checkbox-header-def";
import { CheckboxCell } from "./checkbox-cell-def";
import { PanelExpanderCell } from "./panel-expander-cell-def";
import TablePagination from "./table-pagination";
import { TableActions } from "./table-actions";
import { TableSelection } from "./table-selection";

interface CustomTableProps {
  data: any[];
  columns: any[];
  sortAction?: (props: any) => any;
  sortOrder?: "asc" | "desc";
  getActions?: (rData: any) => TableAction[];
  detailPanel?: any;
  [extraProps: string]: any;
}

const checkBoxHeader = () => {
  return {
    header: CheckboxHeader,
    headerClass: "hideOnMobile",
    title: "",
    keyLookup: {
      key: TableConstants.CHECKBOX,
    },
    display: {
      cellStyle: { verticalAlign: "middle" },
      cellClass: "hideOnMobile",
      template: CheckboxCell,
    },
  };
};

const panelExpanderHeader = ({ showPanelOnMobile }) => {
  return {
    headerClass: showPanelOnMobile ? "" : "hideOnMobile",
    title: "",
    keyLookup: {
      key: TableConstants.PANEL,
    },
    display: {
      cellStyle: { verticalAlign: "middle", wordBreak: "normal" },
      cellClass: showPanelOnMobile ? "" : "hideOnMobile",
      template: PanelExpanderCell,
    },
  };
};

/**
 * react-super-responsive-table implementation of a custom-table that can be used for tabular display
 *   this is a "new" implementation of a custom-table that is responsive as opposed to "sometimes" responsive
 * @param param0 properties used by table
 * @returns react-super-responsive-table implementation of a custom-table to be used in HCL react-store
 */
export const CustomTable: React.FC<CustomTableProps> = (props) => {
  const {
    checkBox,
    columns,
    data,
    sortOrder,
    sortAction,
    orderBy,
    detailPanel,
    showPanelOnMobile,
    disabled,
    t,
    labels,
    selectionActions,
    paginationData,
    actionData,
    outerClassName,
    panelExpanderComps,
    ...others
  } = props;
  const { tableState, setTableState, currentData, setCurrentData } = useCustomTable();
  const { getRowKey } = useTableUtils();

  // do some initialization -- useEffect with empty deps will do this once
  useEffect(() => {
    data.forEach((row) => {
      const k = getRowKey(row, columns);
      if (!tableState[k]) {
        tableState[k] = {};
      }
      if (disabled && disabled[k]) {
        tableState[k][TableConstants.DISABLED] = true;
        tableState[TableConstants.HEADERS][TableConstants.DISABLED] = true;
      }
    });
    setTableState({ ...tableState });

    if (!paginationData || !paginationData.clientSide) {
      setCurrentData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, disabled]);

  const cbHeader = useMemo(() => checkBoxHeader(), []);
  const peHeader = useMemo(() => panelExpanderHeader({ showPanelOnMobile }), [showPanelOnMobile]);

  return (
    <StyledPaper className={outerClassName ?? "vertical-padding-2 horizontal-padding-2"} style={{ overflowX: "auto" }}>
      {actionData ? <TableActions {...{ t, actionData }} /> : null}
      {tableState[TableConstants.SELECTION].count > 0 ? (
        <TableSelection {...{ t, labels, selectionActions, data, columns }} />
      ) : null}
      <SRTable {...others}>
        <SRThead>
          <SRTr key={`${tableState[TableConstants.HEADERS]}`}>
            {checkBox ? (
              <SRTableHeader key={TableConstants.CHECKBOX} tableColumn={cbHeader} headers={columns} fullTable={data} />
            ) : null}
            {detailPanel ? (
              <SRTableHeader key={TableConstants.PANEL} tableColumn={peHeader} headers={columns} fullTable={data} />
            ) : null}
            {columns.map((c, i) => {
              const C = c.header;
              return (
                <SRTableHeader
                  key={c.keyLookup.key}
                  tableColumn={c}
                  fullTable={data}
                  headers={columns}
                  sortAction={sortAction}>
                  {c.header ? <C fullTable={data} headers={columns} /> : <>{c.title}</>}
                </SRTableHeader>
              );
            })}
          </SRTr>
        </SRThead>
        <SRTbody>
          {currentData?.length === 0 ? (
            <SRTableRow
              key="message-displayer"
              rData={undefined}
              fullTable={data}
              tableExtras={{ checkBox, cbHeader, peHeader }}
              {...{ checkBox, detailPanel, columns, labels, t }}
            />
          ) : (
            currentData?.map((row) => {
              const k = getRowKey(row, columns);
              return (
                <SRTableRow
                  key={`${k}_${tableState[k]}`}
                  rData={row}
                  fullTable={data}
                  tableExtras={{ checkBox, cbHeader, peHeader, panelExpanderComps }}
                  {...{
                    showPanelOnMobile,
                    checkBox,
                    detailPanel,
                    columns,
                    labels,
                    t,
                  }}
                />
              );
            })
          )}
        </SRTbody>
      </SRTable>
      {paginationData ? <TablePagination {...{ ...paginationData, data }} /> : null}
    </StyledPaper>
  );
};
