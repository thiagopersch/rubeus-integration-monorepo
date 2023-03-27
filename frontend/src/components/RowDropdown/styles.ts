import styled, { css } from "styled-components";
import { ChevronDown } from "@styled-icons/feather";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: contents;
    --z-idx: calc(${theme.layers.overlay} - 1);
  `}
`;

type ContainerProps = {
  isOpen: boolean;
};

export const Container = styled.div<ContainerProps>`
  ${({ theme, isOpen }) => css`
    cursor: pointer;
    position: relative;
    width: 100%;
    /* min-width: 20rem; */
    color: ${theme.colors.mainBg};
    display: flex;
    align-items: center;

    ${isOpen &&
    css`
      z-index: var(--z-idx);
    `}
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 ${theme.spacings.xsmall};
    color: ${theme.colors.lightGrey};
  `}
`;

type ContentProps = {
  isOpen: boolean;
};

export const Content = styled.div<ContentProps>`
  ${({ theme, isOpen }) => css`
    position: absolute;
    background: ${theme.colors.mainBg};
    width: 10rem;
    max-width: 10rem;
    min-width: inherit;
    padding: 1rem;
    padding-top: 1rem;
    margin-top: 1rem;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.3rem;
    z-index: ${theme.layers.modal};
    transition: all 0.2s ease-in-out;

    ${!isOpen &&
    css`
      visibility: hidden;
      opacity: 0;
      transform: translateX(-50%) translateY(-0.2rem);
    `}

    > ul {
      list-style: none;
    }

    ${media.lessThan("medium")`
      left: 40%;
    `}
  `}
`;

export const ListItem = styled.li`
  ${({ theme }) => css`
    padding: 1.5rem;
    color: ${theme.colors.lightGrey};

    :hover {
      background: #e9e9e9;
      border-radius: 0.4rem;
    }

    a {
      color: ${theme.colors.lightGrey};
    }

    & + & {
      margin-top: 1rem;
    }
  `}
`;

type OverlayProps = {
  isOpen: boolean;
};
export const Overlay = styled.div<OverlayProps>`
  ${({ isOpen }) => css`
    visibility: hidden;
    opacity: 0;
    background: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.2s ease-out;
    z-index: calc(var(--z-idx) - 1);

    ${isOpen &&
    css`
      visibility: visible;
      opacity: 1;
    `};
  `}
`;

export const UserContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-family: ${theme.font.primary};
    font-weight: ${theme.font.weight.normal};
    color: ${theme.colors.lightGrey};

    ${media.lessThan("medium")`
      font-size: ${theme.font.sizes.xsmall};
    `}
  `}
`;

type ArrowIconProps = {
  isOpen: boolean;
};
export const ArrowIcon = styled(ChevronDown)<ArrowIconProps>`
  ${({ isOpen }) => css`
    width: 2.4rem;
    stroke-width: 2;
    transition: transform 0.3s ease;

    ${isOpen &&
    css`
      transform: rotateZ(180deg);
    `}
  `}
`;
