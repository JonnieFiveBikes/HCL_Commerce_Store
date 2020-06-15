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
import React from "react";
//UI
import { StyledProductCard, StyledSwatch } from "../../StyledUI";

interface ProductCardProps {
  product: any;
}

/**
 * Product Card component
 * displays catentry image, name, price, etc
 * @param props
 */
export default function ProductCard(props: ProductCardProps) {
  const product: any = props.product;
  const catentryId: string = product.id;
  const name: string = product.name;
  const thumbnail: string = product.thumbnail;
  const productAttributes: any = product.attributes ? product.attributes : [];
  const seoUrl: string = product.seo ? product.seo.href : "";

  let swatches: any[] = [];

  function getOfferPrice(prices: any[]) {
    let offerPrice: number | null = null;
    prices.forEach((price: any, index: number) => {
      if (price.usage === "Offer") {
        if (price.value !== "") {
          offerPrice = parseFloat(price.value);
        }
      }
    });
    return offerPrice;
  }

  productAttributes.map((attribute: any, index: number) => {
    if (attribute.usage === "Defining") {
      attribute.values.map((attributeValue: any, index2: number) => {
        if (
          attributeValue.image1path !== undefined &&
          Array.isArray(attributeValue.image1path) &&
          attributeValue.image1path.length > 0
        ) {
          attributeValue.image1path.map((imagePath: any, index3: number) => {
            swatches.push(
              <StyledSwatch
                style={{
                  backgroundImage: `url("${imagePath}")`,
                }}
                key={`${attributeValue.id}_${index2}_${index3}`}
                alt={attributeValue.value}
              />
            );
          });
        } else if (
          attributeValue.image1path !== undefined &&
          attributeValue.image1path.length > 0
        ) {
          swatches.push(
            <StyledSwatch
              style={{
                backgroundImage: `url("${attributeValue.image1path}")`,
              }}
              key={attributeValue.id}
              alt={attributeValue.value}
            />
          );
        }
        return null;
      });
    }
    return null;
  });

  return (
    <StyledProductCard
      seoUrl={seoUrl}
      catentryId={catentryId}
      swatches={swatches}
      thumbnail={thumbnail}
      name={name}
      price={getOfferPrice(product.price)}
      className="product-grid"
    />
  );
}
