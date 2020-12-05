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
} from "../StyledUI";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
//GA360
import GTMDLService from "../../_foundation/gtm/gtmDataLayer.service";

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
        />
      ) : (
        <Link
          to={link}
          onClick={() => {
            /*GA360*/
            if (site.enableGA)
              GTMDLService.measureNavigationClick(parentName, name);
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
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const id = page.id;
  const { mySite } = useSite();

  let childrenList: JSX.Element[] = [];

  if (page.children && page.children.length > 0) {
    page.children.map(function (page: any, index: number) {
      const element = (
        <MegaMenuLink
          key={index}
          link={page.seo?.href}
          id={id}
          name={page.name}
          page={page}
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
            /*GA360 */
            if (mySite.enableGA)
              GTMDLService.measureNavigationClick("Main", page.name);
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
