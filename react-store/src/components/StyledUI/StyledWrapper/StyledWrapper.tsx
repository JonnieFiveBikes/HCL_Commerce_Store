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
import { useMatch } from "react-router";
import { useSelector } from "react-redux";
//custom libraries
import { HOME } from "../../../constants/routes";
//custom redux
import { forUserIdSelector } from "../../../redux/selectors/user";
import { useSite } from "../../../_foundation/hooks/useSite";
import { MP_ENABLED, MP_SELLER_REG_ENABLED, STRING_TRUE } from "../../../constants/common";

const StyledWrapper = styled("div")`
  ${(props) => {
    const theme = props.theme;
    const match = useMatch({
      path: HOME,
      end: true,
      caseSensitive: true,
    });
    const forUserId = useSelector(forUserIdSelector);
    const { mySite } = useSite();
    const { userData = {} } = mySite?.storeCfg ?? {};
    const mpSellerRegEnabled = STRING_TRUE === userData[MP_ENABLED] && STRING_TRUE === userData[MP_SELLER_REG_ENABLED];

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
          padding-left: ${theme.spacing(i)};
          padding-right: ${theme.spacing(i)};
        }
        .vertical-padding-${i} {
          padding-top: ${theme.spacing(i)};
          padding-bottom: ${theme.spacing(i)};
        }
        .top-padding-${i} {
          padding-top: ${theme.spacing(i)};
        }
        .bottom-padding-${i} {
          padding-bottom: ${theme.spacing(i)};
        }
        .left-padding-${i} {
          padding-left: ${theme.spacing(i)};
        }
        .right-padding-${i} {
          padding-right: ${theme.spacing(i)};
        }
        .horizontal-margin-${i} {
          margin-left: ${theme.spacing(i)};
          margin-right: ${theme.spacing(i)};
        }
        .vertical-margin-${i} {
          margin-top: ${theme.spacing(i)};
          margin-bottom: ${theme.spacing(i)};
        }
        .top-margin-${i} {
          margin-top: ${theme.spacing(i)};
        }
        .bottom-margin-${i} {
          margin-bottom: ${theme.spacing(i)};
        }
        .left-margin-${i} {
          margin-left: ${theme.spacing(i)};
        }
        .right-margin-${i} {
          margin-right: ${theme.spacing(i)};
        }
      `;
    }

    return `
      font-family: ${theme.typography.fontFamily};

      ${mpSellerRegEnabled ? ".marketplace-seller-reg-off { display: none !important; }" : ""}
      ${!mpSellerRegEnabled ? ".marketplace-seller-reg-on { display: none !important; }" : ""}

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

      .full-height {
        height: 100%;
      }

      .full-width {
        width: 100%;
      }

      .full-viewport-height {
        ${forUserId !== undefined ? `min-height: 1000px;` : `min-height: 100vh;`}
      }

      .full-viewport-width {
        width: 100vw;
      }

      .text-align-center {
        text-align: center;
      }

      .text-align-right {
        text-align: right;
      }

      .text-align-left {
        text-align: left;
      }

      .pointer-event-none {
        pointer-events: none;
      }

      .marketing-button {
        font-family: ${theme.typography.fontFamily};
        font-size: ${theme.typography.button.fontSize}px;
        border-radius: ${theme.shape.borderRadius}px;
        padding: ${theme.spacing(1)} ${theme.spacing(2)};
        letter-spacing: 0.02rem;
        box-shadow: none;
        color: ${theme.palette.text.secondary};
        line-height: 1.75;
        font-weight: 500;
        border: 2px solid ${theme.palette.primary.main};
        background: white;
        cursor: pointer;
        background: white;
        transition: all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeIn};

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
        match?.pathname === HOME
          ? `
          @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
            ${forUserId === undefined && `height: 100vh;`}
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

              ${theme.breakpoints.up("xl")} {
                transform: translateZ(-1px) translateY(-150%) translateX(-25%);
              }

              ${theme.breakpoints.down("xl")} {
                transform: translateZ(-1px) translateY(-120%) translateX(-25%);
              }

              ${theme.breakpoints.down("lg")} {
                transform: translateZ(-1px) translateY(-80%) translateX(-25%);
              }

              ${theme.breakpoints.down("md")} {
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
