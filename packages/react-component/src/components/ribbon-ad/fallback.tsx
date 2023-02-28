/*
 ***************************************************
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 ***************************************************
 */

import styled from "@mui/styled-engine-sc";

const CornerRibbon = styled(({ scale, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="55%" {...props} />
))`
  ${({ theme }) => `
    z-index: 1;
    position: absolute;
    left: -0.5vmin;
    top: -0.5vmin;
    opacity: 0.7;
    fill: ${theme.palette.primary.dark};
    stroke-width: 1;
    pointer-events: none;

    &.pdp-carousel-slide {
      left: 0;
      top: 0;
    }

    .text {
      font-size: 0.7rem;
      fill: ${theme.palette.common.white};
    }

    .shadows {
      fill: ${theme.palette.common.black};
      stroke: ${theme.palette.common.black};
      stroke-width: 1;
    }

    .ribbon-bg {
      stroke: ${theme.palette.primary.dark};
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7));
    }

    &.Exclusive {
      .ribbon-bg {
        fill: #c10c0d;
        stroke: #c10c0d;
      }
    }
  `}
`;

export const Fallback = ({ scale, identifier, value, idx: i, ...props }) => {
  const { className = "" } = props;

  return (
    <CornerRibbon {...{ scale, className }}>
      <defs>
        <path id={`${identifier}_${i}`} d="M0,71 71,0z"></path>
      </defs>
      <path className="shadows" d="M0,80 4,80 4,60z" />
      <path className="shadows" d="M80,0 80,4 60,4z" />
      <path className="ribbon-bg" d="M0,60 60,0 80,0 0,80z" />
      <text className="text" clipPath={`url(#clipper_${identifier}_${i})`}>
        <textPath href={`#${identifier}_${i}`} textAnchor="middle" startOffset="50" alignmentBaseline="middle">
          {value}
        </textPath>
      </text>
      <clipPath id={`clipper_${identifier}_${i}`}>
        <path className="clipper" d="M0,60 60,0 80,0 0,80z"></path>
      </clipPath>
    </CornerRibbon>
  );
};
