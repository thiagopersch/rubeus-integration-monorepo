import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperDescription = styled.div`
  ${({ theme }) => css`
    padding: 1rem 2rem;
  `}
`;

export const WrapperTwoInputs = styled.div`
  ${({ theme }) => css`
    padding: 0 2rem;
    display: flex;
    flex-direction: row wrap;
    gap: 2rem;

    ${media.lessThan("medium")`
      flex-direction: column;
    `}
  `}
`;

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const WrapperInputsThreeColumns = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: row wrap;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;

  ${media.lessThan("medium")`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `}
`;

export const WrapperUnlicensedMethod = styled.div`
  padding: 2rem;
`;

export const WrapperInputsContextColumns = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: row wrap;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;

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
    margin-top: 3rem;

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
