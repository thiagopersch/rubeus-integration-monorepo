import styled, { css, DefaultTheme } from "styled-components";
import { ChevronDown } from "@styled-icons/feather";

import { columnFixedModifier } from "../TableColumn/styles";
import media from "styled-media-query";

const wrapperModifiers = {
  minimal: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: #545f6a;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
  `,
  showingDetail: (theme: DefaultTheme) => css`
    box-shadow: inset 5px 0px ${theme.colors.lightPrimaryColor};
  `,
  ellipsis: () => css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 15rem;
  `,
};

const bordersModifiers = {
  none: () => css``,
  left: () => css`
    border-right: 0.2rem left #97aeb1;
  `,
  right: () => css`
    border-right: 0.2rem solid #97aeb1;
  `,
  all: () => css`
    ${bordersModifiers.left};
    ${bordersModifiers.right};
  `,
};

type WrapperProps = {
  position: number;
  fixed?: boolean;
  minimal: boolean;
  contentAlign?: "left" | "center" | "right";
  border?: "all" | "left" | "right" | "none";
  showingDetail?: boolean;
  ellipsis?: boolean;
};
export const Wrapper = styled.td<WrapperProps>`
  ${({
    theme,
    fixed,
    position,
    minimal,
    contentAlign = "left",
    border = "none",
    showingDetail,
    ellipsis = false,
  }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.primaryGrey};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
    background: ${theme.colors.white};
    border-bottom: 0.1rem solid ${theme.colors.lightGreyFityPercente};
    text-align: ${contentAlign};
    transition: box-shadow 0.3s ease-out;

    ${media.lessThan("medium")`
      font-size: ${theme.font.sizes.xsmall};
    `}

    ${!!ellipsis && wrapperModifiers.ellipsis()}
    ${!!fixed && columnFixedModifier(theme, position)}
    ${!!minimal && wrapperModifiers.minimal(theme)};
    ${!!showingDetail && wrapperModifiers.showingDetail(theme)}
    ${!!border && bordersModifiers[border]}
  `}
`;

export const ExpandButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    color: ${theme.colors.primaryColor};
    background: none;
    border: none;
    outline: 0;
    font: inherit;
    text-decoration: underline;
    text-align: left;
  `}
`;

type ExpandIconProps = {
  active: boolean;
};
export const ExpandIcon = styled(ChevronDown)<ExpandIconProps>`
  ${({ theme, active }) => css`
    stroke-width: 0.2rem;
    margin-left: 0.5rem;
    color: ${theme.colors.primaryColor};
    transition: transform 0.3s ease;

    ${!!active &&
    css`
      transform: rotateZ(180deg);
    `}
  `}
`;
