import styled, { css } from "styled-components";

import { SectionContainerProps } from ".";

export const Container = styled.div<SectionContainerProps>`
  ${({
    theme,
    paddings = "none",
    columns = "none",
    display = "flex",
    flexDirection = "row",
    justifyContent = "spaceBetween",
    alignContent = "center",
    alignItems = "center",
    margin = "none",
    marginTop = "none",
    marginBottom = "none",
    marginLeft = "none",
    marginRight = "none",
  }) => css`
    display: ${theme.display[display]};
    flex-direction: ${theme.flexDirection[flexDirection]};
    justify-content: ${theme.justifyContent[justifyContent]};
    align-content: ${theme.alignContent[alignContent]};
    align-items: ${theme.alignItems[alignItems]};
    padding: ${theme.spacings[paddings]};
    column-count: ${theme.columns[columns]};
    margin: ${theme.spacings[margin]};
    margin-top: ${theme.spacings[marginTop]};
    margin-bottom: ${theme.spacings[marginBottom]};
    margin-left: ${theme.spacings[marginLeft]};
    margin-right: ${theme.spacings[marginRight]};
  `}
`;
