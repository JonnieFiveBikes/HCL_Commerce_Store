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
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import categoryService from "../../_foundation/apis/search/categories.service";
//Custom libraries
import { headerConfig } from "./headerConstant";
import { TOP_CATEGORIES_DEPTH_LIMIT } from "../../configs/catalog";
import { MINICART_CONFIGS } from "../../configs/order";
import * as ROUTES from "../../constants/routes";
import { ContentRecommendationLayout } from "../widgets/content-recommendation";
import MiniCart from "./MiniCart";
import MegaMenu from "./MegaMenu";
import ExpandedMenu from "./ExpandedMenu";
import { SearchBar } from "../widgets/search-bar";
import AccountPopperContent from "./AccountPopperContent";
//Redux
import { SiteInfo } from "../../redux/reducers/reducerStateInterface";
import { userNameSelector } from "../../redux/selectors/user";
import { ORG_SWITCH_ACTION } from "../../redux/actions/organization";
import { CONTRACT_SWITCH_ACTION } from "../../redux/actions/contract";
import { LOGOUT_REQUESTED_ACTION } from "../../redux/actions/user";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { successSelector } from "../../redux/selectors/success";
import { SuccessMessageReducerState } from "../../redux/reducers/reducerStateInterface";
//UI
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { ClickAwayListener } from "@material-ui/core";
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
} from "../StyledUI";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
//import FavoriteIcon from "@material-ui/icons/Favorite";

interface HeaderProps {
  loggedIn: boolean;
}

/**
 * Header component
 * displays Header, Mini Cart and Mega Menu
 * @param props
 */
const Header: React.FC<HeaderProps> = (props: any) => {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const [topCategories, setTopCategories] = useState<Array<any>>([]);

  const [myAccountPopperOpen, setMyAccountPopperOpen] = useState<boolean>(
    false
  );
  const myAccountElRef = useRef<HTMLButtonElement>(null);

  const [miniCartPopperOpen, setMiniCartPopperOpen] = useState<boolean>(false);
  const miniCartElRef = useRef<HTMLButtonElement>(null);

  const mySite: SiteInfo = useSite();
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { firstName, lastName } = useSelector(userNameSelector);
  const contractId = useSelector(currentContractIdSelector);
  const success: SuccessMessageReducerState = useSelector(successSelector);

  const isB2B = Boolean(mySite?.isB2B);
  const loggedIn = props.loggedIn;
  const isShoppingEnabled = !isB2B || (isB2B && loggedIn);
  const menuDrawerDirection = useMediaQuery(theme.breakpoints.up("sm"))
    ? "top"
    : "left";

  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));
  const isTablet = !useMediaQuery(theme.breakpoints.up("md"));
  const isTabletLarge = useMediaQuery(theme.breakpoints.up("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const myAccountPopperId = "HEADER_MY_ACCOUNT_Popper";
  const miniCartPopperId = "HEADER_MINI_CART_Popper";

  const handleMyAccountClick = () => {
    setMyAccountPopperOpen(true);
    setMiniCartPopperOpen(false);
  };
  const handleMyAccountPopperClose = () => setMyAccountPopperOpen(false);

  const handleMiniCartClick = () => {
    setMiniCartPopperOpen(true);
    setMyAccountPopperOpen(false);

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

  const handleOrgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    event.preventDefault();
    const orgId = event.target.value;
    dispatch(
      ORG_SWITCH_ACTION({ $queryParameters: { activeOrgId: String(orgId) } })
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
        $queryParameters: { contractId: String(conId) },
      })
    );
    history.push(ROUTES.HOME);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(LOGOUT_REQUESTED_ACTION());
    setMyAccountPopperOpen(false);
    setMiniCartPopperOpen(false);
    history.push(ROUTES.HOME);
  };

  useEffect(() => {
    if (mySite !== null && contractId !== undefined) {
      const storeID: string = mySite.storeID;
      const parameters: any = {
        storeId: storeID,
        depthAndLimit: TOP_CATEGORIES_DEPTH_LIMIT,
        $queryParameters: {
          contractId: contractId,
        },
      };
      categoryService
        .getV2CategoryResourcesUsingGET(parameters, null, mySite.searchContext)
        .then((res) => {
          setTopCategories(res.data.contents);
        });
    }
  }, [mySite, contractId]);

  useEffect(() => {
    if (success && success.key) {
      if (MINICART_CONFIGS.itemAddSuccessMsgKeys.includes(success.key)) {
        handleMiniCartClick();
      }
    }
  }, [success]);

  return (
    <StyledHeader>
      <StyledContainer>
        <StyledGrid
          container
          justify="space-between"
          alignItems="center"
          direction="row">
          <StyledGrid
            container
            item
            spacing={isTablet ? (isMobile ? 0 : isTabletLarge ? 1 : 2) : 2}
            alignItems="center"
            direction="row"
            xs={
              isTablet
                ? isMobile
                  ? 4
                  : isTabletLarge
                  ? 8
                  : 4
                : isTabletLarge
                ? 8
                : true
            }>
            {isMobile && (
              <StyledGrid item>
                <button
                  className="menu-hamburger"
                  onClick={() => setOpen(!open)}>
                  <MenuIcon />
                </button>
              </StyledGrid>
            )}
            {mySite != null && (
              <>
                <StyledGrid item>
                  <div className="header-branding">
                    <ContentRecommendationLayout
                      cid="header"
                      eSpot={headerConfig.espot}
                      page={headerConfig.page}></ContentRecommendationLayout>
                  </div>
                </StyledGrid>
                {(isDesktop || isTabletLarge) && (
                  <StyledGrid item>
                    <SearchBar />
                  </StyledGrid>
                )}
              </>
            )}
          </StyledGrid>
          <StyledGrid
            container
            item
            justify="flex-end"
            direction="row"
            xs={
              isTablet
                ? isMobile
                  ? 8
                  : isTabletLarge
                  ? 4
                  : 8
                : isTabletLarge
                ? 4
                : true
            }>
            {(isTablet || isMobile) && (
              <StyledGrid item>
                <SearchBar />
              </StyledGrid>
            )}
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
            {/* hide wishlist icon since the feature is not available */}
            {/* <StyledGrid item>
              <StyledLink to={ROUTES.WISH_LIST}>
                <StyledButton
                  className="header-actionsButton"
                  variant="text"
                  color="secondary">
                  <StyledHeaderActions>
                    <FavoriteIcon />
                    <StyledTypography variant="body1" component="p">
                      {t("Header.Actions.WishList")}
                    </StyledTypography>
                  </StyledHeaderActions>
                </StyledButton>
              </StyledLink>
            </StyledGrid> */}
            {loggedIn ? (
              <>
                <StyledGrid item>
                  <StyledButton
                    ref={myAccountElRef}
                    variant="text"
                    color="secondary"
                    className="header-accountPopperButton"
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
                      <>
                        <StyledTypography variant="body1" component="p">
                          {firstName
                            ? t("Header.Actions.WelcomeFirstname", {
                                firstName,
                              })
                            : t("Header.Actions.WelcomeNoFirstname", {
                                lastName,
                              })}
                          <br />
                          {t("Header.Actions.YourAccount")}
                          {myAccountPopperOpen ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                        </StyledTypography>
                      </>
                    )}
                  </StyledButton>
                </StyledGrid>
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
              </>
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
                        <StyledTypography variant="body1" component="p">
                          {t("Header.Actions.SignIn")}
                        </StyledTypography>
                      </StyledHeaderActions>
                    </StyledButton>
                  ) : (
                    <StyledButton
                      className="header-actionsButton"
                      variant="text"
                      color="secondary">
                      <StyledHeaderActions>
                        <AccountBoxIcon />
                        <StyledTypography variant="body1" component="p">
                          {t("Header.Actions.SignIn")}
                        </StyledTypography>
                      </StyledHeaderActions>
                    </StyledButton>
                  )}
                </StyledLink>
              </StyledGrid>
            )}
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>

      {!isMobile && <ExpandedMenu pages={topCategories} />}

      <StyledSwipeableDrawer
        anchor={menuDrawerDirection}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        className="header-menu">
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
  );
};

export { Header };
