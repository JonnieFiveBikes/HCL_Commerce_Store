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
const StarRibbon = styled(({ scale, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67" width="30%" {...props} />
))`
  ${({ theme }) => `
    z-index: 1;
    position: absolute;
    right: 1vmin;
    top: 1vmin;
    opacity: 0.7;
    pointer-events: none;

    &.b2b-pdp {
      ${theme.breakpoints.down("sm")} {
        right: calc(-15% + 1vmin);
      }
      ${theme.breakpoints.up("md")} {
        right: calc(-15% + 1vmin);
      }
    }

    .ribbon-bg {
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7));
      fill: #c10c0d;
    }

    > .text {
      font-size: 0.7rem;
      fill: ${theme.palette.common.white};
    }
  `}
`;

export const New = ({ scale, identifier, value, idx: i, ...props }) => {
  const { className = "" } = props;

  return (
    <StarRibbon {...{ className, scale }}>
      <defs>
        <path id={`${identifier}_${i}`} d="M0,34.5 67,34.5z"></path>
      </defs>
      <path
        className="ribbon-bg"
        d="M33.5 0L36.3014 6.84681L40.465 0.732056L41.7817 8.01168L47.1257 2.89623L46.9 10.2905L53.1908 6.39793L51.4327 13.5837L58.3954 11.0841L55.1817 17.7474L62.5118 16.75L57.983 22.5995L65.3604 23.1479L59.7144 27.928L66.8165 29.9983L60.3 33.5L66.8165 37.0017L59.7144 39.072L65.3604 43.8521L57.983 44.4005L62.5118 50.25L55.1817 49.2526L58.3954 55.9159L51.4327 53.4163L53.1908 60.6021L46.9 56.7095L47.1257 64.1038L41.7817 58.9883L40.465 66.2679L36.3014 60.1532L33.5 67L30.6986 60.1532L26.535 66.2679L25.2183 58.9883L19.8743 64.1038L20.1 56.7095L13.8092 60.6021L15.5673 53.4163L8.60465 55.9159L11.8183 49.2526L4.48815 50.25L9.01698 44.4005L1.63961 43.8521L7.28564 39.072L0.183517 37.0017L6.7 33.5L0.183517 29.9983L7.28564 27.928L1.63961 23.1479L9.01698 22.5995L4.48815 16.75L11.8183 17.7474L8.60465 11.0841L15.5673 13.5837L13.8092 6.39793L20.1 10.2905L19.8743 2.89623L25.2183 8.01168L26.535 0.732056L30.6986 6.84681L33.5 0Z"
      />
      <text className="text">
        <textPath href={`#${identifier}_${i}`} textAnchor="middle" startOffset="33.5" alignmentBaseline="middle">
          {value}
        </textPath>
      </text>
    </StarRibbon>
  );
};
