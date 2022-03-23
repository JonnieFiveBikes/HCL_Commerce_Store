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
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import { get, has, uniq } from "lodash-es";

//Foundation libraries
import { useProductValue } from "../context/product-context";
import inventoryavailabilityService from "../apis/transaction/inventoryavailability.service";
import { useSite } from "../hooks/useSite";
import requisitionListService from "../apis/transaction/requisitionList.service";

//Custom libraries
import {
  OFFER,
  DISPLAY,
  DEFINING,
  DESCRIPTIVE,
  EMPTY_STRING,
  AVAILABLE_KEY,
  STRING_TRUE,
} from "../../constants/common";
import { SIGNIN } from "../../constants/routes";
import { ATTR_IDENTIFIER } from "../../constants/catalog";
import FormattedPriceDisplay from "../../components/widgets/formatted-price-display";
import StoreUtil from "../../utils/storeUtil";

//Redux
import * as orderActions from "../../redux/actions/order";
import * as catalogActions from "../../redux/actions/catalog";
import * as successActions from "../../redux/actions/success";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { cartSelector } from "../../redux/selectors/order";
import { loginStatusSelector } from "../../redux/selectors/user";
import { GetCategoriesSelector } from "../../redux/selectors/category";
//UI
import {
  AttachmentLayout,
  StyledTypography,
  ITabs,
  StyledAvatar,
  StyledLink,
  StyledGrid,
  useCustomTable,
  useTableUtils,
  StyledButton,
  TableConstants,
  withCustomTableContext,
  CustomTable,
} from "@hcl-commerce-store-sdk/react-component";

//GA360
import AsyncCall from "../../_foundation/gtm/async.service";
import { WidgetProps } from "../constants/seo-config";
import { PRIVATE_ORDER_TYPE } from "../../constants/order";
import { AddToRequisitionListButton } from "../../components/widgets/add-to-req-list-button";
import storeUtil from "../../utils/storeUtil";

const ProductsSkuCell = ({ rowData, headers }) => {
  const { t } = useTranslation();
  const partNumber = rowData.partNumber ? rowData.partNumber : t("productDetail.Unconfigured");

  const A = (
    <StyledAvatar
      style={{
        margin: "0 0.5rem 0 0",
        border: "1px solid lightgray",
        borderRadius: "0",
      }}
      alt={rowData.name}
      src={rowData.thumbnail}
    />
  );
  const T = (
    <>
      {rowData.name}
      <br />
      {partNumber}
    </>
  );

  return (
    <StyledGrid container>
      <StyledGrid item xs sm style={{ flexGrow: 0 }}>
        {rowData.seo?.href ? <StyledLink to={rowData.seo.href}>{A}</StyledLink> : <>{A}</>}
      </StyledGrid>
      <StyledGrid item xs={12} sm>
        <StyledTypography variant="body2" style={{ wordBreak: "break-word" }}>
          {rowData.seo?.href ? <StyledLink to={rowData.seo.href}>{T}</StyledLink> : <>{T}</>}
        </StyledTypography>
      </StyledGrid>
    </StyledGrid>
  );
};

const QuantityCell = ({ rowData }) => {
  //bitwise or operator that can be used to truncate floating point
  const quantity = rowData.quantity | 0;

  return (
    <StyledGrid container>
      <StyledGrid item xs={12} sm>
        <StyledTypography variant="body2" style={{ wordBreak: "break-word" }}>
          {quantity}
        </StyledTypography>
      </StyledGrid>
    </StyledGrid>
  );
};

/**
 * Product Display component
 * displays product defining atrributes, descriptive atrributes, availability, promotions etc.
 * @param page
 */
const useKit = (props) => {
  const { hasCTCtx, page } = props;
  const location: any = useLocation();
  const loginStatus = useSelector(loginStatusSelector);
  const productPartNumber = page?.externalContext?.identifier ?? EMPTY_STRING;
  const { mySite } = useSite();
  const storeId = mySite?.storeID ?? EMPTY_STRING;
  const defaultCurrencyID = mySite?.defaultCurrencyID ?? EMPTY_STRING;
  const cancels: Canceler[] = useMemo(() => [], []);
  const CancelToken = Axios.CancelToken;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isB2B = mySite?.isB2B;
  const { tableState, setTableState } = useCustomTable();
  const { setCurrentContextValue, getCurrentContext, getValueForCell, setValueForCell } = useTableUtils();
  const [headers, setHeaders] = useState<any[]>([]);
  const [needsPanel, setNeedsPanel] = useState<any>(false);
  const [rows, setRows] = useState<any[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const topCategoriesList = useSelector(GetCategoriesSelector);
  const [kit, setKit] = useState<any>(null);
  const { getMerchandisingAssociationDetails, fetchProductDetails, products } = useProductValue();

  // only specified for sku-list to update the custom-table context
  const updateCTCtx = useCallback(
    (k, v) => {
      if (hasCTCtx) setCurrentContextValue(k, v, tableState, setTableState);
    },
    [hasCTCtx, setCurrentContextValue, tableState, setTableState]
  );

  const [onlineStoreInventory, setOnlineStoreInventory] = useState<any>({});
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [availabilityImageText, setAvailabilityImageText] = useState<any>(null);

  const loginNotRequired = useMemo(() => {
    const rc = loginStatus || !isB2B;
    updateCTCtx("loginNotRequired", rc);
    return rc;
  }, [isB2B, loginStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const isProdOrVar = useCallback(
    ({ numberOfSKUs: n, catalogEntryTypeCode: c }) => parseInt(n) > 1 && (c === "ProductBean" || c === "VariantBean"),
    []
  );

  const [catentryId, setCatentryId] = useState<string>(EMPTY_STRING);
  const [displayName, setDisplayName] = useState<string>(EMPTY_STRING);
  const [displayShortDesc, setDisplayShortDesc] = useState<string>(EMPTY_STRING);
  const [displayOfferPrice, setDisplayOfferPrice] = useState<number>(0);
  const [displayListPrice, setDisplayListPrice] = useState<number>(0);
  const [displayFullImage, setDisplayFullImage] = useState<string>(EMPTY_STRING);
  const [displayLongDesc, setDisplayLongDesc] = useState<string>(EMPTY_STRING);
  const [displayCompDesc, setDisplayCompDesc] = useState<string[]>([]);
  const [displayDescriptiveAttrList, setDisplayDescriptiveAttrList] = useState<any[]>([]);
  const [definingAttrs, setDefiningAttrs] = React.useState<any[]>([]);
  const [attachmentsList, setAttachmentsList] = useState<any[]>([]);
  const contract = useSelector(currentContractIdSelector);
  const payloadBase: any = useMemo(
    () => ({
      storeId: storeId,
      cancelToken: new CancelToken((c) => cancels.push(c)),
    }),
    [cancels, storeId, CancelToken]
  );
  const cart = useSelector(cartSelector);
  const isSharedOrder = !cart ? false : cart.orderTypeCode === PRIVATE_ORDER_TYPE ? false : true;
  const [addItemActionTriggered, setAddItemActionTriggered] = useState<boolean>(false);
  const xltn = useMemo(
    () => ({
      productDetailsAddKitToCart: t("productDetail.AddKitToCart"),
      productDetailaddKitToSharedOrder: t("productDetail.AddKitToSharedOrder"),
      productDetailsSelectAttributes: t("productDetail.SelectAttributes"),
      productDetailsPRODUCTSKU: t("productDetail.PRODUCTSKU"),
      productDetailnoproductsToDisplay: t("productDetail.noproductsToDisplay"),
      productDetailSKU: t("productDetail.SKU"),
      productDetailaddToCurrentOrder: isB2B ? t("productDetail.AddKitToCart") : t("productDetail.AddToCart"),
      productDetailSignIn: t("productDetail.SignIn"),
      productDetailPrice: t("productDetail.Price"),
      productDetailQuantity: t("productDetail.Quantity"),
      productDetailOnline_Availability: t("productDetail.Online_Availability"),
      productDetailDescription: t("productDetail.Description"),
      productDetailAttachments: t("productDetail.Attachments"),
      productDetailPriceDisplayPending: t("PriceDisplay.Labels.Pending"),
      productDetailSelectAnOption: t("productDetail.SelectAnOption"),
      productDetailUnconfigured: t("productDetail.Unconfigured"),
      productDetailUnavailable: t("productDetail.Unavailable"),
      productDetailInStock: t("productDetail.InStock"),
      productDetailaddToCartErrorMsg: t("productDetail.addToCartErrorMsg"),
    }),
    [t, isB2B]
  );

  const DetailPanel = ({ rowData }) => {
    const { t } = useTranslation();
    const cellStyle = { verticalAlign: "middle" };
    // generate headers array
    const columns = rowData?.defAttrs.map((a, i) => ({
      title: a.name,
      idProp: "name",
      keyLookup: { key: `attr_${i}_value` },
      display: {
        cellStyle,
      },
    }));

    // generate single row out of all attribute values
    const data = [
      rowData?.defAttrs.reduce((n, v, i) => {
        n[`attr_${i}_value`] = storeUtil.csValue(
          get(v, "values[0].value", t("CommerceEnvironment.inventoryStatus.NA"))
        );
        return n;
      }, {}),
    ];

    const className = "detailPanel table-tablet";
    const style = { width: "auto", border: "0" };
    const D = useMemo(() => withCustomTableContext(CustomTable), []);

    return columns.length > 0 ? (
      <D
        {...{
          t,
          data,
          columns,
          style,
          className,
          labels: { emptyMsg: "productDetail.noAttributes" },
        }}
      />
    ) : null;
  };

  /**
   * Get product information based on its type
   */
  const initProduct = (catentry: any) => {
    const { components: comps } = catentry ?? {};
    const nonPaneled: any[] = [];

    setDisplayInfo(catentry);

    if (comps?.length > 0) {
      const skus: any[] = [];

      const containers = comps.map((comp, index) => {
        const c = { desc: [], defn: [], attrState: {} };
        getDescriptiveAndDefiningAttributes(c, comp);

        const isSingleSkuProduct = parseInt(comp.numberOfSKUs) === 1;
        const isProduct = isProdOrVar(comp);
        const copy = {
          ...(isSingleSkuProduct ? comp.sKUs[0] : comp),
          __rowId__: index,
        };

        if (isSingleSkuProduct) {
          copy["quantity"] = comp.quantity;
        }

        if (!isProduct) {
          skus.push(copy.uniqueID);
        }

        if (c.defn.length === 0) {
          nonPaneled.push(index);
        }

        copy["type"] = isProduct ? "multipleSkus" : "sku";
        copy["rowNumber"] = index;
        copy["isOneSku"] = isProduct ? undefined : true;
        copy["defAttrs"] = c.defn;

        rows[index] = copy;

        return c;
      });

      setDefiningAttrs(containers.map(({ defn: d }) => d));

      const { headers: h, needsPanel: d } = headerFn();
      setHeaders(h);
      setNeedsPanel(d);
      setRows(rows);
      nonPaneled.forEach((k) => {
        setValueForCell(TableConstants.NOPANEL, true, rows[k], h, tableState, () => {
          return;
        });
      });
      setTableState({ ...tableState });
    }
    setCatentryId(catentry.id);
    getKitInventory(catentry.id);
    setInitialized(true);
  };

  /**
   * Set the display information on the page using the specified catentry data
   * @param catentry Catentry info to use for display; either item/product/variant
   * @param productInfo Product data to fall back to if needed
   */
  const setDisplayInfo = (catentry: any) => {
    setDisplayName(catentry.name ?? EMPTY_STRING);
    setDisplayShortDesc(catentry.shortDescription ?? EMPTY_STRING);
    setDisplayLongDesc(catentry.longDescription ?? EMPTY_STRING);
    setDisplayPrices(catentry.price ?? []);
    getDescriptiveAttributes(catentry.attributes ?? []);
    setAttachmentsList(catentry.attachments ?? []);
    setKit(catentry);

    if (catentry.components?.length > 1) {
      setDisplayCompDesc(uniq(catentry.components.map(({ name: n }) => n)));
    }

    if (catentry.fullImage && catentry.thumbnail) {
      setDisplayFullImage(isB2B ? catentry.thumbnail : catentry.fullImage);
    }
  };

  /**
   *Get the descriptive and defining attributes
   */
  const getDescriptiveAndDefiningAttributes = (container, src) => {
    const { desc, defn, attrState } = container;
    const attrs = src.attributes ?? [];

    attrs.forEach((att) => {
      if (
        att.usage === DESCRIPTIVE &&
        att.displayable &&
        att.identifier !== ATTR_IDENTIFIER.PickUp &&
        att.storeDisplay !== STRING_TRUE
      ) {
        desc.push(att);
      } else if (att.usage === DEFINING) {
        defn.push(att);
        if (parseInt(src.numberOfSKUs) === 1 || !has(src, "numberOfSKUs")) {
          attrState[att.identifier] = att.values[0].value;
        } else {
          attrState[att.identifier] = "0";
        }
      }
    });
  };

  const skuCalculator = useCallback(({ rowData }) => {
    const { name, partNumber } = rowData;
    const second = partNumber ? partNumber : t("productDetail.Unconfigured");
    return `${name}.${second}`;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const qCalculator = useCallback(({ rowData: r, tableState: s }) => {
    // use headers from context -- we supply this function into the local headers, so this makes it
    //   a dep of headers, but we also need latest headers here, so that makes headers a dep of this
    //   -- we need to avoid this recursive dep so we'll just fetch the latest headers from context
    const h = get(getCurrentContext(s), "headers", []);
    const rc = getValueForCell("quantity", r, h, s) ?? parseInt(r.quantity);
    return rc;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const headerFn = useMemo(
    () => () => {
      const cellStyle = { verticalAlign: "middle" };
      const needsPanel = true;

      const headers = [
        {
          title: t("productDetail.PRODUCTSKU"),
          idProp: "__rowId__",
          keyLookup: { key: "partNumber" },
          display: {
            cellStyle,
            template: ProductsSkuCell,
          },
          sortable: { fn: skuCalculator },
        },
        {
          title: t("productDetail.QUANTITY"),
          keyLookup: { key: "quantity" },
          display: {
            cellStyle,
            template: QuantityCell,
          },
          sortable: { fn: qCalculator, numeric: true },
        },
      ];
      return { needsPanel, headers };
    },
    [t] // eslint-disable-line react-hooks/exhaustive-deps
  );

  /**
   * Get the descriptive attributes
   */
  const getDescriptiveAttributes = (attributesArray: any[]) => {
    const f = attributesArray.filter(
      (att) =>
        att.usage === DESCRIPTIVE &&
        att.displayable &&
        att.identifier !== ATTR_IDENTIFIER.PickUp &&
        att.storeDisplay !== STRING_TRUE
    );
    setDisplayDescriptiveAttrList(f);
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
        if (price.usage === OFFER && price.value !== EMPTY_STRING) {
          offer = price.value;
        } else if (price.usage === DISPLAY && price.value !== EMPTY_STRING) {
          list = price.value;
        }
      }
      setDisplayOfferPrice(parseFloat(offer));
      setDisplayListPrice(parseFloat(list));
    }
  };

  /**
   *Add the product and its quantities to the shopping cart
   */
  const addToCart = useCallback(() => {
    if (productQuantity > 0) {
      const param = {
        partnumber: productPartNumber,
        quantity: productQuantity,
        contractId: contract,
        ...payloadBase,
      };
      dispatch(orderActions.ADD_ITEM_ACTION(param));
      setAddItemActionTriggered(true);
    }
  }, [contract, productQuantity, productPartNumber, dispatch, payloadBase]);

  const setAvailabilityImage = () => {
    const inventoryAvailable = onlineStoreInventory.inventoryStatus === AVAILABLE_KEY ? true : false;

    const someWithNoAvlSelZero = !inventoryAvailable && productQuantity > 0;
    const someWithNotEnough = inventoryAvailable && parseInt(onlineStoreInventory.availableQuantity) < productQuantity;

    const avl = {
      src: "/SapphireSAS/images/Available.png",
      text: t("CommerceEnvironment.inventoryStatus.Available"),
    };
    const oos = {
      src: "/SapphireSAS/images/Unavailable.png",
      text: t("CommerceEnvironment.inventoryStatus.OOS"),
    };
    const unAvl = {
      src: "/SapphireSAS/images/Unavailable.png",
      text: t("CommerceEnvironment.inventoryStatus.NA"),
    };

    if (someWithNoAvlSelZero) {
      setAvailabilityImageText(oos);
    } else if (someWithNotEnough) {
      setAvailabilityImageText(unAvl);
    } else {
      setAvailabilityImageText(avl);
    }
  };

  const AddKitButton = useCallback(
    () => {
      const inventoryAvailable = onlineStoreInventory.inventoryStatus === AVAILABLE_KEY ? true : false;
      const someWithNoAvlSelZero = !inventoryAvailable && productQuantity > 0;
      const someWithNotEnough =
        inventoryAvailable && parseInt(onlineStoreInventory.availableQuantity) < productQuantity;
      const disabled = someWithNoAvlSelZero || someWithNotEnough || !displayOfferPrice;

      const addKitToRequisitionList = async (requisitionListId) => {
        const payload = {
          action: "addConfiguration",
          query: { requisitionListId, quantity: productQuantity, catEntryId: catentryId },
          ...payloadBase,
        };
        await requisitionListService.performActionOnRequisitionList(payload);
        try {
          const msg = { key: "success-message.addItemListSuccessfully" };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(msg));
        } catch (e) {
          console.log("Could not add to list", e);
        }
      };

      return (
        <StyledGrid container item xs={12} spacing={1} alignItems="center" className="button-combo">
          <StyledGrid item>
            <StyledButton
              testId={loginNotRequired ? "add-to-cart" : "sign-in-continue"}
              color="primary"
              size="small"
              className="top-margin-1"
              id="kit-add-to-cart"
              disabled={disabled}
              onClick={loginNotRequired ? addToCart : undefined}
              component={loginNotRequired ? undefined : Link}
              to={loginNotRequired ? undefined : SIGNIN}>
              {loginNotRequired
                ? isSharedOrder
                  ? xltn.productDetailaddKitToSharedOrder
                  : xltn.productDetailaddToCurrentOrder
                : xltn.productDetailSignIn}
            </StyledButton>
          </StyledGrid>
          {loginStatus && isB2B ? (
            <StyledGrid item xs={12} sm="auto">
              <AddToRequisitionListButton {...{ disabled, addFn: addKitToRequisitionList }} />
            </StyledGrid>
          ) : null}
        </StyledGrid>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      loginNotRequired,
      loginStatus,
      isB2B,
      isSharedOrder,
      xltn,
      catentryId,
      addToCart,
      onlineStoreInventory,
      productQuantity,
      displayOfferPrice,
    ]
  );

  /**
   * get the Kit's inventory details.
   * Stores the availabilty data in onlineStoreInventory.
   * @param productId
   */
  const getKitInventory = (catentryId: string) => {
    const parameters: any = {
      ...payloadBase,
      productIds: catentryId,
    };

    inventoryavailabilityService
      .getInventoryAvailabilityByProductId(parameters)
      .then((res) => {
        if (res.data.InventoryAvailability !== undefined) {
          const selectedStoreInventory = res.data.InventoryAvailability.find(
            (inventory: any) => inventory.onlineStoreId === storeId
          );
          setOnlineStoreInventory(selectedStoreInventory);
        }
      })
      .catch((e) => {
        console.log("Could not retrieve Inventory Details", e);
      });
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

      initProduct(inputCatentryData);
      if (inputCatentryData.attachments?.length > 0) {
        setAttachmentsList(inputCatentryData.attachments);
      }

      if (location?.state?.categoryId) {
        categoryIdentifier = location.state.categoryId;
      } else {
        const parentCatalogGroupID = inputCatentryData.parentCatalogGroupID;
        if (parentCatalogGroupID) {
          categoryIdentifier = StoreUtil.getParentCategoryId(parentCatalogGroupID, topCategoriesList);
        }
      }

      if (categoryIdentifier) {
        const parameters = {
          categoryId: categoryIdentifier,
          contractId: contract,
          currency: defaultCurrencyID,
          storeId: storeId,
          productName: inputCatentryData.name || EMPTY_STRING,
          ...payloadBase,
        };
        dispatch(catalogActions.getProductListForPDPAction({ parameters }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const productDetailTabsChildren: ITabs[] = [];

  if (displayLongDesc) {
    const tabContent = (
      <>
        <StyledTypography component="div" style={{ maxWidth: "65ch" }}>
          {HTMLReactParser(displayLongDesc)}
        </StyledTypography>
        {displayCompDesc && (
          <ul>
            {displayCompDesc.map((v, key) => (
              <li {...{ key }}>{v}</li>
            ))}
          </ul>
        )}
      </>
    );

    productDetailTabsChildren.push({
      title: t("productDetail.Description"),
      tabContent,
    });
  }

  if (displayDescriptiveAttrList.length > 0) {
    const tabContent = (
      <div id={`product-details-container_${productPartNumber}`} className="product-details-container">
        {displayDescriptiveAttrList.map((e: any) => (
          <StyledTypography key={`li_${e.identifier}`} id={`product_attribute_${productPartNumber}`}>
            <b
              key={`span_name_${e.identifier}`}
              id={`product_desc_attribute_name_${e.identifier}_${productPartNumber}`}>
              {e.name}:
            </b>
            {e.values.map((value: any) => (
              <span id={`product_attribute_value_${value.identifier}_${productPartNumber}`} key={value.identifier}>
                {" " + value.value}
              </span>
            ))}
          </StyledTypography>
        ))}
      </div>
    );

    productDetailTabsChildren.push({
      title: t("productDetail.ProductDetails"),
      tabContent,
    });
  }

  if (attachmentsList.length > 0) {
    const tabContent = <AttachmentLayout {...{ attachmentsList, productPartNumber }} />;
    productDetailTabsChildren.push({
      title: t("productDetail.Attachments"),
      tabContent,
    });
  }

  /**
   * Product quantity input field value change event handler
   * @param e
   */
  const updateProductQuantity = (e: number) => {
    setProductQuantity(e);
    getKitInventory(catentryId);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => cancels.forEach((cancel) => cancel()), []);

  useEffect(() => {
    setRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  useEffect(() => {
    if (mySite) {
      getProductDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  useEffect(() => {
    parseProducts();
  }, [products]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setAvailabilityImage();
  }, [onlineStoreInventory, productQuantity]); // eslint-disable-line react-hooks/exhaustive-deps

  //GA360
  useEffect(() => {
    if (addItemActionTriggered) {
      //GA360
      if (mySite.enableGA) {
        AsyncCall.sendAddToCartEvent(
          { cart, currentSelection: rows },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
      }
      setAddItemActionTriggered(false);
    }
  }, [cart, rows]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // save headers in context for some of sorting function to reference (avoid recursive refs)
    setCurrentContextValue("headers", headers, tableState, setTableState);
  }, [headers]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    tableData: {
      columns: headers,
      detailPanel: needsPanel ? DetailPanel : undefined,
      data: rows,
      t,
      showPanelOnMobile: true,
      labels: { emptyMsg: "productDetail.noproductsKit" },
    },
    productPartNumber: initialized ? productPartNumber : undefined,
    displayName,
    translation: xltn,
    displayShortDesc,
    displayOfferPrice,
    displayListPrice,
    productDetailTabsChildren,
    addKitButton: <AddKitButton />,
    definingAttrs,
    displayFullImage,
    FormattedPriceDisplay,
    productQuantity,
    updateProductQuantity,
    availabilityImageText,
    kit,
    ribbonFinder: StoreUtil.getRibbonAdAttrs,
  };
};

export const withKitWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  (props: any) => {
    const productDetailsWid = useKit(props);
    return <WrapComponent {...productDetailsWid}></WrapComponent>;
  };
