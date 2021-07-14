/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
//Standard libraries
import { useEffect, useState, MouseEvent } from "react";
import Axios, { Canceler } from "axios";
import { useSelector } from "react-redux";
import getDisplayName from "react-display-name";
//Foundation libraries
import { commonUtil } from "@hcl-commerce-store-sdk/utils";
import { useSite } from "../../../_foundation/hooks/useSite";
import productsService from "../../../_foundation/apis/search/products.service";
//Custom libraries
import { DEFINING, OFFER, EMPTY_STRING } from "../../../constants/common";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import { breadcrumbsSelector } from "../../../redux/selectors/catalog";
//UI
import { StyledSwatch } from "@hcl-commerce-store-sdk/react-component";
import { StyledProductCard } from "@hcl-commerce-store-sdk/react-component";
import FormattedPriceDisplay from "../formatted-price-display";
//GA360
import AsyncCall from "../../../_foundation/gtm/async.service";

interface ProductCardProps {
  product: any;
  categoryId?: string;
}

/**
 * Product Card component
 * displays catentry image, name, price, etc
 * @param props
 */
export default function ProductCard(props: ProductCardProps) {
  const widgetName = getDisplayName(ProductCard);

  const contract = useSelector(currentContractIdSelector);

  const product: any = props.product;
  const catentryId: string = product.id;
  const categoryId: string = props.categoryId ? props.categoryId : EMPTY_STRING;
  const name: string = product.name;
  const thumbnail: string = product.thumbnail;
  const productAttributes: any = product.attributes ? product.attributes : [];
  const seoUrl: string = product.seo ? product.seo.href : "";

  const [productData, setProductData] = useState<any>(null);
  const [skuThumbnail, setSkuThumbnail] = useState<string>(thumbnail);
  const [thumbnailLoading, setThumbnailLoading] = useState<boolean>(false);

  let swatches: any[] = [];

  const { mySite } = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getOfferPrice(prices: any[]) {
    let offerPrice: number | null = null;
    prices.forEach((price: any, index: number) => {
      if (price.usage === OFFER) {
        if (price.value !== "") {
          offerPrice = parseFloat(price.value);
        }
      }
    });
    return offerPrice;
  }

  function onSwatchClick(
    event: MouseEvent<HTMLButtonElement>,
    attrValueId: string
  ) {
    event.preventDefault();
    setThumbnailLoading(true);
    if (productData === null) {
      getProductInfo(attrValueId);
    } else {
      changeProductImage(attrValueId, productData);
    }
  }

  function getProductInfo(attrValueId: string) {
    const parameters: any = {
      storeId: mySite.storeID,
      catalogId: mySite.catalogID,
      id: catentryId,
      contractId: contract ? contract : "",
      ...payloadBase,
    };
    productsService
      .findProductsUsingGET(parameters)
      .then((productData: any) => {
        const contents = productData.data.contents;
        if (contents && contents.length > 0) {
          const product = contents[0];

          changeProductImage(attrValueId, product);
          setProductData(product);
        }
      })
      .catch((e) => {
        console.log("Could not retrieve product details page information", e);
      });
  }

  function changeProductImage(attrValueId: string, product: any) {
    if (product) {
      if (product.items) {
        product.items.forEach((sku: any, index: number) => {
          sku.attributes.forEach((attribute: any, index2: number) => {
            attribute.values &&
              attribute.values.forEach((value: any, index3: number) => {
                if (value.id === attrValueId) {
                  setThumbnailLoading(false);
                  setSkuThumbnail(
                    commonUtil.getThumbnailImagePath(
                      sku.thumbnail,
                      sku.fullImage
                    )
                  );
                }
              });
          });
        });
      }
    }
  }

  productAttributes.map((attribute: any, index: number) => {
    if (attribute.usage === DEFINING && attribute.values) {
      attribute.values.map((attributeValue: any, index2: number) => {
        if (
          attributeValue.image1path !== undefined &&
          Array.isArray(attributeValue.image1path) &&
          attributeValue.image1path.length > 0
        ) {
          attributeValue.image1path.forEach(
            (imagePath: any, index3: number) => {
              swatches.push(
                <StyledSwatch
                  style={{
                    backgroundImage: `url("${imagePath}")`,
                  }}
                  key={`${attributeValue.id[index3]}_${index2}_${index3}`}
                  alt={attributeValue.value[index3]}
                  onClick={(e) => onSwatchClick(e, attributeValue.id[index3])}
                />
              );
            }
          );
        } else if (
          attributeValue.image1path !== undefined &&
          attributeValue.image1path.length > 0
        ) {
          swatches.push(
            <StyledSwatch
              style={{
                backgroundImage: `url("${attributeValue.image1path}")`,
              }}
              key={`${attributeValue.id}_${index2}`}
              alt={attributeValue.value}
              onClick={(e) => onSwatchClick(e, attributeValue.id)}
            />
          );
        }
        return null;
      });
    }
    return null;
  });

  //GA360
  const breadcrumbs = useSelector(breadcrumbsSelector);
  const gaProductClick = () => {
    let listerCategoryFlag = breadcrumbs.length > 0 ? true : false;
    AsyncCall.sendProductClickEvent(
      {
        product,
        index: null,
        listerFlag: listerCategoryFlag,
        breadcrumbs,
      },
      { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
    );
  };
  const clickProductGA = mySite.enableGA && { onClick: gaProductClick };
  const price = getOfferPrice(product.price);
  const defaultCurrencyID: string = mySite
    ? mySite.defaultCurrencyID
    : EMPTY_STRING;
  const formattedPriceDisplay = (
    <FormattedPriceDisplay
      min={price}
      max={null}
      currency={defaultCurrencyID}
    />
  );
  return (
    <StyledProductCard
      seoUrl={seoUrl}
      catentryId={catentryId}
      swatches={swatches}
      thumbnail={skuThumbnail}
      thumbnailLoading={thumbnailLoading}
      name={name}
      price={getOfferPrice(product.price)}
      className="product-grid"
      categoryId={categoryId}
      //GA360
      {...clickProductGA}
      formattedPriceDisplay={formattedPriceDisplay}
    />
  );
}
