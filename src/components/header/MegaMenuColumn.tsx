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
//Foundation
import { useSite } from "../../_foundation/hooks/useSite";
//UI
import {
  StyledMenuItem,
  StyledMenuTypography,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from "@hcl-commerce-store-sdk/react-component";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
//GA360
import AsyncCall from "../../_foundation/gtm/async.service";

const MegaMenuLink = (props: any) => {
  const {
    name,
    link,
    page,
    level,
    activeMenuId,
    setActiveMenuId,
    activeParentMenuId,
    setActiveParentMenuId,
    closeMegaMenu,
    parentId,
    parentName,
    site,
  } = props;

  return (
    <>
      {page.children && page.children.length > 0 ? (
        <MegaMenuColumn
          page={page}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
          activeParentMenuId={activeParentMenuId}
          setActiveParentMenuId={setActiveParentMenuId}
          closeMegaMenu={closeMegaMenu}
          level={level + 1}
          parentId={parentId}
          breadcrumbs={link.state?.breadCrumbTrailEntryView ?? []}
        />
      ) : (
        <Link
          to={link}
          onClick={() => {
            //GA360
            if (site.enableGA) AsyncCall.sendNavigationClick(parentName, name);
            closeMegaMenu();
          }}>
          <StyledMenuItem role="menuitem">
            <StyledMenuTypography variant="body1">
              <span>{name}</span>
            </StyledMenuTypography>
          </StyledMenuItem>
        </Link>
      )}
    </>
  );
};

interface MegaMenuColumnProps {
  page: any;
  activeMenuId: number | undefined;
  setActiveMenuId: any;
  activeParentMenuId: number | undefined;
  setActiveParentMenuId: any;
  closeMegaMenu: any;
  level: number;
  parentId: number | undefined;
  breadcrumbs?: any[];
}

/**
 * MegaMenu component
 * displays top category links in desktop/mobile view
 * @param props
 */
const MegaMenuColumn: React.FC<MegaMenuColumnProps> = (props: any) => {
  const {
    page,
    activeMenuId,
    setActiveMenuId,
    activeParentMenuId,
    setActiveParentMenuId,
    closeMegaMenu,
    level,
    breadcrumbs = [],
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const id = page.id;
  const { mySite } = useSite();

  let childrenList: JSX.Element[] = [];

  if (page.children && page.children.length > 0) {
    page.children.map(function (childPage: any, index: number) {
      const element = (
        <MegaMenuLink
          key={childPage.id}
          link={{
            pathname: childPage.seo?.href,
            state: {
              breadCrumbTrailEntryView: [
                ...breadcrumbs,
                { label: page.name, value: page.id, seo: page.seo },
                {
                  label: childPage.name,
                  value: childPage.id,
                  seo: childPage.seo,
                },
              ],
            },
          }}
          id={id}
          name={childPage.name}
          page={childPage}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
          activeParentMenuId={activeParentMenuId}
          setActiveParentMenuId={setActiveParentMenuId}
          closeMegaMenu={closeMegaMenu}
          level={level + 1}
          parentId={id}
          parentName={props.page.name}
          site={mySite}
        />
      );
      childrenList.push(element);
      return null;
    });
  }

  const icon = useMediaQuery(theme.breakpoints.down("xs")) ? (
    <ExpandMoreIcon />
  ) : (
    ""
  );

  return (
    <StyledAccordion
      elevation={0}
      square={true}
      expanded={
        isMobile
          ? level === 1 || activeMenuId === id
          : activeParentMenuId === id || activeMenuId === id
      }
      onChange={() => {
        setActiveMenuId(activeMenuId !== id ? id : null);
        setActiveParentMenuId(activeParentMenuId !== id ? id : null);
      }}>
      <StyledAccordionSummary
        className={`level-${level}`}
        expandIcon={icon}
        aria-controls={`${id}bh-content`}
        id={`${id}bh-header`}>
        <Link
          to={page.seo?.href}
          onClick={() => {
            //GA360
            if (mySite.enableGA) {
              AsyncCall.sendNavigationClick(
                { eventAction: "Main", eventLabel: page.name },
                {
                  enableUA: mySite.enableUA,
                  enableGA4: mySite.enableGA4,
                }
              );
            }
            closeMegaMenu();
          }}>
          <StyledMenuItem>
            <StyledMenuTypography
              variant={level === 1 ? "overline" : "body2"}
              className="category-title"
              id={`megamenu_department_${page.id}`}
              title={page.name}>
              {page.name}
            </StyledMenuTypography>
          </StyledMenuItem>
        </Link>
      </StyledAccordionSummary>
      <StyledAccordionDetails>{childrenList}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default MegaMenuColumn;
