/**
 * ==================================================
 *  Licensed Materials - Property of HCL Technologies
 *
 *  HCL Commerce
 *
 *  (C) Copyright HCL Technologies Limited 2022
 *
 * ==================================================
 */
//standard libraries
import Axios, { Canceler } from "axios";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
//hcl libraries
import { Configuration, SiteContentResourceApiFp } from "@hcl-commerce-store-sdk/typescript-axios-es";
import { SearchOption } from "@hcl-commerce-store-sdk/react-component";

//foundation
import { useSite } from "./useSite";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { site } from "../constants/site";

const useSKUSearch = () => {
  const { mySite } = useSite();
  const contract = useSelector(currentContractIdSelector);
  const cancels: Canceler[] = useMemo(() => [], []);
  const CancelToken = Axios.CancelToken;
  const payloadBase = useMemo(() => {
    return {
      storeId: mySite.storeID,
      contractId: contract,
      catalogId: mySite.catalogID,
    };
  }, [mySite.catalogID, mySite.storeID, contract]);

  const fetchSKUSearchResult = async (searchTerm: string) => {
    const param: any = {
      ...payloadBase,
      searchType: 200,
      profileName: "IBM_findNavigationSuggestion_PartNumber",
      pageSize: 4,
      pageNumber: 1,
      options: {
        query: { searchTerm },
        widget: "useSKUSearch",
        cancelToken: new CancelToken((c) => cancels.push(c)),
      },
    };

    const {
      storeId,
      pageSize,
      pageNumber,
      searchType,
      contractId,
      langId,
      termsSort,
      catalogId,
      checkEntitlement,
      profileName,
      options,
    } = param;

    const productSuggestionRequest = SiteContentResourceApiFp(
      new Configuration({ basePath: site.searchContext })
    ).findProductSuggestionsBySearchTerm(
      storeId,
      "*",
      pageSize,
      pageNumber,
      searchType,
      true,
      contractId,
      langId,
      termsSort,
      catalogId,
      checkEntitlement,
      profileName,
      options
    );

    try {
      const productSuggestionResponse = await (await productSuggestionRequest)();
      const so = productSuggestionResponse.data.suggestionView?.[0]?.entry ?? [];
      return so as SearchOption[];
    } catch (e) {
      console.warn("useSkuSearch", "fail to search", e);
      return [] as SearchOption[];
    }
  };

  useEffect(() => {
    return () =>
      //splice to empty array
      cancels.splice(0, cancels.length).forEach((cancel) => {
        cancel();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetchOptions: fetchSKUSearchResult };
};

export { useSKUSearch };
