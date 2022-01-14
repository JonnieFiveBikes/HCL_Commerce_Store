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
import { clone, get } from "lodash-es";
import { useLocation } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  EMPTY_STRING,
} from "../../constants/common";
import { ATTR_IDENTIFIER } from "../../constants/catalog";
import FormattedPriceDisplay from "../../components/widgets/formatted-price-display";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { loginStatusSelector } from "../../redux/selectors/user";
import { breadcrumbsSelector } from "../../redux/selectors/catalog";
import { cartSelector } from "../../redux/selectors/order";
import * as orderActions from "../../redux/actions/order";
import * as errorActions from "../../redux/actions/error";
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
  useCustomTable,
  useTableUtils,
  withCustomTableContext,
  CustomTable,
} from "@hcl-commerce-store-sdk/react-component";
//GA360
import AsyncCall from "../gtm/async.service";
import storeUtil from "../../utils/storeUtil";
import { useProductValue } from "../context/product-context";
import { Page, Widget, WidgetProps } from "../constants/seo-config";
import { SIGNIN } from "../../constants/routes";
import { PRIVATE_ORDER_TYPE } from "../../constants/order";

const PriceCell = ({ rowData, headers }) => {
  const o = rowData.price.find(
    ({ usage: u, value: v }) => u === OFFER && v !== EMPTY_STRING
  );
  const offerPrice = o ? parseFloat(o.value) : 0;
  const disp = offerPrice > 0 ? offerPrice : null;
  return <FormattedPriceDisplay min={disp} />;
};

const AvailabilityCell = ({ rowData, headers }) => {
  const { getCurrentContext } = useTableUtils();
  const { tableState } = useCustomTable();
  const { t } = useTranslation();
  const itemProp = "image";
  const avl = {
    src: "/SapphireSAS/images/Available.gif",
    text: "CommerceEnvironment.inventoryStatus.Available",
  };
  const unAvl = {
    src: "/SapphireSAS/images/Unavailable.gif",
    text: "CommerceEnvironment.inventoryStatus.OOS",
  };
  const iv = get(getCurrentContext(tableState), `inventory.${rowData.id}`);
  const status = iv && rowData.buyable === STRING_TRUE ? avl : unAvl;
  return (
    <div>
      <span>
        <StyledProductImage {...{ itemProp, src: status.src }} />
      </span>
      <span>{t(status.text)}</span>
    </div>
  );
};

const QuantityCell = ({ rowData: r, headers: h }) => {
  const { skuAndQuantities, setSkuAndQuantities } = useProductValue();
  const { getRowKey, getCurrentContext } = useTableUtils();
  const { tableState: s } = useCustomTable();
  const price = parseFloat(
    get(
      r.price.find(
        ({ usage: u, value: v }) => u === OFFER && v !== EMPTY_STRING
      ),
      "value",
      "0"
    )
  );
  const key = getRowKey(r, h);
  const disabled =
    !getCurrentContext(s).loginNotRequired ||
    price <= 0 ||
    !get(getCurrentContext(s), `inventory.${r.id}`) ||
    r.buyable !== STRING_TRUE;
  const fn = (q: number, key: string) => {
    if (Number.isInteger(q) && q > 0) {
      setSkuAndQuantities(new Map(skuAndQuantities.set(key, q)));
    } else {
      skuAndQuantities.delete(key);
      setSkuAndQuantities(new Map(skuAndQuantities));
    }
  };

  return (
    <StyledNumberInput
      value={skuAndQuantities.get(key)}
      min={0}
      debounceTiming={100}
      strict={true}
      disabled={disabled}
      onChange={(q) => fn(q, key)}
    />
  );
};

const DetailPanel = ({ rowData }) => {
  const { attributes: rawData } = rowData;
  const { t } = useTranslation();
  const ofInterest = rawData
    .filter((a) => a.usage === DEFINING)
    .filter((a, i) => i > 2);

  // generate headers array
  const columns = ofInterest.map((a, i) => ({
    title: a.name,
    idProp: "name",
    keyLookup: { key: `defattr_${i}_value` },
    display: { cellStyle: { verticalAlign: "middle" } },
  }));

  // generate single row out of all attribute values
  const data = [
    ofInterest.reduce((n, v, i) => {
      n[`defattr_${i}_value`] = get(v, "values[0].value", EMPTY_STRING);
      return n;
    }, {}),
  ];

  const style = { width: "auto", border: "0" };
  const D = useMemo(() => withCustomTableContext(CustomTable), []);
  return (
    <D
      {...{ data, columns, style, t, labels: { emptyMsg: "Order.NoRecord" } }}
    />
  );
};

/**
 * B2B Product display component
 * Displays product defining atrributes, SKUs and it's availability, promotions and other product details.
 * Allows user to choose the product and add it to shopping cart.
 * @param widget
 * @param page
 */

export const useProductB2BDetailsLayout = (
  widget: Widget,
  page: Page,
  props
) => {
  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const { hasCTCtx } = props;
  const { t, i18n } = useTranslation();
  const contract = useSelector(currentContractIdSelector);
  const { mySite } = useSite();
  const loginStatus = useSelector(loginStatusSelector);
  const dispatch = useDispatch();
  const theme = useTheme();
  const widgetName = getDisplayName("ProductB2BDetailsLayout");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const productPartNumber = get(page, "externalContext.identifier", "");
  let currentSelection: any = {};
  let productInfoData: any = {};
  const [descAttributes, setDescAttributes] = useState<any[]>([]);
  let definingAttributes: any[] = [];
  const [productType, setProductType] = useState<string>("");
  const [descriptiveAttributeList, setDescriptiveAttributeList] = useState<
    Array<object>
  >([]);
  const [attachmentsList, setAttachmentsList] = useState<any[]>([]);
  const [productData, setProductData] = useState<any>(null);
  const [promotion, setPromotion] = useState<Array<any>>([]);
  const [disabledButtonFlag, setDisabledButtonFlag] = useState<boolean>(false);
  const [uniqueSkuList, setUniqueSkuList] = useState<Array<any>>([]);
  const [, setSkuInventory] = useState<Map<any, any>>(() => new Map());
  const translation = useMemo(() => {
    return {
      productDetailattributeFilter: t("productDetail.attributeFilter"),
      productDetailSKU: t("productDetail.SKU"),
      productDetailshowAttributes: t("productDetail.showAttributes"),
      productDetailnoproductsToDisplay: t("productDetail.noproductsToDisplay"),
      productDetailaddToCurrentOrder: mySite.isB2B
        ? t("productDetail.addToCurrentOrder")
        : t("productDetail.AddToCart"),
      productDetailaddToSharedOrder: t("productDetail.addToSharedOrder"),
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
      productDetailProductDetails: t("productDetail.ProductDetails"),
      productDetailAttachments: t("productDetail.Attachments"),
      productDetailPriceDisplayPending: t("PriceDisplay.Labels.Pending"),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite?.isB2B]);
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken((c) => {
      cancels.push(c);
    }),
  };
  const cart = useSelector(cartSelector);
  const isSharedOrder = !cart
    ? false
    : cart.orderTypeCode === PRIVATE_ORDER_TYPE
    ? false
    : true;
  const [addItemActionTriggered, setAddItemActionTriggered] =
    useState<boolean>(false);
  const storeId: string = mySite ? mySite.storeID : "";
  const [pdpData, setPdpData] = useState<any>(null);
  const location: any = useLocation();
  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  const language = i18n.languages[0];
  const {
    productOfferPrice,
    setProductOfferPrice,
    prodDisplayPrice,
    setProdDisplayPrice,
    currentProdSelect,
    setCurrentProdSelect,
    skuAndQuantities,
    filterSkuState,
    setFilterSkuState,
    definingAttributeList,
    setDefiningAttributeList,
    attributeState,
    setAttributeState,
    getMerchandisingAssociationDetails,
    fetchProductDetails,
    products,
  } = useProductValue();
  const { tableState, setTableState } = useCustomTable();
  const { setCurrentContextValue, getCurrentContext } = useTableUtils();
  const [headers, setHeaders] = useState<any[]>([]);
  const [needsPanel, setNeedsPanel] = useState<any>(false);
  const [rows, setRows] = useState<any[]>([]);

  // only specified for sku-list to update the custom-table context
  const updateCTCtx = useMemo(
    () => (k, v) => {
      if (hasCTCtx) setCurrentContextValue(k, v, tableState, setTableState);
    },
    [hasCTCtx, setCurrentContextValue, tableState, setTableState]
  );

  const loginNotRequired = useMemo(() => {
    const rc = loginStatus || !mySite?.isB2B;
    updateCTCtx("loginNotRequired", rc);
    return rc;
  }, [mySite?.isB2B, loginStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  // memoized function for client side sort value for price column
  const priceCalculator = useCallback(({ rowData }) => {
    const { price: p } = rowData;
    const o = p.find(({ usage: u, value: v }) => u === OFFER && v);
    const offerPrice = o ? parseFloat(o.value) : 0;
    return offerPrice > 0 ? offerPrice : EMPTY_STRING;
  }, []);

  // memoized function for client side sort value for online-availability column
  const oaCalculator = useCallback(({ rowData, tableState: s }) => {
    const avl = t("CommerceEnvironment.inventoryStatus.Available");
    const unAvl = t("CommerceEnvironment.inventoryStatus.OOS");
    const iv = get(getCurrentContext(s), `inventory.${rowData.id}`);
    return iv && rowData.buyable === STRING_TRUE ? avl : unAvl;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      let parameters: any = {
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
      let categoryIdentifier: string = "";
      setPdpData(clone(products));
      if (location?.state?.categoryId) {
        categoryIdentifier = location.state.categoryId;
      } else {
        let parentCatalogGroupID = products[0].parentCatalogGroupID;
        if (parentCatalogGroupID) {
          categoryIdentifier =
            storeUtil.getParentCategoryId(parentCatalogGroupID);
        }
      }
      if (categoryIdentifier) {
        let parameters = {
          categoryId: categoryIdentifier,
          contractId: contract,
          currency: defaultCurrencyID,
          storeId: storeId,
          productName: get(products[0], "name", ""),
          ...payloadBase,
        };
        dispatch(catalogActions.getProductListForPDPAction({ parameters }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  /**
   * Get product information based on its type
   */
  const getProduct = () => {
    let productInfo: any;
    productInfo = pdpData[0];
    if (productInfo.type === "product" || productInfo.type === "variant") {
      setProductType(productInfo.type);

      initializeProduct(productInfo);
    } else if (
      productInfo.type === "item" &&
      productInfo.parentCatalogEntryID
    ) {
      setProductType(productInfo.type);

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
      // no need to generate headers if not required
      if (hasCTCtx) {
        const { headers: h, needsPanel: d } = headerFn(productInfo);
        setHeaders(h);
        setNeedsPanel(d);
      }

      productInfoData = JSON.parse(JSON.stringify(productInfo));
      setDescAttributes([]);
      definingAttributes = [];
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
            if (att.values?.length) {
              currentSelection.selectedAttributes[att.identifier] = get(
                att,
                "values[0].identifier"
              );
            }
          }
        }
      }
    }
    setProductPrice(currentSelection.partNumber.price);
    setDefiningAttributeList(definingAttributes);
    setDescriptiveAttributeList(descAttributes);
    setProductData(productInfoData);
    setAttachmentsList(get(productInfoData, "attachments", []));
    getUniqueSkusAndInventory(get(productInfoData, "items", []));
  };

  /**
   * Validate SKU based upon the selected attributes
   * @param attr
   */
  const initializeSelectedAttributes = (attr?: any) => {
    let invalidSKU: boolean;
    const o = {};

    (attr ?? currentSelection.partNumber.attributes)
      .filter((a) => DEFINING === a.usage)
      .forEach((a) => {
        o[a.identifier] = get(a, "values[0].identifier");
      });
    currentSelection.selectedAttributes = o;

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
            value[a.identifier] = get(a, "values[0].identifier");
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
    let defnAttrSrc: any[] = [];
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
  };

  const headerFn = useMemo(
    () => (root) => {
      const cellStyle = { verticalAlign: "middle" };
      const defnAttrs =
        root.attributes
          ?.map((a, i) => ({ ...a, __origIdx: i }))
          .filter((a) => a.usage === DEFINING) ?? [];
      const attrSz = defnAttrs.length > 3 ? 3 : defnAttrs.length;
      let needsPanel = false;

      const headers = [
        {
          title: t("productDetail.SKU"),
          idProp: "partNumber",
          keyLookup: { key: "partNumber" },
          display: { cellStyle },
          sortable: {},
        },
        ...Array.from({ length: attrSz }, (x, i) => ({
          title: defnAttrs[i].name,
          keyLookup: {
            key: `attributes[${defnAttrs[i].__origIdx}].values[0].value`,
          },
          display: { cellStyle },
          sortable: {},
        })),
        {
          title: t("productDetail.Price"),
          keyLookup: { key: "phantomPrice" },
          display: {
            cellStyle,
            template: PriceCell,
          },
          sortable: { fn: priceCalculator, numeric: true },
        },
        {
          title: t("productDetail.Quantity"),
          keyLookup: { key: "phantomQuantity" },
          display: {
            cellStyle,
            template: QuantityCell,
          },
        },
        {
          title: t("productDetail.Online_Availability"),
          keyLookup: { key: "phantomAvailability" },
          display: {
            cellStyle,
            template: AvailabilityCell,
          },
          sortable: { fn: oaCalculator },
        },
      ];

      if (attrSz < defnAttrs.length) {
        needsPanel = true;
      }

      return { needsPanel, headers };
    },
    [t, oaCalculator, priceCalculator]
  );

  /**
   * Helper method to convert a map to an object
   * @param inputMap
   * @returns object
   */

  function mapToObj(inputMap: any[] | Map<any, any>) {
    const obj = {};
    inputMap.forEach((value, key) => (obj[key] = value));
    return obj;
  }

  /**
   * Defining attribute change event handler
   * @param attr
   * @param e
   */
  const onAttributeChange = (attr: string, e: string) => {
    let attributeChangeMap = new Map();
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
    let filteredSkus: Set<any> = new Set<any>();
    for (const s of uniqueSkuList) {
      const values = s.attributes.reduce((value: any, a: any) => {
        value[a.identifier] = get(a, "values[0].identifier");
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
    const availSkus: Set<any> = new Set<any>();
    skus.forEach((s) => availSkus.add(s));
    const uniqueSkuList = Array.from(availSkus).sort(compare);
    setUniqueSkuList(uniqueSkuList);
    setFilterSkuState(uniqueSkuList);
    if (hasCTCtx) {
      setRows(uniqueSkuList);
      getSkuInventory(uniqueSkuList.map(({ id }) => id).join());
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
    let inventoryMap = new Map();
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

        updateCTCtx("inventory", mapToObj(inventoryMap));
      })
      .catch((e) => {
        if (e.status === 404) {
          productId = productId.split(",");
          for (const productIdElement of productId) {
            inventoryMap.set(productIdElement, false);
          }
        }
        setSkuInventory(inventoryMap);

        updateCTCtx("inventory", mapToObj(inventoryMap));

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
  //Product Details Tab (Descriptive Attributes of priduct)
  if (descriptiveAttributeList.length > 0) {
    const tabContent = (
      <div
        id={`product-details-container_${productPartNumber}`}
        className="product-details-container">
        {descriptiveAttributeList.map((e: any) => (
          <StyledTypography
            variant="body1"
            key={`li_${e.identifier}`}
            id={`product_attribute_${productPartNumber}`}>
            <b
              key={`span_name_${e.identifier}`}
              id={`product_desc_attribute_name_${e.identifier}_${productPartNumber}`}>
              {e.name}:
            </b>
            {e.values?.map((value: any) => (
              <span
                id={`product_attribute_value_${value.identifier}_${productPartNumber}`}
                key={value.identifier}>
                {" " + value.value}
              </span>
            ))}
          </StyledTypography>
        ))}
      </div>
    );
    productDetailTabsChildren.push({
      title: translation.productDetailProductDetails,
      tabContent,
    });
  }
  if (attachmentsList.length > 0) {
    attachmentsList.forEach((a) => {
      a.mimeType = /^https?:\/\//.test(a.attachmentAssetPath)
        ? "content/url"
        : a.mimeType || "content/unknown";
    });

    const tabContent = <AttachmentB2BLayout {...{ attachmentsList }} />;
    productDetailTabsChildren.push({
      title: translation.productDetailAttachments,
      tabContent,
    });
  }

  //GA360
  const breadcrumbs = useSelector(breadcrumbsSelector);
  useEffect(() => {
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

  useEffect(() => {
    getProductDetails();
  }, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    parseProducts();
  }, [products]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
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

  useEffect(() => {
    if (pdpData && pdpData.length > 0 && uniqueSkuList.length === 0) {
      getProduct();
      getAssociatedPromotions();
    }
    if (uniqueSkuList.length > 0 && hasCTCtx) setRows(filterSkuState);
  }, [skuAndQuantities, filterSkuState, pdpData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tableData: {
      className: "table-tablet",
      columns: headers,
      detailPanel: needsPanel ? DetailPanel : undefined,
      data: rows,
      t,
      showPanelOnMobile: true,
      labels: { emptyMsg: "productDetail.noproductsToDisplay" },
    },
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
    loginNotRequired,
    addToCart,
    disabledButtonFlag,
    productPartNumber,
    currentProdSelect,
    language,
    defaultCurrencyID,
    SIGNIN,
    isSharedOrder,
  };
};

/**
 * Garnish `Component` with B2B product data
 * @param Component component to garnish
 * @returns garnished `Component`
 */
export const withUseProduct =
  (Component: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }) => {
    const productDetails = useProductB2BDetailsLayout(widget, page, props);
    return productDetails.productPartNumber && productDetails.productData ? (
      <Component productDetails={productDetails} {...props}></Component>
    ) : null;
  };
