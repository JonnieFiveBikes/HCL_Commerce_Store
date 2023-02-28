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
import React, { useEffect, useState, useCallback, useMemo } from "react";
import getDisplayName from "react-display-name";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { get } from "lodash-es";
//Foundation libraries
import { SIGNIN, WISH_LIST } from "../../../constants/routes";
import { EMPTY_STRING } from "../../../constants/common";
//Redux
import { loginStatusSelector } from "../../../redux/selectors/user";
import { getWishListSelector, wishListItemMoveSelector } from "../../../redux/selectors/wish-list";
import * as wishListActions from "../../../redux/actions/wish-list";

//UI
import {
  StyledGrid,
  StyledContainer,
  StyledCircularProgress,
  StyledBreadcrumbs,
  StyledTypography,
  StyledLink,
  StyledButton,
  StyledTextField,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
  StyledIconButton,
  StyledPagination,
} from "@hcl-commerce-store-sdk/react-component";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
//Custom libraries
import { useWishList } from "../../../_foundation/hooks/use-wishlist";
import { WishListCard } from "./wishlist-card";
import { useSite } from "../../../_foundation/hooks/useSite";
import storeUtil from "../../../utils/storeUtil";

const ViewWishList: React.FC = () => {
  const loginStatus = useSelector(loginStatusSelector);
  const userWishList = useSelector(getWishListSelector);
  const movementData = useSelector(wishListItemMoveSelector);
  const { t } = useTranslation();
  const {
    deleteWishList,
    getProductsData,
    productsData,
    wishListName,
    handleWishListName,
    validateWishListName,
    canCreateWishList,
    setWishListName,
    deleteWishListItem,
    updateWishListName,
    addToCart,
    pageLimit,
    pageCountTotal,
    setPageCountTotal,
    selectedPage,
    setSelectedPage,
    paginatedList,
    setPaginatedList,
    emptyWishlist,
    deleteWishListMultipleItems,
  } = useWishList();
  const location: any = useLocation();
  const navigate = useNavigate();
  const { mySite } = useSite();
  const defaultCurrencyID = mySite?.defaultCurrencyID ?? EMPTY_STRING;
  const wishListId = get(location, "state.wishListId");
  const [wishList, setWishList] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [selectedLength, setSelectedLength] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [editList, setEditList] = useState<boolean>(false);
  const [localName, setLocalName] = useState<string>("");
  const [wishlistLength, setWishListLength] = useState<number>(0);
  const widgetName = useMemo(() => {
    return getDisplayName("ViewWishList");
  }, []);
  const controller = useMemo(() => {
    return new AbortController();
  }, []);
  useEffect(() => {
    if (userWishList) {
      const newWishListData = userWishList.filter((wL) => wL.uniqueID === wishListId)[0];
      if (newWishListData) {
        setWishList(newWishListData);
        getProductsData(newWishListData);
        setLocalName(newWishListData.description);
      }
    } else {
      dispatch(
        wishListActions.GET_USER_WISHLIST_ACTION({
          widget: widgetName,
          signal: controller.signal,
        })
      );
    }
  }, [userWishList, dispatch, getProductsData, wishListId, widgetName, controller.signal]);

  useEffect(() => {
    setWishListName(localName);
  }, [localName, setWishListName]);

  useEffect(() => {
    if (productsData?.length > 0) {
      const productList = productsData.map((product) => ({
        selected: false,
        __dispPrice: storeUtil.getOfferPrice(product),
        __defCurr: defaultCurrencyID,
        ...product,
      }));
      setProductList(productList);
      setWishListLength(productsData.length);
      setLoading(false);
    } else {
      setProductList([]);
      setPaginatedList([]);
      setWishListLength(0);
    }

    if (emptyWishlist) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsData]);

  const goToPage = useCallback(
    (e, page: number) => {
      const offset = (page - 1) * pageLimit;
      const paginated = productList.slice(offset, offset + pageLimit);
      setSelectedPage(page);
      setPaginatedList(paginated);
    },
    [paginatedList, productList, pageLimit] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(
    () => {
      let numOfPages = 0;
      if (wishlistLength) {
        numOfPages = Math.ceil(wishlistLength / pageLimit);
        const pg = numOfPages <= 1 ? 1 : numOfPages < selectedPage ? numOfPages : selectedPage;
        goToPage(null, pg);
      }
      setPageCountTotal(numOfPages);
    },
    [wishlistLength, productList, pageLimit] //  eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const selectedLength = productList.filter((product) => product.selected === true).length;
    setSelectedLength(selectedLength);
  }, [productList]);

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = useState<boolean>(false);

  const doEdit = useCallback(() => setEditList(true), [setEditList]);
  const openModal = useCallback(() => setOpen(true), [setOpen]);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);

  const deleteList = () => {
    deleteWishList(wishList.uniqueID, wishList.description);
    navigate(WISH_LIST);
  };

  const deleteListItem = (id: any, name: any) => {
    deleteWishListItem(wishList.uniqueID, id, name);
  };

  const deleteMultipleItems = () => {
    const items = productList
      .filter((product) => product.selected === true)
      .map((p) => ({ wishListId: wishList.uniqueID, id: p.giftListItemID, name: p.name }));
    deleteWishListMultipleItems(items);
    closeModal();
  };

  const addMultipleToCart = () => {
    const ofInterest = productList.filter((product) => product.selected);
    addToCart(ofInterest);
  };

  const updateListName = () => {
    updateWishListName(wishList.uniqueID);
    setEditList(false);
    setLocalName(wishListName);
  };

  const cancelEdit = () => {
    setWishListName(localName);
    setEditList(false);
  };

  const toggleProductSelector = useCallback(
    (productId) => {
      const product = productList.filter((p) => p.id === productId)[0];
      product.selected = !product?.selected;
      setProductList([...productList]);
    },
    [productList]
  );

  const deselectAll = useCallback(() => {
    productList.forEach((p) => (p.selected = false));
    setProductList([...productList]);
  }, [productList]);

  const selectAll = useCallback(() => {
    productList.forEach((p) => (p.selected = true));
    setProductList([...productList]);
  }, [productList]);

  const DeleteDialog = () => {
    const deleteMultipleItemsOrWishlist = selectedLength > 1 ? deleteMultipleItems : deleteList;
    const confirmDeleteMsg =
      selectedLength > 1 ? t("WishList.ConfirmDeleteSelectedMsg") : t("WishList.ConfirmDeleteMsg");
    const closeIconForMultipleItem =
      selectedLength > 1 ? (
        <StyledIconButton aria-label="close" onClick={closeModal} data-testid="view-wishlist-close-icon-button">
          <CloseIcon />
        </StyledIconButton>
      ) : null;
    const deleteButton = selectedLength > 1 ? t("WishList.ConfirmDelete") : t("WishList.Confirm");

    return (
      <StyledDialog open={open} onClose={closeModal} aria-labelledby="delete-list-confirm-dialog">
        {selectedLength > 1 ? null : (
          <StyledDialogTitle title={t("WishList.ConfirmDeleteTitle")} onClickHandler={closeModal} />
        )}
        <StyledDialogContent className="bottom-margin-1 left-margin-1 right-margin-1 top-margin-1">
          {confirmDeleteMsg}
          {closeIconForMultipleItem}
          <StyledDialogActions>
            <StyledButton
              testId="view-wishlist-confirm-delete"
              className="confirm-action-button"
              variant="outlined"
              fullWidth
              onClick={deleteMultipleItemsOrWishlist}>
              {deleteButton}
            </StyledButton>

            <StyledButton
              testId="view-wishlist-cancel-delete"
              className="cancel-action-button"
              variant="outlined"
              fullWidth
              onClick={closeModal}>
              {t("WishList.Cancel")}
            </StyledButton>
          </StyledDialogActions>
        </StyledDialogContent>
      </StyledDialog>
    );
  };

  const defaultOptions = (
    <StyledGrid container justifyContent="flex-start" alignItems="stretch" spacing={2} className="bottom-margin-2">
      {productList.length > 0 ? (
        <StyledGrid item>
          <StyledButton testId="view-wishlist-select-all" color="primary" onClick={selectAll}>
            {t("WishList.Actions.SelectAll")}
          </StyledButton>
        </StyledGrid>
      ) : null}
      <StyledGrid item>
        <StyledButton onClick={doEdit} color="secondary" testId="view-wish-list-edit">
          {t("WishList.Actions.EditList")}
        </StyledButton>
      </StyledGrid>
    </StyledGrid>
  );

  const editListOptions = (
    <>
      <StyledGrid container justifyContent="space-between" alignItems="flex-start" className="bottom-margin-2">
        <StyledGrid xs={12} md={8} container alignItems="flex-start" justifyContent="flex-start" spacing={2} item>
          <StyledGrid xs={12} md={6} item>
            <StyledTextField
              data-testid="view-wish-list-wish-list-name"
              fullWidth
              required
              id="update-wish-list-name"
              name="wishListName"
              label={
                <StyledTypography variant="body1" style={{ fontWeight: "bold" }}>
                  {t("WishList.WishListName")}
                </StyledTypography>
              }
              value={wishListName}
              inputProps={{ maxLength: 128 }}
              autoComplete="wishListName"
              onChange={handleWishListName}
              error={validateWishListName(wishListName)}
              helperText={validateWishListName(wishListName) ? t("WishList.InvalidWishListName") : EMPTY_STRING}
            />
          </StyledGrid>
          <StyledGrid container md={6} alignItems="flex-start" justifyContent="flex-start" spacing={2} item>
            <StyledGrid item>
              <StyledButton
                testId="view-wishlist-save"
                disabled={canCreateWishList()}
                onClick={updateListName}
                className="top-margin-4"
                color="primary">
                {t("WishList.Actions.Save")}
              </StyledButton>
            </StyledGrid>
            <StyledGrid item>
              <StyledButton
                onClick={cancelEdit}
                color="secondary"
                className="top-margin-4"
                testId="view-wishlist-cancel">
                {t("WishList.Cancel")}
              </StyledButton>
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            onClick={openModal}
            testId="view-wishlist-delete"
            className="top-margin-4 confirm-action-button"
            color="secondary">
            {t("WishList.Actions.DeleteList")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
      <DeleteDialog />
    </>
  );

  const selectedProductsOptions = (
    <>
      <StyledPaper className="bottom-margin-2 horizontal-padding-2 vertical-padding-2">
        <StyledGrid container direction="row" alignItems="center">
          <StyledGrid container item xs={6} alignItems="center">
            <StyledIconButton color="primary" onClick={deselectAll} data-testid="view-wishlist-cancel-icon-button">
              <CancelIcon style={{ display: "flex", alignItems: "center" }} />
            </StyledIconButton>
            <StyledTypography style={{ marginLeft: "0.25rem" }} variant="h4" component="p">
              {t("WishList.ProductSelected", { n: selectedLength })}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid container xs spacing={2} justifyContent="flex-end" item>
            <StyledGrid item>
              <StyledButton color="primary" onClick={addMultipleToCart} testId="view-wishlist-add-to-cart">
                {t("WishList.Actions.AddSelectedToCart")}
              </StyledButton>
            </StyledGrid>
            <StyledGrid item>
              <StyledButton color="secondary" onClick={openModal} testId="view-wishlist-deleted">
                {t("WishList.Actions.DeletedSelected")}
              </StyledButton>
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </StyledPaper>
      <DeleteDialog />
    </>
  );

  useEffect(() => {
    if (movementData) {
      const { products } = movementData;
      const ofInterest = products.map(({ giftListItemID, name }) => ({
        wishListId: wishList.uniqueID,
        id: giftListItemID,
        name,
      }));
      deleteWishListMultipleItems(ofInterest, false);
      dispatch(wishListActions.WISHLIST_MOVE_ITEMS_RESET_ACTION(null));
    }
  }, [movementData]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!loginStatus) {
    return <Navigate replace to={SIGNIN} />;
  } else {
    return loading ? (
      <StyledCircularProgress />
    ) : (
      <StyledContainer cid="wish-list-view">
        <StyledBreadcrumbs>
          <StyledLink to={WISH_LIST}>
            <StyledTypography variant="h4">{t("WishList.Title")}</StyledTypography>
          </StyledLink>
          <span>
            <StyledTypography variant="h4" className="wrapText">
              {localName}
            </StyledTypography>
          </span>
        </StyledBreadcrumbs>
        <Divider className="bottom-margin-4" />
        {selectedLength > 1 ? selectedProductsOptions : editList ? editListOptions : defaultOptions}
        <StyledGrid container spacing={2}>
          {paginatedList?.length > 0 ? (
            <>
              {paginatedList.map((product) => (
                <StyledGrid item xs={12} sm={6} md={3} key={product.partNumber}>
                  <WishListCard
                    product={product}
                    toggleProductSelector={toggleProductSelector}
                    selectedLength={selectedLength}
                    deleteListItem={deleteListItem}
                    addToCart={addToCart}
                  />
                </StyledGrid>
              ))}
            </>
          ) : (
            <StyledTypography>{t("WishList.EmptyWishListMsg")}</StyledTypography>
          )}
        </StyledGrid>
        <StyledGrid>
          {pageCountTotal > 1 ? (
            <StyledPagination count={pageCountTotal} shape="rounded" page={selectedPage} onChange={goToPage} />
          ) : null}
        </StyledGrid>
      </StyledContainer>
    );
  }
};

export default ViewWishList;
