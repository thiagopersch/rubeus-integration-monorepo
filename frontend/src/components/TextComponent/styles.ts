import styled, { css } from "styled-components";
import { TextComponentProps } from ".";

export const Container = styled.div<TextComponentProps>`
  ${({ theme, color = "primaryColor", size = "medium" }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.font.sizes[size]};
  `}
`;
