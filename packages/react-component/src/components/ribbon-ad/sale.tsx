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

const RibbonAdSale = styled(({ scale, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="55%" {...props} />
))`
  ${({ theme }) => `
    z-index: 1;
    position: absolute;
    left: -0.5vmin;
    top: 1.5vmin;
    opacity: 0.7;
    pointer-events: none;

    .shadows {
      fill: ${theme.palette.common.black};
      stroke: ${theme.palette.common.black};
      stroke-width: 1;
    }

    .ribbon-bg {
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7));
    }

    .text {
      font-size: 0.7rem;
      fill: ${theme.palette.common.white};
    }
  `}
`;
export const Sale = ({ className, scale, identifier, value, idx: i, ...props }) => {
  return (
    <RibbonAdSale {...{ className, scale }}>
      <defs>
        <path id={`${identifier}_${i}`} d="M0,11 100,11Z"></path>
      </defs>
      <path className="shadows" d="M0,0 6,0 6,25 0,19Z" />
      <path className="ribbon-bg" d="M0,0 99,0 85,10 99,20 0,20Z" fill="#C10C0D" />
      <text className="text">
        <textPath href={`#${identifier}_${i}`} textAnchor="middle" startOffset="45" alignmentBaseline="middle">
          {value}
        </textPath>
      </text>
    </RibbonAdSale>
  );
};
