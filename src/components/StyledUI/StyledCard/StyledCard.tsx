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
import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { Divider } from "@material-ui/core";
import {
  StyledButton,
  StyledCardActions,
  StyledLink,
  StyledGrid,
  StyledCardContent,
} from "../../StyledUI";

const StyledCardWrapper = styled(({ ...props }) => <Card {...props} />)`
  ${({ theme }) => `
    .MuiTypography-body2 {
      width: 66%;
      margin: 0 auto;
    }

    &.address-card {
      position: relative;
    }

    &.selected {
      border-radius: ${theme.shape.borderRadius}px;
      border: 2px solid ${theme.palette.primary.main};
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
  headerProps?: any;
  contentComponent?: any;
  cardActions?: any;
  confirmLabel?: string;
  cancelLabel?: string;
  className?: string;
}

const StyledCard: React.FC<StyledParameterizedCardProps> = (props: any) => {
  const {
    headerProps,
    contentComponent,
    cardActions,
    confirmLabel,
    cancelLabel,
    className,
  } = props;
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [confirmActionIndex, setConfirmActionIndex] = useState<number>(0);

  const toggleConfirm = (
    event: MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    event.preventDefault();
    setConfirmState(!confirmState);
    setConfirmActionIndex(index);
  };

  return (
    <StyledCardWrapper className={className + " full-height"}>
      <StyledGrid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        className="full-height">
        {headerProps && (
          <>
            <StyledGrid item xs={false} className="full-width">
              <StyledCardContent className="horizontal-padding-2 vertical-padding-2">
                {headerProps}
              </StyledCardContent>
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
                  <StyledLink to={v.link} key={index}>
                    {v.text}
                  </StyledLink>
                ) : (
                  <StyledLink
                    to="#"
                    onClick={
                      v.enableConfirmation
                        ? (event) => toggleConfirm(event, index)
                        : v.handleClick
                    }
                    key={index}>
                    {v.text}
                  </StyledLink>
                )
              )}
            </StyledCardActions>

            {confirmState && (
              <StyledConfirmOverlay>
                <StyledGrid
                  container
                  direction="column"
                  justify="flex-end"
                  className="full-height horizontal-padding-2"
                  spacing={2}>
                  <StyledGrid item>
                    <StyledButton
                      className="confirm-action-button"
                      variant="outlined"
                      fullWidth
                      onClick={cardActions[confirmActionIndex]?.handleClick}>
                      {confirmLabel}
                    </StyledButton>
                  </StyledGrid>
                  <StyledGrid item>
                    <StyledButton
                      className="cancel-action-button"
                      variant="outlined"
                      fullWidth
                      onClick={(event) => toggleConfirm(event, 0)}>
                      {cancelLabel}
                    </StyledButton>
                  </StyledGrid>
                </StyledGrid>
              </StyledConfirmOverlay>
            )}
          </StyledGrid>
        )}
      </StyledGrid>
    </StyledCardWrapper>
  );
};

export default StyledCard;
