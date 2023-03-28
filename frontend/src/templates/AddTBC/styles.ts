import styled, { css } from "styled-components";

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
