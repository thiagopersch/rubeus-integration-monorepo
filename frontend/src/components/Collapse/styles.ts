import styled, { css } from "styled-components";

export const WrapperTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    gap: 21.8rem;
    isolation: isolate;
    background: ${theme.colors.white};
    border-radius: 0.3rem;
    box-shadow: ${theme.shadow.default};
  `}
`;

export const Text = styled.span`
  ${({ theme }) => css`
    font-family: ${theme.font.primary};
    font-style: ${theme.font.style.normal};
    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.spacings.xsmall};
    align-items: center;
    text-transform: uppercase;
    color: ${theme.colors.primaryGrey};
  `}
`;

export const Icon = styled.div`
  height: 2.4rem;
  width: 2.4rem;
`;

export const Button = styled.button`
  ${({ theme }) => css`
    border: none;
    cursor: pointer;
    overflow: hidden;
    stroke-width: 0.2rem;
    background: transparent;
  `}
`;

export const WrapperContent = styled.div`
  margin-top: -0.3rem;
`;

export const Content = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: 0 0 0.3rem 0.3rem;
    box-shadow: ${theme.shadow.default};
    padding: 2rem;
  `}
`;
