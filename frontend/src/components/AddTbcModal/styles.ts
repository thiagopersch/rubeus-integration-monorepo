import styled, { css } from "styled-components";
import media from "styled-media-query";

import * as InputStyles from "../TextInput/styles";
import * as CheckboxStyles from "../Checkbox/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacings.xxsmall};
    width: 100%;
    /* min-width: 50rem;

    ${media.lessThan("medium")`
      min-width: 35rem;
    `} */
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

export const WrapperInputs = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall};
  `}
`;

export const WrapperInputsThreeColumns = styled(WrapperInputs)`
  ${({ theme }) => css`
    column-count: 3;
    -webkit-column-count: 3;

    ${media.lessThan("medium")`
      display: flex;
      flex-direction: column;
      gap: 2rem;
  `}
  `}
`;

export const WrapperInputsContextColumnsOne = styled(WrapperInputs)`
  column-count: 3;
  -webkit-column-count: 3;

  ${media.lessThan("medium")`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `}
`;

export const WrapperInputsContextColumnsTwo = styled(
  WrapperInputsContextColumnsOne,
)`
  column-count: 2;
  -webkit-column-count: 2;
`;

export const WrapperTextContext = styled.div`
  ${({ theme }) => css`
    padding: 1rem 2rem;
  `}
`;

export const WrapperSeparator = styled.div`
  ${({ theme }) => css`
    padding: 0.5rem;
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
