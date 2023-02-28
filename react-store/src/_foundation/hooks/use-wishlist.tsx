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
import getDisplayName from "react-display-name";
//Redux
import wishListService from "../../_foundation/apis/transaction/wishList.service";
import ivSvc from "../../_foundation/apis/transaction/inventoryavailability.service";

import * as successActions from "../../redux/actions/success";
import { getWishListSelector } from "../../redux/selectors/wish-list";
import * as wishListActions from "../../redux/actions/wish-list";
import productsService from "../../_foundation/apis/search/products.service";
//Custom libraries
import { AVAILABLE_KEY, EMPTY_STRING, REG_EX } from "../../constants/common";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import * as orderActions from "../../redux/actions/order";
import { GET_USER_WISHLIST_ACTION } from "../../redux/actions/wish-list";
import { useStoreLocatorValue } from "../context/store-locator-context";
import { useSite } from "./useSite";
import { get } from "lodash-es";
import storeUtil from "../../utils/storeUtil";
import { useStoreShippingModeValue } from "../context/store-shipping-mode-context";
import { SHIPMODE } from "../../constants/order";

export const useWishList = () => {
  const controller = useMemo(() => {
    return new AbortController();
  }, []);
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
  const { mySite } = useSite();

  const storeId = mySite?.storeID ?? EMPTY_STRING;
  const { storeLocator } = useStoreLocatorValue();
  const { storeShippingMode } = useStoreShippingModeValue();
  const selectedStore = useMemo(() => storeLocator.selectedStore, [storeLocator]);
  const [ivData, setIvData] = useState<any>({});

  /**
   * Helper method to get inventory details using partNumbers and sellerIds
   * Stores the availabilty data in inventoryMap.
   * @param partsAndSellers array of objects container partNumber and sellerId attrs
   */
  const getInventory = useCallback(
    async (partsAndSellers: any[]) => {
      const partNumbers = partsAndSellers.map(({ partNumber }) => partNumber);
      const sellerId = partsAndSellers.map(({ sellerId }) => sellerId);
      const p2s = storeUtil.toMap(partsAndSellers, "partNumber");
      const _p: Promise<any>[] = [];
      const iv = {};

      // fetch online store iv
      let params: any = { signal: controller.signal, storeId, partNumbers, sellerId };
      _p.push(ivSvc.getInventoryAvailabilityByPartNumber(params));

      // if a store has been selected, get physical iv as well
      if (selectedStore?.physicalStoreName) {
        const { physicalStoreName } = selectedStore;
        params = { signal: controller.signal, storeId, partNumbers, physicalStoreName };
        _p.push(ivSvc.getInventoryAvailabilityByPartNumber(params));
      }

      try {
        const _res = await Promise.all(_p);

        // online or seller
        get(_res, "[0].data.InventoryAvailability", []).forEach(
          ({ inventoryStatus: s, partNumber, availableQuantity: quantity, onlineStoreId, x_sellerId }) => {
            if (s === AVAILABLE_KEY && (onlineStoreId || x_sellerId === p2s[partNumber].sellerId)) {
              const invId = `${x_sellerId}_${partNumber}`;
              iv[invId] = { quantity, available: true };
            }
          }
        );

        // physical store
        get(_res, "[1].data.InventoryAvailability", []).forEach(
          ({ inventoryStatus: s, partNumber, availableQuantity: quantity, physicalStoreId }) => {
            if (physicalStoreId === selectedStore.id && s === AVAILABLE_KEY) {
              const invId = `${physicalStoreId}_${partNumber}`;
              iv[invId] = { quantity, available: true, storeName: selectedStore.storeName };
            }
          }
        );
      } catch (e) {
        console.log("Could not retrieve Inventory Details", e);
      }

      return iv;
    },
    [selectedStore, storeId, controller]
  );

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
  const userDefaultWishList = () => {
    const DEFAULT_WISHLIST = "Default Wishlist";
    const params = {
      body: {
        description: DEFAULT_WISHLIST,
        registry: false,
      },
      widget,
    };
    try {
      wishListService.createWishlist(params);
    } catch (error) {
      console.log("Error in creating default wish list", error);
    }
  };

  const createWishList = useCallback(async () => {
    const params = {
      body: {
        description: wishListName.trim(),
        registry: false,
      },
      widget,
      signal: controller.signal,
    };
    try {
      const res = await wishListService.createWishlist(params);
      if (res?.data?.uniqueID) {
        dispatch(
          wishListActions.GET_USER_WISHLIST_ACTION({
            widget,
            signal: controller.signal,
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
  }, [wishListName, widget, controller.signal, dispatch]);

  const updateWishListName = useCallback(
    async (wishListId: string) => {
      const params = {
        externalId: wishListId,
        body: {
          description: wishListName.trim(),
        },
        widget,
        signal: controller.signal,
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
              signal: controller.signal,
            })
          );
        }
      } catch (error) {
        console.log("Error in updating wish list name", error);
      }
    },
    [wishListName, widget, controller.signal, dispatch]
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
          signal: controller.signal,
        };
        try {
          const res = await productsService.findProductsUsingGET(requestParameters);
          const products = res?.data?.contents;
          if (products) {
            const pnSeller = products.map(({ partNumber, sellerId }) => ({ partNumber, sellerId }));
            const iv = await getInventory(pnSeller);
            setIvData(iv);
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
    [controller.signal, widget, getInventory]
  );

  const deleteWishList = useCallback(
    (wishListId: string, wishListName: string) => {
      const parameters: any = {
        externalId: wishListId,
        wishListName,
        length: userWishList.length,
        widget,
        signal: controller.signal,
      };

      dispatch(wishListActions.WISHLIST_DELETE_ACTION({ ...parameters }));
    },
    [userWishList, widget, controller.signal, dispatch]
  );

  const deleteWishListItem = useCallback(
    (wishListId: string, id: string, name: string, showSnackbarMsg: boolean = true) => {
      const parameters: any = {
        externalId: wishListId,
        itemId: id,
        productName: name,
        widget,
        deleteMsgSnackbar: showSnackbarMsg,
        signal: controller.signal,
      };

      dispatch(wishListActions.WISHLIST_DELETE_ITEM_ACTION({ ...parameters }));
    },
    [controller.signal, dispatch, widget]
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
          signal: controller.signal,
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
        dispatch(GET_USER_WISHLIST_ACTION({ widget, signal: controller.signal }));
      } catch (e) {
        console.log("Encountered an error deleting items from wish-list", e);
      }
    },
    [controller.signal, dispatch, widget]
  );

  const addToCart = useCallback(
    (products) => {
      const param: any = { fromWishList: true, contractId: contract, widget, signal: controller.signal };
      const { shipModeId: modeId } =
        storeShippingMode.find((m) => m.shipModeCode === SHIPMODE.shipModeCode.PickUp) ?? {};
      const shipModeId: any[] = [];
      const physicalStoreId: any[] = [];

      products.forEach((p) => {
        const online =
          !selectedStore ||
          ivData[`${p.sellerId}_${p.partNumber}`]?.available ||
          !ivData[`${selectedStore.id}_${p.partNumber}`]?.available;
        shipModeId.push(online ? null : modeId);
        physicalStoreId.push(online ? null : selectedStore.id);
      });

      Object.assign(param, {
        products,
        partnumber: products.map(({ partNumber }) => partNumber),
        quantity: products.map((v) => "1"),
        shipModeId,
        physicalStoreId,
      });
      dispatch(orderActions.ADD_ITEM_ACTION(param));
    },
    [contract, controller.signal, dispatch, widget, ivData, selectedStore, storeShippingMode]
  );

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    userDefaultWishList,
  };
};
