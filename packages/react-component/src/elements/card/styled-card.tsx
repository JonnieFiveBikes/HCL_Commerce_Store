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
import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { StyledButton } from "../button";
import { StyledLink } from "../link";
import { StyledGrid } from "../grid";
import { StyledTypography } from "../typography";
import { StyledCardActions } from "./styled-card-actions";
import { StyledCardContent } from "./styled-card-content";

const StyledCardWrapper = styled(({ ...props }) => <Card {...props} />)`
  ${({ theme }) => `
    border: 1px solid  ${theme.palette.grey[200]};

    &.product-card {
      .MuiTypography-body2 {
        width: 66%;
        margin: 0 auto;
      }
    }

    &.address-card, &.payment-card {
      position: relative;
      border: 1px solid  ${theme.palette.divider};

      a {
        font-weight: 400;
      }
    }

    &.selected {
      border-radius: ${theme.shape.borderRadius}px;
      border: 2px solid ${theme.palette.primary.main};
    }

    &.error-card-selected {
      border-radius: ${theme.shape.borderRadius}px;
      border: 2px solid ${theme.palette.text.alert};
    }
  `}
`;

const StyledConfirmOverlay = styled.div`
  ${({ theme }) => `
      background-color: ${theme.palette.background.paper}${theme.palette.background.transparency};
      position: absolute;
      bottom:0;
      height: 70%;
      width: 100%;
  `}
`;

interface StyledParameterizedCardProps {
  testId: string;
  headerProps?: any;
  contentComponent?: any;
  cardActions?: any;
  confirmLabel?: string;
  cancelLabel?: string;
  className?: string;
  cardFooter?: any;
}

const StyledCard: React.FC<StyledParameterizedCardProps> = (props: any) => {
  const { headerProps, contentComponent, cardActions, cardFooter, confirmLabel, cancelLabel, className, testId } =
    props;
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [confirmActionIndex, setConfirmActionIndex] = useState<number>(0);

  const toggleConfirm = (index: number) => {
    setConfirmState(!confirmState);
    setConfirmActionIndex(index);
  };

  const handleConfirmButtonClick = () => {
    cardActions[confirmActionIndex]?.handleClick();
    toggleConfirm(0);
  };

  const handleCancelButtonClick = () => {
    toggleConfirm(0);
  };

  const handeActionButtonClick = (v: any, index: number) => {
    if (v.enableConfirmation) {
      toggleConfirm(index);
    } else {
      v.handleClick();
    }
  };

  return (
    <StyledCardWrapper className={className + " full-height"}>
      <StyledGrid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        className="full-height">
        {headerProps && (
          <>
            <StyledGrid item xs={false} className="full-width">
              <StyledCardContent className="horizontal-padding-2 vertical-padding-2">{headerProps}</StyledCardContent>
            </StyledGrid>
            {(contentComponent || cardActions?.length > 0) && <Divider />}
          </>
        )}

        {contentComponent && (
          <>
            <StyledGrid item xs>
              <StyledCardContent className="horizontal-padding-2 vertical-padding-2">
                {contentComponent}
              </StyledCardContent>
            </StyledGrid>
            {cardActions?.length > 0 && <Divider />}
          </>
        )}

        {cardActions?.length > 0 && (
          <StyledGrid item xs={false}>
            <StyledCardActions className="horizontal-padding-2 vertical-padding-2">
              {cardActions.map((v: any, index: number) =>
                v.link ? (
                  <StyledLink to={v.link} key={v.text + "_" + index}>
                    {v.text}
                  </StyledLink>
                ) : (
                  <StyledButton
                    testId={`StyledCard_${testId}_${v.text}_${index}`}
                    variant="text"
                    key={v.text + "_" + index}
                    onClick={() => handeActionButtonClick(v, index)}>
                    <StyledTypography variant="body1">{v.text}</StyledTypography>
                  </StyledButton>
                )
              )}
            </StyledCardActions>

            {confirmState && (
              <StyledConfirmOverlay>
                <StyledGrid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  className="full-height horizontal-padding-2"
                  spacing={2}>
                  <StyledGrid item>
                    <StyledButton
                      testId={`StyledCard_${testId}_confirm`}
                      className="confirm-action-button"
                      variant="outlined"
                      fullWidth
                      onClick={handleConfirmButtonClick}>
                      {confirmLabel}
                    </StyledButton>
                  </StyledGrid>
                  <StyledGrid item>
                    <StyledButton
                      testId={`StyledCard_${testId}_cancel`}
                      className="cancel-action-button"
                      variant="outlined"
                      fullWidth
                      onClick={handleCancelButtonClick}>
                      {cancelLabel}
                    </StyledButton>
                  </StyledGrid>
                </StyledGrid>
              </StyledConfirmOverlay>
            )}
          </StyledGrid>
        )}

        {cardFooter && (
          <StyledGrid item xs={false}>
            {cardFooter}
          </StyledGrid>
        )}
      </StyledGrid>
    </StyledCardWrapper>
  );
};

export { StyledCard };
