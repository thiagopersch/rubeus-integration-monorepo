import styled, { css } from "styled-components";
import media from "styled-media-query";

import * as InputStyles from "../TextInput/styles";
import * as CheckboxStyles from "../Checkbox/styles";

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

export const WrapperInputsRow = styled.div`
  display: flex;
  flex-direction: row wrap;
  gap: 2rem;
  width: 100%;

  ${media.lessThan("medium")`
    flex-direction: column;
    gap: 0.1rem;
  `}
`;

export const WrapperInputs = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall} 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  `}
`;

export const WrapperSentence = styled.div`
  ${({ theme }) => css`
    width: 100%;
  `}
`;

export const ButtonsContainer = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall} 0;
    margin-top: ${theme.spacings.xxsmall};
    display: flex;
    justify-content: space-between;

    ${media.lessThan("medium")`
      flex-direction: column-reverse;
      gap: 1rem;
    `}
  `}
`;
