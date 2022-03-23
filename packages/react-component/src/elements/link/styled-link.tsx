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
import { Link } from "react-router-dom";

const LinkWrapper = (props: any) => {
  const { testId, ...rest } = props;
  const { to = "" } = props;
  let dataTestId;

  if (!testId) {
    dataTestId = to ? { "data-testid": to.split("/").join("-") } : {};
  } else {
    dataTestId = { "data-testid": `link-${testId}` };
  }

  return <Link {...{ ...dataTestId, ...rest, to }} />;
};

const StyledLink = styled(LinkWrapper)`
  ${({ theme }) => `
    color: ${theme.palette.primary.main};

    svg {
      color: ${theme.palette.primary.main};
    }

    &:hover {
      color: ${theme.palette.primary.dark};

      svg {
        color: ${theme.palette.primary.dark};
      }
    }

    &.disabled {
        color: ${theme.palette.text.disabled};
    }
  `}
`;

export { StyledLink };
