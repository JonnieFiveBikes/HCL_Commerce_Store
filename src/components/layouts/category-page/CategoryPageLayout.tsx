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
//Foundation
import { useSite } from "../../../_foundation/hooks/useSite";
//UI
import { StyledGrid, StyledContainer } from "../../StyledUI";
//GA360
import AsyncCall from "../../../_foundation/gtm/async.service";

const CategoryPageLayout: React.FC<any> = ({
  cid,
  hero,
  contentSection,
  ...props
}: any) => {
  const { mySite } = useSite();
  let { page } = props;
  if (!page) {
    page = {};
  }
  const Hero = () => {
    return (
      <>
        {hero && (
          <StyledGrid container>
            <StyledGrid item xs={12}>
              {hero.map((e: any) => {
                const CurrentComponent = e.CurrentComponent;
                return (
                  <div key={e.key}>
                    <CurrentComponent />
                  </div>
                );
              })}
            </StyledGrid>
          </StyledGrid>
        )}
      </>
    );
  };

  const ContentSection = () => {
    return (
      <>
        {contentSection && (
          <StyledGrid container>
            {contentSection.map((e: any) => {
              const CurrentComponent = e.CurrentComponent;
              return (
                <StyledGrid item key={e.key}>
                  <CurrentComponent />
                </StyledGrid>
              );
            })}
          </StyledGrid>
        )}
      </>
    );
  };

  //GA360
  React.useEffect(() => {
    if (mySite.enableGA) {
      AsyncCall.sendContentPageViewEvent(cid, {
        enableUA: mySite.enableUA,
        enableGA4: mySite.enableGA4,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer id={cid}>
      <Hero />
      <ContentSection />
    </StyledContainer>
  );
};

export default CategoryPageLayout;
