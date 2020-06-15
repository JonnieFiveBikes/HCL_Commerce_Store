/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useDispatch, useSelector } from "react-redux";
//Foundation libraries
import inventoryavailabilityService from "../../../_foundation/apis/transaction/inventoryavailability.service";
import associatedPromotionCodeService from "../../../_foundation/apis/transaction/associatedPromotionCode.service";
import productsService from "../../../_foundation/apis/search/products.service";
//Custom libraries
import { OFFER, DISPLAY } from "../../../constants/common";
import FormattedPriceDisplay from "../../widgets/formatted-price-display";
import ProductImage from "./ProductImage";
import ProductQuantity from "./ProductQuantity";
import ProductAttributes from "./ProductAttributes";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import * as orderActions from "../../../redux/actions/order";
//UI
import {
  StyledGrid,
  StyledPDPContainer,
  StyledTypography,
  StyledButton,
  StyledTabs,
  ITabs,
} from "../../StyledUI";
import Hidden from "@material-ui/core/Hidden";

/**
 * Product Display component
 * displays product defining atrributes, descriptive atrributes, availability, promotions etc.
 * @param productPartNumber
 * @param productLayout
 * @param pdpData
 * @param storeId
 */
function ProductDetailsLayout({
  productPartNumber,
  productLayout,
  pdpData,
  storeId,
}: any) {
  const ONLINE_STORE_KEY: string = "Online";
  const AVAILABLE_KEY: string = "Available";
  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const { t } = useTranslation();
  const [product, setProduct] = React.useState<any>(null);
  const [currentProdSelect, setCurrentProdSelect] = React.useState<any>(null);
  const [productOfferPrice, setProductOfferPrice] = React.useState<number>(0);
  const [prodDisplayPrice, setProdDisplayPrice] = React.useState<number>(0);
  const [descAttributeList, setDescAttributeList] = React.useState<
    Array<object>
  >([]);
  const [definingAttributeList, setDefiningAttributeList] = React.useState<
    Array<object>
  >([]);
  const [productData, setProductData] = React.useState<any>(null);
  const [promotion, setPromotion] = React.useState<Array<any>>([]);
  const [disabledButtonFlag, setDisabledButtonFlag] = React.useState<boolean>(
    false
  );
  const contract = useSelector(currentContractIdSelector);
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
  let productType: string = "";
  let invalidSKU: boolean;
  const dispatch = useDispatch();

  /**
   * Get product information based on its type
   */
  const getProduct = () => {
    productType = "";
    productInfo = pdpData[0];
    let product: any = {
      name: productInfo.name,
      shortDescription: productInfo.shortDescription,
      longDescription: productInfo.longDescription,
    };
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
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
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
    setProduct(product);
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
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
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
        else if (currentSelection.partNumber.id)
          getInventory(currentSelection.partNumber.id);
      } else {
        currentSelection.partNumber = productInfoData;
        currentSelection.selectedAttributes = {};
        if (currentSelection.partNumber.attributes) {
          for (const att of currentSelection.partNumber.attributes) {
            if (att.values.length) {
              currentSelection.selectedAttributes[att.identifier] =
                att.values[0].identifier;
            }
          }
        }
      }
    }
    setProductPrice(currentSelection.partNumber.price);
    setDefiningAttributeList(definingAttributes);
    setDescAttributeList(descAttributes);
    setProductData(productInfoData);
  };

  /**
   * Validate SKU based upon the selected attributes
   * @param attr
   */
  const initializeSelectedAttributes = (attr?: any) => {
    currentSelection.selectedAttributes = {};
    if (attr) {
      for (const att of attr) {
        currentSelection.selectedAttributes[att.identifier] =
          att.values[0].identifier;
      }
    } else {
      for (const att of currentSelection.partNumber.attributes) {
        currentSelection.selectedAttributes[att.identifier] =
          att.values[0].identifier;
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
      getInventory(currentSelection.partNumber.id);
    }
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
            value[a.identifier] = a.values[0].identifier;
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
   *Get the inventory details of the product
   * @param productId
   */
  const getInventory = (productId: any) => {
    let preferredStore: any; // TODO need to check & implement
    let physicalStoreId: string = "";
    if (preferredStore) {
      physicalStoreId = preferredStore.storeId;
    }
    let parameters: any = {
      storeId: storeId,
      productIds: productId,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };

    inventoryavailabilityService
      .getInventoryAvailabilityByProductId(parameters)
      .then((res) => {
        currentSelection.availability = [];
        if (res.data.InventoryAvailability !== undefined) {
          let onlineInventory = res.data.InventoryAvailability.find(
            (inventory: any) => inventory.onlineStoreId
          );
          currentSelection.availability.push({
            storeId: onlineInventory?.onlineStoreId,
            storeName: ONLINE_STORE_KEY,
            inventoryStatus:
              onlineInventory?.inventoryStatus === AVAILABLE_KEY ? true : false,
          });
          for (let inventory of res.data.InventoryAvailability) {
            if (inventory.physicalStoreId && inventory.physicalStoreName) {
              currentSelection.availability.push({
                storeId: inventory.physicalStoreId,
                storeName: inventory.physicalStoreName,
                inventoryStatus:
                  inventory.inventoryStatus === AVAILABLE_KEY ? true : false,
              });
            } else if (
              inventory.physicalStoreId &&
              !inventory.physicalStoreName
            ) {
              currentSelection.availability.push({
                storeId: inventory.physicalStoreId,
                storeName: inventory.physicalStoreId,
                inventoryStatus:
                  inventory.inventoryStatus === AVAILABLE_KEY ? true : false,
              });
            }
          }
        }
        setCurrentProdSelect(currentSelection);
        if (currentSelection.availability.length === 0) {
          setDisabledButtonFlag(true);
        }
      })
      .catch((e) => {
        console.log("Could not retrieve Inventory Details", e);
      });
  };

  /**
   *Get the descriptive and defining attributes
   */
  const getDescriptiveAndDefiningAttributes = () => {
    for (const att of productInfoData.availableAttributes) {
      if (
        att.usage === "Descriptive" &&
        att.displayable &&
        att.identifier !== "PickUpInStore" &&
        !att.identifier.startsWith("ribbonad")
      ) {
        descAttributes.push(att);
      } else if (att.usage === "Defining") {
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
   *Helper method to convert attributes to object
   * @param attrs
   */
  const attrs2Object = (attrs: any[]): any => {
    if (attrs === undefined) {
      return {};
    }
    return attrs.reduce((obj: any, attr: any) => {
      obj[attr.identifier] = attr.values[0].identifier;
      return obj;
    }, {});
  };

  /**
   * Defining attribute change even handler
   * @param attr
   * @param e
   */
  const onAttributeChange = (attr: string, e: string) => {
    currentSelection = { ...currentProdSelect };
    if (e) {
      currentSelection.selectedAttributes[attr] = e;
    }
    const sku = resolveSKU(
      productData.items,
      currentSelection.selectedAttributes
    );
    if (sku === "") {
      invalidSKU = true;
      currentSelection.availability = [];
    } else {
      invalidSKU = false;
      currentSelection.partNumber = sku;
      getInventory(currentSelection.partNumber.id);
    }
    setProductPrice(currentSelection.partNumber.price);
    setDisabledButtonFlag(invalidSKU);
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
  const updateProductQuantity = (e: number) => {
    currentSelection = currentProdSelect;
    currentSelection.quantity = e;
  };

  /**
   *Add the selected product to the shopping cart
   */
  const addToCart = () => {
    currentSelection = currentProdSelect;
    const param = {
      partnumber: [currentSelection.partNumber.partNumber],
      quantity: [currentSelection.quantity],
      contractId: contract,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    dispatch(orderActions.ADD_ITEM_ACTION(param));
    currentSelection.quantity = "1";
  };

  React.useEffect(() => {
    if (pdpData !== undefined && pdpData !== null && pdpData.length > 0) {
      getProduct();
      getAssociatedPromotions();
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, []);

  let productDetailTabsChildren: ITabs[] = [];

  if (product && product.longDescription) {
    const descriptionElement = (
      <>
        <StyledTypography variant="body1">
          {product.longDescription}
        </StyledTypography>
      </>
    );
    productDetailTabsChildren.push({
      title: t("productDetail.Description"),
      tabContent: descriptionElement,
    });
  }

  if (descAttributeList.length > 0) {
    const productDetailsElement = (
      <div
        id={`product-details-container_${productPartNumber}`}
        className="product-details-container">
        <div className="product-details-list">
          <ul className="product-attribute">
            {descAttributeList.map((e: any) => (
              <li
                key={`li_${e.identifier}`}
                id={`product_attribute_${productPartNumber}`}>
                <span
                  key={`span_name_${e.identifier}`}
                  id={`product_desc_attribute_name_${e.identifier}_${productPartNumber}`}>
                  {e.name}:
                </span>
                {e.values.map((value: any) => (
                  <span
                    id={`product_attribute_value_${value.identifier}_${productPartNumber}`}
                    key={value.identifier}>
                    {value.value}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
    productDetailTabsChildren.push({
      title: t("productDetail.ProductDetails"),
      tabContent: productDetailsElement,
    });
  }

  return (
    <>
      {productPartNumber && currentProdSelect && (
        <StyledPDPContainer
          itemScope
          itemType="http://schema.org/Product"
          id={`product-image-details_${productPartNumber}`}>
          <StyledGrid container spacing={2}>
            <Hidden smUp>
              <StyledGrid item xs={1}></StyledGrid>
              <StyledGrid item xs={10} className="product-image">
                <ProductImage
                  product={currentProdSelect}
                  partNumber={productPartNumber}
                />
              </StyledGrid>
            </Hidden>
            <StyledGrid item xs={12} sm={6} md={6} lg={6} xl={5}>
              {product && (
                <StyledTypography
                  variant="h4"
                  itemProp="name"
                  className="product-name">
                  {product.name}
                </StyledTypography>
              )}
              {currentProdSelect && (
                <StyledTypography variant="body2" className="product-sku">
                  SKU: {currentProdSelect.partNumber.partNumber}
                </StyledTypography>
              )}
              {product && (
                <StyledTypography
                  variant="body1"
                  itemProp="description"
                  className="product-shortDescription">
                  {product.shortDescription}
                </StyledTypography>
              )}
              {
                <StyledTypography
                  variant="body2"
                  id={`product_advertisement_${productPartNumber}`}
                  className="product-promo"
                  gutterBottom>
                  {promotion}
                </StyledTypography>
              }
              <div
                itemProp="offers"
                itemScope
                itemType="http://schema.org/Offer">
                {productType !== "bundle" && (
                  <>
                    <StyledTypography
                      variant="h5"
                      className="product-price-container">
                      {productOfferPrice > 0 && (
                        <span className="product-price">
                          <FormattedPriceDisplay min={productOfferPrice} />
                        </span>
                      )}
                      {prodDisplayPrice > 0 && (
                        <span
                          id={`product_price_${productPartNumber}`}
                          className={
                            productOfferPrice > 0 ? "strikethrough" : ""
                          }>
                          <FormattedPriceDisplay min={prodDisplayPrice} />
                        </span>
                      )}
                      {productOfferPrice === 0 && prodDisplayPrice === 0 && (
                        <span id={`product_offer_price_${productPartNumber}`}>
                          {<FormattedPriceDisplay min={null} />}
                        </span>
                      )}
                    </StyledTypography>
                    {definingAttributeList.length > 0 && (
                      <ProductAttributes
                        attributeList={definingAttributeList}
                        onChangeHandler={onAttributeChange}
                        currentSelection={currentProdSelect}
                      />
                    )}
                    <>
                      <StyledTypography variant="body2">
                        {t("productDetail.Quantity")}
                      </StyledTypography>
                      <ProductQuantity
                        updateProductQuantity={updateProductQuantity}
                      />
                      {currentProdSelect &&
                        currentProdSelect.availability.length > 0 && (
                          <>
                            <StyledTypography variant="body2">
                              {t("productDetail.Availability")}
                            </StyledTypography>
                            <StyledTypography variant="body1" component="div">
                              {currentProdSelect.availability.map((e: any) => (
                                <div key={`inventoryDetails_div_${e.storeId}`}>
                                  <div
                                    key={`store-name_div_${e.storeId}`}
                                    id={`product_availability_store_name_${productPartNumber}`}
                                    className="store-name">
                                    {e.storeName}
                                  </div>
                                  {e.inventoryStatus && (
                                    <div
                                      key={`inStock_div_${e.storeId}`}
                                      className="inventory-status in-stock"
                                      id={`product_availability_status_inStock_${productPartNumber}`}>
                                      {t("productDetail.InStock")}
                                    </div>
                                  )}
                                  {!e.inventoryStatus && (
                                    <div
                                      key={`outOfStock_div_${e.storeId}`}
                                      className="store-inventory out-of-stock"
                                      id={`product_availability_status_outOfStock_${productPartNumber}`}>
                                      {t("productDetail.OutofStock")}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </StyledTypography>
                          </>
                        )}
                      <StyledButton
                        color="primary"
                        size="small"
                        className="product-add-to-cart"
                        id={`product_add_to_cart_${productPartNumber}`}
                        onClick={addToCart}
                        disabled={disabledButtonFlag}>
                        {t("productDetail.AddToCart")}
                      </StyledButton>
                    </>
                  </>
                )}
              </div>
            </StyledGrid>
            <Hidden xsDown>
              <StyledGrid item xs={6} md={5} className="product-image">
                <ProductImage
                  product={currentProdSelect}
                  partNumber={productPartNumber}
                />
              </StyledGrid>
            </Hidden>
            <StyledGrid item xs={12} md={8}>
              <StyledTabs
                childrenList={productDetailTabsChildren}
                name="productDetails"
              />
            </StyledGrid>
          </StyledGrid>
        </StyledPDPContainer>
      )}
    </>
  );
}

ProductDetailsLayout.propTypes = {
  productPartNumber: PropTypes.string.isRequired,
  productLayout: PropTypes.string,
  pdpData: PropTypes.any,
  storeId: PropTypes.string,
};

export default ProductDetailsLayout;
