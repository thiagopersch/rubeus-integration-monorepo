import styled, { css } from "styled-components";
import { Form as Unform } from "@unform/web";
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
  `}
`;
