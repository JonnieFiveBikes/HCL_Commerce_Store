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

import React, { createContext, useContext, useState } from "react";
import { ClientSidePagination } from "../../types";

export const CustomTableContext: React.Context<any> = createContext({});

export const CustomTableProvider = ({ children }: any) => {
  const [tableState, setTableState] = useState<any>({
    __headers__: {},
    __selection__: {
      count: 0,
    },
    __context__: {},
  });
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<any>({});
  const [csPages, setCsPages] = useState<ClientSidePagination>({
    allRecords: [],
    numPages: 0,
    paginated: [],
    pageSize: 0,
  });
  const [currentData, setCurrentData] = useState<any[]>([]);

  return (
    <CustomTableContext.Provider
      value={{
        tableState,
        setTableState,
        page,
        setPage,
        pageSize,
        setPageSize,
        search,
        setSearch,
        filters,
        setFilters,
        csPages,
        setCsPages,
        currentData,
        setCurrentData,
      }}>
      {children}
    </CustomTableContext.Provider>
  );
};

export const useCustomTable = () => useContext(CustomTableContext);

export const withCustomTableContext =
  (Component: any): any =>
  (props: any) => {
    return (
      <CustomTableProvider>
        <Component {...props}></Component>
      </CustomTableProvider>
    );
  };
