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

import styled from "@mui/styled-engine-sc";
import ArrowBackIcon from "@mui/icons-material/NavigateBefore";
import ArrowForwardIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useEffect, useMemo } from "react";
import { useCustomTable } from "./custom-table-context";
import { StyledGrid, StyledIconButton, StyledMenuItem, StyledMenuTypography, StyledSelect } from "../../elements";
import { useTableUtils } from "../../hooks";

interface PaginationProps {
  offset: number;
  count: number;
  labels: any;
  sizes: Array<any>;
  getPage: (props: any) => any;
  t: (keys: any, options?: any) => any;
  [extraProps: string]: any;
}
const ComponentWrapper: React.FC<PaginationProps> = (props: any) => {
  const { offset, count, labels, sizes, getPage, t, clientSide, data } = props;
  const { page, setPage, pageSize, setPageSize, csPages, setCsPages, setCurrentData } = useCustomTable();
  const { paginateArray } = useTableUtils();

  // set current page-size
  useEffect(() => {
    setPageSize((sizes.find((e) => e.selected) ?? sizes[0]).size);
  }, [sizes, setPageSize]);

  // paginate data if pagination requested and no server-side API (clientSide specified)
  useEffect(() => {
    if (pageSize > 0 && clientSide) {
      const desc = paginateArray(data, pageSize);
      setCsPages(desc);

      // nav to page 0 only if page is no longer valid -- otherwise stay
      if (page >= desc.numPages) {
        setCurrentData(desc.paginated.length ? desc.paginated[0] : []);
        setPage(0);
      } else {
        setCurrentData(desc.paginated[page]);
        setPage(page);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, clientSide, data, setCsPages, setCurrentData, setPage]);

  const doPage = useMemo(
    () => (pg, sz) => {
      setPage(pg);
      if (clientSide) {
        setCurrentData(csPages.paginated[pg]);
      } else {
        getPage({ page: pg, pageSize: sz });
      }
    },
    [clientSide, setCurrentData, getPage, setPage, csPages]
  );

  // convenience computation for total number of pages
  const totalPages = useMemo(
    () => (clientSide ? csPages.numPages : Math.ceil(count / pageSize)),
    [count, pageSize, csPages, clientSide]
  );

  // convenience computation for total records
  const totalRecords = useMemo(() => (clientSide ? csPages.allRecords.length : count), [count, clientSide, csPages]);

  // convenience computation for current record offset
  const recordOffset = useMemo(() => (clientSide ? page * pageSize : offset), [clientSide, page, pageSize, offset]);

  return (
    <StyledGrid container className="top-margin-1" alignItems="center" justifyContent="flex-end">
      <StyledGrid item xs={12} sm="auto">
        <StyledSelect
          value={pageSize || ""}
          data-testid="page-size"
          name="page-size"
          onChange={(e) => {
            const pgSz = parseInt(e.target.value);
            setPageSize(pgSz);
            if (totalRecords > 0) {
              doPage(0, pgSz);
            }
          }}
          fullWidth
          variant="standard">
          {sizes?.map(({ size: s, label }) => (
            <StyledMenuItem key={s} value={s}>
              <StyledMenuTypography variant="body1" className={s === pageSize ? "active" : ""} title={t(label)}>
                {t(label)}
              </StyledMenuTypography>
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </StyledGrid>
      <StyledGrid item xs={12} sm="auto" container alignItems="center" justifyContent="center" className="width--auto">
        <StyledGrid container item xs="auto" sm="auto" justifyContent="flex-start">
          <StyledIconButton
            color="secondary"
            size="small"
            disabled={totalRecords === 0 || page === 0}
            onClick={() => doPage(0, pageSize)}
            data-testid="table-pagination-first-page-icon-button">
            <FirstPageIcon fontSize="small" />
          </StyledIconButton>

          <StyledIconButton
            color="secondary"
            size="small"
            disabled={totalRecords === 0 || page === 0}
            onClick={() => doPage(page - 1, pageSize)}
            data-testid="table-actions-back-icon-button">
            <ArrowBackIcon fontSize="small" />
          </StyledIconButton>
        </StyledGrid>

        <StyledGrid container item xs sm="auto" justifyContent="center" style={{ textAlign: "center" }}>
          {t(labels.ofTotalCount, {
            from: totalRecords === 0 ? 0 : recordOffset + 1,
            to:
              totalRecords === 0 ? 0 : pageSize + recordOffset > totalRecords ? totalRecords : pageSize + recordOffset,
            total: totalRecords,
          })}
        </StyledGrid>

        <StyledGrid container item xs="auto" sm="auto" justifyContent="flex-end">
          <StyledIconButton
            color="secondary"
            size="small"
            disabled={totalRecords === 0 || page === totalPages - 1}
            onClick={() => doPage(page + 1, pageSize)}
            data-testid="table-actions-forward-icon-button">
            <ArrowForwardIcon fontSize="small" />
          </StyledIconButton>

          <StyledIconButton
            color="secondary"
            size="small"
            disabled={totalRecords === 0 || page === totalPages - 1}
            onClick={() => doPage(totalPages - 1, pageSize)}
            data-testid="table-actions-last-page-icon-button">
            <LastPageIcon fontSize="small" />
          </StyledIconButton>
        </StyledGrid>
      </StyledGrid>
    </StyledGrid>
  );
};

const Pagination = styled(ComponentWrapper)`
  ${({ theme }) => `
    min-height: 60px;

    .MuiButton-root{
      padding: ${theme.spacing(1)};
      min-width: unset;
    }
  `}
`;

export default Pagination;
