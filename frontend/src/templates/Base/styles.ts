import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.nav`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 8rem;
    padding: 0.1rem;
    background: ${theme.colors.primaryColor};
  `}
`;

export const WrapperLogo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-family: ${theme.font.secondary};
    font-size: ${theme.font.sizes.medium};
    height: 100%;

    > span {
      font-weight: ${theme.font.weight.normal};
      color: ${theme.colors.lightGrey};
      margin-right: ${theme.spacings.xxsmall};
    }
  `}
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.lessThan("medium")`
    display:none;
  `}
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10rem;
`;

const menuItemModifiers = {
  active: (theme: DefaultTheme) => css`
    a {
      font-weight: ${theme.font.weight.bold};
    }
  `,
};

type MenuItemProps = {
  active?: boolean;
};

export const MenuItem = styled.li<MenuItemProps>`
  ${({ theme, active }) => css`
    display: block;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.darkGrey};
    position: relative;
    text-decoration: none;
    list-style: none;
    text-align: center;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 0.2rem;
      border-radius: 10rem;
      background-color: ${theme.colors.darkPrimaryColor};
      bottom: 0;
      left: 0;
      transform-origin: right;
      transform: scaleX(0);
      transition: transform 0.3s ease-in-out;
    }

    &:hover::before {
      transform-origin: left;
      transform: scaleX(1);
    }

    & + & {
      margin-top: 0.1rem;
    }

    a {
      display: flex;
      align-items: center;
      height: 100%;
      text-decoration: none;
      color: ${theme.colors.white};
      transition: all 0.2s ease;
    }

    ${!active &&
    css`
      &:hover a {
        transition: all 0.2s ease;
        font-weight: ${theme.font.weight.bold};
      }
    `}

    ${!!active && menuItemModifiers.active(theme)}
  `}
`;

export const MenuButton = styled.div`
  ${media.lessThan("medium")`
    width: 15rem;
    max-width: 50rem;
  `}
`;

export const Content = styled.main`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    overflow-y: auto;
  `}
`;
