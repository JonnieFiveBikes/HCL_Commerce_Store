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
import React, { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OK } from "http-status-codes";
import { useTranslation } from "react-i18next";
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
  StyledAvatar,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import { InputAdornment, ClickAwayListener } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { commonUtil } from "@hcl-commerce-store-sdk/utils";
import storeUtil from "../../../utils/storeUtil";
import { SUGGESTIONS } from "../../../_foundation/constants/common";
import { debounce } from "lodash-es";

const SearchBar: React.FC<SearchBarProps> = ({ showSearchBar, openSearchBar, closeSearchBar }) => {
  const widget = useMemo(() => getDisplayName(SearchBar), []);
  const controller = useMemo(() => new AbortController(), []);
  const contractId = useSelector(currentContractIdSelector);
  const [keywordSuggestions, setKeywordSuggestions] = React.useState<Array<any>>([]);
  const [categorySuggestions, setCategorySuggestions] = React.useState<Array<any>>([]);
  const [brandSuggestions, setBrandSuggestions] = React.useState<Array<any>>([]);
  const [sellerSuggestions, setSellerSuggestions] = React.useState<Array<any>>([]);
  const [productSuggestions, setProductSuggestions] = React.useState<Array<any>>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location: any = useLocation();

  const searchField = t("SearchBar.SearchField");
  const keywordTitle = t("SearchBar.KeywordTitle");
  const categoryTitle = t("SearchBar.CategoryTitle");
  const brandTitle = t("SearchBar.BrandTitle");
  const sellerTitle = t("SearchBar.SellerTitle");
  const productTitle = t("SearchBar.ProductsTitle");
  const [input, setInput] = React.useState("");
  const [nameList, setNameList] = React.useState<Array<string>>([]);
  const [index, setIndex] = React.useState(0);
  const { mySite } = useSite();
  const dispatch = useDispatch();
  const [showKeywords, setShowKeywords] = React.useState(false);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showBrands, setShowBrands] = React.useState(false);
  const [showSellers, setShowSellers] = React.useState(false);
  const [showProducts, setShowProducts] = React.useState(false);

  const getSuggestions = useCallback(
    (name, index, url?, thumbnail?, isManufacturer = false) => ({
      ...cloneDeep(CommerceEnvironment.suggestionSkeleton),
      name,
      arrIndex: `${index}`,
      url: url ?? `${SEARCH}?${SEARCHTERM}=${commonUtil.encodeURLParts(name)}&manufacturer=${isManufacturer}`,
      thumbnail,
    }),
    []
  );

  const clearSuggestions = useCallback(() => {
    setIndex(0);
    setKeywordSuggestions([]);
    setCategorySuggestions([]);
    setBrandSuggestions([]);
    setSellerSuggestions([]);
    setProductSuggestions([]);
    setShowKeywords(false);
    setShowCategories(false);
    setShowBrands(false);
    setShowSellers(false);
  }, []);

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

  const clearKeywords = useCallback(() => dispatch(searchActions.KEYWORDS_RESET_ACTION("")), []); // eslint-disable-line react-hooks/exhaustive-deps
  const payloadBase = useMemo(() => ({ widget, signal: controller.signal }), []); // eslint-disable-line react-hooks/exhaustive-deps
  const setKeywordsToLocalStorage = useCallback(
    (list: string[]) => dispatch(searchActions.KEYWORDS_UPDATED_ACTION(list)),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const searchTermValue = params.get(SEARCHTERM);
    if (searchTermValue === null) {
      setInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLookAheadSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.persist();
    const term = event.currentTarget.value ?? "";
    setInput(term);
    retrieveSuggestions(term.trim());
  };

  const generateSuggestions = useCallback(
    (suggestions: any[], userInput: string) => {
      let nameListIndex = 1;
      const regex = new RegExp(userInput, "ig");

      const root = suggestions ?? [];
      const asMap = storeUtil.toMap(root, "identifier");

      const keywordSuggestions = asMap[SUGGESTIONS.Keyword]?.entry ?? [];
      const categorySuggestions = asMap[SUGGESTIONS.Category]?.entry ?? [];
      const brandSuggestions = asMap[SUGGESTIONS.Brand]?.entry?.map((brand) => brand.name) ?? [];
      const sellerSuggestions = asMap[SUGGESTIONS.Seller]?.entry?.map((seller) => seller.name) ?? [];
      const productSuggestion = asMap[SUGGESTIONS.Product]?.entry ?? [];

      const matchedKeywords = keywordSuggestions.map(({ term }) => getSuggestions(term, nameListIndex++));

      const matchedCategories = categorySuggestions
        .filter(({ fullPath }) => fullPath.match(regex))
        .slice(0, 4)
        .map(({ fullPath, seo }) => getSuggestions(fullPath, nameListIndex++, seo?.href));

      const matchedBrands = brandSuggestions
        .filter((e) => e.match(regex))
        .slice(0, 4)
        .map((brand) => getSuggestions(brand, nameListIndex++, null, null, true));

      const matchedSellers = sellerSuggestions
        .filter((e) => e.match(regex))
        .slice(0, 4)
        .map((seller) => getSuggestions(seller, nameListIndex++));

      const matchedProducts = productSuggestion
        .slice(0, 4)
        .map(({ name, seo, thumbnail }) => getSuggestions(name, nameListIndex++, seo?.href, thumbnail));

      setKeywordSuggestions(matchedKeywords);
      setCategorySuggestions(matchedCategories);
      setBrandSuggestions(matchedBrands);
      setSellerSuggestions(matchedSellers);
      setProductSuggestions(matchedProducts);

      setShowKeywords(true);
      setShowCategories(true);
      setShowBrands(true);
      if (sellerSuggestions.length) {
        setShowSellers(true);
      }

      const terms = matchedKeywords.map(({ name }) => name);
      setKeywordsToLocalStorage(terms);
      setShowProducts(true);

      return [
        userInput,
        ...terms,
        ...[matchedCategories, matchedBrands, matchedSellers, matchedProducts].flat(1).map(({ name }) => name),
      ];
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const retrieveSuggestions = useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        if (searchTerm.length > 1) {
          const storeID = mySite.storeID;
          const catalogId = mySite.catalogID;

          const parameters: any = {
            responseFormat: "application/json",
            storeId: storeID,
            suggestType: SUGGESTIONS.All,
            limit: KEYWORD_LIMIT,
            contractId,
            catalogId,
            query: { searchTerm },
            ...payloadBase,
          };

          clearKeywords();
          clearSuggestions();
          const res = await siteContentService.findSuggestionsUsingGET(parameters);
          if (res.status === OK) {
            const list = generateSuggestions(res?.data?.suggestionView, searchTerm);
            setNameList(list);
          }
        }
      }, 300),
    [contractId, generateSuggestions, mySite] // eslint-disable-line react-hooks/exhaustive-deps
  );

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

  useEffect(() => () => controller.abort(), []); // eslint-disable-line react-hooks/exhaustive-deps

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
            placeholder={searchField}
            value={input}
            name="searchTerm"
            onChange={handleLookAheadSearch}
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

              {showProducts ? (
                <>
                  <StyledMenuTypography variant="body2" className="searchBar-resultsCategory">
                    {productTitle}
                  </StyledMenuTypography>
                  {productSuggestions?.map((e: any, i: number) => (
                    <StyledLink
                      key={`product-${i}`}
                      testId={`product-${e.name.toLowerCase()}`}
                      to={e.url}
                      onClick={(evt) => clearSuggestionsAndUpdateInputField(e.name)}>
                      <StyledMenuItem>
                        <StyledAvatar
                          style={{
                            margin: "0 0.5rem 0 0",
                            border: "1px solid lightgray",
                            borderRadius: "0",
                          }}
                          alt={e.name}
                          src={e.thumbnail}
                        />
                        <StyledMenuTypography
                          className={e.arrIndex === index ? "active" : ""}
                          component="div"
                          key={e.arrIndex}
                          id={`megamenu_department_${e.id}`}
                          title={e.name}>
                          <StyledTypography className="wrapText">{e.name}</StyledTypography>
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
