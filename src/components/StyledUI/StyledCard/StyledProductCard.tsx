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
//Custom libraries
import FormattedPriceDisplay from "../../widgets/formatted-price-display";
//UI
import styled from "styled-components";
import {
  StyledCard,
  StyledCardActions,
  StyledCardContent,
  StyledCardMedia,
  StyledTypography,
} from "../../StyledUI";

const StyledProductCard = styled(({ className, ...props }) => (
  <Link className={className} {...props} />
))`
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
  price?: number | null;
  swatches: any[];
  catentryId?: string;
  onClick?: any;
  actions?: any;
  className?: any;
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
  const price: number | null = props.price ? props.price : null;
  const swatches: any[] = props.swatches;
  const catentryId: string = props.catentryId ? props.catentryId : "";
  const onClickAction: any = props.onClick ? { onClick: props.onClick } : {};
  const actions: any | null = props.actions ? props.actions : null;

  return (
    <StyledProductCard
      className="product-card"
      to={seoUrl}
      id={catentryId ? `productCard_a_1_${catentryId}` : ""}
      {...onClickAction}>
      <StyledCard>
        <StyledCardMedia image={thumbnail} title={name} />
        <StyledCardContent>
          <StyledTypography
            variant="body2"
            align="center"
            className="bottom-margin-1">
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
        </StyledCardContent>
        {actions && <StyledCardActions disableSpacing></StyledCardActions>}
      </StyledCard>
    </StyledProductCard>
  );
}

export default ProductCard;
