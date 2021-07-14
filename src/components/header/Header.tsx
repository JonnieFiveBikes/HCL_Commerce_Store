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
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { paramCase } from "change-case";

//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import categoryService from "../../_foundation/apis/search/categories.service";
import { LOCALE } from "../../_foundation/constants/common";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";

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
import {
  userNameSelector,
  loginStatusSelector,
} from "../../redux/selectors/user";
import { ORG_SWITCH_ACTION } from "../../redux/actions/organization";
import { CONTRACT_SWITCH_ACTION } from "../../redux/actions/contract";
import { LOGOUT_REQUESTED_ACTION } from "../../redux/actions/user";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { successSelector } from "../../redux/selectors/success";
import { SuccessMessageReducerState } from "../../redux/reducers/reducerStateInterface";
//UI
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { ClickAwayListener } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Hidden } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
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

interface HeaderProps {
  loggedIn: boolean;
}

/**
 * Header component
 * displays Header, Mini Cart and Mega Menu
 * @param props
 */
const Header: React.FC<HeaderProps> = (props: any) => {
  const widgetName = getDisplayName(Header);

  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [topCategories, setTopCategories] = useState<Array<any>>([]);
  const [myAccountPopperOpen, setMyAccountPopperOpen] =
    useState<boolean>(false);
  const myAccountElRef = useRef<HTMLButtonElement>(null);

  const [miniCartPopperOpen, setMiniCartPopperOpen] = useState<boolean>(false);
  const miniCartElRef = useRef<HTMLButtonElement>(null);

  const [languageTogglePopperOpen, setLanguageTogglePopperOpen] =
    useState<boolean>(false);
  const languageToggleElRef = useRef<HTMLButtonElement>(null);

  const { mySite } = useSite();
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { firstName, lastName } = useSelector(userNameSelector);
  const contractId = useSelector(currentContractIdSelector);
  const success: SuccessMessageReducerState = useSelector(successSelector);
  const userLoggedIn = useSelector(loginStatusSelector);
  const userPreviousLoggedIn = useRef();

  const locale = localStorageUtil.get(LOCALE);

  const isB2B = Boolean(mySite?.isB2B);
  const loggedIn = props.loggedIn;
  const isShoppingEnabled = !isB2B || (isB2B && loggedIn);

  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));
  const isTablet = !useMediaQuery(theme.breakpoints.up("md"));

  const myAccountPopperId = "HEADER_MY_ACCOUNT_Popper";
  const miniCartPopperId = "HEADER_MINI_CART_Popper";
  const languageTogglePopperId = "HEADER_LANGUAGE_TOGGLE_Popper";
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const payload = {
    ...payloadBase,
  };

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

  const handleMiniCartPopperClose = () => setMiniCartPopperOpen(false);

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
        ...payload,
      })
    );
    history.push(ROUTES.HOME);
  };

  const handleContractChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.persist();
    event.preventDefault();
    const conId = event.target.value;
    dispatch(
      CONTRACT_SWITCH_ACTION({
        query: { contractId: String(conId) },
        ...payloadBase,
      })
    );
    history.push(ROUTES.HOME);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    const param: any = {
      ...payload,
    };
    dispatch(LOGOUT_REQUESTED_ACTION(param));
  };

  useEffect(() => {
    if (!userLoggedIn && userPreviousLoggedIn.current) {
      setMyAccountPopperOpen(false);
      setMiniCartPopperOpen(false);
      history.push(ROUTES.HOME);
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
        })
        .catch((e) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite, contractId, locale]);

  useEffect(() => {
    if (success && success.key) {
      if (MINICART_CONFIGS.itemAddSuccessMsgKeys.includes(success.key)) {
        handleMiniCartClick();
      }
    }
  }, [success]);

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
      <StyledHeader>
        <StyledContainer>
          <StyledGrid container justify="space-between" alignItems="center">
            <StyledGrid item>
              <StyledGrid
                className="header-topbarSection"
                container
                alignItems="center"
                spacing={2}>
                <StyledGrid item>
                  <Hidden mdUp>
                    <button
                      className="menu-hamburger"
                      data-testid="menu-hamburger-element"
                      onClick={() => setOpen(!open)}>
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
                <Hidden smDown>
                  <StyledGrid
                    item
                    data-testid="search-bar-desktop-largetablet-element">
                    <SearchBar
                      showSearchBar={showSearchBar}
                      closeSearchBar={() => setShowSearchBar(false)}
                      openSearchBar={() => setShowSearchBar(true)}
                    />
                  </StyledGrid>
                </Hidden>
              </StyledGrid>
            </StyledGrid>
            <StyledGrid item>
              <StyledGrid
                className="header-topbarSection"
                container
                alignItems="center"
                direction="row">
                <Hidden mdUp>
                  <StyledGrid item data-testid="search-bar-mobile-element">
                    <StyledSearchBarButton
                      onClick={() => setShowSearchBar(!showSearchBar)}
                      className={`header-actionsButton ${
                        showSearchBar && "active"
                      }`}
                      variant="text"
                      color="secondary">
                      <SearchIcon />
                    </StyledSearchBarButton>
                  </StyledGrid>
                </Hidden>
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
                {loggedIn ? (
                  <StyledGrid item>
                    <StyledButton
                      ref={myAccountElRef}
                      variant="text"
                      color="secondary"
                      className="header-actionsButton"
                      onClick={handleMyAccountClick}>
                      {isTablet ? (
                        <StyledHeaderActions>
                          <AccountBoxIcon />
                          <StyledTypography variant="body1" component="p">
                            {isMobile
                              ? t("Header.Actions.Account")
                              : t("Header.Actions.YourAccount")}
                          </StyledTypography>
                        </StyledHeaderActions>
                      ) : (
                        <StyledBox
                          className="welcome-text"
                          display="flex"
                          flexDirection="column">
                          <StyledTypography variant="button" component="p">
                            {firstName
                              ? t("Header.Actions.WelcomeFirstname", {
                                  firstName,
                                })
                              : t("Header.Actions.WelcomeNoFirstname", {
                                  lastName,
                                })}
                          </StyledTypography>

                          <StyledBox
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            flexWrap="wrap">
                            <StyledTypography variant="body2">
                              {t("Header.Actions.YourAccount")}
                            </StyledTypography>
                            {myAccountPopperOpen ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </StyledBox>
                        </StyledBox>
                      )}
                    </StyledButton>
                    <StyledAccountPopper
                      id={myAccountPopperId}
                      open={myAccountPopperOpen}
                      anchorEl={myAccountElRef.current}
                      onClose={handleMyAccountPopperClose}
                      placement="bottom-end"
                      modifiers={{
                        flip: {
                          enabled: false,
                        },
                        preventOverflow: {
                          enabled: false,
                          boundariesElement: "scrollParent",
                        },
                        hide: {
                          enabled: true,
                        },
                      }}
                      className="account-popper">
                      <ClickAwayListener
                        onClickAway={handleMyAccountPopperClose}>
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
                  <StyledGrid item>
                    <StyledLink to={ROUTES.SIGNIN}>
                      {isMobile ? (
                        <StyledButton
                          className="header-actionsButton"
                          variant="text"
                          color="secondary">
                          <StyledHeaderActions>
                            <AccountBoxIcon />
                            <StyledTypography variant="body1">
                              {t("Header.Actions.SignIn")}
                            </StyledTypography>
                          </StyledHeaderActions>
                        </StyledButton>
                      ) : (
                        <StyledButton
                          className="header-actionsButton "
                          variant="text"
                          color="secondary">
                          <StyledHeaderActions>
                            <StyledTypography variant="body1" component="p">
                              {t("Header.Actions.SignInRegister")}
                            </StyledTypography>
                          </StyledHeaderActions>
                        </StyledButton>
                      )}
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
                closeSearchBar={() => setShowSearchBar(false)}
                openSearchBar={() => setShowSearchBar(true)}
              />
            </StyledContainer>
          </Hidden>
        )}

        <Hidden smDown>
          <ExpandedMenu pages={topCategories} />
        </Hidden>

        <StyledSwipeableDrawer
          anchor={useMediaQuery(theme.breakpoints.up("sm")) ? "top" : "left"}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          className="header-menu"
          data-testid="header-menu-drawer-element">
          <StyledContainer>
            <StyledGrid
              container
              spacing={2}
              className={"menu-container " + (open ? "open" : "")}>
              <MegaMenu
                menutitle={t("MegaMenu.Title")}
                pages={topCategories}
                closeMegaMenu={() => setOpen(false)}></MegaMenu>
            </StyledGrid>
          </StyledContainer>
        </StyledSwipeableDrawer>
      </StyledHeader>
    </>
  );
};

export { Header };
