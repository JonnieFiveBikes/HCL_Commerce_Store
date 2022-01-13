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
import {
  StyledPaper,
  StyledMenuTypography,
  StyledBox,
} from "@hcl-commerce-store-sdk/react-component";

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
          <Link
            to={{
              pathname: page.seo?.href,
              state: {
                breadCrumbTrailEntryView: [
                  { label: page.name, value: page.id, seo: page.seo },
                ],
              },
            }}>
            <StyledMenuTypography
              variant="body1"
              className="expanded-menu-bold">
              {page.name}
            </StyledMenuTypography>
          </Link>
          {page.children && (
            <StyledBox
              display="flex"
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-start"
              alignContent="flex-start">
              {page.children.map((page2: any, index: number) => (
                <StyledBox mt={2} mr={5} key={page2.id}>
                  <Link
                    key={"Link_" + page2.id}
                    to={{
                      pathname: page2.seo?.href,
                      state: {
                        breadCrumbTrailEntryView: [
                          { label: page.name, value: page.id, seo: page.seo },
                          {
                            label: page2.name,
                            value: page2.id,
                            seo: page2.seo,
                          },
                        ],
                      },
                    }}>
                    <StyledMenuTypography
                      variant="body2"
                      className="expanded-menu-bold">
                      {page2.name}
                    </StyledMenuTypography>
                  </Link>
                  <ul>
                    {page2.children &&
                      page2.children.length > 0 &&
                      page2.children.map((page3: any, i: number) => (
                        <Link
                          key={page3.id}
                          to={{
                            pathname: page2.seo?.href,
                            state: {
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
                                  value: page3.i,
                                  seo: page3.seo,
                                },
                              ],
                            },
                          }}>
                          <StyledMenuTypography
                            variant="body2"
                            className="expanded-menu-sub-links">
                            {page3.name}
                          </StyledMenuTypography>
                        </Link>
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
