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

interface ThreeTierMenuProps {
  page?: any;
}

/**
 * ThreeTierMenu component
 * expanded menu three tier submenu
 * @param props
 */
const ThreeTierMenu: React.FC<ThreeTierMenuProps> = (props: any) => {
  const page = props.page ? props.page : [];

  return (
    <>
      <StyledPaper className="expanded-menu-three-tier-submenu">
        <StyledBox m={3}>
          <StyledLink
            testId={`header-${page.id}`}
            to={page.seo?.href}
            state={{
              breadCrumbTrailEntryView: [{ label: page.name, value: page.id, seo: page.seo }],
            }}>
            <StyledMenuTypography variant="body1" className="expanded-menu-bold">
              {page.name}
            </StyledMenuTypography>
          </StyledLink>
          {page.children && (
            <StyledBox
              display="flex"
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-start"
              alignContent="flex-start">
              {page.children.map((page2: any) => (
                <StyledBox mt={2} mr={5} key={page2.id}>
                  <StyledLink
                    testId={`header-${page2.id}`}
                    key={"Link_" + page2.id}
                    to={page2.seo?.href}
                    state={{
                      breadCrumbTrailEntryView: [
                        { label: page.name, value: page.id, seo: page.seo },
                        {
                          label: page2.name,
                          value: page2.id,
                          seo: page2.seo,
                        },
                      ],
                    }}>
                    <StyledMenuTypography variant="body2" className="expanded-menu-bold">
                      {page2.name}
                    </StyledMenuTypography>
                  </StyledLink>
                  <ul>
                    {page2.children?.map((page3: any) => (
                      <StyledLink
                        testId={`header-${page3.id}`}
                        key={page3.id}
                        to={page3.seo?.href}
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
                            {
                              label: page3.name,
                              value: page3.id,
                              seo: page3.seo,
                            },
                          ],
                        }}>
                        <StyledMenuTypography variant="body2" className="expanded-menu-sub-links">
                          {page3.name}
                        </StyledMenuTypography>
                      </StyledLink>
                    ))}
                  </ul>
                </StyledBox>
              ))}
            </StyledBox>
          )}
        </StyledBox>
      </StyledPaper>
    </>
  );
};

export default ThreeTierMenu;
