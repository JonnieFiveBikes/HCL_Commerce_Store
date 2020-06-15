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
import { StyledContainer } from "../../StyledUI";

const ProductPageLayout: React.FC<any> = ({
  cid,
  commercedatasection,
  bottomMarketingSection,
  topMarketingSection,
  ...props
}: any) => {
  let { page } = props;
  if (!page) {
    page = {};
  }
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
      <Section key="top" context={topMarketingSection} />
      <Section key="commerce" context={commercedatasection} />
      <Section key="bottom" context={bottomMarketingSection} />
    </StyledContainer>
  );
};

export default ProductPageLayout;
