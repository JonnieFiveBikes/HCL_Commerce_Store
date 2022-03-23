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

// Standard libraries
import React from "react";
// UI
import { StyledBox, StyledGrid, StyledCard, StyledCardContent, StyledTypography } from "../../elements";
// Custom libraries
import { IconLoad } from "../icon-load/icon-load";
import { AttachmentFooter } from "./attachment-footer";

/**
 * displays list of Attachment
 * @param props
 * @param attachmentsList
 * @param productPartNumber
 */
const AttachmentLayout: React.FC<any> = ({ attachmentsList }: any) => {
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
          <StyledGrid container key={e.attachmentAssetID} item xs={12} sm={4} md={3} lg={3}>
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

export { AttachmentLayout };
