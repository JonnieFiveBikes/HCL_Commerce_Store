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

function StandardPageHero2BlocksLayout({ cid, banner, sectionOne, sectionTwo, ...props }: any) {
  let { page } = props;
  if (!page) {
    page = {};
  }
  const Banner = () => {
    return banner ? (
      <StyledGrid item xs={12} id={`banner_${cid}`}>
        {banner.map((e: any) => {
          const CurrentComponent = e.CurrentComponent;
          return (
            <div key={e.key} className="section">
              <CurrentComponent />
            </div>
          );
        })}
      </StyledGrid>
    ) : (
      <></>
    );
  };

  const SectionOne = () => {
    return sectionOne ? (
      <>
        <StyledGrid item xs={12} sm={8} md={6} lg={5} id={`sectionone_${cid}`}>
          {sectionOne.map((e: any) => {
            const CurrentComponent = e.CurrentComponent;
            return <CurrentComponent key={e.key} />;
          })}
        </StyledGrid>
      </>
    ) : (
      <></>
    );
  };

  const SectionTwo = () => {
    return sectionTwo ? (
      <>
        <StyledGrid item xs={12} sm={8} md={6} lg={5} id={`sectiontwo_${cid}`}>
          {sectionTwo.map((e: any) => {
            const CurrentComponent = e.CurrentComponent;
            return <CurrentComponent key={e.key} />;
          })}
        </StyledGrid>
      </>
    ) : (
      <></>
    );
  };

  return (
    <>
      <StyledContainer id={cid}>
        <Banner />
        <StyledGrid container spacing={5} justifyContent="center">
          <SectionOne />
          <SectionTwo />
        </StyledGrid>
      </StyledContainer>
    </>
  );
}

export { StandardPageHero2BlocksLayout };
