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
import React, { useMemo, useState } from "react";
import { kebabCase } from "lodash-es";
import styled from "@mui/styled-engine-sc";
import { Card, CardActionArea } from "@mui/material";
import { Divider } from "@mui/material";
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
    &.wishlist-card {
      .MuiTypography-body2 {
        width: 66%;
        margin: 0 auto;
      }
      position:relative;
      border: 1px solid  ${theme.palette.divider};

      > .MuiGrid-container > .MuiGrid-item > .MuiCardContent-root {
        display: flex;
        flex-direction: column;
        height: 100%;
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

const StyledConfirmOverlay = styled("div")`
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
  cardAreaSelector?: any;
}

const StyledCard: React.FC<StyledParameterizedCardProps> = (props: any) => {
  const {
    headerProps,
    contentComponent,
    cardActions,
    cardFooter,
    confirmLabel,
    cancelLabel,
    className,
    testId,
    cardAreaSelector,
  } = props;
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

  const handleActionButtonClick = (v: any, index: number) => {
    if (v.enableConfirmation) {
      toggleConfirm(index);
    } else {
      v.handleClick();
    }
  };
  const cardContentMain = useMemo(() => {
    return (
      <StyledGrid item xs className="full-width">
        <StyledCardContent className="horizontal-padding-2 vertical-padding-2">{contentComponent}</StyledCardContent>
      </StyledGrid>
    );
  }, [contentComponent]);

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

        {cardContentMain ? (
          <>
            {cardAreaSelector ? (
              <CardActionArea data-testid={kebabCase(`card-action-area-${testId}`)} onClick={cardAreaSelector}>
                {cardContentMain}
              </CardActionArea>
            ) : (
              cardContentMain
            )}
            {cardActions?.length > 0 && <Divider />}
          </>
        ) : null}

        {cardActions?.length > 0 && (
          <StyledGrid container direction="row" alignItems="stretch" justifyContent="flex-start" item xs={false}>
            <StyledCardActions className="horizontal-padding-2 vertical-padding-2">
              {cardActions.map((v: any, index: number) =>
                v.link ? (
                  <StyledGrid item key={v.text + "_" + index}>
                    <StyledLink
                      testId={kebabCase(`${testId}-${v.text}`)}
                      to={v.link}
                      key={v.text + "_" + index}
                      state={v.state}>
                      {v.text}
                    </StyledLink>
                  </StyledGrid>
                ) : (
                  <StyledGrid item key={v.text + "_" + index}>
                    <StyledButton
                      testId={kebabCase(`${testId}-${v.text}`)}
                      variant={v.outlined ? "outlined" : "text"}
                      key={v.text + "_" + index}
                      disabled={v.disable ?? false}
                      onClick={() => handleActionButtonClick(v, index)}>
                      <StyledTypography variant="body1">{v.text}</StyledTypography>
                    </StyledButton>
                  </StyledGrid>
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
                      testId={kebabCase(`${testId}-confirm`)}
                      className="confirm-action-button"
                      variant="outlined"
                      fullWidth
                      onClick={handleConfirmButtonClick}>
                      {confirmLabel}
                    </StyledButton>
                  </StyledGrid>
                  <StyledGrid item>
                    <StyledButton
                      testId={kebabCase(`${testId}-cancel`)}
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
