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
//custom
import TwoTierMenu from "./TwoTierMenu";
import ThreeTierMenu from "./ThreeTierMenu";

interface ExpandedMenuItemProps {
  page?: any;
}

/**
 * ExpandedMenuItem component
 * expanded menu parent items for desktop/tablet view
 * @param props
 */
const ExpandedMenuItem: React.FC<ExpandedMenuItemProps> = (props: any) => {
  const page = props.page ? props.page : [];

  return (
    <>
      {page.children?.[0]?.children ? (
        <>
          <ThreeTierMenu
            page={page}
            // hideMenuList={hideMenuList}
          />
        </>
      ) : (
        <>
          <TwoTierMenu
            page={page}
            // hideMenuList={hideMenuList}
          />
        </>
      )}
    </>
  );
};

export default ExpandedMenuItem;
