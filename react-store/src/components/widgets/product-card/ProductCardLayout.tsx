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
import { useDispatch, useSelector } from "react-redux";

//Foundation libraries
import { commonUtil } from "@hcl-commerce-store-sdk/utils";
import { useSite } from "../../../_foundation/hooks/useSite";

import { useBreadcrumbTrail } from "../../commerce-widgets/breadcrumb-trail-widget/hooks/use-breadcrumb-trail";
//Custom libraries
import { DEFINING, EMPTY_STRING } from "../../../constants/common";
//Redux

//UI
import { StyledSwatch, StyledProductCard } from "@hcl-commerce-store-sdk/react-component";
import * as catalogActions from "../../../redux/actions/catalog";
import FormattedPriceDisplay from "../formatted-price-display";
//GA360
import AsyncCall from "../../../_foundation/gtm/async.service";
import storeUtil from "../../../utils/storeUtil";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import { sellersSelector } from "../../../redux/selectors/sellers";
import getDisplayName from "react-display-name";

interface ProductCardProps {
  product: any;
  categoryId?: string;
  [key: string]: any;
}

/**
 * Product Card component
 * displays catentry image, name, price, etc
 * @param props
 */
export default function ProductCard(props: ProductCardProps) {
  const { compare } = props;
  const widget = getDisplayName(ProductCard);
  const product: any = props.product;
  const catentryId: string = product.id;
  const details = useSelector((r: any) => r.catalog.productCache.byId[catentryId]);
  const contractId = useSelector(currentContractIdSelector);
  const categoryId: string = props.categoryId ? props.categoryId : EMPTY_STRING;
  const name: string = product.name;
  const thumbnail: string = product.thumbnail;
  const productAttributes: any = product.attributes ? product.attributes : [];
  const seoUrl: string = product.seo ? product.seo.href : "";
  const link: any = product.link;
  const dispatch = useDispatch();

  const [skuThumbnail, setSkuThumbnail] = useState<string>(thumbnail);
  const [thumbnailLoading, setThumbnailLoading] = useState<boolean>(false);
  const [deferredClick, setDeferredClick] = useState<any>(null);
  const swatches: any[] = [];

  const { mySite } = useSite();
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];
  const cancelToken = new CancelToken((c) => cancels.push(c));

  function onSwatchClick(event: MouseEvent<HTMLButtonElement>, attrValueId: string) {
    event.preventDefault();
    if (product.type !== "item") {
      if (!details) {
        deferClick(attrValueId);
      } else {
        setDeferredClick(null);
        changeProductImage(attrValueId, details);
      }
    }
  }

  useEffect(() => {
    if (details && deferredClick) {
      changeProductImage(deferredClick, details);
    }
  }, [details]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => cancels.forEach((cancel) => cancel()), []); // eslint-disable-line react-hooks/exhaustive-deps

  const deferClick = (attrValueId) => {
    setThumbnailLoading(true);
    setDeferredClick(attrValueId);
    const parameters: any = {
      storeId: mySite.storeID,
      catalogId: mySite.catalogID,
      id: catentryId,
      contractId,
      widget,
      cancelToken,
    };
    dispatch(catalogActions.getProductListDetailsAction({ parameters }));
  };

  const [ribbonAds, setRibbonAds] = useState<any[]>(storeUtil.getRibbonAdAttrs(product));

  function changeProductImage(attrValueId: string, product: any) {
    const sku = product.items?.find((s) =>
      s.attributes.find((attribute) => attribute.values?.find((value) => value.id === attrValueId))
    );
    if (sku) {
      setSkuThumbnail(commonUtil.getThumbnailImagePath(sku.thumbnail, sku.fullImage));
      setRibbonAds(storeUtil.getRibbonAdAttrs(sku));
    }
    setThumbnailLoading(false);
  }

  productAttributes.forEach((attribute: any, index: number) => {
    if (attribute.usage === DEFINING && attribute.values) {
      attribute.values?.forEach((attributeValue: any, index2: number) => {
        if (
          attributeValue.image1path &&
          Array.isArray(attributeValue.image1path) &&
          attributeValue.image1path.length > 0
        ) {
          attributeValue.image1path.forEach((imagePath: any, index3: number) => {
            swatches.push(
              <StyledSwatch
                style={{
                  backgroundImage: `url("${imagePath}")`,
                }}
                key={`${attributeValue.id[index3]}_${index2}_${index3}`}
                alt={attributeValue.value[index3]}
                onClick={(e) => onSwatchClick(e, attributeValue.id[index3])}
                data-testid={`product-card-layout-${attribute.identifier.toLowerCase()}-${attributeValue.id[
                  index3
                ].toLowerCase()}-swatch`}
              />
            );
          });
        } else if (attributeValue.image1path?.length > 0) {
          swatches.push(
            <StyledSwatch
              style={{
                backgroundImage: `url("${attributeValue.image1path}")`,
              }}
              key={`${attributeValue.id}_${index2}`}
              alt={attributeValue.value}
              data-testid={`product-card-layout-${attribute.identifier.toLowerCase()}-${attributeValue.id.toLowerCase()}-swatch`}
              onClick={(e) => onSwatchClick(e, attributeValue.id)}
            />
          );
        }
      });
    }
  });

  //GA360
  const { breadcrumbs } = useBreadcrumbTrail();
  const sellers = useSelector(sellersSelector);
  const gaProductClick = () => {
    const listerCategoryFlag = breadcrumbs.length > 0 ? true : false;
    const storeName = mySite.storeName;
    AsyncCall.sendProductClickEvent(
      {
        product,
        index: null,
        listerFlag: listerCategoryFlag,
        breadcrumbs,
        sellers,
        storeName,
      },
      { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
    );
  };
  const clickProductGA = mySite.enableGA && { onClick: gaProductClick };

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : EMPTY_STRING;

  const [price, setPrice] = useState(storeUtil.getOfferPrice(product));

  useEffect(() => {
    if (details) {
      const p = storeUtil.getOfferPrice(details);
      setPrice(p);
    }
  }, [details]);

  const formattedPriceDisplay = <FormattedPriceDisplay min={price.min} max={price.max} currency={defaultCurrencyID} />;

  return (
    <StyledProductCard
      seoUrl={seoUrl}
      link={link}
      catentryId={catentryId}
      swatches={swatches}
      thumbnail={skuThumbnail}
      thumbnailLoading={thumbnailLoading}
      name={name}
      ribbonads={ribbonAds}
      price={price.min}
      className="product-grid"
      categoryId={categoryId}
      compare={compare}
      //GA360
      {...clickProductGA}
      formattedPriceDisplay={formattedPriceDisplay}
      product={product}
      isB2B={mySite.isB2B}
    />
  );
}
