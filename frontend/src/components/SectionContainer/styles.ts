import styled, { DefaultTheme, css } from "styled-components";

import { SectionContainerProps } from ".";

const displayModifiers = {
  none: css`
    display: none;
  `,
  block: css`
    display: block;
  `,
  flex: css`
    display: flex;
  `,
};

const flexDirectionModifiers = {
  row: css`
    flex-direction: row;
  `,
  column: css`
    flex-direction: column;
  `,
  rowReverse: css`
    flex-direction: row-reverse;
  `,
  columnReverse: css`
    flex-direction: column-reverse;
  `,
};

const flexWrapModifiers = {
  nowrap: css`
    flex-wrap: nowrap;
  `,
  wrap: css`
    flex-wrap: wrap;
  `,
  wrapReverse: css`
    flex-wrap: wrap-reverse;
  `,
};

const justifyContentModifiers = {
  start: css`
    justify-content: flex-start;
  `,
  end: css`
    justify-content: flex-end;
  `,
  center: css`
    justify-content: center;
  `,
  spaceBetween: css`
    justify-content: space-between;
  `,
  spaceAround: css`
    justify-content: space-around;
  `,
  spaceEvenly: css`
    justify-content: space-evenly;
  `,
};

const alignItemsModifiers = {
  start: css`
    align-items: flex-start;
  `,
  end: css`
    align-items: flex-end;
  `,
  center: css`
    align-items: center;
  `,
  baseline: css`
    align-items: baseline;
  `,
  stretch: css`
    align-items: stretch;
  `,
};

const alignContentModifiers = {
  start: css`
    align-content: flex-start;
  `,
  end: css`
    align-content: flex-end;
  `,
  center: css`
    align-content: center;
  `,
  spaceBetween: css`
    align-content: space-between;
  `,
  spaceAround: css`
    align-content: space-around;
  `,
};

const paddingsModifiers = {
  none: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.none};
  `,
  xxsmall: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.xxsmall};
  `,
  xsmall: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.xsmall};
  `,
  small: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.small};
  `,
  medium: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.large};
  `,
  xlarge: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.xlarge};
  `,
  xxlarge: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.xxlarge};
  `,
  huge: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.huge};
  `,
  xhuge: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.xhuge};
  `,
};

export const Container = styled.div<SectionContainerProps>`
  ${({
    theme,
    paddings,
    display,
    flexDirection,
    flexWrap,
    justifyContent,
    alignContent,
    alignItems,
  }) => css`
    ${!!paddings && paddingsModifiers[paddings](theme)}
    ${!!display && displayModifiers[display]}
    ${!!flexDirection && flexDirectionModifiers[flexDirection]}
    ${!!flexWrap && flexWrapModifiers[flexWrap]}
    ${!!justifyContent && justifyContentModifiers[justifyContent]}
    ${!!alignContent && alignContentModifiers[alignContent]}
    ${!!alignItems && alignItemsModifiers[alignItems]}
  `}
`;
