/*
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
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { paramCase } from "change-case";

//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import categoryService from "../../_foundation/apis/search/categories.service";
import { STORELOCATORACTIONS } from "../../_foundation/constants/common";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import { useStoreLocatorValue } from "../../_foundation/context/store-locator-context";

//Custom libraries
import { headerConfig } from "./headerConstant";
import { TOP_CATEGORIES_DEPTH_LIMIT } from "../../configs/catalog";
import { MINICART_CONFIGS } from "../../configs/order";
import * as ROUTES from "../../constants/routes";
import ContentRecommendationWidget from "../commerce-widgets/content-recommendation-widget";
import MiniCart from "./MiniCart";
import LanguageToggle from "./LanguageToggle";
import MegaMenu from "./MegaMenu";
import ExpandedMenu from "./ExpandedMenu";
import { SearchBar } from "../widgets/search-bar";
import AccountPopperContent from "./AccountPopperContent";

//Redux
import { userNameSelector, loginStatusSelector } from "../../redux/selectors/user";
import { addressDetailsSelector } from "../../redux/selectors/account";
import { ORG_SWITCH_ACTION } from "../../redux/actions/organization";
import { CONTRACT_SWITCH_ACTION } from "../../redux/actions/contract";
import { LOGOUT_REQUESTED_ACTION } from "../../redux/actions/user";
import { UPDATE_CATEGORIES_STATE_ACTION } from "../../redux/actions/category";
import { SELLERS_GET_ACTION } from "../../redux/actions/sellers";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { successSelector } from "../../redux/selectors/success";
import { SuccessMessageReducerState } from "../../redux/reducers/reducerStateInterface";
//UI
import useMediaQuery from "@mui/material/useMediaQuery";
import { ClickAwayListener, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StoreIcon from "@mui/icons-material/Store";
import { Hidden } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  StyledAccountPopper,
  StyledButton,
  StyledContainer,
  StyledHeader,
  StyledHeaderActions,
  StyledTypography,
  StyledSwipeableDrawer,
  StyledGrid,
  StyledLink,
  StyledPaper,
  StyledBox,
  StyledSearchBarButton,
} from "@hcl-commerce-store-sdk/react-component";
import { useWinDimsInEM } from "../../_foundation/hooks/use-win-dims-in-em";
import { selectedSellersSelector, sellersSelector } from "../../redux/selectors/sellers";
import { SELLER_STORAGE_KEY } from "../../constants/common";
import { SET_SELLER_ACTION } from "../../redux/actions/sellers";
import { Sellers } from "./sellers";
import { StyledList } from "@hcl-commerce-store-sdk/react-component";
import { StoreLocatorButton } from "./store-locator-button";

interface HeaderProps {
  loggedIn: boolean;
}

const Buttonify = ({ children, ...props }) => {
  const { testId } = props;
  return (
    <StyledButton testId={testId} className="header-actionsButton" variant="text" color="secondary" {...props}>
      <StyledHeaderActions>{children}</StyledHeaderActions>{" "}
    </StyledButton>
  );
};

const MarketplacePopper = ({ sellerConfig }) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const guestSellerPicker = "guestSellerPicker";
  const { t } = useTranslation();
  const { mySite } = useSite();
  const onClickAway = useCallback((e) => {
    if (e.target.localName === "body") {
      return;
    }
    setOpen(false);
  }, []);

  return !mySite?.isB2B && sellerConfig.showSellerList ? (
    <>
      <div ref={btnRef}>
        <Buttonify testId="header-mp" onClick={setOpen.bind(null, !open)}>
          <StyledBox display="flex" flexDirection="column" alignItems="center" flexWrap="wrap">
            <StoreIcon />
            <StyledTypography variant="body1" component="p">
              {t("sellers.mp")}
            </StyledTypography>
          </StyledBox>
        </Buttonify>
      </div>
      <StyledAccountPopper
        id={guestSellerPicker}
        open={open}
        anchorEl={btnRef.current}
        placement="bottom-end"
        modifiers={[
          { name: "flip", enabled: false },
          { name: "preventOverflow", enabled: true },
          { name: "hide", enabled: false },
        ]}
        className="account-popper">
        <ClickAwayListener onClickAway={onClickAway}>
          <StyledPaper className="vertical-padding-1 horizontal-padding-1">
            <StyledList disablePadding>
              <Sellers />
            </StyledList>
          </StyledPaper>
        </ClickAwayListener>
      </StyledAccountPopper>
    </>
  ) : null;
};

/**
 * Header component
 * displays Header, Mini Cart and Mega Menu
 * @param props
 */
const Header: React.FC<HeaderProps> = (props: any) => {
  const widgetName = getDisplayName(Header);
  const { w } = useWinDimsInEM();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [topCategories, setTopCategories] = useState<Array<any>>([]);
  const [myAccountPopperOpen, setMyAccountPopperOpen] = useState<boolean>(false);

  const myAccountElRef = useRef<HTMLButtonElement>(null);

  const [miniCartPopperOpen, setMiniCartPopperOpen] = useState<boolean>(false);
  const miniCartElRef = useRef<HTMLButtonElement>(null);

  const [languageTogglePopperOpen, setLanguageTogglePopperOpen] = useState<boolean>(false);

  const languageToggleElRef = useRef<HTMLButtonElement>(null);

  const { mySite } = useSite();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const addressDetails = useSelector(addressDetailsSelector);
  const userName = useSelector(userNameSelector);
  const firstName = addressDetails?.firstName ?? userName?.firstName;
  const lastName = addressDetails?.lastName ?? userName?.lastName;
  const contractId = useSelector(currentContractIdSelector);
  const success: SuccessMessageReducerState = useSelector(successSelector);
  const userLoggedIn = useSelector(loginStatusSelector);
  const selectedSellers = useSelector(selectedSellersSelector);
  const sellerConfig = useSelector(sellersSelector);
  const sellers = localStorageUtil.get(SELLER_STORAGE_KEY);

  const userPreviousLoggedIn = useRef();

  const isB2B = Boolean(mySite?.isB2B);
  const loggedIn = props.loggedIn;
  const isShoppingEnabled = !isB2B || (isB2B && loggedIn);

  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));
  const isTablet = !useMediaQuery(theme.breakpoints.up("md"));

  const myAccountPopperId = "HEADER_MY_ACCOUNT_Popper";
  const miniCartPopperId = "HEADER_MINI_CART_Popper";
  const languageTogglePopperId = "HEADER_LANGUAGE_TOGGLE_Popper";
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const payload = {
    ...payloadBase,
  };
  const navHome = () => navigate(ROUTES.HOME);
  const storeLocatorDispach = useStoreLocatorValue().dispatch;

  const handleMyAccountClick = () => {
    setMyAccountPopperOpen(true);
    setMiniCartPopperOpen(false);
    setLanguageTogglePopperOpen(false);
  };
  const handleMyAccountPopperClose = () => setMyAccountPopperOpen(false);

  const handleMiniCartClick = () => {
    setMiniCartPopperOpen(true);
    setMyAccountPopperOpen(false);
    setLanguageTogglePopperOpen(false);

    setTimeout(() => {
      window.scrollTo(0, 0);
    });
    setTimeout(() => {
      if (miniCartElRef !== null && miniCartElRef.current !== null) {
        miniCartElRef.current.focus();
      }
    }, 100);
  };

  const handleMiniCartPopperClose = useCallback(() => setMiniCartPopperOpen(false), []);

  const handleLanguageToggleClick = () => {
    setLanguageTogglePopperOpen(true);
    setMiniCartPopperOpen(false);
    setMyAccountPopperOpen(false);
  };
  const handleLanguageTogglePopperClose = () => {
    setLanguageTogglePopperOpen(false);
  };

  const handleOrgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    event.preventDefault();
    const orgId = event.target.value;
    dispatch(
      ORG_SWITCH_ACTION({
        query: { activeOrgId: String(orgId) },
        callback: navHome,
        ...payload,
      })
    );
  };

  const handleContractChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    event.preventDefault();
    const conId = event.target.value;
    dispatch(
      CONTRACT_SWITCH_ACTION({
        query: { contractId: String(conId) },
        callback: navHome,
        ...payloadBase,
      })
    );
  };

  const handleLogout = (event) => {
    event.preventDefault();
    const param: any = {
      ...payload,
    };
    dispatch(LOGOUT_REQUESTED_ACTION(param));
    storeLocatorDispach({ type: STORELOCATORACTIONS.RESET_STORE_SELECTOR });
  };

  useEffect(() => {
    if (!userLoggedIn && userPreviousLoggedIn.current) {
      setMyAccountPopperOpen(false);
      setMiniCartPopperOpen(false);
      navHome();
    }
    userPreviousLoggedIn.current = userLoggedIn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoggedIn]);

  useEffect(() => {
    if (mySite !== null && contractId !== undefined) {
      const storeID: string = mySite.storeID;
      const parameters: any = {
        storeId: storeID,
        depthAndLimit: TOP_CATEGORIES_DEPTH_LIMIT,
        query: {
          contractId: contractId,
        },
        ...payload,
      };
      categoryService
        .getV2CategoryResourcesUsingGET(parameters)
        .then((res) => {
          setTopCategories(res.data.contents);
          dispatch(UPDATE_CATEGORIES_STATE_ACTION(res.data.contents));
        })
        .catch((e) => {
          setTopCategories([]);
          dispatch(UPDATE_CATEGORIES_STATE_ACTION([]));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite, contractId, language, selectedSellers]);

  useEffect(() => {
    const payloadBase: any = {
      widget: widgetName,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    dispatch(SELLERS_GET_ACTION(payloadBase));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (success && success.key) {
      if (MINICART_CONFIGS.itemAddSuccessMsgKeys.includes(success.key)) {
        handleMiniCartClick();
      }
    }
  }, [success]);

  useEffect(() => {
    //splice to empty array
    cancels.splice(0, cancels.length).forEach((cancel) => {
      cancel();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sellerConfig.initialized) {
      if (sellers?.length && !sellerConfig.showSellerList) {
        dispatch(SET_SELLER_ACTION({ sellers: null }));
      } else if (sellers?.length && !selectedSellers?.length) {
        dispatch(SET_SELLER_ACTION({ sellers }));
      }
    }
  }, [sellerConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  const crwProps = useMemo(
    () => ({
      widget: {
        id: `header-${paramCase(headerConfig.espot.eSpotName)}`,
        widgetName: "content-recommendation-widget",
        name: headerConfig.espot.eSpotName,
        properties: {
          emsName: headerConfig.espot.eSpotName,
        },
      },
      page: { name: "" },
    }),
    //Content is language sensitive, so listen to translation change to render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);
  const turnOffSearchBar = () => setShowSearchBar(false);
  const turnOnSearchBar = () => setShowSearchBar(true);
  const toggleOpen = () => setOpen(!open);
  const turnOffOpen = () => setOpen(false);
  const turnOnOpen = () => setOpen(true);

  return (
    <>
      <StyledHeader>
        <StyledContainer>
          <StyledGrid container justifyContent="space-between" alignItems="center">
            <StyledGrid item>
              <StyledGrid className="header-topbarSection" container alignItems="center" spacing={2}>
                <StyledGrid item>
                  <Hidden mdUp>
                    <button className="menu-hamburger" data-testid="menu-hamburger-element" onClick={toggleOpen}>
                      <MenuIcon />
                    </button>
                  </Hidden>
                </StyledGrid>
                {mySite != null && (
                  <StyledGrid item>
                    <div className="header-branding">
                      <ContentRecommendationWidget {...crwProps} />
                    </div>
                  </StyledGrid>
                )}
                <Hidden mdDown>
                  <StyledGrid item data-testid="search-bar-desktop-largetablet-element">
                    <SearchBar
                      showSearchBar={showSearchBar}
                      closeSearchBar={turnOffSearchBar}
                      openSearchBar={turnOnSearchBar}
                    />
                  </StyledGrid>
                </Hidden>
              </StyledGrid>
            </StyledGrid>
            <StyledGrid item>
              <StyledGrid className="header-topbarSection" container alignItems="center" direction="row">
                <Hidden mdUp>
                  <StyledGrid item data-testid="search-bar-mobile-element">
                    <StyledSearchBarButton
                      onClick={toggleSearchBar}
                      className={`header-actionsButton ${showSearchBar && "active"}`}
                      variant="text"
                      color="secondary">
                      <SearchIcon />
                    </StyledSearchBarButton>
                  </StyledGrid>
                </Hidden>
                <StyledGrid item>
                  <StoreLocatorButton />
                </StyledGrid>
                {isShoppingEnabled && (
                  <StyledGrid item>
                    <MiniCart
                      id={miniCartPopperId}
                      open={miniCartPopperOpen}
                      handleClick={handleMiniCartClick}
                      handleClose={handleMiniCartPopperClose}
                      ref={miniCartElRef}
                    />
                  </StyledGrid>
                )}
                {sellerConfig?.showSellerList ? <MarketplacePopper {...{ sellerConfig }} /> : null}
                {loggedIn ? (
                  <StyledGrid item>
                    <StyledButton
                      ref={myAccountElRef}
                      variant="text"
                      color="secondary"
                      className="header-actionsButton"
                      onClick={handleMyAccountClick}
                      testId="header-action-account">
                      {isTablet ? (
                        <StyledHeaderActions>
                          <AccountBoxIcon />
                          <StyledTypography variant="body1" component="p">
                            {isMobile ? t("Header.Actions.Account") : t("Header.Actions.YourAccount")}
                          </StyledTypography>
                        </StyledHeaderActions>
                      ) : (
                        <StyledBox className="welcome-text" display="flex" flexDirection="column">
                          <StyledTypography variant="button" component="p" className="account-welcome">
                            {firstName
                              ? t("Header.Actions.WelcomeFirstname", {
                                  firstName,
                                })
                              : t("Header.Actions.WelcomeNoFirstname", {
                                  lastName,
                                })}
                          </StyledTypography>

                          <StyledBox display="flex" flexDirection="row" alignItems="center" flexWrap="wrap">
                            <StyledTypography variant="body2">{t("Header.Actions.YourAccount")}</StyledTypography>
                            {myAccountPopperOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </StyledBox>
                        </StyledBox>
                      )}
                    </StyledButton>
                    <StyledAccountPopper
                      id={myAccountPopperId}
                      open={myAccountPopperOpen}
                      anchorEl={myAccountElRef.current}
                      onClose={handleMyAccountPopperClose}
                      placement={w <= 40 ? "bottom" : "bottom-end"}
                      modifiers={[
                        {
                          name: "flip",
                          enabled: false,
                        },
                        {
                          name: "preventOverflow",
                          enabled: false,
                        },
                        {
                          name: "hide",
                          enabled: false,
                        },
                      ]}
                      className="account-popper">
                      <ClickAwayListener onClickAway={handleMyAccountPopperClose}>
                        <StyledPaper className="horizontal-padding-2">
                          <StyledTypography variant="body1" component="div">
                            <AccountPopperContent
                              handleClose={handleMyAccountPopperClose}
                              handleOrgChange={handleOrgChange}
                              handleContractChange={handleContractChange}
                              handleLogout={handleLogout}
                              isB2B={isB2B}
                              userName={{ firstName, lastName }}
                            />
                          </StyledTypography>
                        </StyledPaper>
                      </ClickAwayListener>
                    </StyledAccountPopper>
                  </StyledGrid>
                ) : (
                  <StyledGrid item style={{ display: "flex", alignItems: "center" }}>
                    <StyledLink to={ROUTES.SIGNIN}>
                      <Buttonify testId="header-sign-in">
                        <>
                          {isMobile ? (
                            <>
                              <AccountBoxIcon />
                              <StyledTypography variant="body1">{t("Header.Actions.SignIn")}</StyledTypography>
                            </>
                          ) : (
                            <StyledTypography variant="body1" component="p">
                              {t("Header.Actions.SignInRegister")}
                            </StyledTypography>
                          )}
                        </>
                      </Buttonify>
                    </StyledLink>
                  </StyledGrid>
                )}
                <StyledGrid item>
                  <LanguageToggle
                    id={languageTogglePopperId}
                    open={languageTogglePopperOpen}
                    handleClick={handleLanguageToggleClick}
                    handleClose={handleLanguageTogglePopperClose}
                    ref={languageToggleElRef}
                  />
                </StyledGrid>
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
        </StyledContainer>

        {showSearchBar && (
          <Hidden mdUp>
            <StyledContainer className="bottom-padding-1">
              <SearchBar
                showSearchBar={showSearchBar}
                closeSearchBar={turnOffSearchBar}
                openSearchBar={turnOnSearchBar}
              />
            </StyledContainer>
          </Hidden>
        )}

        <Hidden mdDown>
          <ExpandedMenu pages={topCategories} />
        </Hidden>

        <StyledSwipeableDrawer
          anchor={useMediaQuery(theme.breakpoints.up("sm")) ? "top" : "left"}
          open={open}
          onClose={turnOffOpen}
          onOpen={turnOnOpen}
          className="header-menu"
          data-testid="header-menu-drawer-element">
          <StyledContainer>
            <StyledGrid container spacing={2} className={"menu-container " + (open ? "open" : "")}>
              <MegaMenu menutitle={t("MegaMenu.Title")} pages={topCategories} closeMegaMenu={turnOffOpen}></MegaMenu>
            </StyledGrid>
          </StyledContainer>
        </StyledSwipeableDrawer>
      </StyledHeader>
    </>
  );
};

export { Header };
