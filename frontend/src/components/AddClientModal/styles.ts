import styled, { css } from "styled-components";
import { Form as Unform } from "@unform/web";

import * as InputStyles from "../TextInput/styles";
import * as CheckboxStyles from "../Checkbox/styles";
import media from "styled-media-query";

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

export const Form = styled(Unform)`
  ${({ theme }) => css`
    ${InputStyles.Wrapper} {
      margin-bottom: ${theme.spacings.small};

      &:last-of-type {
        margin-bottom: ${theme.spacings.large};
      }
    }

    & > ${CheckboxStyles.Wrapper} {
      justify-content: unset;
      margin-left: ${theme.spacings.xxsmall};
    }
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

    /* button {
      width: 15rem;

      & + button {
        margin-left: ${theme.spacings.xsmall};
      }
    }
  `} */
`;

export const Divider = styled.hr`
  ${({ theme }) => css`
    margin: 1.5rem 0;
    margin-bottom: 2rem;
    width: 100%;
    appearance: none;
    content: "";
    display: block;
    box-shadow: 0rem 0rem 0rem 0.05rem ${theme.colors.lightGrey};
    border: none;
  `}
`;
