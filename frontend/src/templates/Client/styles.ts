import { darken } from "polished";
import styled, { css } from "styled-components";
import media from "styled-media-query";

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

export const WrapperSearchButtonAdd = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xsmall};
    width: 100%;
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
      margin-bottom: 1.5rem;
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

export const PaginatorContainer = styled.div`
  padding: 2rem 3rem;
`;
