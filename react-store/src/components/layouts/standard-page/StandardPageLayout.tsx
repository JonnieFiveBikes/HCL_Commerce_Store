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
import { StyledGrid, StyledContainer } from "@hcl-commerce-store-sdk/react-component";

function StandardPageLayout({ cid, banner, sectionOne, sectionTwo, ...props }: any) {
  let { page } = props;
  if (!page) {
    page = {};
  }
  const Banner = () => {
    return (
      <>
        {banner && (
          <>
            <StyledGrid container>
              {banner.map((e: any) => {
                const CurrentComponent = e.CurrentComponent;
                return (
                  <StyledGrid key={e.key} item xs={12}>
                    <CurrentComponent />
                  </StyledGrid>
                );
              })}
            </StyledGrid>
          </>
        )}
      </>
    );
  };

  const SectionOne = () => {
    return (
      <>
        {sectionOne && (
          <StyledGrid container>
            {sectionOne.map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return (
                <StyledGrid key={e.key} item xs={12}>
                  <CurrentComponent />
                </StyledGrid>
              );
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  const SectionTwo = () => {
    return (
      <>
        {sectionTwo && (
          <StyledGrid container>
            {sectionTwo.map((e: any) => {
              const CurrentComponent = e.CurrentComponoent;
              return (
                <StyledGrid key={e.key} item xs={12}>
                  <CurrentComponent />
                </StyledGrid>
              );
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  return (
    <div id={cid}>
      <StyledContainer>
        <Banner />
        <SectionOne />
        <SectionTwo />
      </StyledContainer>
    </div>
  );
}

export default StandardPageLayout;
