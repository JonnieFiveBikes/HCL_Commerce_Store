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
import PropTypes from "prop-types";
//UI
import { StyledGrid, StyledTypography } from "@hcl-commerce-store-sdk/react-component";

function AdministrativeToolsLinksSection({ title, linkList }: any) {
  return (
    <>
      {title && (
        <StyledTypography variant="subtitle1" className="accounts-links-title">
          {title}
        </StyledTypography>
      )}
      <StyledGrid container spacing={2}>
        {linkList.map((linkElement: any, index: number) => (
          <StyledGrid key={index} item xs={12} sm={6} md={4}>
            {linkElement}
          </StyledGrid>
        ))}
      </StyledGrid>
    </>
  );
}

AdministrativeToolsLinksSection.propTypes = {
  linkList: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default AdministrativeToolsLinksSection;
