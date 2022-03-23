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
export const BuiltInPageLayout: React.FC<PageLayoutProps> = ({ cid, slots = [], ...props }) => {
  const SlotOne = () => {
    return (
      <>
        {slots["1"] && (
          <StyledGrid item xs={12}>
            {slots["1"].map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} />;
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  const SlotTwo = () => {
    return (
      <>
        {slots["builtIn"] && (
          <StyledGrid item xs={12}>
            {slots["builtIn"].map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} {...props} />;
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  const SlotThree = () => {
    return (
      <>
        {slots["2"] && (
          <StyledGrid item xs={12}>
            {slots["2"].map((e: any) => {
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
      <StyledGrid container spacing={2}>
        {slots["1"] ? <SlotOne /> : null}
        {slots["builtIn"] ? <SlotTwo /> : null}
        {slots["2"] ? <SlotThree /> : null}
      </StyledGrid>
    </StyledContainer>
  );
};
