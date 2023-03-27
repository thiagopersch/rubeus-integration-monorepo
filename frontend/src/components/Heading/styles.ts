import styled, { css, DefaultTheme } from "styled-components";

import { HeadingProps } from ".";

const headingModifiers = {
  sm: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.small};
  `,
  md: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.large};
  `,
  lg: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xxlarge};
  `,
  huge: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.huge};
  `,
};

const titleCase = (upperCase = false) => css`
  text-transform: ${upperCase ? "uppercase" : "none"};
`;

export type TextProps = {
  textAlign: "right" | "center" | "left";
};

const TextModifiers = {
  withText: (theme: DefaultTheme, align: TextProps["textAlign"]) => css`
    text-align: ${align === "left"
      ? "left"
      : align === "center"
      ? "center"
      : "right"};
  `,
};

const mediaFont = (theme: DefaultTheme) => css`
  @media (${theme.media.lteMedium}) {
    font-size: ${theme.font.sizes.xlarge};
    transition: ${theme.transition.fast};
  }
`;

export const Heading = styled.h1<HeadingProps>`
  ${({
    theme,
    size = "lg",
    color = "primaryColor",
    uppercase,
    textAlign,
  }) => css`
    color: ${theme.colors[color]};
    font-weight: ${theme.font.weight.bold};
    font-family: ${theme.font.primary};

    ${headingModifiers[size](theme)}
    ${!!textAlign && TextModifiers.withText(theme, textAlign)}
    ${titleCase(uppercase)}
  `}
`;
