/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import React, { ChangeEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OK } from "http-status-codes";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import getDisplayName from "react-display-name";
import cloneDeep from "lodash/cloneDeep";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import siteContentService from "../../../_foundation/apis/search/siteContent.service";
import searchDisplayService from "../../../_foundation/apis/transaction/searchDisplay.service";
//Custom libraries
import { CommerceEnvironment, KEY_CODES, SEARCHTERM } from "../../../constants/common";
import { SEARCH } from "../../../constants/routes";
import { KEYWORD_LIMIT } from "../../../configs/catalog";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import * as searchActions from "../../../redux/actions/search";
import { resetProductListAction } from "../../../redux/actions/catalog";
//UI
import {
  StyledTextField,
  StyledIconButton,
  StyledMenuItem,
  StyledSearchBar,
  StyledMenuTypography,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";
import { InputAdornment, ClickAwayListener } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { commonUtil } from "@hcl-commerce-store-sdk/utils";

type CategorySuggestion = {
  fullPath: string;
  url: string;
};
const SearchBar: React.FC<SearchBarProps> = ({ showSearchBar, openSearchBar, closeSearchBar }) => {
  const widgetName = getDisplayName(SearchBar);
  const contractId = useSelector(currentContractIdSelector);
  const [keywordSuggestions, setKeywordSuggestions] = React.useState<Array<any>>([]);
  const [categorySuggestions, setCategorySuggestions] = React.useState<Array<any>>([]);
  const [brandSuggestions, setBrandSuggestions] = React.useState<Array<any>>([]);
  const [sellerSuggestions, setSellerSuggestions] = React.useState<Array<any>>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location: any = useLocation();

  const searchField = t("SearchBar.SearchField");
  const keywordTitle = t("SearchBar.KeywordTitle");
  const categoryTitle = t("SearchBar.CategoryTitle");
  const brandTitle = t("SearchBar.BrandTitle");
  const sellerTitle = t("SearchBar.SellerTitle");
  const [input, setInput] = React.useState("");
  const [nameList, setNameList] = React.useState<Array<string>>([]);
  const [index, setIndex] = React.useState(0);
  const { mySite } = useSite();
  const dispatch = useDispatch();
  const [showKeywords, setShowKeywords] = React.useState(false);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showBrands, setShowBrands] = React.useState(false);
  const [showSellers, setShowSellers] = React.useState(false);
  const [categories, setCategories] = React.useState<Array<CategorySuggestion>>([]);
  const [brands, setBrands] = React.useState<Array<string>>([]);
  const [sellers, setSellers] = React.useState<Array<string>>([]);
  const [inputDisabled, setinputDisabled] = React.useState(true);

  const getSuggestions = useCallback(
    (name, index, url?) => ({
      ...cloneDeep(CommerceEnvironment.suggestionSkeleton),
      name,
      arrIndex: `${index}`,
      url: url ?? `${SEARCH}?${SEARCHTERM}=${commonUtil.encodeURLParts(name)}`,
    }),
    []
  );

  const clearSuggestions = () => {
    setIndex(0);
    setKeywordSuggestions([]);
    setCategorySuggestions([]);
    setBrandSuggestions([]);
    setSellerSuggestions([]);
    setShowKeywords(false);
    setShowCategories(false);
    setShowBrands(false);
    setShowSellers(false);
  };

  const clearSuggestionsAndUpdateInputField = (str: string) => {
    clearSuggestions();
    str = callRegex(str);
    setInput(str);
    setShowSearchBar(!showSearchBar);
    dispatch(resetProductListAction());
  };

  const clearSuggestionsAndInputField = () => {
    clearKeywords();
    clearSuggestions();
    setInput("");
  };

  const clearKeywords = () => {
    dispatch(searchActions.KEYWORDS_RESET_ACTION(""));
  };

  const setKeywordsToLocalStorage = (list: string[]) => {
    dispatch(searchActions.KEYWORDS_UPDATED_ACTION(list));
  };
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    if (mySite && contractId) {
      const catalogId = mySite?.catalogID;
      const parameters: any = {
        responseFormat: "application/json",
        suggestType: ["Category", "Brand", "Seller"],
        contractId,
        catalogId,
        ...payloadBase,
      };
      siteContentService
        .findSuggestionsUsingGET(parameters)
        .then((res) => {
          if (res.status === OK) {
            const categoriesResponse = res?.data?.suggestionView[0]?.entry ?? [];
            const brandsResponse = res?.data?.suggestionView[1]?.entry ?? [];
            const sellersResponse = res?.data?.suggestionView[2]?.entry ?? [];

            setCategories(categoriesResponse.map(({ fullPath, seo }) => ({ fullPath, url: seo?.href ?? "" })));
            setBrands(brandsResponse?.map((i) => i.name));
            setSellers(sellersResponse?.map((i) => i.name));

            setinputDisabled(false);
          }
        })
        .catch((e) => {
          console.warn("fail to get category, brand and seller suggestions.");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite, t, contractId]);

  useEffect(() => {
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const searchTermValue = params.get(SEARCHTERM);
    if (searchTermValue === null) {
      setInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLookAheadSearch = (event: ChangeEvent, type: string) => {
    event.persist();

    const element = event.currentTarget as HTMLInputElement;

    setInput(element.value);
    retrieveSuggestions(element.value);
  };

  const retrieveSuggestions = (searchTerm: any) => {
    searchTerm = searchTerm.trim();
    if (searchTerm.length > 1) {
      setTimeout(function () {
        const storeID = mySite.storeID;
        const catalogId = mySite.catalogID;

        const parameters: any = {
          responseFormat: "application/json",
          storeId: storeID,
          term: "*",
          limit: KEYWORD_LIMIT,
          contractId: contractId,
          catalogId: catalogId,
          query: { searchTerm },
          ...payloadBase,
        };

        siteContentService.findKeywordSuggestionsByTermUsingGET(parameters).then((res) => {
          if (res.status === OK) {
            const keywordSuggestions = res?.data.suggestionView[0].entry;
            if (keywordSuggestions) {
              const list = generateSuggestions(keywordSuggestions, searchTerm);
              setNameList(list);
            }
          }
        });
      }, 300);
    }
    clearKeywords();
    clearSuggestions();
  };

  const generateSuggestions = (kwSuggestions: any[], userInput: string) => {
    let nameListIndex = 1;
    const regex = new RegExp(userInput, "ig");

    const keywords = kwSuggestions.map(({ term }) => getSuggestions(term, nameListIndex++));

    const matchedCategories = categories
      .filter(({ fullPath }) => fullPath.match(regex))
      .slice(0, 4)
      .map(({ fullPath, url }) => getSuggestions(fullPath, nameListIndex++, url));

    const matchedBrands = brands
      .filter((e) => e.match(regex))
      .slice(0, 4)
      .map((brand) => getSuggestions(brand, nameListIndex++));

    const matchedSellers = sellers
      .filter((e) => e.match(regex))
      .slice(0, 4)
      .map((seller) => getSuggestions(seller, nameListIndex++));

    setKeywordSuggestions(keywords);
    setCategorySuggestions(matchedCategories);
    setBrandSuggestions(matchedBrands);
    setSellerSuggestions(matchedSellers);

    setShowKeywords(true);
    setShowCategories(true);
    setShowBrands(true);
    if (sellers.length) {
      setShowSellers(true);
    }

    const terms = keywords.map(({ name }) => name);
    setKeywordsToLocalStorage(terms);

    return [userInput, ...terms, ...[matchedCategories, matchedBrands, matchedSellers].flat(1).map(({ name }) => name)];
  };

  const callRegex = (str: string) => {
    const regex2 = new RegExp(">", "ig");
    let arr: string[];
    if (str.match(regex2)) {
      arr = str.split(">");
      str = arr[arr.length - 1].trim();
    }
    return str;
  };
  const onKeyDown = (e) => {
    const len = nameList ? nameList.length : 0;
    let str = "";
    if (e.keyCode === KEY_CODES.UP) {
      e.preventDefault();

      if (index === 0) {
        return;
      }
      setIndex(index - 1);
      if (nameList) {
        str = callRegex(nameList[index - 1]);
        setInput(str);
      }
    } else if (e.keyCode === KEY_CODES.DOWN) {
      e.preventDefault();

      if (index === len - 1) {
        setIndex(0);
        if (nameList) {
          str = callRegex(nameList[0]);
          setInput(str);
        }
        return;
      }
      setIndex(index + 1);
      if (nameList) {
        str = callRegex(nameList[index + 1]);
        setInput(str);
      }
    }
  };

  const submitSearch = (props: any) => {
    props.preventDefault();
    clearSuggestions();

    if (input?.trim()) {
      let url = "";
      const storeID = mySite.storeID;
      const searchTerm = input.trim();
      const parameters: any = { storeId: storeID, searchTerm, ...payloadBase };
      searchDisplayService
        .getSearchDisplayView(parameters)
        .then((res) => {
          if (res.status === OK) {
            dispatch(resetProductListAction());
            url = res?.data.redirecturl;

            if (url === undefined) {
              url = SEARCH + "?" + SEARCHTERM + "=" + searchTerm;
            }
            redirectTo(url);
          }
        })
        .catch((e) => {
          console.log("Error in getSearchDisplayView API call", e);
        });
    }
  };

  const redirectTo = (url: string) => {
    clearSuggestions();
    setShowSearchBar(false);
    //redirect
    if (url.startsWith("http")) {
      window.location.href = url;
    } else {
      navigate(url);
    }
  };

  const clickAway = (prev) => {
    setShowSearchBar(!prev);
  };

  const setShowSearchBar = (boolean) => {
    if (boolean) {
      openSearchBar();
    } else {
      closeSearchBar();
    }
  };

  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);

  return (
    <ClickAwayListener onClickAway={clickAway}>
      <StyledSearchBar>
        <form onSubmit={submitSearch} noValidate>
          <StyledTextField
            margin="normal"
            size="small"
            autoFocus
            autoComplete="off"
            type="text"
            disabled={inputDisabled}
            placeholder={searchField}
            value={input}
            name="searchTerm"
            onChange={(e) => handleLookAheadSearch(e, "searchTerm")}
            onKeyDown={onKeyDown}
            InputProps={{
              endAdornment: (
                <>
                  {showKeywords || showCategories || showBrands || showSellers ? (
                    <InputAdornment position="end">
                      <StyledIconButton
                        data-testid="button-clear-search-suggestions-input-fields"
                        onClick={clearSuggestionsAndInputField}>
                        <CloseIcon titleAccess={t("SearchBar.Clear")} />
                      </StyledIconButton>
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="start">
                      <SearchIcon data-testid="icon-toggle-search-bar" onClick={toggleSearchBar} />
                    </InputAdornment>
                  )}
                </>
              ),
            }}
          />
        </form>

        {showKeywords || showCategories || showBrands || showSellers ? (
          <ClickAwayListener onClickAway={clearSuggestionsAndInputField}>
            <ul className="searchBar-results">
              {showKeywords ? (
                <>
                  <StyledMenuTypography variant="body2" className="searchBar-resultsCategory">
                    {keywordTitle}
                  </StyledMenuTypography>
                  {keywordSuggestions?.map((e: any, i: number) => (
                    <StyledLink
                      key={`keyword-${i}`}
                      testId={`keywords-${e.name}`}
                      to={e.url}
                      onClick={() => clearSuggestionsAndUpdateInputField(e.name)}>
                      <StyledMenuItem>
                        <StyledMenuTypography
                          className={e.arrIndex === index ? "active" : ""}
                          key={e.arrIndex}
                          id={`megamenu_department_${e.id}`}
                          title={e.name}>
                          {e.name}
                        </StyledMenuTypography>
                      </StyledMenuItem>
                    </StyledLink>
                  ))}
                </>
              ) : null}

              {showCategories ? (
                <>
                  <StyledMenuTypography variant="body2" className="searchBar-resultsCategory">
                    {categoryTitle}
                  </StyledMenuTypography>
                  {categorySuggestions?.map((e: any, i: number) => (
                    <StyledLink
                      key={`category-${i}`}
                      testId={`category-${e.url.split("/").filter(Boolean).join("-")}`}
                      to={e.url}
                      onClick={(evt) => clearSuggestionsAndUpdateInputField(e.name)}>
                      <StyledMenuItem>
                        <StyledMenuTypography
                          className={e.arrIndex === index ? "active" : ""}
                          key={e.arrIndex}
                          id={`megamenu_department_${e.id}`}
                          title={e.name}>
                          {e.name}
                        </StyledMenuTypography>
                      </StyledMenuItem>
                    </StyledLink>
                  ))}
                </>
              ) : null}

              {showBrands ? (
                <>
                  <StyledMenuTypography variant="body2" className="searchBar-resultsCategory">
                    {brandTitle}
                  </StyledMenuTypography>
                  {brandSuggestions?.map((e: any, i: number) => (
                    <StyledLink
                      key={`brand-${i}`}
                      testId={`brand-${e.name.toLowerCase()}`}
                      to={e.url}
                      onClick={(evt) => clearSuggestionsAndUpdateInputField(e.name)}>
                      <StyledMenuItem>
                        <StyledMenuTypography
                          className={e.arrIndex === index ? "active" : ""}
                          key={e.arrIndex}
                          id={`megamenu_department_${e.id}`}
                          title={e.name}>
                          {e.name}
                        </StyledMenuTypography>
                      </StyledMenuItem>
                    </StyledLink>
                  ))}
                </>
              ) : null}

              {showSellers ? (
                <>
                  <StyledMenuTypography variant="body2" className="searchBar-resultsCategory">
                    {sellerTitle}
                  </StyledMenuTypography>
                  {sellerSuggestions?.map((e: any, i: number) => (
                    <StyledLink
                      key={`seller-${i}`}
                      testId={`seller-${e.name.toLowerCase()}`}
                      to={e.url}
                      onClick={(evt) => clearSuggestionsAndUpdateInputField(e.name)}>
                      <StyledMenuItem>
                        <StyledMenuTypography
                          className={e.arrIndex === index ? "active" : ""}
                          key={e.arrIndex}
                          id={`megamenu_department_${e.id}`}
                          title={e.name}>
                          {e.name}
                        </StyledMenuTypography>
                      </StyledMenuItem>
                    </StyledLink>
                  ))}
                </>
              ) : null}
            </ul>
          </ClickAwayListener>
        ) : null}
      </StyledSearchBar>
    </ClickAwayListener>
  );
};

interface SearchBarProps {
  showSearchBar: boolean;
  openSearchBar: any;
  closeSearchBar: any;
}

export { SearchBar };
