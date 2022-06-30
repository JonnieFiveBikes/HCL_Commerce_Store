/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

// Standard Libraries
import { get } from "lodash-es";
import React, { useMemo } from "react";

// Custom Libraries
import { SRTr, SRTd, StyledTypography } from "../../elements";
import { useTableUtils } from "../../hooks";

import { TableColumnDef, TableConstants, TableRowProps } from "../../types/super-responsive-table-types";

import { useCustomTable } from "./custom-table-context";

/**
 * This provides a wrapper over the styled react-super-responsive-table Tr component with ability to do button-like
 * displays and a menu spec
 */
export const TableRow: React.FC<TableRowProps> = (props) => {
  const { tableExtras, fullTable, rData, columns: headers, detailPanel, labels, t, showPanelOnMobile } = props;
  const { checkBox, cbHeader, peHeader, panelExpanderComps } = tableExtras;

  const { getCellDisplay } = useTableUtils();
  const { tableState: s } = useCustomTable();
  const k = get(rData, headers[0].idProp as string);
  const D = detailPanel;
  const CbElem = useMemo(
    () => (checkBox ? cbHeader.display.template : null),
    [cbHeader, checkBox]
  ) as React.ElementType;
  const PeElem = useMemo(
    () => (detailPanel ? peHeader.display.template : null),
    [peHeader, detailPanel]
  ) as React.ElementType;
  const colSpan = headers.length + (checkBox ? 1 : 0) + (detailPanel ? 1 : 0);
  const isEmpty = !rData;

  return isEmpty ? (
    <SRTr style={{ height: "25vh" }}>
      <SRTd style={{ verticalAlign: "middle", textAlign: "center" }} colSpan={colSpan} key={"message-displayer-td"}>
        <StyledTypography data-testid="empty-table-message">{t(labels.emptyMsg)}</StyledTypography>
      </SRTd>
    </SRTr>
  ) : (
    <>
      <SRTr>
        {checkBox ? (
          <SRTd
            key={cbHeader.keyLookup.key}
            className={cbHeader.display.cellClass ?? ""}
            style={cbHeader.display.cellStyle ?? {}}>
            <CbElem {...{ fullTable, headers, current: cbHeader, rowData: rData }} />
          </SRTd>
        ) : null}
        {detailPanel ? (
          <SRTd
            key={peHeader.keyLookup.key}
            className={peHeader.display.cellClass ?? ""}
            style={peHeader.display.cellStyle ?? {}}>
            <PeElem {...{ fullTable, headers, current: panelExpanderComps, rowData: rData }} />
          </SRTd>
        ) : null}
        {headers.map((c: TableColumnDef) => {
          if (c.display.template) {
            const C = c.display.template;
            return (
              <SRTd key={c.keyLookup.key} className={c.display.cellClass ?? ""} style={c.display.cellStyle ?? {}}>
                <C {...{ fullTable, headers, current: c, rowData: rData }} />
              </SRTd>
            );
          } else {
            return (
              <SRTd key={c.keyLookup.key} className={c.display.cellClass ?? ""} style={c.display.cellStyle ?? {}}>
                <span className="td-inline-content">{getCellDisplay(c.keyLookup, rData) || <>&nbsp;</>}</span>
              </SRTd>
            );
          }
        })}
      </SRTr>
      {detailPanel ? (
        <SRTr
          className={showPanelOnMobile ? "" : "detailPanel"}
          style={s[k] && s[k][TableConstants.PANEL] ? {} : { display: "none" }}>
          <SRTd colSpan={colSpan} key={"detailPanel"}>
            <D rowData={rData} />
          </SRTd>
        </SRTr>
      ) : null}
    </>
  );
};
