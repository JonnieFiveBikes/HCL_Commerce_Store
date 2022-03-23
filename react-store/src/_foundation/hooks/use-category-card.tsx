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
import { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { useDispatch } from "react-redux";
//Redux
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../redux/actions/marketingEvent";

export const UseCategoryCard = ({ renderingContext }: any) => {
  const widgetName = getDisplayName("CategoryCardLayout");
  const dispatch = useDispatch();
  const { eSpotDescInternal: eSpotDesc, eSpotInternal: eSpotRoot, categoryInternal: category } = renderingContext;
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const informMarketingOfClick = () => {
    if (renderingContext.eSpotDescInternal && !isEmpty(renderingContext.eSpotDescInternal)) {
      dispatch(CLICK_EVENT_TRIGGERED_ACTION({ eSpotRoot, eSpotDesc, ...payloadBase }));
    }
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return {
    informMarketingOfClick,
    category,
  };
};
