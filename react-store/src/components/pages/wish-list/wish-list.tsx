/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import React, { useCallback, useEffect, useState, useMemo } from "react";
import Axios, { Canceler } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import getDisplayName from "react-display-name";
//Foundation libraries
import { SIGNIN } from "../../../constants/routes";
//Redux
import { loginStatusSelector } from "../../../redux/selectors/user";
import { getWishListSelector } from "../../../redux/selectors/wish-list";
import * as wishListActions from "../../../redux/actions/wish-list";
//UI
import {
  StyledGrid,
  StyledTypography,
  StyledContainer,
  StyledPagination,
} from "@hcl-commerce-store-sdk/react-component";
//Custom libraries
import AccountSidebar from "../../widgets/account-sidebar/AccountSidebar";
import { TitleLayout } from "../../widgets/title/TitleLayout";
import DisplayWishList from "./display-wish-list";
import CreateWishList from "./create-wish-list";
import { useWishList } from "../../../_foundation/hooks/use-wishlist";
import { useSite } from "../../../_foundation/hooks/useSite";

const cancels: Canceler[] = [];
const WishList: React.FC = () => {
  const loginStatus = useSelector(loginStatusSelector);
  const { t } = useTranslation();
  const userWishList: any[] = useSelector(getWishListSelector);
  const dispatch = useDispatch();
  const { mySite } = useSite();
  const [listSize, setListSize] = useState<number>(userWishList?.length ?? 0);
  const widgetName = useMemo(() => {
    return getDisplayName("WishList");
  }, []);
  const CancelToken = useMemo(() => {
    return Axios.CancelToken;
  }, []);
  const {
    pageLimit,
    pageCountTotal,
    setPageCountTotal,
    selectedPage,
    setSelectedPage,
    paginatedList,
    setPaginatedList,
  } = useWishList();

  useEffect(() => {
    if (mySite && !userWishList) {
      dispatch(
        wishListActions.GET_USER_WISHLIST_ACTION({
          widget: widgetName,
          cancelToken: new CancelToken((c) => cancels.push(c)),
        })
      );
    }
  }, [mySite, dispatch, userWishList, CancelToken, widgetName]);

  useEffect(() => {
    const len = userWishList?.length ?? 0;
    let numOfPages = 0;

    if (userWishList) {
      numOfPages = Math.ceil(len / pageLimit);
      const pg = numOfPages <= 1 ? 1 : listSize < len || numOfPages < selectedPage ? numOfPages : selectedPage;
      goToPage(null, pg);
    }

    setListSize(len);
    setPageCountTotal(numOfPages);
  }, [userWishList, pageLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToPage = useCallback(
    (e, page: number) => {
      const offset = (page - 1) * pageLimit;
      const paginated = userWishList.slice(offset, offset + pageLimit);
      setSelectedPage(page);
      setPaginatedList(paginated);
    },
    [paginatedList, userWishList] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    return () => {
      cancels.splice(0).forEach((cancel: Canceler) => {
        cancel();
      });
    };
  }, []);

  if (!loginStatus) {
    return <Navigate replace to={SIGNIN} />;
  } else {
    return (
      <StyledContainer cid="wish-list-view">
        <TitleLayout title={t("WishList.Title")} cid="wish-list-view-title" />
        <StyledGrid container spacing={3}>
          <StyledGrid item xs={12} md={3} className="sidebar">
            <AccountSidebar />
          </StyledGrid>
          <StyledGrid item xs={12} md={9}>
            <StyledGrid container spacing={4}>
              <StyledGrid item xs={12}>
                <CreateWishList />
              </StyledGrid>
              <StyledGrid item xs={12}>
                {userWishList?.length > 0 ? (
                  <StyledGrid container spacing={2} alignItems="stretch">
                    {paginatedList.map((wishList) => (
                      <StyledGrid item xs={12} sm={6} key={wishList.uniqueID}>
                        <DisplayWishList wishList={wishList} />
                      </StyledGrid>
                    ))}
                  </StyledGrid>
                ) : (
                  <StyledTypography variant="body2">{t("WishList.NoWishListMessage")}</StyledTypography>
                )}
              </StyledGrid>
              {pageCountTotal > 1 ? (
                <StyledPagination count={pageCountTotal} shape="rounded" page={selectedPage} onChange={goToPage} />
              ) : null}
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    );
  }
};

export default WishList;
