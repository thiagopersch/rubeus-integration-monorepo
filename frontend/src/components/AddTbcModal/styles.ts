import styled, { css } from "styled-components";
import media from "styled-media-query";

import * as InputStyles from "../TextInput/styles";
import * as CheckboxStyles from "../Checkbox/styles";

export const WrapperDescription = styled.div`
  ${({ theme }) => css`
    padding: 1rem 0;
  `}
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacings.xxsmall};
    width: 100%;
    min-width: 50rem;

    ${media.lessThan("medium")`
      min-width: 35rem;
    `}
  `}
`;

export const Form = styled.form`
  ${({ theme }) => css`
    ${InputStyles.Wrapper} {
      margin-bottom: ${theme.spacings.xxsmall};

      &:last-of-type {
        margin-bottom: ${theme.spacings.xxsmall};
      }
    }

    & > ${CheckboxStyles.Wrapper} {
      justify-content: unset;
    }
  `}
`;

export const WrapperTwoInputs = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row wrap;
    gap: 2rem;

    ${media.lessThan("medium")`
      flex-direction: column;
    `}
  `}
`;

export const WrapperInputs = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  `}
`;

export const WrapperInputsThreeColumns = styled.div`
  ${({ theme }) => css`
    padding: 1rem 0;
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
  `}
`;

export const WrapperUnlicensedMethod = styled.div`
  padding: 1rem 0;
`;

export const WrapperInputsContextColumns = styled.div`
  padding: 1rem 0;
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

export const WrapperTextContext = styled.div`
  ${({ theme }) => css`
    padding: 1rem 0;
  `}
`;
export const ButtonsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 1rem 0;

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
