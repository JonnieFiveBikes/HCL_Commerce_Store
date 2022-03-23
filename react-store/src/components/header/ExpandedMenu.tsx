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
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
//UI
import { StyledBox, StyledContainer } from "@hcl-commerce-store-sdk/react-component";
//custom
import MenubarMenuItem from "./MenubarMenuItem";

interface ExpandedMenuProps {
  pages?: any;
}

/**
 * ExpandedMenu component
 * expanded menu for desktop/tablet view
 * @param props
 */
const ExpandedMenu: React.FC<ExpandedMenuProps> = (props: any) => {
  const { t } = useTranslation();
  const location: any = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState<any | null>(null);
  const { pages = [] } = props;
  const allCategories = {
    id: "allCategories",
    children: pages,
    name: t("AllCategoriesExpandedMenu.AllCategoriesLabel"),
  };
  const categories = [allCategories, ...pages];
  const selectMenuItem = (cid: string) => {
    setSelectedMenuItem(categories.filter((c) => c.id === cid)[0] || null);
  };

  React.useEffect(() => {
    setSelectedMenuItem(null);
  }, [location]);

  return (
    <StyledBox className="expanded-menu-container">
      <StyledContainer overflow="hidden">
        <StyledBox
          display="flex"
          direction="row"
          flexWrap="nowrap"
          justifyContent="flex-start"
          alignContent="flex-start">
          {categories?.map((page: any) => (
            <MenubarMenuItem
              key={page.id}
              selectedMenuItem={selectedMenuItem}
              selectMenuItem={selectMenuItem}
              page={page}></MenubarMenuItem>
          ))}
        </StyledBox>
      </StyledContainer>
    </StyledBox>
  );
};

export default ExpandedMenu;
