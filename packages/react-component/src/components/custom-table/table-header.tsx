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
import React, { useMemo } from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { SRTh } from "../../elements/super-responsive-table";
import { TableHeaderProps } from "../../types/super-responsive-table-types";
import { get } from "lodash-es";
import { useCustomTable } from "./custom-table-context";
import { useTableUtils } from "../../hooks";
import { kebabCase } from "lodash-es";

export const TableHeader: React.FC<TableHeaderProps> = (props) => {
  const { tableColumn: h, headers, fullTable, sortAction } = props;
  const {
    sortable,
    keyLookup: { key },
    title,
  } = h;
  const { fn, numeric } = sortable ?? {};
  const { setPage, pageSize, tableState, setTableState, csPages, setCsPages, currentData, setCurrentData } =
    useCustomTable();
  const { getCurrentContext, setCurrentContextValue, paginateArray } = useTableUtils();
  const C = h.header;
  const curSort = get(getCurrentContext(tableState), "sortData", {});
  const oppo = useMemo(() => ({ asc: "desc", desc: "asc" }), []);

  const compFn = useMemo(
    () => (otherData, a, b) => {
      const { direction } = otherData;
      const pA = fn ? fn({ ...otherData, rowData: a }) : get(a, key, "");
      const pB = fn ? fn({ ...otherData, rowData: b }) : get(b, key, "");
      return (numeric ? pA - pB : pA.localeCompare(pB)) * (direction === "desc" ? -1 : 1);
    },
    [fn, key, numeric]
  );

  const doSort = () => {
    const direction = curSort.key === key ? oppo[curSort.direction] : "asc";
    let n;
    if (sortAction) {
      sortAction({ sort: { header: h, direction } });
    } else if (csPages.pageSize > 0) {
      // paginated client-side -- first sort all records
      n = [...csPages.allRecords].sort(compFn.bind(null, { header: h, direction, tableState }));

      // retain original allRecords though
      const desc = {
        ...paginateArray(n, pageSize),
        allRecords: csPages.allRecords,
      };

      // update client-side pagination data and go to page 0
      setCsPages(desc);
      setCurrentData(desc.paginated.length ? desc.paginated[0] : []);
      setPage(0);
    } else {
      // non-paginated client-side
      n = [...currentData].sort(compFn.bind(null, { header: h, direction, tableState }));
      setCurrentData(n);
    }

    setCurrentContextValue("sortData", { key, direction }, tableState, setTableState);
  };

  return (
    <SRTh style={h.headerStyle} className={h.headerClass ?? ""}>
      {sortable ? (
        <TableSortLabel
          data-testid={kebabCase(`column-table-sort-label-${title}`)}
          active={curSort.key === key}
          direction={curSort.key === key ? curSort.direction : "asc"}
          onClick={doSort}>
          {h.header ? <C {...{ current: h, fullTable, headers }} /> : <>{h.title}</>}
        </TableSortLabel>
      ) : h.header ? (
        <C {...{ current: h, fullTable, headers }} />
      ) : (
        <>{h.title}</>
      )}
    </SRTh>
  );
};
