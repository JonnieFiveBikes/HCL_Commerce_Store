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
        <StyledBox pl={2} pt={2}>
          <Link to={page.seo?.href}>
            <StyledMenuTypography
              variant="body2"
              className="expanded-menu-bold">
              {page.name}
            </StyledMenuTypography>
          </Link>
        </StyledBox>
        {page.children && (
          <StyledBox
            display="flex"
            direction="row"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignContent="flex-start">
            {page.children.map((page2: any, index: number) => (
              <StyledBox p={2} key={page2.id}>
                <Link key={index} to={page2.seo?.href}>
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
                      <Link key={page3.id} to={page3.seo?.href}>
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
      </StyledPaper>
    </>
  );
};

export default ThreeTierMenu;
