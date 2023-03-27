import styled, { css } from "styled-components";

export const CheckBoxWrapper = styled.div`
  position: relative;
`;
export const CheckBoxLabel = styled.label`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 5rem;
    height: 2rem;
    border-radius: 1.5rem;
    background: ${theme.colors.lightGrey};
    cursor: pointer;

    &::after {
      content: "";
      display: block;
      border-radius: 10rem;
      width: 1.8rem;
      height: 1.8rem;
      margin: 0.1rem;
      background: ${theme.colors.white};
      box-shadow: ${theme.shadow.default};
      transition: ${theme.transition.fast};
    }
  `}
`;

export const CheckBox = styled.input`
  ${({ theme }) => css`
    opacity: 0;
    z-index: 1;
    border-radius: 1.5rem;
    width: 4.2rem;
    height: 2.6rem;

    &:checked + ${CheckBoxLabel} {
      background: ${theme.colors.primaryColor};

      &::after {
        content: "";
        display: block;
        border-radius: 10rem;
        width: 1.8rem;
        height: 1.8rem;
        margin-left: 3.1rem;
        transition: ${theme.transition.fast};
      }
    }
  `}
`;
