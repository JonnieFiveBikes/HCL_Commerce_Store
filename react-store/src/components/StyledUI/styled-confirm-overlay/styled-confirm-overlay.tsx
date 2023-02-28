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

import styled from "@mui/styled-engine-sc";
import { StyledButton, StyledGrid } from "@hcl-commerce-store-sdk/react-component";
import { useTranslation } from "react-i18next";
import { kebabCase } from "lodash-es";

const Overlay = styled("div")`
  ${({ theme }) => `
      background-color: ${theme.palette.background.paper}${theme.palette.background.transparency};
      position: absolute;
      bottom:0;
      height: 70%;
      width: 100%;
  `}
`;

/**
 * In-place overlay for displaying binary confirmation prompt
 * @param props
 * @returns
 */
export const ConfirmationOverlay = (props) => {
  const { t } = useTranslation();
  const { show, confirm, cancel, confirmLabel, cancelLabel } = props;
  return (
    show && (
      <Overlay>
        <StyledGrid
          container
          justifyContent="flex-start"
          alignItems="flex-end"
          className="full-height horizontal-padding-2"
          spacing={2}>
          <StyledGrid item>
            <StyledButton
              testId={`${kebabCase(confirmLabel)}`}
              className="confirm-action-button"
              variant="outlined"
              fullWidth
              onClick={confirm}>
              {t(confirmLabel)}
            </StyledButton>
          </StyledGrid>
          <StyledGrid item>
            <StyledButton
              testId={`${kebabCase(cancelLabel)}`}
              className="cancel-action-button"
              variant="outlined"
              fullWidth
              onClick={cancel}>
              {t(cancelLabel)}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      </Overlay>
    )
  );
};
