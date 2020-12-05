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
//Custom libraries
import { StyledButton, StyledCardActions, StyledGrid } from "../../StyledUI";
//UI libraries
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";

/**
 * displays list of Attachment
 * @param props
 * @param footer
 */

const AttachmentFooter: React.FC<any> = ({ footer }: any) => {
  return (
    <StyledCardActions disableSpacing className="product-attachment">
      <StyledGrid
        container
        direction="row"
        justify="space-between"
        alignItems="center">
        <StyledGrid item>
          <StyledButton
            color="secondary"
            size="small"
            variant="text"
            href={`${footer.attachmentAssetPath}`}
            download={`${footer.name}`}>
            <GetAppRoundedIcon />
          </StyledButton>
        </StyledGrid>
        <StyledGrid item>
          <label color="textSecondary">
            .{`${footer.mimeType}`.toUpperCase().split("/")[1]}
          </label>
        </StyledGrid>
      </StyledGrid>
    </StyledCardActions>
  );
};

export { AttachmentFooter };
