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
//UI
import { StyledPaper, StyledMenuTypography, StyledBox } from "../StyledUI";

interface AllCategoriesExpandedMenuProps {
  pages?: any;
}

/**
 * AllCategoriesExpandedMenu component
 * displays all categories in the expanded menu on desktop/tablet
 * @param props
 */
const AllCategoriesExpandedMenu: React.FC<AllCategoriesExpandedMenuProps> = (
  props: any
) => {
  const pages = props.pages ? props.pages : [];

  return (
    <>
      <StyledPaper className="expanded-menu-paper">
        <StyledBox
          display="flex"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignContent="flex-start"
          mx={4}
          my={3}>
          {pages &&
            pages.map((page: any, index: number) => (
              <StyledBox key={page.id} mr={5}>
                <Link key={"Link_" + index} to={page.seo?.href}>
                  <StyledMenuTypography
                    variant="body1"
                    className="expanded-menu-bold">
                    {page.name}
                  </StyledMenuTypography>
                </Link>
                <ul>
                  {page.children &&
                    page.children.map((page2: any, i: number) => (
                      <Link key={page2.id} to={page2.seo?.href}>
                        <StyledMenuTypography
                          variant="body2"
                          className="expanded-menu-sub-links">
                          {page2.name}
                        </StyledMenuTypography>
                      </Link>
                    ))}
                </ul>
              </StyledBox>
            ))}
        </StyledBox>
      </StyledPaper>
    </>
  );
};

export default AllCategoriesExpandedMenu;
