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
import { useSelector } from "react-redux";
//Foundation libraries
import { WidgetProps } from "../../../../_foundation/constants/seo-config";
//Redux
import { breadcrumbsSelector } from "../../../../redux/selectors/catalog";
import { useLocation } from "react-router";

export const useBreadcrumbTrail = () => {
  const location: any = useLocation();
  const breadcrumbState = useSelector(breadcrumbsSelector);
  const breadcrumbs = useMemo<any>(() => {
    const { breadCrumbTrailEntryView }: any = location.state ?? {};
    return breadCrumbTrailEntryView || breadcrumbState;
  }, [location, breadcrumbState]);
  return {
    breadcrumbs,
  };
};

export const withBreadcrumbTrailWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  () => {
    const { breadcrumbs } = useBreadcrumbTrail();
    return <WrapComponent {...{ breadcrumbs }}></WrapComponent>;
  };
