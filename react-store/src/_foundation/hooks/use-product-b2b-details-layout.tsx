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
import { clone, cloneDeep, get } from "lodash-es";
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
import rlSvc from "../apis/transaction/requisitionList.service";

import { useSite } from "..//hooks/useSite";
//Custom libraries
import { OFFER, DISPLAY, DEFINING, DESCRIPTIVE, STRING_TRUE, EMPTY_STRING } from "../../constants/common";
import { ATTR_IDENTIFIER } from "../../constants/catalog";
import FormattedPriceDisplay from "../../components/widgets/formatted-price-display";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { loginStatusSelector } from "../../redux/selectors/user";
import { breadcrumbsSelector } from "../../redux/selectors/catalog";
import { GetCategoriesSelector } from "../../redux/selectors/category";
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
import { SellerLink } from "../../components/widgets/seller-link";
import { AddToRequisitionListButton } from "../../components/widgets/add-to-req-list-button";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../redux/actions/success";
import Closed from "@material-ui/icons/ChevronRight";
import Open from "@material-ui/icons/ExpandMoreOutlined";

const OpenDrawer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Closed />
      <StyledTypography variant="caption">{t("OrderItemTable.Labels.showAttrs")}</StyledTypography>
    </>
  );
};
const CloseDrawer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Open />
      <StyledTypography variant="caption">{t("OrderItemTable.Labels.hideAttrs")}</StyledTypography>
    </>
  );
};

const PriceCell = ({ rowData, headers }) => {
  const o = rowData.price.find(({ usage: u, value: v }) => u === OFFER && v !== EMPTY_STRING);
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
      r.price.find(({ usage: u, value: v }) => u === OFFER && v !== EMPTY_STRING),
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
  const ofInterest = rawData.filter((a) => a.usage === DEFINING).filter((a, i) => i > 2);

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
  return <D {...{ data, columns, style, t, labels: { emptyMsg: "Order.NoRecord" } }} />;
};

/**
 * B2B Product display component
 * Displays product defining atrributes, SKUs and it's availability, promotions and other product details.
 * Allows user to choose the product and add it to shopping cart.
 * @param widget
 * @param page
 */

export const useProductB2BDetailsLayout = (widget: Widget, page: Page, props) => {
  const cancels: Canceler[] = [];
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
  const productPartNumber = get(page, "externalContext.identifier", EMPTY_STRING);
  const [productType, setProductType] = useState<string>(EMPTY_STRING);
  const [descriptiveAttributeList, setDescriptiveAttributeList] = useState<Array<object>>([]);
  const [attachmentsList, setAttachmentsList] = useState<any[]>([]);
  const [productData, setProductData] = useState<any>(null);
  const [promotion, setPromotion] = useState<Array<any>>([]);
  const [disabledButtonFlag, setDisabledButtonFlag] = useState<boolean>(false);
  const topCategoriesList = useSelector(GetCategoriesSelector);
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
      CommerceEnvironmentinventoryStatusAvailable: t("CommerceEnvironment.inventoryStatus.Available"),
      CommerceEnvironmentinventoryStatusOOS: t("CommerceEnvironment.inventoryStatus.OOS"),
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
  const isSharedOrder = !cart ? false : cart.orderTypeCode === PRIVATE_ORDER_TYPE ? false : true;
  const [addItemActionTriggered, setAddItemActionTriggered] = useState<boolean>(false);
  const storeId: string = mySite ? mySite.storeID : EMPTY_STRING;
  const [pdpData, setPdpData] = useState<any>(null);
  const location: any = useLocation();
  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : EMPTY_STRING;
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
  const [sellerAttr, setSellerAttr] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const panelExpanderComps = useMemo(
    () => ({
      compShow: OpenDrawer,
      compHide: CloseDrawer,
    }),
    []
  );

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
      const catalogIdentifier: string = mySite ? mySite.catalogID : EMPTY_STRING;
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
      setPdpData(clone(products));
      if (location?.state?.categoryId) {
        categoryIdentifier = location.state.categoryId;
      } else {
        const parentCatalogGroupID = products[0].parentCatalogGroupID;
        if (parentCatalogGroupID) {
          categoryIdentifier = storeUtil.getParentCategoryId(parentCatalogGroupID, topCategoriesList);
        }
      }
      if (categoryIdentifier) {
        const parameters = {
          categoryId: categoryIdentifier,
          contractId: contract,
          currency: defaultCurrencyID,
          storeId: storeId,
          productName: get(products[0], "name", EMPTY_STRING),
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
    const productInfo: any = pdpData[0];
    if (productInfo.type === "product" || productInfo.type === "variant") {
      setProductType(productInfo.type);
      initializeProduct(productInfo);
    } else if (productInfo.type === "item" && productInfo.parentCatalogEntryID) {
      setProductType(productInfo.type);

      const productsId: string[] = [];
      productsId.push(productInfo.parentCatalogEntryID);
      const parameters: any = {
        storeId: storeId,
        id: productsId,
        contractId: contract,
        ...payloadBase,
      };
      productsService
        .findProductsUsingGET(parameters)
        .then((res) => {
          if (res.data.contents?.length) {
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
    const parameters: any = {
      storeId: storeId,
      q: "byProduct",
      qProductId: pdpData[0].id,
      ...payloadBase,
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
  };

  /**
   * Get product details based upon the available attributes
   * @param productInfo
   * @param attr
   */
  const initializeProduct = (productInfo: any, attrs?: any) => {
    const productInfoData = cloneDeep(productInfo);
    const allSkus = get(productInfoData, "items", []);
    let sel;

    allSkus.sort(compare);

    // no need to generate headers if not required
    if (hasCTCtx) {
      const { headers: h, needsPanel: d } = headerFn(productInfoData);
      setHeaders(h);
      setNeedsPanel(d);
    }

    const { desc, defn } = getDescriptiveAndDefiningAttributes(productInfoData);
    if (attrs?.length) {
      sel = initSelectedSKU(productInfoData, attrs);
    }

    if (!mySite.isB2B && productInfoData.seller) {
      setSellerAttr({ name: productInfoData.seller, id: productInfoData.sellerId });
    }

    setProductPrice((sel ?? productInfoData).price);
    setDefiningAttributeList(defn);
    setDescriptiveAttributeList(desc);
    setProductData(productInfoData);
    setAttachmentsList(get(productInfoData, "attachments", []));
    getUniqueSkusAndInventory(allSkus, sel);
  };

  /**
   * Validate SKU based upon the selected attributes
   * @param productInfoData parent product or variant
   * @param attrs pre-selected attributes
   */
  const initSelectedSKU = (productInfoData, attrs: any) => {
    const o = {};

    attrs
      .filter((a) => DEFINING === a.usage)
      .forEach((a) => {
        o[a.identifier] = get(a, "values[0].identifier");
      });

    const skus = filterUniqueSkus(productInfoData.items, o);
    setDisabledButtonFlag(skus.length === 0);

    setAttributeState(objToMap(o));
    setCurrentProdSelect(skus[0]);

    return skus[0];
  };

  /**
   *Get the descriptive and defining attributes
   */
  const getDescriptiveAndDefiningAttributes = (productInfoData) => {
    const desc: any[] = [];
    const defn: any[] = [];
    for (const att of productInfoData.attributes ?? []) {
      if (
        att.usage === DESCRIPTIVE &&
        att.displayable &&
        att.identifier !== ATTR_IDENTIFIER.PickUp &&
        att.storeDisplay !== STRING_TRUE
      ) {
        desc.push(att);
      } else if (att.usage === DEFINING) {
        defn.push(att);
      }
    }

    return { desc, defn };
  };

  const headerFn = useMemo(
    () => (root) => {
      const cellStyle = { verticalAlign: "middle" };
      const defnAttrs =
        root.attributes?.map((a, i) => ({ ...a, __origIdx: i })).filter((a) => a.usage === DEFINING) ?? [];
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

  const objToMap = (obj: any) => {
    const m = new Map();
    Object.entries(obj).forEach(([k, v]) => m.set(k, v));
    return m;
  };

  /**
   * Defining attribute change event handler
   * @param attr
   * @param e
   */
  const onAttributeChange = (attr: string, e: string) => {
    if (e !== translation.productDetailsAny) {
      attributeState.set(attr, e);
    } else {
      attributeState.delete(attr);
    }

    const attrState = mapToObj(attributeState);
    const skus = attributeState.size === 0 ? [...uniqueSkuList] : filterUniqueSkus(uniqueSkuList, attrState);
    const current = attributeState.size === 0 ? null : skus[0];
    const price = attributeState.size === 0 ? productData.price : current.price;

    setFilterSkuState(skus);
    setCurrentProdSelect(current);
    setProductPrice(price);
    setAttributeState(new Map(attributeState));
  };

  /**
   * filter skulist based on the attribut selected
   */
  const filterUniqueSkus = (allSkus, attributeState: any) => {
    const skus: any[] = [];
    const keys = Object.keys(attributeState);

    for (const s of allSkus) {
      const values = s.attributes.reduce((value: any, a: any) => {
        value[a.identifier] = get(a, "values[0].identifier");
        return value;
      }, {});

      if (keys.every((k) => attributeState[k] === values[k])) {
        skus.push(s);
      }
    }

    return skus;
  };

  /**
   * Set the product offer price and display price
   * @param priceArray
   */
  const setProductPrice = (priceArray: any[]) => {
    if (priceArray) {
      for (const price of priceArray) {
        if (price.usage === OFFER && price.value !== EMPTY_STRING) {
          setProductOfferPrice(parseFloat(price.value));
        } else if (price.usage === DISPLAY && price.value !== EMPTY_STRING) {
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
      const parameters: any = {
        errorMessage: translation.productDetailaddToCartErrorMsg,
      };
      dispatch(errorActions.VALIDATION_ERROR_ACTION(parameters));
    }
  };

  const _getItems = useCallback(
    (rows, s2q) => {
      const q: any[] = [];
      const e: any = {};
      const i: any[] = [];
      rows
        .filter((r) => s2q.get(r.partNumber))
        .forEach((r) => {
          i.push(r.id);
          q.push(s2q.get(r.partNumber));
        });

      if (i.length === 0) {
        const errorMessage = t("productDetail.selectSomething");
        dispatch(errorActions.VALIDATION_ERROR_ACTION({ errorMessage }));
        Object.assign(e, { errorMessage });
      }

      return { q, i, e };
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const addToRL = useCallback(
    async (requisitionListId) => {
      const { i: u, q, e } = _getItems(rows, skuAndQuantities);
      let n = 0;
      if (!e.errorMessage) {
        for (let i = 0; i < u.length; ++i) {
          const payload = {
            action: "addConfiguration",
            query: { requisitionListId, quantity: q[i], catEntryId: u[i] },
            ...payloadBase,
          };

          try {
            await rlSvc.performActionOnRequisitionList(payload);
            ++n;
          } catch (e) {
            console.log("Could not add item [%o] with quantity [%o] to list due to error %o", u[i], q[i], e);
          }
        }

        const msg = { key: "success-message.addNItemsSuc", messageParameters: { n: `${n}` } };
        dispatch(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
      }
    },
    [rows, skuAndQuantities] // eslint-disable-line react-hooks/exhaustive-deps
  );

  /**
   * Get the unique SKUs & its inventory details.
   * Unique Skus is sorted in ascending order based on partNumber.
   * Store the details in uniqueSkus array and inventoryMap respectively.
   * @param skus
   */
  const getUniqueSkusAndInventory = (skus: any[], filtered?): void => {
    setUniqueSkuList(skus);
    setFilterSkuState(filtered ? [filtered] : skus);
    if (hasCTCtx) {
      getSkuInventory(skus.map(({ id }) => id).join());
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
    const parameters: any = {
      storeId: storeId,
      productIds: productId,
      ...payloadBase,
    };
    const inventoryMap = new Map();
    inventoryavailabilityService
      .getInventoryAvailabilityByProductId(parameters)
      .then((res) => {
        if (res.data.InventoryAvailability !== undefined && res.data.InventoryAvailability.length > 0) {
          for (const inventory of res.data.InventoryAvailability) {
            inventoryStatus = inventory.inventoryStatus === "Available" ? true : false;
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

  const productDetailTabsChildren: ITabs[] = [];

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
  //Product Details Tab (Descriptive Attributes of product)
  if (descriptiveAttributeList.length > 0) {
    const tabContent = (
      <div id={`product-details-container_${productPartNumber}`} className="product-details-container">
        {descriptiveAttributeList.map((e: any) => (
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
      tabContent,
    });
  }
  if (attachmentsList.length > 0) {
    attachmentsList.forEach((a) => {
      a.mimeType = /^https?:\/\//.test(a.attachmentAssetPath) ? "content/url" : a.mimeType || "content/unknown";
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
  }, [skuAndQuantities, pdpData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (uniqueSkuList.length > 0 && hasCTCtx) {
      setRows(filterSkuState);
    }
  }, [filterSkuState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSeller(<SellerLink {...{ breadcrumbs, sellerAttr }} />);
  }, [sellerAttr, breadcrumbs]);

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
      panelExpanderComps,
      labels: { emptyMsg: "productDetail.noproductsToDisplay" },
    },
    seller,
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
    isB2B: mySite?.isB2B,
    ribbonFinder: storeUtil.getRibbonAdAttrs,
    addToRLButton: <AddToRequisitionListButton {...{ disabled: disabledButtonFlag, addFn: addToRL }} />,
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
