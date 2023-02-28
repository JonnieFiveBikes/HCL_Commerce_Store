/*
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
import styled from "@mui/styled-engine-sc";

export const StyledMarketingContent = styled(({ ...props }) => <div {...props} />)`
  ${({ theme }) => `
    position: relative;
    overflow: hidden;

    .MuiContainer-root {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0;
    }

    .MuiGrid-container {
      height: 100%;
      margin-top: 0;
    }

    .MuiGrid-item {
      max-height: 100%;
      overflow: hidden;
    }

    .mediaBackground {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      z-index: -1;

      .MuiCardMedia-root {
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: center;

        &.video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          height: auto;

          ${theme.breakpoints.down("md")} {
            height: 100%;
            width: auto;
          }
        }
      }
    }

    .mediaArea {
      position: relative;
      min-height: 100%;

      div,
      video {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      video {
        min-width: 100%;
        min-height: 100%;
      }
    }
  `}
`;
