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

import React from "react";
import { render, waitForElement } from "../../../../testing/utils/test-utils";
import { CategoryRecommendationLayout } from "../";
import { initStates, cidIValue, eSpotIValue, page } from "../mocks/data";
import { server } from "../../../../testing/mocks/server";
import { handlers } from "../mocks/handlers";

jest.mock(
  "../../category-card/CategoryCardLayout",
  () => ({ renderingContext }) => (
    <div data-testid={`category-${renderingContext.id}`} />
  )
);
describe("Category Recommendation Layout", () => {
  test("renders empty Category Recommendation when eSpot not found", async () => {
    const { container, queryByTestId } = render(
      <CategoryRecommendationLayout
        cid={cidIValue}
        eSpot={eSpotIValue}
        page={page}
      />,
      {
        initialState: initStates as any,
      }
    );
    const element = await waitForElement(() =>
      container.querySelector(".vertical-padding-2")
    );
    expect(element).toBeTruthy();
    expect(element).toMatchSnapshot();
    const cat = await waitForElement(() =>
      queryByTestId("category-Kitchen")
    ).catch((e) => null);
    expect(cat).toBeFalsy();
  });

  test("renders Category Recommendation with eSpot and category data", async () => {
    server.use(...handlers);
    const { queryByTestId } = render(
      <CategoryRecommendationLayout
        cid={cidIValue}
        eSpot={eSpotIValue}
        page={page}
      />,
      {
        initialState: initStates as any,
      }
    );
    const cat = await waitForElement(() => queryByTestId("category-Kitchen"));
    expect(cat).toBeTruthy();
    expect(cat).toMatchSnapshot();
  });
});
