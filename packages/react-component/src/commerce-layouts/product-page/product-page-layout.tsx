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
import { StyledContainer } from "../../elements";
//types
import { PageLayoutProps } from "../..";

/**
 * Product Page Layout
 * @description Three rows layout.
 * @param cid Unique identifier for this component.
 * @param slots All the slots containing commerce widgets in this layout.
 */
export const ProductPageLayout: React.FC<PageLayoutProps> = ({ cid, slots = [], ...props }) => {
  const Section = ({ context }: any) => {
    return (
      <>
        {context && (
          <>
            {context.map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return <CurrentComponent key={e.key} />;
            })}
          </>
        )}
      </>
    );
  };
  return (
    <StyledContainer id={cid}>
      {slots["1"] ? <Section key="top" context={slots["1"]} /> : null}
      {slots["2"] ? <Section key="commerce" context={slots["2"]} /> : null}
      {slots["3"] ? <Section key="bottom" context={slots["3"]} /> : null}
    </StyledContainer>
  );
};
