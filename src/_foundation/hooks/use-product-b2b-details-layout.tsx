/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import { useLocation } from "react-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useDispatch, useSelector } from "react-redux";
import getDisplayName from "react-display-name";
import HTMLReactParser from "html-react-parser";
//Foundation libraries
import associatedPromotionCodeService from "../apis/transaction/associatedPromotionCode.service";
import inventoryavailabilityService from "../apis/transaction/inventoryavailability.service";
import productsService from "../apis/search/products.service";
import { useSite } from "..//hooks/useSite";
//Custom libraries
import {
  OFFER,
  DISPLAY,
  DEFINING,
  DESCRIPTIVE,
  STRING_TRUE,
} from "../../constants/common";
import { ATTR_IDENTIFIER } from "../../constants/catalog";
import FormattedPriceDisplay from "../../components/widgets/formatted-price-display";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { loginStatusSelector } from "../../redux/selectors/user";
import { breadcrumbsSelector } from "../../redux/selectors/catalog";
import * as orderActions from "../../redux/actions/order";
import * as errorActions from "../../redux/actions/error";
import { cartSelector } from "../../redux/selectors/order";
import * as catalogActions from "../../redux/actions/catalog";
//UI
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  AttachmentB2BLayout,
  StyledTypography,
  StyledProductImage,
  ITabs,
  StyledNumberInput,
} from "@hcl-commerce-store-sdk/react-component";
//GA360
import AsyncCall from "../gtm/async.service";
import storeUtil from "../../utils/storeUtil";
import { useProductValue } from "../context/product-context";
import { Page, Widget, WidgetProps } from "../constants/seo-config";
import { SIGNIN } from "../../constants/routes";

/**
 * B2B Product display component
 * Displays product defining atrributes, SKUs and it's availability, promotions and other product details.
 * Allows user to choose the product and add it to shopping cart.
 * @param widget
 * @param page
 */

export const useProductB2BDetailsLayout = (widget: Widget, page: Page) => {
  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const { t, i18n } = useTranslation();
  const contract = useSelector(currentContractIdSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const dispatch = useDispatch();
  const theme = useTheme();
  const widgetName = getDisplayName("ProductB2BDetailsLayout");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const productPartNumber =
    page && page.externalContext ? page.externalContext.identifier : "";
  let uniqueSkus: any[] = [];
  let inventoryMap = new Map();
  let currentSelection: any = {
    sku: { fullImage: "" },
    quantity: "1",
    isAngleImage: false,
    selectedAttributes: {},
    availability: null,
  };
  let productInfoData: any = {
    price: [{}],
    availableAttributes: [{ values: [{}] }],
    fullImage: "",
  };
  let productInfo: any;
  let descAttributes: any[] = [];
  let definingAttributes: any[] = [];
  let defnAttrSrc: any[] = [];
  let availAttrs: Set<string> = new Set<string>();
  let tableBody: any[] = [];
  let tableHeader: any[] = [];
  let tableDetailHeader: any[] = [];
  let productType: string = "";
  let invalidSKU: boolean;
  let addToCartMap = new Map();
  let availSkus: Set<any> = new Set<any>();
  let filteredSkus: Set<any> = new Set<any>();
  let attributeChangeMap = new Map();
  const [x, setDescAttributeList] = React.useState<Array<object>>([]); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [attachmentsList, setAttachmentsList] = useState<any[]>([]);
  const [productData, setProductData] = React.useState<any>(null);
  const [promotion, setPromotion] = React.useState<Array<any>>([]);
  const [disabledButtonFlag, setDisabledButtonFlag] =
    React.useState<boolean>(false);
  const [uniqueSkuList, setUniqueSkuList] = React.useState<Array<any>>([]);
  const [skuInventory, setSkuInventory] = React.useState<Map<any, any>>(
    () => new Map()
  );
  const translation = {
    productDetailattributeFilter: t("productDetail.attributeFilter"),
    productDetailSKU: t("productDetail.SKU"),
    productDetailshowAttributes: t("productDetail.showAttributes"),
    productDetailnoproductsToDisplay: t("productDetail.noproductsToDisplay"),
    productDetailaddToCurrentOrder: t("productDetail.addToCurrentOrder"),
    productDetailSignIn: t("productDetail.SignIn"),
    CommerceEnvironmentinventoryStatusAvailable: t(
      "CommerceEnvironment.inventoryStatus.Available"
    ),
    CommerceEnvironmentinventoryStatusOOS: t(
      "CommerceEnvironment.inventoryStatus.OOS"
    ),
    productDetailPrice: t("productDetail.Price"),
    productDetailQuantity: t("productDetail.Quantity"),
    productDetailOnline_Availability: t("productDetail.Online_Availability"),
    productDetailsAny: t("productDetail.any"),
    productDetailaddToCartErrorMsg: t("productDetail.addToCartErrorMsg"),
    productDetailDescription: t("productDetail.Description"),
    productDetailAttachments: t("productDetail.Attachments"),
    productDetailPriceDisplayPending: t("PriceDisplay.Labels.Pending"),
  };
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken((c) => {
      cancels.push(c);
    }),
  };
  const cart = useSelector(cartSelector);
  const [addItemActionTriggered, setAddItemActionTriggered] =
    useState<boolean>(false);
  const { mySite } = useSite();
  const storeId: string = mySite ? mySite.storeID : "";
  const [pdpData, setPdpData] = React.useState<any>(null);
  const catalogIdentifier: string = mySite ? mySite.catalogID : "";
  const location: any = useLocation();
  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  const language = i18n.languages[0];
  const {
    tableBodyData,
    setTableBodyData,
    tableHeaderData,
    setTableHeaderData,
    tableDetailHeaderData,
    setTableDetailHeaderData,
    productOfferPrice,
    setProductOfferPrice,
    prodDisplayPrice,
    setProdDisplayPrice,
    currentProdSelect,
    setCurrentProdSelect,
    skuAndQuantities,
    setSkuAndQuantities,
    filterSkuState,
    setFilterSkuState,
    definingAttributeList,
    setDefiningAttributeList,
    attributeState,
    setAttributeState,
  } = useProductValue();

  /**
   *Get product information from part number
   */
  const getProductDetails = () => {
    let parameters: any = {
      storeId: storeId,
      partNumber: productPartNumber,
      contractId: contract,
      catalogId: catalogIdentifier,
      ...payloadBase,
    };
    productsService
      .findProductsUsingGET(parameters)
      .then((productData: any) => {
        const productDetails = productData.data.contents;
        if (productDetails && productDetails.length > 0) {
          let categoryIdentifier: string = "";
          setPdpData(productDetails);
          if (location?.state?.categoryId) {
            categoryIdentifier = location.state.categoryId;
          } else {
            let parentCatalogGroupID = productDetails[0].parentCatalogGroupID;
            if (parentCatalogGroupID) {
              categoryIdentifier =
                storeUtil.getParentCategoryId(parentCatalogGroupID);
            }
          }
          if (categoryIdentifier && categoryIdentifier.length > 0) {
            let parameters: any = {
              categoryId: categoryIdentifier,
              contractId: contract,
              currency: defaultCurrencyID,
              storeId: storeId,
              productName: productDetails[0].name ? productDetails[0].name : "",
              ...payloadBase,
            };
            dispatch(
              catalogActions.getProductListForPDPAction({
                parameters: parameters,
              })
            );
          }
        }
      })
      .catch((e) => {
        console.log("Could not retrieve product details page informarion", e);
      });
  };

  /**
   * Get product information based on its type
   */
  const getProduct = () => {
    productType = "";
    productInfo = pdpData[0];
    if (productInfo.type === "product" || productInfo.type === "variant") {
      productType = productInfo.type;
      initializeProduct(productInfo);
    } else if (
      productInfo.type === "item" &&
      productInfo.parentCatalogEntryID
    ) {
      productType = productInfo.type;
      let productsId: string[] = [];
      productsId.push(productInfo.parentCatalogEntryID);
      let parameters: any = {
        storeId: storeId,
        id: productsId,
        contractId: contract,
        ...payloadBase,
      };
      productsService
        .findProductsUsingGET(parameters)
        .then((res) => {
          if (res.data.contents && res.data.contents.length > 0) {
            initializeProduct(res.data.contents[0], productInfo.attributes);
          }
        })
        .catch((e) => {
          console.log("could not retreive the parent product details", e);
        });
    }
  };

  /**
   * Get associated promotions for the product
   */
  const getAssociatedPromotions = () => {
    let promotion: any[] = [];
    let parameters: any = {
      storeId: storeId,
      q: "byProduct",
      qProductId: pdpData[0].id,
      ...payloadBase,
    };
    associatedPromotionCodeService
      .findPromotionsByProduct(parameters)
      .then((res) => {
        if (res.data.associatedPromotions) {
          for (let promo of res.data.associatedPromotions) {
            if (promo.description)
              promotion = promo.description.shortDescription;
          }
          setPromotion(promotion);
        }
      })
      .catch((e) => {
        console.log(
          "Could not retrieve product associated promotion details",
          e
        );
      });
  };

  /**
   * Get product details based upon the available attributes
   * @param productInfo
   * @param attr
   */
  const initializeProduct = (productInfo: any, attr?: any) => {
    if (productInfo) {
      productInfoData = JSON.parse(JSON.stringify(productInfo));
      descAttributes = [];
      definingAttributes = [];
      defnAttrSrc = [];
      availAttrs.clear();
      if (productInfo.attributes) {
        productInfoData.availableAttributes = JSON.parse(
          JSON.stringify(productInfo.attributes)
        );
        getDescriptiveAndDefiningAttributes();
      }
      if (productInfoData.items && productInfoData.items.length > 0) {
        currentSelection.partNumber = productInfoData.items[0];
        if (currentSelection.partNumber.attributes)
          initializeSelectedAttributes(attr);
      } else {
        currentSelection.partNumber = productInfoData;
        currentSelection.selectedAttributes = {};
        if (currentSelection.partNumber.attributes) {
          for (const att of currentSelection.partNumber.attributes) {
            if (att.values.length) {
              currentSelection.selectedAttributes[att.identifier] = att.values
                ? att.values[0]?.identifier
                : undefined;
            }
          }
        }
      }
    }
    setProductPrice(currentSelection.partNumber.price);
    setDefiningAttributeList(definingAttributes);
    setDescAttributeList(descAttributes);
    setProductData(productInfoData);
    if (productInfoData.attachments?.length > 0) {
      setAttachmentsList(productInfoData.attachments);
    } else {
      setAttachmentsList([]);
    }
    getUniqueSkusAndInventory(productInfoData.items);
  };

  /**
   * Validate SKU based upon the selected attributes
   * @param attr
   */
  const initializeSelectedAttributes = (attr?: any) => {
    currentSelection.selectedAttributes = {};
    if (attr) {
      for (const att of attr) {
        if (att.usage && att.usage === DEFINING) {
          currentSelection.selectedAttributes[att.identifier] = att.values
            ? att.values[0].identifier
            : undefined;
        }
      }
    } else {
      for (const att of currentSelection.partNumber.attributes) {
        if (att.usage && att.usage === DEFINING) {
          currentSelection.selectedAttributes[att.identifier] = att.values
            ? att.values[0].identifier
            : undefined;
        }
      }
    }
    const sku = resolveSKU(
      productInfoData.items,
      currentSelection.selectedAttributes
    );
    if (sku === "") {
      invalidSKU = true;
    } else {
      invalidSKU = false;
      currentSelection.partNumber = sku;
    }
    setCurrentProdSelect(currentSelection);
    setDisabledButtonFlag(invalidSKU);
  };

  /**
   *Get the SKU details from product SKUs and selected attributes
   *@param skus
   *@param selectedAttributes
   */
  const resolveSKU = (skus: any, selectedAttributes: any): any => {
    if (skus) {
      for (const s of skus) {
        if (s.attributes) {
          const values = s.attributes.reduce((value: any, a: any) => {
            value[a.identifier] = a.values ? a.values[0].identifier : undefined;
            return value;
          }, {});
          let match = true;
          for (const key in selectedAttributes) {
            match = match && selectedAttributes[key] === values[key];
          }
          if (match) {
            return s;
          }
        }
      }
    }
    /* istanbul ignore next */
    return "";
  };

  /**
   *Get the descriptive and defining attributes
   */
  const getDescriptiveAndDefiningAttributes = () => {
    for (const att of productInfoData.availableAttributes) {
      if (
        att.usage === DESCRIPTIVE &&
        att.displayable &&
        att.identifier !== ATTR_IDENTIFIER.PickUp &&
        !att.identifier.startsWith(ATTR_IDENTIFIER.RibbonAd)
      ) {
        descAttributes.push(att);
      } else if (att.usage === DEFINING) {
        definingAttributes.push(att);
        defnAttrSrc.push(att);
      }
    }
    if (productInfoData.items) {
      availableAttributes(productInfoData.items);
    }
  };

  /**
   * Helper method to get unique available attributes and store it in set
   * @param skus
   */
  const availableAttributes = (skus: any[]): void => {
    let c: any;
    let u: string[];
    for (const s of skus) {
      c = attrs2Object(s.attributes);
      u = [];
      for (let d of definingAttributes) {
        u.push(c[d.identifier]);
      }
      availAttrs.add(u.join("|"));
    }
  };

  /**
   * Helper method to prepare and set the product data to display in Drawer expansion table
   *
   * @param skus
   * @param inventory
   * @param defAttributeList
   */
  const setTableData = (
    skus: any[],
    inventory: Map<any, any>,
    defAttributeList: any[]
  ) => {
    let tablebodyDataMap = new Map();
    let tableHeaderDataMap = new Map();
    let tableDetailHeaderDataMap = new Map();
    let attributeSize = defAttributeList.length;
    if (attributeSize > 3) {
      attributeSize = 3;
    }
    for (const s of skus) {
      tablebodyDataMap.set("sku", s.partNumber);
      for (const a of s.attributes) {
        tablebodyDataMap.set(a.name, a.values ? a.values[0]?.value : undefined);
      }
      let offerPrice: number = 0;
      let displayPrice: number = 0;
      let priceDisplaytag: any;
      for (const p of s.price) {
        if (p.usage === DISPLAY && p.value !== "") {
          displayPrice = parseFloat(p.value);
        } else if (p.usage === OFFER && p.value !== "") {
          offerPrice = parseFloat(p.value);
        }
      }

      if (offerPrice > 0) {
        priceDisplaytag = <FormattedPriceDisplay min={offerPrice} />;
      } else if (offerPrice === 0 && displayPrice > 0) {
        priceDisplaytag = <FormattedPriceDisplay min={displayPrice} />;
      } else if (offerPrice === 0 && displayPrice === 0) {
        priceDisplaytag = <FormattedPriceDisplay min={null} />;
      }
      tablebodyDataMap.set("price", priceDisplaytag);

      if (inventory.get(s.id) && s.buyable === STRING_TRUE) {
        let availableQuantityTag = (
          <StyledNumberInput
            value={
              skuAndQuantities.get(s.partNumber)
                ? skuAndQuantities.get(s.partNumber)
                : null
            }
            min={0}
            strict={true}
            disabled={!loginStatus}
            onChange={(quantity: number) =>
              updateProductQuantity(quantity, s.partNumber)
            }
          />
        );
        let availableImage = (
          <div>
            <span>
              <StyledProductImage
                itemProp="image"
                src="\SapphireSAS\images\Available.gif"
              />
            </span>
            <span>
              {" "}
              {translation.CommerceEnvironmentinventoryStatusAvailable}
            </span>
          </div>
        );
        tablebodyDataMap.set("online_availability", availableImage);
        tablebodyDataMap.set("quantity", availableQuantityTag);
      } else {
        let unAvailableQuantityTag = (
          <StyledNumberInput
            disabled={true}
            value={
              skuAndQuantities.get(s.partNumber)
                ? skuAndQuantities.get(s.partNumber)
                : ""
            }
          />
        );
        let unAvailableImage = (
          <div>
            <span>
              <StyledProductImage
                itemProp="image"
                src="\SapphireSAS\images\Unavailable.gif"
              />
            </span>
            <span> {translation.CommerceEnvironmentinventoryStatusOOS}</span>
          </div>
        );
        tablebodyDataMap.set("online_availability", unAvailableImage);
        tablebodyDataMap.set("quantity", unAvailableQuantityTag);
      }

      tableBody.push(mapToObj(tablebodyDataMap));
      tablebodyDataMap = new Map();
    }
    tableHeaderDataMap.set("title", translation.productDetailSKU);
    tableHeaderDataMap.set("field", "sku");
    tableHeader.push(mapToObj(tableHeaderDataMap));
    tableHeaderDataMap = new Map();
    for (let i = 0; i < attributeSize; i++) {
      tableHeaderDataMap.set("title", defAttributeList[i].name);
      tableHeaderDataMap.set("field", defAttributeList[i].name);
      tableHeader.push(mapToObj(tableHeaderDataMap));
      tableHeaderDataMap = new Map();
    }
    for (let j = attributeSize; j < defAttributeList.length; j++) {
      tableDetailHeaderDataMap.set("title", defAttributeList[j].name);
      tableDetailHeaderDataMap.set("field", defAttributeList[j].name);
      tableDetailHeader.push(mapToObj(tableDetailHeaderDataMap));
      tableDetailHeaderDataMap = new Map();
    }
    tableHeaderDataMap.set("title", translation.productDetailPrice);
    tableHeaderDataMap.set("field", "price");
    tableHeader.push(mapToObj(tableHeaderDataMap));
    tableHeaderDataMap = new Map();
    tableHeaderDataMap.set("title", translation.productDetailQuantity);
    tableHeaderDataMap.set("field", "quantity");
    tableHeader.push(mapToObj(tableHeaderDataMap));
    tableHeaderDataMap = new Map();
    tableHeaderDataMap.set(
      "title",
      translation.productDetailOnline_Availability
    );
    tableHeaderDataMap.set("field", "online_availability");
    tableHeader.push(mapToObj(tableHeaderDataMap));
    setTableBodyData(tableBody);
    setTableHeaderData(tableHeader);
    setTableDetailHeaderData(tableDetailHeader);
  };

  /**
   *Helper method to convert a map to an object
   * @param inputMap
   * @returns object
   */

  function mapToObj(inputMap: any[] | Map<any, any>) {
    let obj = {};
    inputMap.forEach(function (value: any, key: React.ReactText) {
      obj[key] = value;
    });
    return obj;
  }

  /**
   *Helper method to convert attributes to object
   * @param attrs
   * @return object
   */
  const attrs2Object = (attrs: any[]): any => {
    if (attrs === undefined) {
      return {};
    }
    return attrs.reduce((obj: any, attr: any) => {
      obj[attr.identifier] = attr.values
        ? attr.values[0]?.identifier
        : undefined;
      return obj;
    }, {});
  };

  /**
   *Helper method to convert attributes to object
   * @param attrs
   * @returns object
   */
  const sku2Object = (skus: any[], sku: string): any => {
    if (skus === undefined) {
      return {};
    }
    for (let d of skus) {
      if (d.partNumber === sku) return d;
    }
  };

  /**
   * Defining attribute change event handler
   * @param attr
   * @param e
   */
  const onAttributeChange = (attr: string, e: string) => {
    if (e !== translation.productDetailsAny) {
      attributeChangeMap.set(attr, e);
      setAttributeState(new Map(attributeState.set(attr, e)));
      filterUniqueSkus();
      updateCurrentSelection();
    } else {
      attributeChangeMap = attributeState;
      attributeChangeMap.delete(attr);
      setAttributeState(new Map(attributeChangeMap));
      if (attributeChangeMap.size === 0) {
        setFilterSkuState([...uniqueSkuList]);
        currentSelection = { ...currentProdSelect };
        currentSelection.partNumber = uniqueSkuList[0];
        setCurrentProdSelect(currentSelection);
        setProductPrice(currentSelection.partNumber.price);
      } else {
        filterUniqueSkus();
        updateCurrentSelection();
      }
    }
  };

  /**
   * Update the current selected product and its price
   * based on selected defining attributes
   */
  const updateCurrentSelection = () => {
    if (productData?.items) {
      currentSelection = { ...currentProdSelect };
      const sku = resolveSKU(uniqueSkuList, mapToObj(attributeState));
      if (sku !== "") {
        currentSelection.partNumber = sku;
      }
      setCurrentProdSelect(currentSelection);
      setProductPrice(currentSelection.partNumber.price);
    }
  };

  /**
   * filter skulist based on the attribut selected
   */
  const filterUniqueSkus = () => {
    filteredSkus = new Set<any>();
    for (const s of uniqueSkuList) {
      const values = s.attributes.reduce((value: any, a: any) => {
        value[a.identifier] = a.values ? a.values[0]?.identifier : undefined;
        return value;
      }, {});
      let match = true;
      for (const key of attributeState.keys()) {
        match = match && attributeState.get(key) === values[key];
      }
      if (match) {
        filteredSkus.add(s);
      }
    }
    let uniqueFilteredArray = Array.from(filteredSkus);
    uniqueFilteredArray = uniqueFilteredArray.sort(compare);
    setFilterSkuState(uniqueFilteredArray);
  };

  /**
   * Set the product offer price and display price
   * @param priceArray
   */
  const setProductPrice = (priceArray: any[]) => {
    if (priceArray) {
      for (const price of priceArray) {
        if (price.usage === OFFER && price.value !== "") {
          setProductOfferPrice(parseFloat(price.value));
        } else if (price.usage === DISPLAY && price.value !== "") {
          setProdDisplayPrice(parseFloat(price.value));
        }
      }
    }
  };

  /**
   * Product quantity input field value change event handler
   * @param e
   */
  const updateProductQuantity = (quantity: number, id: string) => {
    if (Number.isInteger(quantity) && quantity > 0) {
      setSkuAndQuantities(new Map(skuAndQuantities.set(id, quantity)));
    } else {
      addToCartMap = skuAndQuantities;
      addToCartMap.delete(id);
      setSkuAndQuantities(new Map(addToCartMap));
    }
  };

  /**
   *Add the selected product and its quantities to the shopping cart
   */
  const addToCart = () => {
    if (skuAndQuantities && skuAndQuantities.size > 0) {
      const param = {
        partnumber: Array.from(skuAndQuantities.keys()),
        quantity: Array.from(skuAndQuantities.values()),
        contractId: contract,
        ...payloadBase,
      };
      dispatch(orderActions.ADD_ITEM_ACTION(param));
      setAddItemActionTriggered(true);
    } else {
      let parameters: any = {
        errorMessage: translation.productDetailaddToCartErrorMsg,
      };
      dispatch(errorActions.VALIDATION_ERROR_ACTION(parameters));
    }
  };

  /**
   * Get the unique SKUs & its inventory details.
   * Unique Skus is sorted in ascending order based on partNumber.
   * Store the details in uniqueSkus array and inventoryMap respectively.
   * @param skus
   */
  const getUniqueSkusAndInventory = (skus: any[]): void => {
    let productId: string[] = [];
    if (skus) {
      for (const s of skus) {
        availSkus.add(sku2Object(skus, s.partNumber));
      }
      let uniqueSkuList = Array.from(availSkus);
      uniqueSkuList = uniqueSkuList.sort(compare);
      uniqueSkus = uniqueSkuList;
      setUniqueSkuList(uniqueSkus);
      for (const s of uniqueSkuList) {
        productId.push(s.id);
      }
      getSkuInventory(productId.join());
    }
  };
  /**
   * Utility method used in sorting.
   * @param a
   * @param b
   */
  const compare = (a, b): any => {
    return a.partNumber.localeCompare(b.partNumber, "en", {
      numeric: true,
    });
  };

  /**
   * Helper method to get the SKU's inventory details.
   * Stores the availabilty data in inventoryMap.
   * @param productId
   */
  const getSkuInventory = (productId: any) => {
    let inventoryStatus: boolean = false;
    let parameters: any = {
      storeId: storeId,
      productIds: productId,
      ...payloadBase,
    };
    inventoryavailabilityService
      .getInventoryAvailabilityByProductId(parameters)
      .then((res) => {
        if (
          res.data.InventoryAvailability !== undefined &&
          res.data.InventoryAvailability.length > 0
        ) {
          for (const inventory of res.data.InventoryAvailability) {
            inventoryStatus =
              inventory.inventoryStatus === "Available" ? true : false;
            inventoryMap.set(inventory.productId, inventoryStatus);
          }
        }
        setSkuInventory(inventoryMap);
        setTableData(uniqueSkus, inventoryMap, definingAttributes);
        setFilterSkuState(uniqueSkus);
      })
      .catch((e) => {
        console.log("Could not retrieve Inventory Details", e);
      });
  };

  let productDetailTabsChildren: ITabs[] = [];

  if (productData && productData.longDescription) {
    const descriptionElement = (
      <>
        <StyledTypography variant="body1" component="div">
          {HTMLReactParser(productData.longDescription)}
        </StyledTypography>
      </>
    );
    productDetailTabsChildren.push({
      title: translation.productDetailDescription,
      tabContent: descriptionElement,
    });
  }

  if (attachmentsList.length > 0) {
    const productAttachmentElement = (
      <AttachmentB2BLayout attachmentsList={attachmentsList} />
    );
    productDetailTabsChildren.push({
      title: translation.productDetailAttachments,
      tabContent: productAttachmentElement,
    });
  }

  //GA360
  const breadcrumbs = useSelector(breadcrumbsSelector);
  React.useEffect(() => {
    if (mySite.enableGA) {
      if (productPartNumber && breadcrumbs.length !== 0) {
        AsyncCall.sendPDPPageViewEvent(breadcrumbs, {
          enableUA: mySite.enableUA,
          enableGA4: mySite.enableGA4,
        });
        AsyncCall.sendB2BPDPDetailViewEvent(
          { productData, productPartNumber, breadcrumbs },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
      }
    }
  }, [breadcrumbs, productData]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    getProductDetails();
  }, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (addItemActionTriggered) {
      //GA360
      if (mySite.enableGA) {
        const result = Array.from(skuAndQuantities).map((key, value) => ({
          key,
          value,
        }));
        AsyncCall.sendB2BAddToCartEvent(
          { cart, currentProdSelect, result, breadcrumbs },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
      }
      setAddItemActionTriggered(false);
    }
  }, [addItemActionTriggered, cart]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (pdpData && pdpData.length > 0 && uniqueSkuList.length === 0) {
      getProduct();
      getAssociatedPromotions();
    }
    if (uniqueSkuList.length > 0)
      setTableData(filterSkuState, skuInventory, definingAttributeList);
  }, [skuAndQuantities, filterSkuState, pdpData]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    productData,
    translation,
    promotion,
    productType,
    productOfferPrice,
    prodDisplayPrice,
    productDetailTabsChildren,
    definingAttributeList,
    onAttributeChange,
    isMobile,
    attributeState,
    tableHeaderData,
    tableBodyData,
    tableDetailHeaderData,
    loginStatus,
    addToCart,
    disabledButtonFlag,
    productPartNumber,
    currentProdSelect,
    language,
    defaultCurrencyID,
    SIGNIN,
  };
};

/**
 * A high order component that wraps a component with b2b product information.
 * @param Component the wrapping component.
 * @returns A component that has ability to process b2b product data.
 */
export const withUseProduct =
  (Component: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }) => {
    const productDetails = useProductB2BDetailsLayout(widget, page);
    return (
      <>
        {productDetails.productPartNumber && productDetails.productData && (
          <Component productDetails={productDetails} {...props}></Component>
        )}
      </>
    );
  };
