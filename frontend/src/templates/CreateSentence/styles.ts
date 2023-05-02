import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperInputs = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  `}
`;

export const WrapperTwoInputs = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall} 0;
    display: flex;
    flex-direction: row wrap;
    gap: 2rem;

    ${media.lessThan("medium")`
      flex-direction: column;
    `}
  `}
`;

export const WrapperSentence = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall} 0;
    width: 100%;
  `}
`;

export const WrapperCTA = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
