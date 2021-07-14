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
import React, { useState } from "react";
//Custom libraries
import MegaMenuColumn from "./MegaMenuColumn";
//UI
import { StyledGrid } from "@hcl-commerce-store-sdk/react-component";

interface MegaMenuProps {
  menutitle?: string;
  parent?: any;
  pages?: any;
  subMenuPage?: any;
  closeMegaMenu?: any;
}

/**
 * MegaMenu component
 * displays top category links in desktop/mobile view
 * @param props
 */
const MegaMenu: React.FC<MegaMenuProps> = (props: any) => {
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>();
  const [activeParentMenuId, setActiveParentMenuId] = useState<
    number | undefined
  >();

  const pages = props.pages ? props.pages : [];
  const closeMegaMenu = props.closeMegaMenu ? props.closeMegaMenu : null;

  const callCloseMegaMenu = () => closeMegaMenu();

  return (
    <>
      {pages &&
        pages.map((page: any, index: number) => {
          return (
            <StyledGrid item xs={12} sm={4} md={3} lg={2} key={page.id}>
              <MegaMenuColumn
                page={page}
                activeMenuId={activeMenuId}
                setActiveMenuId={setActiveMenuId}
                activeParentMenuId={activeParentMenuId}
                setActiveParentMenuId={setActiveParentMenuId}
                closeMegaMenu={callCloseMegaMenu}
                parentId={undefined}
                level={1}
              />
            </StyledGrid>
          );
        })}
    </>
  );
};

export default MegaMenu;
