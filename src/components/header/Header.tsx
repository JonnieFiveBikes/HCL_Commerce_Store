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
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import categoryService from "../../_foundation/apis/search/categories.service";
//Custom libraries
import { headerConfig } from "./headerConstant";
import { TOP_CATEGORIES_DEPTH_LIMIT } from "../../configs/catalog";
import * as ROUTES from "../../constants/routes";
import { ContentRecommendationLayout } from "../widgets/content-recommendation";
import MiniCart from "./MiniCart";
import MegaMenu from "./MegaMenu";
import { SearchBar } from "../widgets/search-bar";
import AccountPopoverContent from "./AccountPopoverContent";
//Redux
import { SiteInfo } from "../../redux/reducers/reducerStateInterface";
import { userNameSelector } from "../../redux/selectors/user";
import { ORG_SWITCH_ACTION } from "../../redux/actions/organization";
import { CONTRACT_SWITCH_ACTION } from "../../redux/actions/contract";
import { LOGOUT_REQUESTED_ACTION } from "../../redux/actions/user";
import { currentContractIdSelector } from "../../redux/selectors/contract";
//UI
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import {
  StyledAccountPopover,
  StyledButton,
  StyledContainer,
  StyledHeader,
  StyledHeaderIcon,
  StyledTypography,
  StyledSwipeableDrawer,
  StyledGrid,
  StyledLink,
} from "../StyledUI";

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
  const [
    myAccountAnchorEl,
    setMyAccountAnchorEl,
  ] = useState<HTMLButtonElement | null>(null);
  const mySite: SiteInfo = useSite();
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { firstName, lastName } = useSelector(userNameSelector);
  const contractId = useSelector(currentContractIdSelector);
  const isB2B = Boolean(mySite?.isB2B);
  const loggedIn = props.loggedIn;
  const isShoppingEnabled = !isB2B || (isB2B && loggedIn);
  const menuDrawerDirection = useMediaQuery(theme.breakpoints.up("sm"))
    ? "top"
    : "left";

  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));

  const myAccountPopoverId = "HEADER_MY_ACCOUNT_POPOVER";

  const handleMyAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMyAccountAnchorEl(event.currentTarget);
  };

  const handleMyAccountPopoverClose = () => {
    setMyAccountAnchorEl(null);
  };

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
    setMyAccountAnchorEl(null);
    history.push(ROUTES.HOME);
  };

  const myAccountPopoverOpen =
    myAccountAnchorEl !== null && myAccountAnchorEl !== undefined;

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

  return (
    <StyledHeader>
      <StyledContainer>
        <StyledGrid
          container
          className="header-container"
          justify="space-between"
          key={menuDrawerDirection}>
          <StyledGrid item className="header-navigation">
            <button className="menu-hamburger" onClick={() => setOpen(!open)}>
              <MenuIcon />
            </button>
            {mySite != null && (
              <div className="header-branding">
                <ContentRecommendationLayout
                  cid="header"
                  eSpot={headerConfig.espot}
                  page={headerConfig.page}></ContentRecommendationLayout>
              </div>
            )}
          </StyledGrid>
          <StyledGrid item className="header-links">
            <SearchBar />
            {isShoppingEnabled && <MiniCart />}
            {loggedIn ? (
              <>
                <StyledButton
                  variant="text"
                  color="secondary"
                  className="header-accountPopoverButton"
                  onClick={handleMyAccountClick}>
                  {isMobile ? (
                    <StyledHeaderIcon />
                  ) : (
                    t("Header.Actions.Welcome", { firstName })
                  )}
                </StyledButton>
                <StyledAccountPopover
                  id={myAccountPopoverId}
                  open={myAccountPopoverOpen}
                  anchorEl={myAccountAnchorEl}
                  onClose={handleMyAccountPopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}>
                  <StyledTypography variant="body1" component="div">
                    <AccountPopoverContent
                      handleClose={handleMyAccountPopoverClose}
                      handleOrgChange={handleOrgChange}
                      handleContractChange={handleContractChange}
                      handleLogout={handleLogout}
                      isB2B={isB2B}
                      userName={{ firstName, lastName }}
                    />
                  </StyledTypography>
                </StyledAccountPopover>
              </>
            ) : (
              <StyledLink to={ROUTES.SIGNIN}>
                {isMobile ? (
                  <StyledHeaderIcon />
                ) : (
                  <span>{t("Header.Actions.SignInRegister")}</span>
                )}
              </StyledLink>
            )}
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
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
