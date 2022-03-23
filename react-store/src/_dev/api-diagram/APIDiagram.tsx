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
import React, { useMemo, lazy } from "react";
import { useSelector } from "react-redux";
//Foundation libraries
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import { PRODUCTION, SHOW_API_FLOW } from "../../_foundation/constants/common";
//Redux
import { apiFlowListSelector } from "../../redux/selectors/api";
//UI
import { StyledBox } from "@hcl-commerce-store-sdk/react-component";

/**
 * API Sequence Diagram
 * displays Sequence Diagram based on API flow
 * @param props
 */
const APIDiagram: React.FC = (props: any) => {
  const showAPIFlow = process.env.NODE_ENV !== PRODUCTION ? localStorageUtil.get(SHOW_API_FLOW) === "true" : false;
  const SequenceDiagram = showAPIFlow ? lazy(() => import("react-sequence-diagram")) : null;
  const apiFlowList = useSelector(apiFlowListSelector);
  const inputString = useMemo(() => (apiFlowList ? apiFlowList.join("\n") : ""), [apiFlowList]);

  const options = { theme: "simple" };
  const onError = (error) => console.log(error);

  return inputString && SequenceDiagram ? (
    <StyledBox className="horizontal-scroll">
      <SequenceDiagram input={inputString} options={options} onError={onError} />
    </StyledBox>
  ) : (
    <></>
  );
};

export default APIDiagram;
