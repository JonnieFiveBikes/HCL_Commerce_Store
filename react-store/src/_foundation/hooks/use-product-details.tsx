/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *---------------------------------------------------
 */
//Standard libraries
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import getDisplayName from "react-display-name";
//Foundation libraries
import inventoryavailabilityService from "../../_foundation/apis/transaction/inventoryavailability.service";
import associatedPromotionCodeService from "../../_foundation/apis/transaction/associatedPromotionCode.service";
import productsService from "../../_foundation/apis/search/products.service";
import { useSite } from "../../_foundation/hooks/useSite";
//Custom libraries
import { OFFER, DISPLAY, DEFINING, DESCRIPTIVE, STRING_TRUE, EMPTY_STRING } from "../../constants/common";
import { ATTR_IDENTIFIER } from "../../constants/catalog";
import { SIGNIN } from "../../constants/routes";
import { PRIVATE_ORDER_TYPE } from "../../constants/order";

import StoreUtil from "../../utils/storeUtil";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { breadcrumbsSelector } from "../../redux/selectors/catalog";
import { GetCategoriesSelector } from "../../redux/selectors/category";
import * as orderActions from "../../redux/actions/order";
import { cartSelector } from "../../redux/selectors/order";
import { loginStatusSelector } from "../../redux/selectors/user";
import * as catalogActions from "../../redux/actions/catalog";
import FormattedPriceDisplay from "../../components/widgets/formatted-price-display";
//UI
import { AttachmentLayout, StyledTypography, ITabs } from "@hcl-commerce-store-sdk/react-component";
//GA360
import AsyncCall from "../../_foundation/gtm/async.service";
import { Page, WidgetProps } from "../constants/seo-config";
import { useProductValue } from "../context/product-context";
import { get, isEqual } from "lodash-es";
import { SellerLink } from "../../components/widgets/seller-link";
import rlSvc from "../apis/transaction/requisitionList.service";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../redux/actions/success";
import { AddToRequisitionListButton } from "../../components/widgets/add-to-req-list-button";
import storeUtil from "../../utils/storeUtil";

interface CurrentSelectionType {
  sku: any;
  quantity: number;
  selectedAttributes: any;
  index: number;
}

/**
 * Product Display component
 * displays product defining atrributes, descriptive atrributes, availability, promotions etc.
 * @param page
 */
const useProductDetails = (page: Page) => {
  const widgetName = getDisplayName("ProductDetailsWidget");

  const { getMerchandisingAssociationDetails, fetchProductDetails, products } = useProductValue();
  const location: any = useLocation();
  const productPartNumber = page.externalContext.identifier;
  const { mySite } = useSite();
  const storeId: string = mySite ? mySite.storeID : "";
  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  const ONLINE_STORE_KEY: string = "Online";
  const AVAILABLE_KEY: string = "Available";
  const cancels: Canceler[] = useMemo<Canceler[]>(() => [], []);
  const CancelToken = Axios.CancelToken;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loginStatus = useSelector(loginStatusSelector);
  const isB2B = mySite?.isB2B;
  const cart = useSelector(cartSelector);
  const isSharedOrder = !cart ? false : cart.orderTypeCode === PRIVATE_ORDER_TYPE ? false : true;

  const [promotion, setPromotion] = useState<Array<any>>([]);
  const [inventoryAvailableFlag, setInventoryAvailableFlag] = useState<boolean>(true);
  const [buyableFlag, setBuyableFlag] = useState<boolean>(true);

  const CURRENT_SELECTION_INIT: CurrentSelectionType = {
    sku: {},
    quantity: 1,
    selectedAttributes: {},
    index: 0,
  };

  const [product, setProduct] = useState<any>(null);

  const [currentSelection, setCurrentSelection] = useState<CurrentSelectionType>(CURRENT_SELECTION_INIT);

  const [displayName, setDisplayName] = useState<string>("");
  const [displayPartNumber, setDisplayPartNumber] = useState<string>(productPartNumber);
  const [displayShortDesc, setDisplayShortDesc] = useState<string>("");
  const [displayOfferPrice, setDisplayOfferPrice] = useState<number>(0);
  const [displayListPrice, setDisplayListPrice] = useState<number>(0);
  const [displayFullImage, setDisplayFullImage] = useState<string>("");
  const [displayLongDesc, setDisplayLongDesc] = useState<string>("");
  const [displayDescriptiveAttrList, setDisplayDescriptiveAttrList] = useState<any[]>([]);

  const [definingAttrList, setDefiningAttrList] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [attachmentsList, setAttachmentsList] = useState<any[]>([]);
  const contract = useSelector(currentContractIdSelector);
  const topCategoriesList = useSelector(GetCategoriesSelector);

  const [showCarousel, setShowCarousel] = React.useState<boolean>(false);
  const [carouselImages, setCarouselImages] = React.useState<any[]>([]);

  const [skuColor, setSkuColor] = React.useState<string>("");
  const [index, setIndex] = React.useState<number>(0);
  const [sellerAttr, setSellerAttr] = React.useState<any>(null);
  const [seller, setSeller] = useState<any>(null);

  const payloadBase: any = {
    storeId: storeId,
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const [addItemActionTriggered, setAddItemActionTriggered] = useState<boolean>(false);
  const translation = {
    productDetailDescription: t("productDetail.Description"),
    productDetailProductDetails: t("productDetail.ProductDetails"),
    productDetailAttachments: t("productDetail.Attachments"),
    productDetailSKU: t("productDetail.SKU"),
    productDetailQuantity: t("productDetail.Quantity"),
    productDetailAvailability: t("productDetail.Availability"),
    productDetailAddToCart: t("productDetail.AddToCart"),
    productDetailaddToCurrentOrder: t("productDetail.addToCurrentOrder"),
    productDetailaddToSharedOrder: t("productDetail.addToSharedOrder"),
    productDetailSignIn: t("productDetail.SignIn"),
    CommerceEnvironmentinventoryStatusAvailable: t("CommerceEnvironment.inventoryStatus.Available"),
    CommerceEnvironmentinventoryStatusOOS: t("CommerceEnvironment.inventoryStatus.OOS"),
  };

  const attrsAsMap = useCallback((attrs: any[]) => {
    const rc = {};
    attrs?.filter(({ usage: u }) => u === DEFINING).forEach((a) => (rc[a.identifier] = get(a, "values[0].identifier")));
    return rc;
  }, []);
  const makeSkusAsAttrs = useCallback((skus: any[]) => skus.map((s) => attrsAsMap(s.attributes)), [attrsAsMap]);

  /**
   * Get product information based on its type
   */
  const getProduct = (catentry: any) => {
    if (catentry) {
      if (catentry.type === "product" || catentry.type === "variant") {
        setProduct(catentry);
        initializeProduct(catentry);
        getAssociatedPromotions(catentry);
      } else if (catentry.type === "item" && catentry.parentCatalogEntryID) {
        const productsId: string[] = [];
        productsId.push(catentry.parentCatalogEntryID);
        const parameters: any = {
          ...payloadBase,
          id: productsId,
          contractId: contract,
        };
        productsService
          .findProductsUsingGET(parameters)
          .then((res) => {
            if (res.data.contents && res.data.contents.length > 0) {
              initializeProduct(res.data.contents[0], catentry.attributes);
              getAssociatedPromotions(res.data.contents[0]);
              setProduct(res.data.contents[0]);
            }
          })
          .catch((e) => {
            console.log("could not retreive the parent product details", e);
          });
      } else if (catentry.type === "item" && !catentry.parentCatalogEntryID) {
        setProduct(catentry);
        initializeProduct(catentry);
        getAssociatedPromotions(catentry);
      }
    }
  };

  /**
   * Get associated promotions for the product
   */
  const getAssociatedPromotions = (productInfo) => {
    if (productInfo) {
      let promotion: any[] = [];
      const parameters: any = {
        ...payloadBase,
        q: "byProduct",
        qProductId: productInfo.id,
      };
      associatedPromotionCodeService
        .findPromotionsByProduct(parameters)
        .then((res) => {
          if (res.data.associatedPromotions) {
            for (const promo of res.data.associatedPromotions) {
              if (promo.description) promotion = promo.description.shortDescription;
            }
            setPromotion(promotion);
          }
        })
        .catch((e) => {
          console.log("Could not retrieve product associated promotion details", e);
        });
    }
  };

  /**
   * Set the display information on the page using the specified catentry data
   * @param catentry Catentry info to use for display; either item/product/variant
   * @param productInfo Product data to fall back to if needed
   */
  const setDisplayInfo = (catentry: any, productInfo?: any) => {
    if (catentry) {
      if (catentry.name) {
        setDisplayName(catentry.name);
      } else {
        setDisplayName("");
      }

      if (catentry.partNumber) {
        setDisplayPartNumber(catentry.partNumber);
      } else {
        setDisplayPartNumber("");
      }

      if (catentry.shortDescription) {
        setDisplayShortDesc(catentry.shortDescription);
      } else {
        setDisplayShortDesc("");
      }

      if (catentry.price?.length > 0) {
        setDisplayPrices(catentry.price);
      } else {
        setDisplayPrices([]);
      }

      const _atts = catentry.attributes?.length
        ? catentry.attributes
        : productInfo?.attributes?.length
        ? productInfo?.attributes
        : [];
      getDescriptiveAttributes(_atts);

      if (!mySite.isB2B && catentry.seller) {
        setSellerAttr({ name: catentry.seller, id: catentry.sellerId });
      }

      if (catentry.longDescription) {
        setDisplayLongDesc(catentry.longDescription);
      } else if (productInfo?.longDescription) {
        //Fallback to product's long description
        setDisplayLongDesc(productInfo.longDescription);
      } else {
        setDisplayLongDesc("");
      }

      if (catentry.fullImage) {
        setDisplayFullImage(catentry.fullImage);
      } else {
        setDisplayFullImage("");
      }
      /**
       * This behavior for attachment is:
       * Product level attachments will be pushed down to its underlying SKUs which do not have its own attachment
       * SKUs can have its own attachment override and Search can also index those SKU level attachment overrides, instead of inheriting from the product
       * however,  these SKU level attachment overrides will not be "rolled" back up to the product level
       */
      if (catentry.attachments?.length > 0) {
        setAttachmentsList(catentry.attachments);
      } else if (productInfo?.attachments?.length > 0) {
        //Fallback to product's attachments, this may not needed.
        setAttachmentsList(productInfo.attachments);
      } else {
        setAttachmentsList([]);
      }
    }
  };

  /**
   * Get product details based upon the available attributes
   * @param productInfo
   * @param attr
   */
  const initializeProduct = (productInfo: any, attr?: any) => {
    const newSelection = { ...CURRENT_SELECTION_INIT };
    if (productInfo) {
      setDisplayInfo(productInfo);
      getDefiningAttributes(productInfo.attributes);
      let items;
      if (productInfo.items?.length > 0) {
        items = productInfo.items;
      } else {
        items = [productInfo];
      }
      const firstSkuWithAttrs = items.find(({ attributes: a }) => a) ?? productInfo;
      newSelection.sku = [];

      if (firstSkuWithAttrs) {
        newSelection.sku = firstSkuWithAttrs;
        const skuAttributes = newSelection.sku?.attributes || attr || [];
        initializeSelectedAttributes(newSelection, productInfo, attr);

        if (newSelection.selectedAttributes["Color"]) {
          for (const att of skuAttributes) {
            if (att.identifier === "Color") {
              for (const v of att.values || []) {
                if (Array.isArray(newSelection.selectedAttributes["Color"])) {
                  const selectedColorAttributes = newSelection.selectedAttributes["Color"];
                  if (selectedColorAttributes.length !== 0 && v.identifier === selectedColorAttributes[0]) {
                    setSkuColor(v.value);
                  }
                } else {
                  if (v.identifier === newSelection.selectedAttributes["Color"]) {
                    setSkuColor(v.value);
                  }
                }
              }
            }
          }
        }

        // no SKUs with selected attrs were found -- revert to full list and we'll just use the first SKU
        if (newSelection.sku.length === 0) {
          newSelection.sku = items;
        }

        if (newSelection.sku[newSelection.index].images?.length > 1) {
          setIndex(0);
          setCarouselImages(newSelection.sku[newSelection.index].images);
          setShowCarousel(true);
        }
      } else {
        setBuyableFlag(false);
      }
    }
    setCurrentSelection(newSelection);
  };

  /**
   * Validate SKU based upon the selected attributes
   * @param attr
   */
  const initializeSelectedAttributes = (newSelection: CurrentSelectionType, productInfo: any, attr?: any) => {
    const items = productInfo.items ?? [productInfo];
    const attrs = attr ?? newSelection.sku.attributes ?? [];
    const asMap = attrsAsMap(attrs);
    const skusAsAttrs = makeSkusAsAttrs(items);
    const { exact } = search({}, asMap, "", skusAsAttrs);

    newSelection.sku = items.filter((v, i) => i === exact);
    newSelection.selectedAttributes = asMap;
    newSelection.index = 0;

    setDisplayInfo(newSelection.sku[newSelection.index], productInfo);
    if (newSelection.sku[newSelection.index].buyable === STRING_TRUE) {
      setBuyableFlag(true);
    } else {
      setBuyableFlag(false);
    }
  };

  /**
   *Get the inventory details of the product
   * @param catentryId
   */
  const getInventory = (catentryId: string) => {
    const parameters: any = {
      ...payloadBase,
      productIds: catentryId,
    };

    let newAvailability: any[];

    inventoryavailabilityService
      .getInventoryAvailabilityByProductId(parameters)
      .then((res) => {
        newAvailability = [];
        if (res.data.InventoryAvailability !== undefined) {
          const onlineInventory = res.data.InventoryAvailability.find((inventory: any) => inventory.onlineStoreId);
          newAvailability.push({
            storeId: onlineInventory?.onlineStoreId,
            storeName: ONLINE_STORE_KEY,
            inventoryStatus: onlineInventory?.inventoryStatus === AVAILABLE_KEY ? true : false,
          });
          for (const inventory of res.data.InventoryAvailability) {
            if (inventory.physicalStoreId && inventory.physicalStoreName) {
              newAvailability.push({
                storeId: inventory.physicalStoreId,
                storeName: inventory.physicalStoreName,
                inventoryStatus: inventory.inventoryStatus === AVAILABLE_KEY ? true : false,
              });
            } else if (inventory.physicalStoreId && !inventory.physicalStoreName) {
              newAvailability.push({
                storeId: inventory.physicalStoreId,
                storeName: inventory.physicalStoreId,
                inventoryStatus: inventory.inventoryStatus === AVAILABLE_KEY ? true : false,
              });
            }
          }
        }

        if (newAvailability.length === 0) {
          setInventoryAvailableFlag(false);
        } else {
          //Check whether returned inventory is actually available
          //Only check against online store for now
          const selectedStoreInventory = newAvailability.find((inventory: any) => inventory.storeId === storeId);
          if (selectedStoreInventory) {
            setInventoryAvailableFlag(selectedStoreInventory.inventoryStatus);
          } else {
            setInventoryAvailableFlag(false);
          }
        }
        setAvailability(newAvailability);
      })
      .catch((e) => {
        console.log("Could not retrieve Inventory Details", e);
      });
  };

  /**
   * Get the descriptive attributes
   */
  const getDescriptiveAttributes = (attributesArray: any[]) => {
    const newDescriptiveAttrList: any[] = [];

    if (attributesArray) {
      for (const att of attributesArray) {
        if (
          att.usage === DESCRIPTIVE &&
          att.displayable &&
          att.identifier !== ATTR_IDENTIFIER.PickUp &&
          att.storeDisplay !== STRING_TRUE
        ) {
          newDescriptiveAttrList.push(att);
        }
      }
    }

    setDisplayDescriptiveAttrList(newDescriptiveAttrList);
    return newDescriptiveAttrList;
  };

  /**
   * Get the defining attributes
   */
  const getDefiningAttributes = (attributesArray: any[]) => {
    if (attributesArray) {
      const newDefiningAttrList: any[] = [];
      for (const att of attributesArray) {
        if (att.usage === DEFINING) {
          newDefiningAttrList.push(att);
        }
      }
      setDefiningAttrList(newDefiningAttrList);
    }
  };

  const search = useCallback((partialAttr, fullAttr, key, list) => {
    const exact = list.findIndex((s) => isEqual(s, fullAttr));
    const best = exact === -1 ? list.findIndex((s) => s[key] === partialAttr[key]) : -1;
    return { exact, best };
  }, []);

  /**
   * Defining attribute change event handler
   * @param attr
   * @param e
   */
  const onAttributeChange = (attr: string, e: string) => {
    if (product?.items) {
      const newSelection = { ...currentSelection };
      const asAttrs = makeSkusAsAttrs(product.items);
      const partialAttr = { [attr]: e };
      const fullAttr = { ...currentSelection.selectedAttributes, [attr]: e };
      const { exact, best } = search(partialAttr, fullAttr, attr, asAttrs);

      if (exact !== -1) {
        newSelection.selectedAttributes = fullAttr;
        newSelection.sku = product.items.filter((v, i) => i === exact);
      } else if (best !== -1) {
        newSelection.selectedAttributes = { ...asAttrs[best] };
        newSelection.sku = product.items.filter((v, i) => i === best);
      } else {
        newSelection.sku = [];
        setBuyableFlag(false);
        setAvailability([]);
      }

      if (newSelection.sku.length > 0) {
        setDisplayInfo(newSelection.sku[newSelection.index], product);
        if (newSelection.sku[newSelection.index].buyable === STRING_TRUE) {
          setBuyableFlag(true);
        } else {
          setBuyableFlag(false);
        }
        if (newSelection.selectedAttributes["Color"]) {
          for (const att of newSelection.sku[newSelection.index]?.attributes || []) {
            if (att.identifier === "Color") {
              for (const v of att.values || []) {
                if (Array.isArray(newSelection.selectedAttributes["Color"])) {
                  const selectedColorAttributes = newSelection.selectedAttributes["Color"];
                  if (selectedColorAttributes.length !== 0 && v.identifier === selectedColorAttributes[0]) {
                    setSkuColor(v.value);
                  }
                } else {
                  if (v.identifier === newSelection.selectedAttributes["Color"]) {
                    setSkuColor(v.value);
                  }
                }
              }
            }
          }
        }
        if (newSelection.sku[newSelection.index].images?.length > 1) {
          setIndex(index);
          setCarouselImages(newSelection.sku[newSelection.index].images);
          setShowCarousel(true);
          setDisplayFullImage(newSelection.sku[newSelection.index].images[index]?.fullImage);
        }
      }
      setCurrentSelection(newSelection);
    }
  };

  const changeMainImage = (index: number) => {
    setIndex(index);
    const imageJson = carouselImages[index];
    const fullImage = imageJson.fullImage;
    setDisplayFullImage(fullImage);
  };

  /**
   * Set the product offer price and display price
   * @param priceArray
   */
  const setDisplayPrices = (priceArray: any[]) => {
    if (priceArray) {
      let offer: string = "0";
      let list: string = "0";
      for (const price of priceArray) {
        if (price.usage === OFFER && price.value !== "") {
          offer = price.value;
        } else if (price.usage === DISPLAY && price.value !== "") {
          list = price.value;
        }
      }
      setDisplayOfferPrice(parseFloat(offer));
      setDisplayListPrice(parseFloat(list));
    }
  };

  /**
   * Product quantity input field value change event handler
   * @param e
   */
  const updateProductQuantity = (e: number) => {
    const newSelection = { ...currentSelection };
    newSelection.quantity = e;
    setCurrentSelection(newSelection);
  };

  /**
   *Add the selected product to the shopping cart
   */
  const addToCart = () => {
    const param = {
      partnumber: [currentSelection.sku[currentSelection.index].partNumber],
      quantity: [currentSelection.quantity.toString()],
      contractId: contract,
      ...payloadBase,
    };
    setAddItemActionTriggered(true);
    dispatch(orderActions.ADD_ITEM_ACTION(param));
  };

  const addToRL = async (requisitionListId) => {
    const payload = {
      action: "addConfiguration",
      query: {
        requisitionListId,
        quantity: currentSelection.quantity,
        catEntryId: currentSelection.sku[currentSelection.index].id,
      },
      ...payloadBase,
    };
    await rlSvc.performActionOnRequisitionList(payload);
    try {
      const msg = { key: "success-message.addItemListSuccessfully" };
      dispatch(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
    } catch (e) {
      console.log("Could not add to list", e);
    }
  };

  /**
   * Get product information from part number
   */
  const getProductDetails = useCallback(() => {
    // usage of this widget only makes sense in a page with product-context -- as-such
    //   the fetchProductDetails function won't be available when there's no product-context,
    //   e.g., being used in the cart-page as an example -- in such cases, we'll just ignore
    //   its incantation
    if (fetchProductDetails) {
      const catalogIdentifier: string = mySite ? mySite.catalogID : "";
      const parameters: any = {
        storeId: storeId,
        partNumber: productPartNumber,
        contractId: contract,
        catalogId: catalogIdentifier,
        ...payloadBase,
      };
      fetchProductDetails(parameters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productPartNumber, contract, storeId]);

  const parseProducts = useCallback(() => {
    if (products && products.length > 0) {
      getMerchandisingAssociationDetails(products);
      let categoryIdentifier: string = EMPTY_STRING;
      const inputCatentryData = products[0];
      getProduct(inputCatentryData);
      if (inputCatentryData?.attachments?.length > 0) {
        setAttachmentsList(inputCatentryData.attachments);
      }
      if (location?.state?.categoryId) {
        categoryIdentifier = location.state.categoryId;
      } else {
        const parentCatalogGroupID = products[0].parentCatalogGroupID;
        if (parentCatalogGroupID) {
          categoryIdentifier = StoreUtil.getParentCategoryId(parentCatalogGroupID, topCategoriesList);
        }
      }
      if (categoryIdentifier && categoryIdentifier.length > 0) {
        const parameters: any = {
          categoryId: categoryIdentifier,
          contractId: contract,
          currency: defaultCurrencyID,
          storeId: storeId,
          productName: products[0].name ? products[0].name : EMPTY_STRING,
          ...payloadBase,
        };
        dispatch(
          catalogActions.getProductListForPDPAction({
            parameters: parameters,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (mySite) {
      getProductDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  useEffect(() => {
    parseProducts();
  }, [products]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (currentSelection?.sku[currentSelection?.index]?.id) {
      getInventory(currentSelection.sku[currentSelection?.index].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelection?.sku, currentSelection?.index]);

  const productDetailTabsChildren: ITabs[] = [];

  if (displayLongDesc) {
    const descriptionElement = (
      <StyledTypography variant="body1" component="div" style={{ maxWidth: "65ch" }}>
        {HTMLReactParser(displayLongDesc)}
      </StyledTypography>
    );
    productDetailTabsChildren.push({
      title: translation.productDetailDescription,
      tabContent: descriptionElement,
    });
  }

  if (displayDescriptiveAttrList.length > 0) {
    const productDetailsElement = (
      <div id={`product-details-container_${productPartNumber}`} className="product-details-container">
        {displayDescriptiveAttrList.map((e: any) => (
          <StyledTypography variant="body1" key={`li_${e.identifier}`} id={`product_attribute_${productPartNumber}`}>
            <b
              key={`span_name_${e.identifier}`}
              id={`product_desc_attribute_name_${e.identifier}_${productPartNumber}`}>
              {e.name}:
            </b>
            {e.values?.map((value: any) => (
              <span id={`product_attribute_value_${value.identifier}_${productPartNumber}`} key={value.identifier}>
                {" " + storeUtil.csValue(value.value)}
              </span>
            ))}
          </StyledTypography>
        ))}
      </div>
    );
    productDetailTabsChildren.push({
      title: translation.productDetailProductDetails,
      tabContent: productDetailsElement,
    });
  }

  if (attachmentsList.length > 0) {
    attachmentsList.forEach((a) => {
      a.mimeType = /^https?:\/\//.test(a.attachmentAssetPath) ? "content/url" : a.mimeType || "content/unknown";
    });

    const productAttachmentElement = (
      <AttachmentLayout attachmentsList={attachmentsList} productPartNumber={productPartNumber} />
    );
    productDetailTabsChildren.push({
      title: translation.productDetailAttachments,
      tabContent: productAttachmentElement,
    });
  }

  //GA360
  const breadcrumbs = useSelector(breadcrumbsSelector);

  useEffect(() => {
    if (addItemActionTriggered) {
      //GA360
      if (mySite.enableGA) {
        AsyncCall.sendAddToCartEvent(
          { cart, currentSelection, breadcrumbs },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
      }
      setAddItemActionTriggered(false);
    }
  }, [cart, currentSelection, breadcrumbs]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mySite.enableGA) {
      if (currentSelection && breadcrumbs.length !== 0) {
        AsyncCall.sendPDPPageViewEvent(breadcrumbs, {
          enableUA: mySite.enableUA,
          enableGA4: mySite.enableGA4,
        });
        AsyncCall.sendPDPDetailViewEvent(
          { currentProdSelect: currentSelection, breadcrumbs },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
      }
    }
  }, [breadcrumbs]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSeller(<SellerLink {...{ breadcrumbs, sellerAttr }} />);
  }, [sellerAttr, breadcrumbs]);

  const formattedPriceDisplayOffer = <FormattedPriceDisplay min={displayOfferPrice} />;
  const formattedPriceDisplayList = <FormattedPriceDisplay min={displayListPrice} />;
  const formattedPriceDisplayNull = <FormattedPriceDisplay min={null} />;

  return {
    seller,
    productPartNumber,
    product,
    showCarousel,
    carouselImages,
    changeMainImage,
    index,
    displayFullImage,
    displayName,
    displayPartNumber,
    displayShortDesc,
    promotion,
    displayOfferPrice,
    displayListPrice,
    definingAttrList,
    skuColor,
    onAttributeChange,
    currentSelection,
    updateProductQuantity,
    availability,
    addToCart,
    inventoryAvailableFlag,
    buyableFlag,
    productDetailTabsChildren,
    translation,
    formattedPriceDisplayOffer,
    formattedPriceDisplayList,
    formattedPriceDisplayNull,
    loginStatus,
    isB2B,
    isSharedOrder,
    SIGNIN,
    ribbonFinder: StoreUtil.getRibbonAdAttrs,
    addToRLButton: (
      <AddToRequisitionListButton
        {...{ addFn: addToRL, disabled: !inventoryAvailableFlag || !buyableFlag || !displayOfferPrice }}
      />
    ),
  };
};

export const withProductDetailsWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  (props: any) => {
    const { page } = props;
    const productDetailsWid = useProductDetails(page);
    return (
      <>
        <WrapComponent {...productDetailsWid}></WrapComponent>
      </>
    );
  };
