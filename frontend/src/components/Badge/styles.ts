import styled, { css, DefaultTheme } from "styled-components";

import { BadgeProps } from "./";

export type WrapperProps = Pick<BadgeProps, "styledType">;

const wrapperModifiers = {
  success: (theme: DefaultTheme) => css`
    background: ${theme.colors.success};
    color: ${theme.colors.white};
  `,
  lightGrey: (theme: DefaultTheme) => css`
    background: ${theme.colors.lightGrey};
    color: ${theme.colors.white};
  `,
  blue: (theme: DefaultTheme) => css`
    background: ${theme.colors.blue};
    color: ${theme.colors.white};
  `,
  orange: (theme: DefaultTheme) => css`
    background: ${theme.colors.alert};
    color: ${theme.colors.lightGrey};
  `,
  danger: (theme: DefaultTheme) => css`
    background: ${theme.colors.danger};
    color: ${theme.colors.white};
  `,
  lightRed: (theme: DefaultTheme) => css`
    background: ${theme.colors.lightRed};
    color: ${theme.colors.lightGrey};
  `,
};

export const Wrapper = styled.span<WrapperProps>`
  ${({ theme, styledType }) => css`
    display: inline-block;
    padding: 0.2rem 2rem;
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.weight.medium};
    font-style: normal;
    line-height: 1.6rem;
    text-align: center;
    border-radius: 10rem;

    ${wrapperModifiers[styledType](theme)}
  `}
`;
