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
//UI
import { StyledTypography, StyledBreadcrumbs, StyledLink } from "../../elements";

interface BreadcrumbWidgetProps {
  cid: string;
  breadcrumbs: Array<any>;
}

const SLASH = "/";

/**
 * Breadcrumb widget component
 * @summary displays breadcrumb trail
 * `@prop {any} props` have following properties:
 * `@property {string} cid(required)` Unique identifier for layouts.
 * `@property {array} breadcrumbs(required)` It is an array and each element contains info such as a breadcrumb and link etc.
 */
export const BreadcrumbWidget: React.FC<BreadcrumbWidgetProps> = (props: any) => {
  const { breadcrumbs, cid } = props;

  return breadcrumbs && breadcrumbs.length ? (
    <StyledTypography variant="caption" component="div">
      <StyledBreadcrumbs>
        {breadcrumbs.map((breadcrumb: any, index: number) =>
          index < breadcrumbs.length - 1 && breadcrumb.seo && breadcrumb.seo.href ? (
            <StyledLink
              {...(breadcrumb.seo.href === SLASH ? { testId: `breadcrumb-home` } : {})}
              to={breadcrumb.seo.href}
              color="inherit"
              state={{ breadCrumbTrailEntryView: breadcrumbs.slice(0, index + 1) }}
              id={`breadcrumb_a_1_${cid}_${index}`}
              key={breadcrumb.value}>
              {breadcrumb.label}
            </StyledLink>
          ) : (
            <span key={`${breadcrumb.value}_${index}`} className="break-word">
              {breadcrumb.label}
            </span>
          )
        )}
      </StyledBreadcrumbs>
    </StyledTypography>
  ) : null;
};
