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
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { HOME } from "../../../constants/routes";

const StyledWrapper = styled.div`
  ${({ theme }) => {
    const match = useRouteMatch({
      path: HOME,
      strict: true,
      sensitive: true,
    });

    let headingClasses = "";

    for (let i = 1; i <= 6; i += 1) {
      headingClasses += `
        h${i}:not(.MuiTypography-root) {
          font-size: ${theme.typography[`h${i}`].fontSize};
          font-weight: ${theme.typography[`h${i}`].fontWeight};
          line-height: ${theme.typography[`h${i}`].lineHeight};
        }
      `;
    }

    let paddingClasses = "";

    for (let i = 1; i <= 20; i += 1) {
      paddingClasses += `
        .horizontal-padding-${i} {
          padding-left: ${theme.spacing(i)}px;
          padding-right: ${theme.spacing(i)}px;
        }
        .vertical-padding-${i} {
          padding-top: ${theme.spacing(i)}px;
          padding-bottom: ${theme.spacing(i)}px;
        }
        .top-padding-${i} {
          padding-top: ${theme.spacing(i)}px;
        }
        .bottom-padding-${i} {
          padding-bottom: ${theme.spacing(i)}px;
        }
        .left-padding-${i} {
          padding-left: ${theme.spacing(i)}px;
          padding-right: ${theme.spacing(i)}px;
        }
        .right-padding-${i} {
          padding-right: ${theme.spacing(i)}px;
        }
        .horizontal-margin-${i} {
          margin-left: ${theme.spacing(i)}px;
          margin-right: ${theme.spacing(i)}px;
        }
        .vertical-margin-${i} {
          margin-top: ${theme.spacing(i)}px;
          margin-bottom: ${theme.spacing(i)}px;
        }
        .top-margin-${i} {
          margin-top: ${theme.spacing(i)}px;
        }
        .bottom-margin-${i} {
          margin-bottom: ${theme.spacing(i)}px;
        }
        .left-margin-${i} {
          margin-left: ${theme.spacing(i)}px;
          margin-right: ${theme.spacing(i)}px;
        }
        .right-margin-${i} {
          margin-right: ${theme.spacing(i)}px;
        }
      `;
    }

    return `
      font-family: ${theme.typography.fontFamily};

      ${paddingClasses}
      ${headingClasses}

      .vertical-center {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .horizontal-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .horizontal-center.vertical-center,
      .full-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }

      .marketing-button {
        font-family: ${theme.typography.fontFamily};
        font-size: ${theme.typography.button.fontSize}px;
        border-radius: ${theme.shape.borderRadius}px;
        padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
        letter-spacing: 0.02rem;
        box-shadow: none;
        color: ${theme.palette.text.secondary};
        line-height: 1.75;
        font-weight: 500;
        border: 1px solid ${theme.palette.text.secondary};
        background: white;
        cursor: pointer;
        background: white;
        transition: all ${theme.transitions.duration.standard}ms ${
      theme.transitions.easing.easeIn
    };

        &:hover {
          border-color: ${theme.palette.primary.dark};
          color: ${theme.palette.primary.dark};
        }

        &.primary {
          background: ${theme.palette.primary.main};
          border-width: 0;
          color: white;

          &:hover {
            background: ${theme.palette.primary.dark};
          }
        }
      }

       
      }

      img {
        max-width: 100%;
      }
      
      ${
        match && match.isExact
          ? `
          @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
            height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
            perspective: 3px;
            perspective-origin: 50% 50%;

            .parallax__layer {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }

            .parallax__layer--base {
              transform: translateZ(0);
            }

            .parallax__layer--back {
              transform: translateZ(-1px) translateY(-80%) translateX(-25%);

              img {
                max-width: 150%;
                width: 150%;
              }

              ${theme.breakpoints.down("xl")} {
                transform: translateZ(-1px) translateY(-150%) translateX(-25%);
              }

              ${theme.breakpoints.down("lg")} {
                transform: translateZ(-1px) translateY(-120%) translateX(-25%);
              }

              ${theme.breakpoints.down("md")} {
                transform: translateZ(-1px) translateY(-80%) translateX(-25%);
              }

              ${theme.breakpoints.down("sm")} {
                transform: translateZ(-1px) translateY(-80%) translateX(-30%);
                img {
                  max-width: 250%;
                  width: 250%;
                }
              }
            }
          }
        `
          : ``
      }
      
    `;
  }}
`;

export default StyledWrapper;
