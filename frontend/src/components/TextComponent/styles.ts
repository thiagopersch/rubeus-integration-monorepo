import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

import { TextComponentProps } from ".";

export type TextDescriptionProps = {
  textAlign: "right" | "center" | "left";
};

const TextDescriptionModifiers = {
  withText: (
    theme: DefaultTheme,
    align: TextDescriptionProps["textAlign"],
  ) => css`
    text-align: ${align === "left"
      ? "left"
      : align === "center"
      ? "center"
      : "right"};
  `,
};

export const Container = styled.div<TextComponentProps>`
  ${({ theme, color = "primaryColor", size = "medium", textAlign }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.font.sizes[size]};

    ${media.lessThan("medium")`
      font-size: ${theme.font.sizes.xsmall};
    `}

    ${!!textAlign && TextDescriptionModifiers.withText(theme, textAlign)}
  `}
`;
