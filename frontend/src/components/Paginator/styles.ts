import styled, { css } from "styled-components";
import media from "styled-media-query";

import * as SelectStyles from "../UnregisteredSelect/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    ${media.lessThan("large")`
      display: grid;
      grid-template-columns: 1fr;
      row-gap: ${theme.spacings.small};
    `}
  `}
`;

export const PageItemsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: fit-content;
    border: 0.1rem solid ${theme.colors.lightGrey};
    border-radius: 0.5rem;
    overflow: hidden;
  `}
`;

type PageItemProps = {
  isActive: boolean;
};
export const PageItem = styled.button<PageItemProps>`
  ${({ theme, isActive }) => css`
    height: 4rem;
    border: none;
    margin: 0;
    width: auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${theme.font.primary};
    outline: 0;

    background: ${theme.colors.white};
    color: ${theme.colors.primaryColor};

    ${isActive &&
    css`
      background: ${theme.colors.primaryColor};
      color: ${theme.colors.white};
    `}

    &:not(:last-child) {
      border-right: 0.1rem solid ${theme.colors.lightGrey};
    }

    &:disabled {
      color: ${theme.colors.lightGrey};
    }
  `}
`;

export const SizeContainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:last-child) {
    margin-right: 1rem;
  }

  ${SelectStyles.Wrapper} {
    width: unset;
    height: unset;
  }
`;

export const SizeText = styled.span`
  ${({ theme }) => css`
    font-size: 1.4rem;
    color: ${theme.colors.lightGreyFityPercente};
  `}
`;
