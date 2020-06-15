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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//Redux
import { breadcrumbsSelector } from "../../../redux/selectors/catalog";
//UI
import { StyledTypography, StyledBreadcrumbs } from "../../StyledUI";

interface BreadcrumbProps {
  cid: string;
}

/**
 * Breadcrumb component
 * displays breadcrumb trail
 * @param props
 */
const BreadcrumbLayout: React.FC<BreadcrumbProps> = (props: any) => {
  const breadcrumbs = useSelector(breadcrumbsSelector);

  const cid = props.cid;

  return breadcrumbs && breadcrumbs.length ? (
    <StyledTypography variant="caption" component="div">
      <StyledBreadcrumbs>
        {breadcrumbs.map((breadcrumb: any, index: number) =>
          index < breadcrumbs.length - 1 &&
          breadcrumb.seo &&
          breadcrumb.seo.href ? (
            <Link
              color="inherit"
              to={breadcrumb.seo.href}
              key={breadcrumb.value}
              id={`breadcrumb_a_1_${cid}_${index}`}>
              {breadcrumb.label}
            </Link>
          ) : (
            <span key={`${breadcrumb.value}_${index}`}>{breadcrumb.label}</span>
          )
        )}
      </StyledBreadcrumbs>
    </StyledTypography>
  ) : null;
};

export default BreadcrumbLayout;
