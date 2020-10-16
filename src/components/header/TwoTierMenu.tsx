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

interface TwoTierMenuProps {
  page?: any;
}

/**
 * TwoTierMenu component
 * expanded menu two tier submenu
 * @param props
 */
const TwoTierMenu: React.FC<TwoTierMenuProps> = (props: any) => {
  const page = props.page ? props.page : [];

  return (
    <>
      <StyledPaper className="expanded-menu-two-tier-submenu">
        <StyledBox m={3}>
          <Link to={page.seo?.href}>
            <StyledMenuTypography
              variant="body1"
              className="expanded-menu-bold">
              {page.name}
            </StyledMenuTypography>
          </Link>
          {page.children &&
            page.children.map((page2: any, i: number) => (
              <ul key={page2.id}>
                <Link to={page2.seo?.href}>
                  <StyledMenuTypography
                    variant="body2"
                    className="expanded-menu-sub-links">
                    {page2.name}
                  </StyledMenuTypography>
                </Link>
              </ul>
            ))}
        </StyledBox>
      </StyledPaper>
    </>
  );
};

export default TwoTierMenu;
