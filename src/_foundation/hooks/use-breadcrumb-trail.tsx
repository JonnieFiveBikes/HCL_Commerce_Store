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
import React from "react";
import { useSelector } from "react-redux";
//Foundation libraries
import { WidgetProps } from "../../_foundation/constants/seo-config";
//Redux
import { breadcrumbsSelector } from "../../redux/selectors/catalog";

const useBreadcrumbTrail = () => {
  const breadcrumbs = useSelector(breadcrumbsSelector);
  return {
    breadcrumbs,
  };
};

export const withBreadcrumbTrailWidget = (
  WrapComponent: React.ComponentType<any>
): React.FC<WidgetProps> => () => {
  const { breadcrumbs } = useBreadcrumbTrail();
  return <WrapComponent {...{ breadcrumbs }}></WrapComponent>;
};
