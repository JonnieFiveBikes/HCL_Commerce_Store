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
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Redux
import wishListService from "../../_foundation/apis/transaction/wishList.service";
import * as successActions from "../../redux/actions/success";
import { getWishListSelector } from "../../redux/selectors/wish-list";
import * as wishListActions from "../../redux/actions/wish-list";
import productsService from "../../_foundation/apis/search/products.service";
//Custom libraries
import { EMPTY_STRING, REG_EX } from "../../constants/common";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import * as orderActions from "../../redux/actions/order";
import { GET_USER_WISHLIST_ACTION } from "../../redux/actions/wish-list";

const cancels: Canceler[] = [];
const CancelToken = Axios.CancelToken;

export const useWishList = () => {
  const [wishListName, setWishListName] = useState<string>(EMPTY_STRING);
  const dispatch = useDispatch();
  const userWishList = useSelector(getWishListSelector);
  const contract = useSelector(currentContractIdSelector);
  const handleWishListName = (event) => setWishListName(event.target.value);
  const widget = useMemo(() => getDisplayName("useWishList"), []);

  const pageLimit: number = 4;
  const [pageCountTotal, setPageCountTotal] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [paginatedList, setPaginatedList] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);
  const [emptyWishlist, setEmptyWishlist] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const validateWishListName = useCallback((wishListName: any) => {
    const WISHLISTNAME_ALPHA_NUMERIC_SPECIAL_CHAR = REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR;
    if (wishListName.length > 0 && wishListName.trim() === EMPTY_STRING) return true;
    if (!WISHLISTNAME_ALPHA_NUMERIC_SPECIAL_CHAR.test(wishListName)) {
      return true;
    }
    return false;
  }, []);

  const canCreateWishList = () => {
    if (wishListName.trim() === EMPTY_STRING || wishListName.length === 0 || validateWishListName(wishListName)) {
      return true;
    }
    return false;
  };

  const createWishList = useCallback(async () => {
    const params = {
      body: {
        description: wishListName.trim(),
        registry: false,
      },
      widget,
      cancelToken: new CancelToken((c) => cancels.push(c)),
    };
    try {
      const res = await wishListService.createWishlist(params);
      if (res?.data?.uniqueID) {
        dispatch(
          wishListActions.GET_USER_WISHLIST_ACTION({
            widget,
            cancelToken: new CancelToken((c) => cancels.push(c)),
          })
        );
        const successMessage = {
          key: "success-message.CREATE_WISHLIST_SUCCESS",
          messageParameters: { "0": wishListName.trim() },
        };
        dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
        setWishListName(EMPTY_STRING);
        toggleExpand();
      }
    } catch (error) {
      console.log("Error in creating wish list", error);
    }
  }, [wishListName, dispatch, widget]);

  const updateWishListName = useCallback(
    async (wishListId: string) => {
      const params = {
        externalId: wishListId,
        body: {
          description: wishListName.trim(),
        },
        widget,
        cancelToken: new CancelToken((c) => cancels.push(c)),
      };
      try {
        const res = await wishListService.updateWishlist(params);
        if (res?.data?.uniqueID) {
          const successMessage = {
            key: "success-message.UPDATE_WISHLIST_NAME_SUCCESS",
            messageParameters: { "0": wishListName.trim() },
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
          dispatch(
            wishListActions.GET_USER_WISHLIST_ACTION({
              widget,
              cancelToken: new CancelToken((c) => cancels.push(c)),
            })
          );
        }
      } catch (error) {
        console.log("Error in updating wish list name", error);
      }
    },
    [dispatch, wishListName, widget]
  );

  const getProductsData = useCallback(
    async (wishList: any) => {
      const partNumber: string[] = [];
      if (wishList.item) {
        for (const product of wishList.item) {
          if (product.partNumber) partNumber.push(product.partNumber);
        }
      }
      if (partNumber.length > 0) {
        const requestParameters = {
          partNumber,
          widget,
          cancelToken: new CancelToken((c) => cancels.push(c)),
        };
        try {
          const res = await productsService.findProductsUsingGET(requestParameters);
          const products = res?.data?.contents;
          if (products) {
            setProductsData(
              products.map((p) => {
                const _item = wishList.item.find((i) => i.partNumber === p.partNumber) ?? {};
                return { ..._item, ...p };
              })
            );
          }
        } catch (error) {
          console.log("Error in getting product details", error);
        }
      } else {
        setProductsData([]);
        setEmptyWishlist(true);
      }
    },
    [widget]
  );

  const deleteWishList = useCallback(
    (wishListId: string, wishListName: string) => {
      const parameters: any = {
        externalId: wishListId,
        wishListName,
        length: userWishList.length,
        widget,
        cancelToken: new CancelToken((c) => cancels.push(c)),
      };

      dispatch(wishListActions.WISHLIST_DELETE_ACTION({ ...parameters }));
    },
    [userWishList, dispatch, widget]
  );

  const deleteWishListItem = useCallback(
    (wishListId: string, id: string, name: string, showSnackbarMsg: boolean = true) => {
      const parameters: any = {
        externalId: wishListId,
        itemId: id,
        productName: name,
        widget,
        deleteMsgSnackbar: showSnackbarMsg,
        cancelToken: new CancelToken((c) => cancels.push(c)),
      };

      dispatch(wishListActions.WISHLIST_DELETE_ITEM_ACTION({ ...parameters }));
    },
    [dispatch, widget]
  );

  const deleteWishListMultipleItems = useCallback(
    async (items: Array<any>, showSnackbarMsg: boolean = true) => {
      const deletingArray: Promise<any>[] = [];
      items.forEach(({ wishListId: externalId, id: itemId, name: productName }) => {
        const payload = {
          externalId,
          itemId,
          productName,
          widget,
          cancelToken: new CancelToken((c) => cancels.push(c)),
        };
        deletingArray.push(wishListService.deleteWishlist(payload));
      });
      try {
        await Promise.all(deletingArray);
        if (showSnackbarMsg) {
          const msg = {
            key: "success-message.DELETE_WISHLIST_ITEMS_SUCCESS",
            messageParameters: { "0": items.length.toString() },
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(msg));
        }
        dispatch(GET_USER_WISHLIST_ACTION({ widget, cancelToken: new CancelToken((c) => cancels.push(c)) }));
      } catch (e) {
        console.log("Encountered an error deleting items from wish-list", e);
      }
    },
    [dispatch, widget]
  );

  const addToCart = useCallback(
    (products) => {
      const param = {
        fromWishList: true,
        products,
        partnumber: products.map(({ partNumber }) => partNumber),
        quantity: products.map((v) => "1"),
        contractId: contract,
        widget,
        cancelToken: new CancelToken((c) => cancels.push(c)),
      };
      dispatch(orderActions.ADD_ITEM_ACTION(param));
    },
    [contract, dispatch, widget]
  );

  useEffect(() => {
    return () => {
      cancels.splice(0).forEach((cancel: Canceler) => {
        cancel();
      });
    };
  }, []);

  return {
    wishListName,
    handleWishListName,
    validateWishListName,
    canCreateWishList,
    createWishList,
    deleteWishList,
    getProductsData,
    productsData,
    addToCart,
    setWishListName,
    updateWishListName,
    deleteWishListItem,
    pageLimit,
    pageCountTotal,
    setPageCountTotal,
    selectedPage,
    setSelectedPage,
    setPaginatedList,
    paginatedList,
    emptyWishlist,
    deleteWishListMultipleItems,
    isExpanded,
    toggleExpand,
  };
};
