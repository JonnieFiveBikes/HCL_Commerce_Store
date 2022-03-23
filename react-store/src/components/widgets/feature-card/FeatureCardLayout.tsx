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
import { useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { FeatureCard } from "@hcl-commerce-store-sdk/react-component";
//Custom libraries
import { DISPLAY, DEFINING, OFFER } from "../../../constants/common";
import FormattedPriceDisplay from "../../../components/widgets/formatted-price-display";
//Redux
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../../redux/actions/marketingEvent";

export default function FeatureCardLayout({ renderingContext }: any) {
  const widgetName = getDisplayName("FeatureCardLayout");
  const { t } = useTranslation();

  const productInfo = renderingContext?.productDesc?.data?.contents
    ? renderingContext.productDesc.data.contents[0]
    : {};

  const colorList: object[] = [];
  const { eSpotDescInternal: eSpotDesc, eSpotInternal: eSpotRoot } = renderingContext;
  const shopNow = t("FeaturedCard.ShopNow");

  const [displayPrice, setDisplayPrice] = React.useState<number>(0);
  const [offerPrice, setOfferPrice] = React.useState<number>(0);
  const [attributeList, setAttributeList] = React.useState<Array<object>>([]);
  const dispatch = useDispatch();

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const informMarketingOfClick = (event) => {
    if (eSpotDesc && !isEmpty(eSpotDesc)) {
      dispatch(CLICK_EVENT_TRIGGERED_ACTION({ eSpotRoot, eSpotDesc, ...payloadBase }));
    }
  };

  const formattedPriceDisplay = (price) => {
    <FormattedPriceDisplay min={price} />;
  };

  React.useEffect(() => {
    if (productInfo.price) {
      for (const price of productInfo.price) {
        if (price.usage === DISPLAY && price.value !== "") {
          setDisplayPrice(parseFloat(price.value));
        } else if (price.usage === OFFER && price.value !== "") {
          setOfferPrice(parseFloat(price.value));
        }
      }
    }
    if (productInfo.attributes) {
      for (const attribute of productInfo.attributes) {
        if (attribute.usage === DEFINING && attribute.values && attribute.values[0]?.image1path) {
          for (const attributeColor of attribute.values) {
            colorList.push(attributeColor);
          }
        }
      }
    }
    setAttributeList(colorList);
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FeatureCard
      productInfo={productInfo}
      displayPrice={displayPrice}
      offerPrice={offerPrice}
      attributeList={attributeList}
      shopNow={shopNow}
      formattedPriceDisplay={formattedPriceDisplay}
      informMarketingOfClick={informMarketingOfClick}
    />
  );
}
