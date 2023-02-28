/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020,2021
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
import { get, has, isEqual, set, uniq } from "lodash-es";

//Foundation libraries
import { useProductValue } from "../../../../_foundation/context/product-context";
import inventoryavailabilityService from "../../../../_foundation/apis/transaction/inventoryavailability.service";
import { useSite } from "../../../../_foundation/hooks/useSite";
import wishListService from "../../../../_foundation/apis/transaction/wishList.service";
import { useStoreLocatorValue } from "../../../../_foundation/context/store-locator-context";
import rlSvc from "../../../../_foundation/apis/transaction/requisitionList.service";
//Custom libraries
import {
  OFFER,
  DISPLAY,
  DEFINING,
  DESCRIPTIVE,
  STRING_TRUE,
  EMPTY_STRING,
  AVAILABLE_KEY,
} from "../../../../constants/common";
import { SIGNIN } from "../../../../constants/routes";
import { ATTR_IDENTIFIER } from "../../../../constants/catalog";
import FormattedPriceDisplay from "../../../widgets/formatted-price-display";
import { SellerLink } from "../../../widgets/seller-link";
import StoreUtil from "../../../../utils/storeUtil";
import { AddToWishListButton } from "../../../widgets/add-to-wish-list-button";

//Redux
import * as orderActions from "../../../../redux/actions/order";
import * as catalogActions from "../../../../redux/actions/catalog";
import * as errorActions from "../../../../redux/actions/error";
import * as wishListActions from "../../../../redux/actions/wish-list";
import { currentContractIdSelector } from "../../../../redux/selectors/contract";
import { cartSelector } from "../../../../redux/selectors/order";
import { loginStatusSelector } from "../../../../redux/selectors/user";
import { GetCategoriesSelector } from "../../../../redux/selectors/category";
import { breadcrumbsSelector } from "../../../../redux/selectors/catalog";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../../../redux/actions/success";
import { sellersSelector } from "../../../../redux/selectors/sellers";

//UI
import {
  AttachmentLayout,
  StyledTypography,
  ITabs,
  StyledNumberInput,
  StyledProductImage,
  StyledAvatar,
  StyledLink,
  StyledGrid,
  useCustomTable,
  useTableUtils,
  StyledB2BDetailPanel,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
  StyledButton,
  TableConstants,
  StyledTextLink,
} from "@hcl-commerce-store-sdk/react-component";

//GA360
import AsyncCall from "../../../../_foundation/gtm/async.service";
import { WidgetProps } from "../../../../_foundation/constants/seo-config";
import { PRIVATE_ORDER_TYPE, SHIPMODE } from "../../../../constants/order";
import { AddToRequisitionListButton } from "../../../widgets/add-to-req-list-button";
import { useStoreShippingModeValue } from "../../../../_foundation/context/store-shipping-mode-context";

const isProdOrVar = ({ numberOfSKUs: n, catalogEntryTypeCode: c }) =>
  parseInt(n) > 1 && (c === "ProductBean" || c === "VariantBean");

const useAddToCartButton = (rows, getCurrentContext, getValueForCell, tableState, headers, selectedStore) => {
  const ctx = getCurrentContext(tableState);
  const physicalStoreId = selectedStore?.id;
  let someWithNoSkus = false,
    someWithNoAvlSelZero = false,
    someWithNotEnough = false;

  let invalidOnline = false;
  let invalidStore = physicalStoreId ? false : true;
  const someInvalid = rows.some((r) => {
    const q = getValueForCell("quantity", r, headers, tableState) ?? parseInt(r.quantity);
    if (!isProdOrVar(r) || r.selectedSku) {
      const id = isProdOrVar(r) ? r.selectedSku.uniqueID + "_" + r.selectedSku.sellerId : r.uniqueID + "_" + r.sellerId;
      const iv = get(ctx, `inventory.${id}`, {});

      someWithNoAvlSelZero = someWithNoAvlSelZero || (!iv.available && q > 0);
      someWithNotEnough = someWithNotEnough || (iv.available && parseInt(iv.quantity) < q);
      invalidOnline = invalidOnline || (!iv.available && q > 0) || (iv.available && parseInt(iv.quantity) < q);

      if (physicalStoreId) {
        //if invalid then check physicalStore inventory
        const idp = isProdOrVar(r)
          ? r.selectedSku.uniqueID + "_" + physicalStoreId
          : r.uniqueID + "_" + physicalStoreId;
        const ivp = get(ctx, `inventory.${idp}`, {});
        invalidStore = invalidStore || (!ivp.available && q > 0) || (ivp.available && parseInt(ivp.quantity) < q);
      }
    } else if (q > 0) {
      someWithNoSkus = true;
      if (physicalStoreId) {
        invalidStore = true;
      }
      invalidOnline = true;
    }
    return invalidOnline && invalidStore;
  });

  const disabled =
    someInvalid ||
    rows.reduce((t, r) => {
      t += getValueForCell("quantity", r, headers, tableState) ?? parseInt(r.quantity);
      return t;
    }, 0) === 0;

  return {
    disabled,
    someWithNoSkus,
    someWithNoAvlSelZero,
    someWithNotEnough,
    invalidOnline,
    invalidStore,
  };
};

const PriceCell = ({ rowData, _headers }) => {
  const o = rowData.price.find(({ usage: u, value: v }) => u === OFFER && v !== EMPTY_STRING);
  const offerPrice = o ? parseFloat(o.value) : 0;
  const disp = offerPrice > 0 ? offerPrice : null;
  return <FormattedPriceDisplay min={disp} />;
};

const ProductsSkuCell = ({ rowData, headers }) => {
  const { t } = useTranslation();
  const partNumber = rowData.selectedSku
    ? rowData.selectedSku.partNumber
    : rowData.type === "sku"
    ? rowData.partNumber
    : t("productDetail.Unconfigured");
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

const AvailabilityCell = ({ rowData, headers }) => {
  const { storeLocator } = useStoreLocatorValue();
  const selectedStore = useMemo(() => storeLocator.selectedStore, [storeLocator]);
  const { getCurrentContext, getValueForCell, getRowKey } = useTableUtils();
  const { tableState: ts, setTableState: fTs } = useCustomTable();
  const { t } = useTranslation();
  const k = getRowKey(rowData, headers);
  const itemProp = "image";
  const avl = {
    src: "/SapphireSAS/images/Available.png",
    text: "CommerceEnvironment.inventoryStatusOnline.Available",
  };
  const oos = {
    src: "/SapphireSAS/images/Unavailable.png",
    text: "CommerceEnvironment.inventoryStatusOnline.OOS",
  };
  const unAvl = {
    src: "/SapphireSAS/images/Unavailable.png",
    text: "CommerceEnvironment.inventoryStatusOnline.NA",
  };
  const avlp = {
    src: "/SapphireSAS/images/Available.png",
    text: "CommerceEnvironment.inventoryStatusStore.Available",
  };
  const oosp = {
    src: "/SapphireSAS/images/Unavailable.png",
    text: "CommerceEnvironment.inventoryStatusStore.OOS",
  };
  const unAvlp = {
    src: "/SapphireSAS/images/Unavailable.png",
    text: "CommerceEnvironment.inventoryStatusStore.NA",
  };
  const selectAttr = {
    src: "",
    text: "productDetail.SelectAttributes",
  };
  const id = rowData.selectedSku
    ? rowData.selectedSku.uniqueID + "_" + rowData.selectedSku.sellerId
    : rowData.uniqueID + "_" + rowData.sellerId;
  const iv = get(getCurrentContext(ts), `inventory.${id}`, {});
  const q = getValueForCell("quantity", rowData, headers, ts) ?? parseInt(rowData.quantity);

  const physicalStoreId = selectedStore?.id;
  let idp;
  let ivp;
  if (physicalStoreId) {
    idp = rowData.selectedSku
      ? rowData.selectedSku.uniqueID + "_" + physicalStoreId
      : rowData.uniqueID + "_" + physicalStoreId;
    ivp = get(getCurrentContext(ts), `inventory.${idp}`, {});
  }

  const cStatus = (iv: any, rowData: any, _physicalStore = false) => {
    if (rowData.selectedSku) {
      if (rowData.selectedSku.type === "sku") {
        if (!iv.available) {
          return _physicalStore ? oosp : oos;
        } else if (parseInt(iv.quantity) < q) {
          return _physicalStore ? unAvlp : unAvl;
        } else {
          return _physicalStore ? avlp : avl;
        }
      }
    } else if (rowData.type === "sku") {
      if (!iv.available) {
        return _physicalStore ? oosp : oos;
      } else if (parseInt(iv.quantity) < q) {
        return _physicalStore ? unAvlp : unAvl;
      } else {
        return _physicalStore ? avlp : avl;
      }
    }
    return null;
  };
  const status = cStatus(iv, rowData) || selectAttr;
  let statusp;
  //physical store
  if (physicalStoreId) {
    statusp = cStatus(ivp, rowData, true);
  }

  return (
    <StyledGrid container alignItems="center" spacing={1}>
      <StyledGrid container item spacing={1} justifyContent="flex-start">
        {status.src && (
          <StyledGrid component="span" item>
            <StyledProductImage {...{ itemProp, src: status.src }} style={{ verticalAlign: "text-bottom" }} />
          </StyledGrid>
        )}
        <StyledGrid component="span" item>
          {status.src ? (
            <StyledTypography>{HTMLReactParser(t(status.text))}</StyledTypography>
          ) : (
            <StyledTextLink
              data-testid={`select-attributes-${rowData.partNumber}-link`}
              label={t(status?.text)}
              onClick={() => {
                const newState = !get(ts, `${k}.${TableConstants.PANEL}`, false);
                set(ts, `${k}.${TableConstants.PANEL}`, newState);
                fTs({ ...ts });
              }}
            />
          )}
        </StyledGrid>
        {iv.available && (
          <StyledGrid component="span" item>
            <StyledTypography>({parseInt(iv.quantity)})</StyledTypography>
          </StyledGrid>
        )}
      </StyledGrid>
      {physicalStoreId && statusp ? (
        <StyledGrid container item spacing={1} justifyContent="flex-start">
          {statusp.src && (
            <StyledGrid component="span" item>
              <StyledProductImage {...{ itemProp, src: statusp.src }} style={{ verticalAlign: "text-bottom" }} />
            </StyledGrid>
          )}
          <StyledGrid component="span" item>
            {statusp.src ? (
              <StyledTypography>{HTMLReactParser(t(statusp.text, { store: ivp.storeName }))}</StyledTypography>
            ) : null}
          </StyledGrid>
          {ivp.available && (
            <StyledGrid component="span" item>
              <StyledTypography>({parseInt(ivp.quantity)})</StyledTypography>
            </StyledGrid>
          )}
        </StyledGrid>
      ) : null}
    </StyledGrid>
  );
};

const QuantityCell = ({ rowData: r, headers: h }) => {
  const { getCurrentContext, getValueForCell, setValueForCell } = useTableUtils();
  const { tableState: s, setTableState: f } = useCustomTable();
  const price = parseFloat(
    get(
      r.price.find(({ usage: u, value: v }) => u === OFFER && v !== EMPTY_STRING),
      "value",
      "0"
    )
  );
  const value = getValueForCell("quantity", r, h, s);
  const key = r.selectedSku ? r.selectedSku.partNumber : r.partNumber;
  const ctx = getCurrentContext(s);

  const disabled = !ctx.loginNotRequired || price <= 0 || r.buyable !== STRING_TRUE;

  const fn = (q: number, _key: string) => {
    if (Number.isInteger(q) && q >= 0) {
      setValueForCell("quantity", q, r, h, s, f);
    } else {
      setValueForCell("quantity", undefined, r, h, s, f);
    }
  };

  return (
    <StyledNumberInput
      value={value ?? r.quantity}
      min={0}
      strict={true}
      disabled={disabled}
      onChange={(q) => fn(q, key)}
      debounceTiming={100}
    />
  );
};

/**
 * Product Display component
 * displays product defining atrributes, descriptive atrributes, availability, promotions etc.
 * @param page
 */
const useBundle = (props) => {
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
  const [bundle, setBundle] = useState<any>(null);
  const { getMerchandisingAssociationDetails, fetchProductDetails, products } = useProductValue();
  const [catIdentifier, setCatIdentifier] = useState<string>(EMPTY_STRING);
  const [sellerAttr, setSellerAttr] = React.useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const breadcrumbs = useSelector(breadcrumbsSelector);
  const { storeLocator } = useStoreLocatorValue();
  const selectedStore = useMemo(() => storeLocator.selectedStore, [storeLocator]);

  // only specified for sku-list to update the custom-table context
  const updateCTCtx = useCallback(
    (k, v) => {
      if (hasCTCtx) setCurrentContextValue(k, v, tableState, setTableState);
    },
    [hasCTCtx, setCurrentContextValue, tableState, setTableState]
  );

  const loginNotRequired = useMemo(() => {
    const rc = loginStatus || !isB2B;
    updateCTCtx("loginNotRequired", rc);
    return rc;
  }, [isB2B, loginStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    disabled: addToCartDisabled,
    someWithNoSkus,
    someWithNoAvlSelZero,
    someWithNotEnough,
    invalidOnline,
  } = useAddToCartButton(rows, getCurrentContext, getValueForCell, tableState, headers, selectedStore);
  const { storeShippingMode } = useStoreShippingModeValue();

  const skuCalculator = useCallback(({ rowData }) => {
    const { name, selectedSku: s, type, partNumber } = rowData;
    const second = s ? s.partNumber : type === "sku" ? partNumber : t("productDetail.Unconfigured");
    return `${name}.${second}`;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // memoized function for client side sort value for price column
  const priceCalculator = useCallback(({ rowData: row }) => {
    const { price: p } = row;
    const o = p.find(({ usage: u, value: v }) => u === OFFER && v);
    const offerPrice = o ? parseFloat(o.value) : 0;
    return offerPrice > 0 ? offerPrice : EMPTY_STRING;
  }, []);

  // memoized function for client side sort value for online-availability column
  const oaCalculator = useCallback(
    ({ rowData: r, tableState: s }) => {
      const avl = t("CommerceEnvironment.inventoryStatusOnline.Available");
      const oos = t("CommerceEnvironment.inventoryStatusOnline.OOS");
      const unAvl = t("CommerceEnvironment.inventoryStatusOnline.NA");
      const selAtt = t("productDetail.SelectAttributes");
      const id = r.selectedSku ? r.selectedSku.uniqueID + "_" + r.selectedSku.sellerId : r.uniqueID + "_" + r.sellerId;
      const h = get(getCurrentContext(s), "headers", []);
      const q = getValueForCell("quantity", r, h, s) ?? parseInt(r.quantity);
      const iv = get(getCurrentContext(s), `inventory.${id}`, {});
      let status;

      if (r.selectedSku) {
        if (r.selectedSku.type === "sku") {
          if (!iv.available) {
            status = oos;
          } else if (parseInt(iv.quantity) < q) {
            status = unAvl;
          } else {
            status = avl;
          }
        } else {
          status = selAtt;
        }
      } else if (r.type === "sku") {
        if (!iv.available) {
          status = oos;
        } else if (parseInt(iv.quantity) < q) {
          status = unAvl;
        } else {
          status = avl;
        }
      } else {
        status = selAtt;
      }

      return status;
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const qCalculator = useCallback(({ rowData: r, tableState: s }) => {
    // use headers from context -- we supply this function into the local headers, so this makes it
    //   a dep of headers, but we also need latest headers here, so that makes headers a dep of this
    //   -- we need to avoid this recursive dep so we'll just fetch the latest headers from context
    const h = get(getCurrentContext(s), "headers", []);
    const rc = getValueForCell("quantity", r, h, s) ?? parseInt(r.quantity);
    return rc;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  const [attrStates, setAttrStates] = React.useState<any[]>([]);
  const payloadBase: any = useMemo(
    () => ({
      storeId: storeId,
      cancelToken: new CancelToken((c) => cancels.push(c)),
    }),
    [cancels, storeId, CancelToken]
  );
  const cart = useSelector(cartSelector);
  const isSharedOrder = cart?.orderTypeCode !== PRIVATE_ORDER_TYPE;
  const [addItemActionTriggered, setAddItemActionTriggered] = useState<boolean>(false);
  const xltn = useMemo(
    () => ({
      productDetailsAddBundleToCart: t("productDetail.AddBundleToCart"),
      productDetailaddBundleToSharedOrder: t("productDetail.AddBundleToSharedOrder"),
      productDetailsSelectAttributes: t("productDetail.SelectAttributes"),
      productDetailsPRODUCTSKU: t("productDetail.PRODUCTSKU"),
      productDetailnoproductsToDisplay: t("productDetail.noproductsToDisplay"),
      productDetailSKU: t("productDetail.SKU"),
      productDetailaddToCurrentOrder: isB2B ? t("productDetail.addToCurrentOrder") : t("productDetail.AddToCart"),
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
      someWithNoSkus: t("productDetail.someWithNoSkus"),
      someWithNoAvlSelZero: t("productDetail.someWithNoAvlSelZero"),
      someWithNotEnough: t("productDetail.someWithNotEnough"),
      selectSomething: t("productDetail.selectSomething"),
    }),
    [t, isB2B]
  );

  const DetailPanel = ({ rowData }) => {
    const { t } = useTranslation();
    const { rowNumber } = rowData ?? {};

    /**
     *Helper method to perform changes after user selecting attributes
     * @param attrs
     * @returns object
     */
    const handleChangeSelect = (attrName: any, event) => {
      attrStates[rowNumber][attrName] = event.target.value;

      // find a sku with the same attributes as those selected
      const sku = get(rowData, "sKUs", []).find(({ attributes: a }) => {
        const skuAttrs = a
          .filter(({ usage: u }) => u === DEFINING)
          .reduce((m, a) => {
            m[a.identifier] = a.values[0].value;
            return m;
          }, {});
        return isEqual(attrStates[rowNumber], skuAttrs);
      });

      // set it as selected
      if (sku) {
        rows[rowNumber].selectedSku = {
          ...sku,
          type: "sku",
          quantity: rows[rowNumber].quantity,
        };

        getSkuInventory(sku.partNumber, sku.sellerId);
      } else {
        // force re-render
        setRows([...rows]);
      }
      setAttrStates([...attrStates]);
    };

    return (
      <StyledB2BDetailPanel>
        <StyledGrid container item spacing={1}>
          {rowData?.defAttrs?.map((dAtt: any) => (
            <StyledGrid item key={"panel" + rowNumber + dAtt.identifier}>
              <StyledFormControl variant="outlined">
                <StyledInputLabel disableAnimation={true}>
                  <b>{dAtt.name}</b>
                </StyledInputLabel>
                <StyledSelect
                  data-testid={`${rowData.partNumber}-${dAtt.identifier}`}
                  native
                  disabled={!!rowData.isOneSku}
                  value={get(attrStates, `${rowNumber}.${dAtt.identifier}`, 0)}
                  onChange={(e) => {
                    handleChangeSelect(dAtt.identifier, e);
                  }}>
                  <option value={0} hidden disabled>
                    {t("productDetail.SelectAnOption")}
                  </option>
                  {dAtt.values?.map(({ value: v, uniqueID: id }) => (
                    <option value={v} key={id}>
                      {v}
                    </option>
                  ))}
                </StyledSelect>
              </StyledFormControl>
            </StyledGrid>
          ))}
        </StyledGrid>
      </StyledB2BDetailPanel>
    );
  };

  /**
   * Get product information based on its type
   */
  const initProduct = (catentry: any) => {
    const { components: comps, type } = catentry ?? {};
    const nonPaneled: any[] = [];
    if (type === "bundle") {
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
            skus.push(copy.partNumber);
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
        setAttrStates(containers.map(({ attrState: a }) => a));

        if (hasCTCtx) {
          const { headers: h, needsPanel: d } = headerFn();
          setHeaders(h);
          setNeedsPanel(d);
          getSkuInventory(skus.join(), catentry.sellerId);
          setRows(rows);
          nonPaneled.forEach((k) => {
            setValueForCell(TableConstants.NOPANEL, true, rows[k], h, tableState, () => {
              return;
            });
          });
          setTableState({ ...tableState });
        }
      }
    }
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
    setBundle(catentry);
    if (catentry.components.length > 1) {
      setDisplayCompDesc(uniq(catentry.components.map(({ name: n }) => n)));
    }

    if (catentry.fullImage && catentry.thumbnail) {
      setDisplayFullImage(isB2B ? catentry.thumbnail : catentry.fullImage);
    }

    if (!mySite.isB2B && catentry.seller) {
      setSellerAttr({ name: catentry.seller, id: catentry.sellerId });
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

  const headerFn = useMemo(
    () => () => {
      const cellStyle = { verticalAlign: "middle" };
      const needsPanel = true;

      const headers = [
        {
          title: t("productDetail.SKU"),
          idProp: "__rowId__",
          keyLookup: { key: "partNumber" },
          display: {
            cellStyle,
            template: ProductsSkuCell,
          },
          sortable: { fn: skuCalculator },
        },
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
          title: t("productDetail.Availability"),
          keyLookup: { key: "phantomAvailability" },
          display: {
            cellStyle,
            template: AvailabilityCell,
          },
          sortable: { fn: oaCalculator },
        },
        {
          title: t("productDetail.Quantity"),
          keyLookup: { key: "phantomQuantity" },
          display: {
            cellClass: "bundle-qty",
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
   * Helper method to get the SKU's inventory details.
   * Stores the availabilty data in inventoryMap.
   * @param partNumbers
   */
  const getSkuInventory = async (partNumbers: any, sellerId: string) => {
    const _p: Promise<any>[] = [];
    const parameters1: any = { ...payloadBase, storeId, partNumbers, sellerId };
    _p.push(inventoryavailabilityService.getInventoryAvailabilityByPartNumber(parameters1));
    if (selectedStore?.physicalStoreName) {
      const { physicalStoreName } = selectedStore;
      const parameters2: any = {
        ...payloadBase,
        storeId,
        partNumbers,
        physicalStoreName,
      };
      _p.push(inventoryavailabilityService.getInventoryAvailabilityByPartNumber(parameters2));
    }
    try {
      const _res = await Promise.all(_p);
      const iv = get(getCurrentContext(tableState), "inventory");
      const m = { ...iv };
      let res = _res[0]; //online or seller
      get(res, "data.InventoryAvailability", []).forEach(
        ({ inventoryStatus: s, productId: id, availableQuantity: quantity, onlineStoreId, x_sellerId }) => {
          if ((onlineStoreId && s === AVAILABLE_KEY) || (x_sellerId === sellerId && s === AVAILABLE_KEY)) {
            const invId = `${id}_${sellerId}`;
            m[invId] = { quantity, available: true };
          }
        }
      );
      res = _res[1]; //physical store
      if (res && selectedStore) {
        const { id: iPhysicalStoreId, storeName } = selectedStore;
        get(res, "data.InventoryAvailability", []).forEach(
          ({ inventoryStatus: s, productId: id, availableQuantity: quantity, physicalStoreId }) => {
            if (physicalStoreId === iPhysicalStoreId && s === AVAILABLE_KEY) {
              const invId = `${id}_${physicalStoreId}`;
              m[invId] = { quantity, available: true, storeName };
            }
          }
        );
      }
      updateCTCtx("inventory", m);
    } catch (e) {
      console.log("Could not retrieve Inventory Details", e);
    }
  };

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

  const _getItems = useCallback(
    (rows, headers, tableState) => {
      const p: any[] = [];
      const q: any[] = [];
      const i: any[] = [];
      const e: any = {};

      rows.forEach((r) => {
        const n = getValueForCell("quantity", r, headers, tableState) ?? parseInt(r.quantity);
        if (n) {
          q.push(n);
          p.push(isProdOrVar(r) ? r.selectedSku.partNumber : r.partNumber);
          i.push(isProdOrVar(r) ? r.selectedSku.uniqueID : r.uniqueID);
        }
      });

      if (q.length === 0) {
        const errorMessage = xltn.selectSomething;
        dispatch(errorActions.VALIDATION_ERROR_ACTION({ errorMessage }));
        Object.assign(e, { errorMessage });
      }

      return { p, q, i, e };
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  /**
   *Add the selected product and its quantities to the shopping cart
   */
  const addToCart = useCallback(
    (physicalStoreId?: string) => {
      const { p, q, e } = _getItems(rows, headers, tableState);

      if (!e.errorMessage) {
        const param = {
          partnumber: p,
          quantity: q,
          contractId: contract,
          ...payloadBase,
        };
        if (physicalStoreId) {
          param.physicalStoreId = p.map(() => physicalStoreId);
          const { shipModeId } = storeShippingMode.find((m) => m.shipModeCode === SHIPMODE.shipModeCode.PickUp) ?? {};
          if (shipModeId) {
            param.shipModeId = p.map(() => shipModeId);
          }
        }
        dispatch(orderActions.ADD_ITEM_ACTION(param));
        setAddItemActionTriggered(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows, isProdOrVar, getValueForCell, xltn, contract, dispatch, headers, payloadBase, tableState]
  );

  const addToRL = useCallback(
    async (requisitionListId) => {
      const { q, e, p } = _getItems(rows, headers, tableState);
      let n = 0;
      if (!e.errorMessage) {
        for (let i = 0; i < p.length; ++i) {
          const payload = {
            action: "addConfiguration",
            query: { requisitionListId, quantity: q[i], partNumber: p[i] },
            ...payloadBase,
          };

          try {
            await rlSvc.performActionOnRequisitionList(payload);
            ++n;
          } catch (e) {
            console.log("Could not add item [%o] with quantity [%o] to list due to error %o", p[i], q[i], e);
          }
        }

        const msg = { key: "success-message.addNItemsSuc", messageParameters: { n: `${n}` } };
        dispatch(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
      }
    },
    [headers, rows, tableState] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const addToWishList = useCallback(
    async (wishList: any) => {
      const { q, e, p } = _getItems(rows, headers, tableState);
      let n = 0;
      if (!e.errorMessage) {
        for (let i = 0; i < p.length; ++i) {
          const params = {
            body: {
              item: [
                {
                  partNumber: p[i],
                  quantityRequested: q[i].toString(),
                },
              ],
            },
            addItem: true,
            externalId: wishList.externalIdentifier,
            ...payloadBase,
          };

          try {
            await wishListService.updateWishlist(params);
            ++n;
          } catch (e) {
            console.log("Could not add item [%o] with quantity [%o] to list due to error %o", p[i], q[i], e);
          }
        }

        dispatch(wishListActions.GET_USER_WISHLIST_ACTION({ ...payloadBase }));
        const msg = { key: "success-message.addNItemsSuc", messageParameters: { n: `${n}` } };
        dispatch(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
      }
    },
    [_getItems, dispatch, headers, payloadBase, rows, tableState]
  );

  const add2CartOrReqButton = useMemo(() => {
    const _addToCart = () => {
      if (invalidOnline) {
        addToCart(selectedStore?.id);
      } else {
        addToCart();
      }
    };
    const ttDisp = someWithNoSkus
      ? xltn.someWithNoSkus
      : someWithNoAvlSelZero
      ? xltn.someWithNoAvlSelZero
      : someWithNotEnough
      ? xltn.someWithNotEnough
      : xltn.selectSomething;
    return (
      <>
        <StyledGrid container item xs={12} spacing={1} alignItems="center" className="button-combo">
          <StyledGrid item>
            <StyledButton
              testId={loginNotRequired ? "add-bundle-to-cart" : "sign-in-continue"}
              color="primary"
              size="small"
              className="top-margin-1 bundle-add-to-cart"
              id="bundle-add-to-cart"
              disabled={addToCartDisabled}
              style={{ float: "left" }}
              onClick={loginNotRequired ? _addToCart : undefined}
              component={loginNotRequired ? undefined : Link}
              to={loginNotRequired ? undefined : SIGNIN}>
              {loginNotRequired ? xltn.productDetailsAddBundleToCart : xltn.productDetailSignIn}
            </StyledButton>
          </StyledGrid>
          {loginStatus ? (
            <StyledGrid item xs={12} sm="auto">
              {isB2B ? (
                <AddToRequisitionListButton {...{ disabled: addToCartDisabled, addFn: addToRL }} />
              ) : (
                <AddToWishListButton {...{ addFn: addToWishList, disabled: addToCartDisabled || !displayOfferPrice }} />
              )}
            </StyledGrid>
          ) : null}
        </StyledGrid>
        {addToCartDisabled && (
          <div className="top-margin-1 bundle-error">
            <StyledTypography variant="body2" className="error">
              {ttDisp}
            </StyledTypography>
          </div>
        )}
      </>
    );
  }, [
    someWithNoSkus,
    xltn,
    someWithNoAvlSelZero,
    someWithNotEnough,
    loginNotRequired,
    addToCartDisabled,
    loginStatus,
    isB2B,
    addToRL,
    addToWishList,
    displayOfferPrice,
    invalidOnline,
    addToCart,
    selectedStore?.id,
  ]);

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

      const inputCatentryData = products[0];

      initProduct(inputCatentryData);
      if (inputCatentryData.attachments?.length > 0) {
        setAttachmentsList(inputCatentryData.attachments);
      }

      if (location?.state?.categoryId) {
        setCatIdentifier(location.state.categoryId);
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

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasCTCtx && rows.length > 0) {
      setRows(rows);
    }
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

  const sellers = useSelector(sellersSelector);
  //GA360
  useEffect(() => {
    if (addItemActionTriggered) {
      //GA360
      if (mySite.enableGA) {
        const storeName = mySite.storeName;
        AsyncCall.sendAddToCartEvent(
          { cart, currentSelection: rows, sellers, storeName },
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

  useEffect(() => {
    if (!catIdentifier && products?.length && topCategoriesList?.length) {
      const parentCatalogGroupID = products[0].parentCatalogGroupID;
      if (parentCatalogGroupID) {
        setCatIdentifier(StoreUtil.getParentCategoryId(parentCatalogGroupID, topCategoriesList));
      }
    }
  }, [topCategoriesList, products]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (catIdentifier) {
      const parameters: any = {
        categoryId: catIdentifier,
        contractId: contract,
        currency: defaultCurrencyID,
        storeId: storeId,
        productName: products[0].name ?? EMPTY_STRING,
        ...payloadBase,
      };
      dispatch(catalogActions.getProductListForPDPAction({ parameters }));
    }
  }, [catIdentifier, products]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSeller(<SellerLink {...{ breadcrumbs, sellerAttr }} />);
  }, [sellerAttr, breadcrumbs]);

  return {
    seller,
    tableData: {
      columns: headers,
      detailPanel: needsPanel ? DetailPanel : undefined,
      data: rows,
      t,
      showPanelOnMobile: true,
      labels: { emptyMsg: "productDetail.noproductsToDisplay" },
    },
    productPartNumber: initialized ? productPartNumber : undefined,
    displayName,
    translation: xltn,
    displayShortDesc,
    displayOfferPrice,
    displayListPrice,
    addBundleButton: add2CartOrReqButton,
    productDetailTabsChildren,
    definingAttrs,
    attrStates,
    displayFullImage,
    FormattedPriceDisplay,
    isSharedOrder,
    bundle,
    ribbonFinder: StoreUtil.getRibbonAdAttrs,
  };
};

export const withBundleWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  (props: any) => {
    const productDetailsWid = useBundle(props);
    return <WrapComponent {...productDetailsWid}></WrapComponent>;
  };
