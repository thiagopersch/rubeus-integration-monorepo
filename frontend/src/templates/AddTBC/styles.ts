import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperDescription = styled.div`
  ${({ theme }) => css`
    padding: 1rem 2rem;
  `}
`;

export const WrapperInputs = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
  `}
`;

export const WrapperInputsThreeColumns = styled.div`
  padding: 0 2rem;
  column-count: 3;
  -webkit-column-count: 3;

  ${media.lessThan("medium")`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `}
`;

export const WrapperInputsContextColumns = styled.div`
  padding: 0 2rem;
  column-count: 5;
  -webkit-column-count: 5;

  ${media.lessThan("medium")`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `}
`;

export const WrapperSeparator = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
  `}
`;

export const WrapperButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 0 2rem;

    ${media.lessThan("medium")`
      flex-direction: column-reverse;
      gap: 2rem;
      width: 100%;
    `}

    a {
      text-decoration: none;
    }
  `}
`;
