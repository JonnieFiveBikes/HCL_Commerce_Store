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
import isEmpty from "lodash-es/isEmpty";
import { useDispatch } from "react-redux";
import LazyLoadComponent from "react-intersection-observer-lazy-load";
//Custom libraries
import { DEFINING, OFFER } from "../../../constants/common";
//Redux
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../../redux/actions/marketingEvent";
//UI
import {
  StyledProductCard,
  StyledSwatch,
  StyledProgressPlaceholder,
} from "../../StyledUI";

function ProductRecCard({ renderingContext }: any) {
  const dispatch = useDispatch();
  const [attributeList, setAttributeList] = React.useState<Array<object>>();
  const [productPrice, setProductPrice] = React.useState<number | null>();
  const colorList: object[] = [];

  const {
    eSpotDescInternal: eSpotDesc,
    eSpotInternal: eSpotRoot,
    productInternal: product,
  } = renderingContext;

  const init = () => {
    if (product.price) {
      for (const price of product.price) {
        if (price?.usage === OFFER && price?.value !== "") {
          setProductPrice(parseFloat(price.value));
        } else {
          setProductPrice(null);
        }
      }
    }
    if (product.attributes) {
      for (const attribute of product.attributes) {
        if (attribute.usage === DEFINING && attribute.values[0].image1path) {
          for (const attributeColor of attribute.values) {
            colorList.push(attributeColor);
          }
        }
      }
    }
    setAttributeList(colorList);
  };

  const informMarketingOfClick = (event) => {
    if (eSpotDesc && !isEmpty(eSpotDesc)) {
      dispatch(CLICK_EVENT_TRIGGERED_ACTION({ eSpotRoot, eSpotDesc }));
    }
  };

  React.useEffect(() => {
    init();
  }, [product]);

  let swatches: any[] = [];

  attributeList?.map((e: any) => {
    swatches.push(
      <StyledSwatch
        key={e.identifier}
        style={{
          backgroundImage: `url("${e.image1path}")`,
        }}
      />
    );
  });

  return (
    <LazyLoadComponent
      placeholder={
        <StyledProgressPlaceholder className="vertical-padding-20" />
      }>
      <StyledProductCard
        seoUrl={product.seo?.href}
        swatches={swatches}
        thumbnail={product.thumbnail}
        name={product.name}
        price={productPrice}
        onClick={informMarketingOfClick}
      />
    </LazyLoadComponent>
  );
}
export default ProductRecCard;
