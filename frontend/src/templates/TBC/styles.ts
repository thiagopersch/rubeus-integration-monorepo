import styled, { css } from "styled-components";

import media from "styled-media-query";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    text-decoration: none;
    height: 80vh;
    overflow: hidden;

    a {
      text-decoration: none;
    }
  `}
`;

export const WrapperHeading = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xsmall};
  `}
`;

export const WrapperSearch = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    width: 30rem;

    ${media.lessThan("medium")`
      display:inherit;
      width: 100vw;
      flex-wrap: wrap;
      flex-direction: column;
    `}
  `}
`;

export const WrapperItemsPerPage = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;

    ${media.lessThan("medium")`
      display: none;
    `}
  `}
`;
