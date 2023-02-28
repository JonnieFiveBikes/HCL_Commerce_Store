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

import { InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMemo } from "react";
import { debounce, get } from "lodash-es";
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledCheckbox,
  StyledFormControlLabel,
  StyledGrid,
  StyledIconButton,
  StyledTextField,
  StyledTypography,
} from "../../elements";
import { useCustomTable } from "./custom-table-context";

export const TableActions = (props) => {
  const { t, actionData } = props;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { getPage = () => {}, hasSearch, hasFilters, labels, headers, grids, extraActions } = actionData;
  const { search, setSearch, setPage, filters, setFilters } = useCustomTable();
  const searchGrid = hasFilters ? 1 : 0;
  const gridStart = (hasFilters ? 1 : 0) + (hasSearch ? 1 : 0);
  const debGetPage = useMemo(() => debounce(getPage, 500), [getPage]);
  const flex = { display: "flex" };
  const doSearch = useMemo(
    () => (e) => {
      setSearch(e ? e.target.value : "");
      setPage(0);
      debGetPage({ page: 0, search: e ? e.target.value : "" });
    },
    [setSearch, setPage, debGetPage]
  );
  const doFilter = useMemo(
    () => (header, filter, e) => {
      const o = filters[header.keyLookup.key] ?? {};
      o[filter.key] = e.target.checked;
      filters[header.keyLookup.key] = o;
      setFilters({ ...filters });
      setPage(0);
      getPage({ page: 0, filters });
    },
    [filters, setFilters, setPage, getPage]
  );
  return (
    <StyledGrid container className="bottom-margin-1" spacing={2} justifyContent="flex-end">
      {hasFilters ? (
        <StyledGrid item xs={12} md={7} {...get(grids, "[0]", {})}>
          <StyledAccordion testId={`table-action-filter`}>
            <StyledAccordionSummary className="horizontal-padding-2" expandIcon={<ExpandMoreIcon />}>
              <StyledTypography variant="h6">{t(labels.filter)}</StyledTypography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <StyledGrid container spacing={2} direction="row" alignItems="flex-end">
                {headers
                  .filter((h) => h.filters)
                  .map((h) => (
                    <StyledGrid
                      key={h.keyLookup.key}
                      item
                      className="table-filter"
                      style={{ display: "flex", flexDirection: "column" }}>
                      <StyledTypography variant="body2" component="p">
                        {h.title}
                      </StyledTypography>
                      {h.filters.map((f) => (
                        <StyledFormControlLabel
                          key={`${h.keyLookup.key}.${f.key}`}
                          control={
                            <StyledCheckbox
                              checked={get(filters, `${h.keyLookup.key}.${f.key}`, false)}
                              color="primary"
                              onChange={(e) => doFilter(h, f, e)}
                            />
                          }
                          label={f.value}
                        />
                      ))}
                    </StyledGrid>
                  ))}
              </StyledGrid>
            </StyledAccordionDetails>
          </StyledAccordion>
        </StyledGrid>
      ) : null}
      {hasSearch ? (
        <StyledGrid item xs={12} md={5} style={flex} {...get(grids, `[${searchGrid}]`, {})}>
          <StyledTextField
            style={{ flex: "1" }}
            autoFocus
            type="text"
            name="tableSearchTerm"
            value={search}
            placeholder={t(labels.searchPlaceholder)}
            onChange={doSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <StyledIconButton onClick={() => doSearch("")} data-testid="table-actions-icon-button">
                    <CloseIcon />
                  </StyledIconButton>
                </InputAdornment>
              ),
            }}
          />
        </StyledGrid>
      ) : null}
      {extraActions?.map((action, i) => (
        <StyledGrid item style={flex} key={i} {...get(grids, `[${gridStart + i}]`, {})}>
          {action}
        </StyledGrid>
      ))}
    </StyledGrid>
  );
};
