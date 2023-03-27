import styled, { css } from "styled-components";

import { darken } from "polished";

export const Container = styled.a`
  ${({ theme }) => css`
    position: fixed;
    background: ${theme.colors.primaryColor};
    color: ${theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rem;
    width: 5rem;
    height: 5rem;
    bottom: 2rem;
    right: 2rem;
    z-index: 6;
    opacity: 1;
    transition: ${theme.transition.fast};
    box-shadow: ${theme.shadow.default};

    &:hover {
      background: ${darken(0.05, theme.colors.primaryColor)};
      box-shadow: ${theme.shadow.hover};
    }

    > svg {
      width: 3rem;
    }
  `}
`;
