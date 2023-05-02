import styled, { css } from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
  width: 100%;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionEditButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: ${theme.colors.primaryColor};
    height: 3rem;
    width: 3rem;
    border: 0;
    border-radius: 50%;
    outline: 0;
    transition: background 0.3s ease;

    svg {
      width: 1.8rem;
      stroke-width: 2;
    }

    &:hover {
      background: ${darken(0.05, theme.colors.white)};
    }
  `}
`;

export const ActionDeleteButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 3rem;
    border: 0;
    outline: 0;
    stroke-width: 2;
    color: ${theme.colors.primaryRed};
    padding: 0.4rem;
    transition: background 0.3s ease;

    &:hover {
      background: ${darken(0.05, theme.colors.white)};
    }
  `}
`;
