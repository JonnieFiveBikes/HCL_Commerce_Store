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
import { StyledBox, StyledCard, StyledGrid, StyledCardContent, StyledTypography } from "../../elements";
//Custom libraries
import { IconLoad } from "../icon-load/icon-load";
import { AttachmentFooter } from "./attachment-footer";

/**
 * displays list of Attachment
 * @param props
 * @param attachmentsList
 * @param productPartNumber
 */
const AttachmentB2BLayout: React.FC<any> = ({ attachmentsList }) => {
  const contentComponent = (e: any) => (
    <>
      <StyledTypography variant="body2" display="block">
        {`${e.name}`}
      </StyledTypography>
      <StyledCardContent>
        <StyledTypography variant="body2" color="textSecondary" component="p">
          <IconLoad fileExtension={`${e.mimeType}`} />
        </StyledTypography>
      </StyledCardContent>
    </>
  );
  return (
    <>
      <StyledBox className=" attachment "></StyledBox>
      <br></br>
      <StyledGrid container spacing={2} className="product-details-list full-height  product-attribute ">
        {attachmentsList.map((e: any) => (
          <StyledGrid container key={e.attachmentAssetID} item xs={12} sm={12} md={6} lg={4} xl={4}>
            <StyledCard
              testId={e.attachmentAssetID}
              contentComponent={contentComponent(e)}
              cardFooter={<AttachmentFooter footer={e} />}
            />
          </StyledGrid>
        ))}
      </StyledGrid>
    </>
  );
};

export { AttachmentB2BLayout };
