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
import { StyledPaper, StyledMenuTypography, StyledBox, StyledLink } from "@hcl-commerce-store-sdk/react-component";

interface AllCategoriesExpandedMenuProps {
  pages?: any;
}

/**
 * AllCategoriesExpandedMenu component
 * displays all categories in the expanded menu on desktop/tablet
 * @param props
 */
const AllCategoriesExpandedMenu: React.FC<AllCategoriesExpandedMenuProps> = (props: any) => {
  const pages = props.pages ? props.pages : [];

  return (
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
              <StyledLink
                testId={`header-${page.id}`}
                to={page.seo?.href}
                key={"Link_" + index}
                state={{
                  breadCrumbTrailEntryView: [{ label: page.name, value: page.id, seo: page.seo }],
                }}>
                <StyledMenuTypography variant="body1" className="expanded-menu-bold">
                  {page.name}
                </StyledMenuTypography>
              </StyledLink>
              <ul>
                {page.children &&
                  page.children.map((page2: any, i: number) => (
                    <StyledLink
                      testId={`header-${page2.id}`}
                      to={page2.seo?.href}
                      key={page2.id}
                      state={{
                        breadCrumbTrailEntryView: [
                          {
                            label: page.name,
                            value: page.id,
                            seo: page.seo,
                          },
                          {
                            label: page2.name,
                            value: page2.id,
                            seo: page2.seo,
                          },
                        ],
                      }}>
                      <StyledMenuTypography variant="body2" className="expanded-menu-sub-links">
                        {page2.name}
                      </StyledMenuTypography>
                    </StyledLink>
                  ))}
              </ul>
            </StyledBox>
          ))}
      </StyledBox>
    </StyledPaper>
  );
};

export default AllCategoriesExpandedMenu;
