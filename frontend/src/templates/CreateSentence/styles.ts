import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperInputs = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5rem;
    gap: 2rem;
    column-count: 3;
    -webkit-column-count: 3;

    ${media.lessThan("medium")`
      flex-direction: column;
      padding: 2rem;
    `}
  `}
`;

export const WrapperInputSmall = styled.div`
  width: 20%;

  ${media.lessThan("medium")`
      width: 100%;
  `}
`;

export const WrapperInputLarge = styled.div`
  width: 80%;

  ${media.lessThan("medium")`
      width: 100%;
  `}
`;
export const WrapperSentence = styled.div`
  padding: 0 5rem;
  width: 100%;
`;

export const WrapperSeparator = styled.div`
  padding: 2rem 5rem;
`;

export const WrapperCTA = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5rem;
`;
