import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    text-decoration: none;

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
