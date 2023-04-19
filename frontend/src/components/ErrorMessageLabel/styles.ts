import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

import { ErrorMessageProps } from ".";

const headingModifiers = {
  xsm: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xsmall};
  `,
  sm: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.small};
  `,
  md: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.medium};
  `,
  lg: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.large};
  `,
};

const titleCase = (upperCase = false) => css`
  text-transform: ${upperCase ? "uppercase" : ""};
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

export const ErrorMessage = styled.span<ErrorMessageProps>`
  ${({
    theme,
    size = "xsm",
    color = "primaryRed",
    uppercase,
    textAlign,
  }) => css`
    display: flex;
    flex-direction: column;
    color: ${theme.colors[color]};
    font-weight: ${theme.font.weight.normal};
    font-family: ${theme.font.primary};
    font-size: ${theme.font.sizes.medium};

    ${media.lessThan("medium")`
      font-size: ${theme.font.sizes.xsmall};
    `}

    ${headingModifiers[size](theme)}
    ${!!textAlign && TextModifiers.withText(theme, textAlign)}
    ${titleCase(uppercase)}
  `}
`;
