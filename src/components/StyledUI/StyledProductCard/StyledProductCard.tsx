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
import { Link } from "react-router-dom";
import { LazyLoadComponent } from "react-lazy-load-image-component";
//Custom libraries
import FormattedPriceDisplay from "../../widgets/formatted-price-display";
//UI
import styled from "styled-components";
import {
  StyledBox,
  StyledCard,
  StyledCardMedia,
  StyledProgressPlaceholder,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";

const StyledProductCard = styled(({ className, ...props }) =>
  props.to ? (
    <Link className={className} {...props} />
  ) : (
    <StyledBox className={className} {...props} />
  )
)`
  ${({ theme }) => `
    display: block;
    height: 100%;

    &.product-grid {
      .MuiCard-root {
        height: 100%;
      }
    }
  `}
`;

interface ProductCardProps {
  seoUrl: any;
  name: any;
  thumbnail: any;
  thumbnailLoading?: boolean;
  price?: number | null;
  swatches: any[];
  catentryId?: string;
  onClick?: any;
  actions?: any;
  className?: any;
  categoryId?: string;
}

/**
 * Product Card component
 * displays catentry image, name, price, etc
 * @param props
 */
export function ProductCard(props: ProductCardProps) {
  const seoUrl: any = props.seoUrl;
  const name: string = props.name;
  const thumbnail: string = props.thumbnail;
  const categoryId: string = props.categoryId ? props.categoryId : "";
  const thumbnailLoading: boolean = props.thumbnailLoading
    ? props.thumbnailLoading
    : false;
  const price: number | null = props.price ? props.price : null;
  const swatches: any[] = props.swatches;
  const catentryId: string = props.catentryId ? props.catentryId : "";
  const onClickAction: any = props.onClick ? { onClick: props.onClick } : {};
  const actions: any | null = props.actions ? props.actions : null;

  const contentComponent = (
    <>
      {thumbnailLoading ? (
        <StyledProgressPlaceholder className="vertical-padding-8" />
      ) : (
        <LazyLoadComponent>
          <StyledCardMedia image={thumbnail} title={name} component="div" />
        </LazyLoadComponent>
      )}
      <StyledTypography
        variant="body2"
        align="center"
        className="bottom-margin-1 wrapText">
        {name}
      </StyledTypography>
      {swatches.length > 0 && (
        <StyledTypography align="center">{swatches}</StyledTypography>
      )}
      {price && (
        <StyledTypography variant="body1" align="center">
          <FormattedPriceDisplay min={price} />
        </StyledTypography>
      )}
    </>
  );

  return (
    <StyledProductCard
      className="product-card"
      to={{
        pathname: seoUrl,
        state: { categoryId: categoryId },
      }}
      id={catentryId ? `productCard_a_1_${catentryId}` : ""}
      {...onClickAction}>
      <StyledCard
        className="product-card"
        contentComponent={contentComponent}
        cardActions={actions}
      />
    </StyledProductCard>
  );
}

export default ProductCard;
