/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *---------------------------------------------------
 */
//Standard libraries
import React, { useMemo } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
//Custom libraries
import styled from "@mui/styled-engine-sc";
import { StyledBox } from "../box";
import { StyledProgressPlaceholder } from "../circular-progress";
import { StyledTypography } from "../typography";
import { StyledCard, StyledCardMedia } from "../card";
import { StyledCheckbox } from "../check-box";
import { StyledFormControlLabel } from "../form";
import { StyledLink } from "../link";
import { RibbonAd } from "../../components/ribbon-ad";

const StyledProductCard = styled(({ className, ...props }) =>
  props.to ? <StyledLink className={className} {...props} /> : <StyledBox className={className} {...props} />
)`
  ${({ theme }) => `
    display: block;

    >.product-card.w-compare-box {
      height: calc(100% + 2.625rem);
    }

    &.product-card {
      flex: 1;
    }

    &.product-grid {
      .MuiCard-root {
        height: 100%;
      }
    }

  `}
`;

const FlexWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  > label {
    > span.compare-checkbox {
      justify-content: flex-start;
    }
  }
`;

const CompareBox = ({ compare, product, catentryId }) => {
  const { type: t, partNumber } = product;
  const visibility = t === "product" || t === "item" || t === "variant" ? "visible" : "hidden";
  return (
    <div style={{ marginLeft: "16px", visibility }}>
      <StyledFormControlLabel
        control={
          <StyledCheckbox
            data-testid={`product-compare-${partNumber?.toLowerCase()}-checkbox`}
            className="compare-checkbox"
            disabled={!!(!compare.data.checked[catentryId] && compare.data.disabled)}
            checked={!!compare.data.checked[catentryId]}
            onChange={(e) => compare.onChange(e, catentryId, product)}
          />
        }
        label={<StyledTypography variant="caption">{compare.t(compare.labels.addTo)}</StyledTypography>}
      />
    </div>
  );
};

interface ProductCardProps {
  seoUrl: any;
  name: any;
  ribbonads: any[];
  thumbnail: any;
  thumbnailLoading?: boolean;
  price?: number | null;
  swatches: any[];
  catentryId?: string;
  onClick?: any;
  actions?: any;
  className?: any;
  categoryId?: string;
  formattedPriceDisplay: any;
  link?: any;
  compare?: any;
  product?: any;
  isB2B: boolean;
}

/**
 * Product Card component
 * displays catentry image, name, price, etc
 * @param props
 */
function ProductCard(props: ProductCardProps) {
  const {
    seoUrl,
    name,
    ribbonads,
    thumbnail,
    categoryId = "",
    thumbnailLoading = false,
    price = null,
    swatches,
    onClick,
    catentryId = "",
    formattedPriceDisplay,
    actions: cardActions = null,
    link = null,
    compare,
    product,
  } = props;

  const to = useMemo(() => link?.pathname ?? seoUrl, [link, seoUrl]);
  const linkState = useMemo(() => link?.state ?? { categoryId }, [link, categoryId]);
  const onClickAction = useMemo(() => (onClick ? { onClick } : {}), [onClick]);

  const contentComponent = (
    <>
      {thumbnailLoading ? (
        <StyledProgressPlaceholder className="vertical-padding-8" />
      ) : (
        <LazyLoadComponent visibleByDefault={(window as any).__isPrerender__ || false}>
          <StyledCardMedia image={thumbnail} title={name} component="div"></StyledCardMedia>
        </LazyLoadComponent>
      )}
      <StyledTypography variant="body2" align="center" className="bottom-margin-1 wrapText">
        {name}
      </StyledTypography>
      {swatches.length > 0 && <StyledTypography align="center">{swatches}</StyledTypography>}
      {price && (
        <StyledTypography variant="body1" align="center">
          {formattedPriceDisplay}
        </StyledTypography>
      )}
    </>
  );

  const compareBox = useMemo(
    () => (compare ? <CompareBox {...{ compare, product, catentryId }} /> : <></>),
    [compare, product, catentryId]
  );

  return (
    <FlexWrapper>
      {ribbonads.map(({ identifier, value }: any, i) => (
        <RibbonAd {...{ identifier, value, idx: i, key: i }} />
      ))}
      <StyledProductCard
        className="product-card"
        to={to}
        state={linkState}
        id={catentryId ? `productCard_a_1_${catentryId}` : ""}
        {...onClickAction}>
        <StyledCard
          testId={catentryId}
          {...{
            className: `product-card ${compare ? "w-compare-box" : ""}`,
            contentComponent,
            cardActions,
          }}
        />
      </StyledProductCard>
      {compareBox}
    </FlexWrapper>
  );
}
export default ProductCard;
