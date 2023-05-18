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
import React, { MouseEvent } from "react";
import { kebabCase } from "lodash-es";

// Custom libraries
import { StyledButton, StyledCardActions, StyledGrid } from "../../elements";

// UI libraries
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";

type Attachment = {
  mimeType: string;
  attachmentAssetPath: string;
  name: string;
  attachmentAssetID: string;
};
const CONTENT_URL = "content/url";
const onClick = (attachment: Attachment) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (attachment.mimeType === CONTENT_URL) {
    e.preventDefault();
    window.open(attachment.attachmentAssetPath, "_blank", "popup=1");
  }
};

/**
 * displays list of Attachment
 * @param props
 * @param footer
 */
const AttachmentFooter: React.FC<{ footer: Attachment }> = ({ footer }) => {
  return (
    <StyledCardActions disableSpacing className="product-attachment">
      <StyledGrid container direction="row" justifyContent="space-between" alignItems="center">
        <StyledGrid item>
          <StyledButton
            testId={`product-attachment-${kebabCase(footer.name)}`}
            color="secondary"
            size="small"
            variant="text"
            href={`${footer.attachmentAssetPath}`}
            onClick={onClick(footer)}
            target="_blank"
            download={`${footer.name}`}>
            <GetAppRoundedIcon />
          </StyledButton>
        </StyledGrid>
        <StyledGrid item>
          <label color="textSecondary">.{`${footer.mimeType}`.toUpperCase().split("/")[1]}</label>
        </StyledGrid>
      </StyledGrid>
    </StyledCardActions>
  );
};

export { AttachmentFooter };
