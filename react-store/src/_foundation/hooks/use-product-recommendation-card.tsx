/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import React, { useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import { useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
//Custom libraries
import { DEFINING, EMPTY_STRING } from "../../constants/common";
//Redux
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../redux/actions/marketingEvent";
//UI
import { StyledSwatch } from "@hcl-commerce-store-sdk/react-component";
import FormattedPriceDisplay from "../../components/widgets/formatted-price-display";
import { useSite } from "./useSite";
import storeUtil from "../../utils/storeUtil";

/**
 * Custom hooks for recommended product card
 * ` @prop { any } props` Have following properties:
 * ` @property { any } product`: The Product details like as id,name,thumbnail etc.
 * ` @property { any } eSpotRoot`: The espot internal details.
 * ` @property { any } eSpotDesc`: The espot product description.
 */

export const useProductRecommendationCard = (props: any) => {
  const product = props.productInternal;
  const eSpotRoot = props.eSpotInternal;
  const eSpotDesc = props.eSpotDescInternal;

  const widgetName = props.widgetName;
  const dispatch = useDispatch();
  const [attributeList, setAttributeList] = React.useState<Array<object>>();
  const [productPrice, setProductPrice] = React.useState<any>();
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];
  const { mySite } = useSite();
  const defaultCurrencyID: string = mySite?.defaultCurrencyID ?? EMPTY_STRING;
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const ribbonads = useMemo(() => storeUtil.getRibbonAdAttrs(product), [product]);

  const init = () => {
    const colorList: object[] = [];
    setProductPrice(storeUtil.getOfferPrice(product));

    if (product.attributes) {
      for (const attribute of product.attributes) {
        if (attribute.usage === DEFINING && attribute.values && attribute.values[0]?.image1path) {
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
      dispatch(CLICK_EVENT_TRIGGERED_ACTION({ eSpotRoot, eSpotDesc, ...payloadBase }));
    }
  };

  const formattedPriceDisplay = (
    <FormattedPriceDisplay min={productPrice?.min} max={productPrice?.max} currency={defaultCurrencyID} />
  );

  React.useEffect(() => {
    init();
  }, [product]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const swatches: any[] = [];

  attributeList?.forEach((e: any) => {
    swatches.push(
      <StyledSwatch
        key={e.identifier}
        style={{
          backgroundImage: `url("${e.image1path}")`,
        }}
        data-testid={`product-recommendation-${e.identifier.toLowerCase()}-swatch`}
      />
    );
  });

  return {
    product,
    swatches,
    ribbonads,
    productPrice,
    informMarketingOfClick,
    formattedPriceDisplay,
  };
};
