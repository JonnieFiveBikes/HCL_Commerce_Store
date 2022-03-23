/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import React from "react";
//UI
import { StyledGrid, StyledContainer } from "../../elements";
//types
import { PageLayoutProps } from "../..";

/**
 * Product Listing Page Layout
 * @description Two columns with left filter layout.
 * @param cid Unique identifier for this component.
 * @param slots All the slots containing commerce widgets in this layout.
 */
export const ProductListingPageLayout: React.FC<PageLayoutProps> = ({ cid, slots = [], ...props }) => {
  const SlotOne = () => {
    return (
      <>
        {slots["1"] && (
          <>
            {slots["1"].map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} />;
            })}
          </>
        )}
      </>
    );
  };

  const SlotTwo = () => {
    return (
      <>
        {slots["2"] && (
          <StyledGrid item xs={12} md={3} className="sidebar">
            {slots["2"].map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} />;
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  const SlotThree = () => {
    return (
      <>
        {slots["3"] && (
          <StyledGrid item xs={12} md={9}>
            {slots["3"].map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} />;
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  return (
    <StyledContainer id={cid}>
      {slots["1"] ? <SlotOne /> : null}
      {slots["2"] || slots["3"] ? (
        <StyledGrid container spacing={2}>
          <SlotTwo />
          <SlotThree />
        </StyledGrid>
      ) : null}
    </StyledContainer>
  );
};
