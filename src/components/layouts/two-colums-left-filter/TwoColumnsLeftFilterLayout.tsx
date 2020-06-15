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
import { StyledGrid, StyledContainer } from "../../StyledUI";

interface TwoColumnsLeftFilterContext {
  cid: string;
  topContentSection: any;
  leftNavigationSection: any;
  rightContentSection: any;
}
function TwoColumnsLeftFilterLayout({
  cid,
  topContentSection,
  leftNavigationSection,
  rightContentSection,
  ...props
}: TwoColumnsLeftFilterContext) {
  const TopContentSection = () => {
    return (
      <>
        {topContentSection && (
          <>
            {topContentSection.map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} />;
            })}
          </>
        )}
      </>
    );
  };

  const LeftNavigationSection = () => {
    return (
      <>
        {leftNavigationSection && (
          <StyledGrid item xs={12} md={3} className="sidebar">
            {leftNavigationSection.map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} />;
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  const RightContentSection = () => {
    return (
      <>
        {rightContentSection && (
          <StyledGrid item xs={12} md={9}>
            {rightContentSection.map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} />;
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  return (
    <>
      <StyledContainer id={cid}>
        <TopContentSection />
        {(leftNavigationSection || rightContentSection) && (
          <StyledGrid container spacing={2}>
            <LeftNavigationSection />
            <RightContentSection />
          </StyledGrid>
        )}
      </StyledContainer>
    </>
  );
}
TwoColumnsLeftFilterLayout.propTypes = {
  cid: PropTypes.string.isRequired,
  topContentSection: PropTypes.array,
  leftNavigationSection: PropTypes.array,
  rightContentSection: PropTypes.array,
  page: PropTypes.object,
};
export default TwoColumnsLeftFilterLayout;
