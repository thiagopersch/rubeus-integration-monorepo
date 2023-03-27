import styled, { css } from "styled-components";

import { darken } from "polished";

import { Container as SectionContainer } from "../SectionContainer/styles";

export const Wrapper = styled.footer`
  ${({ theme }) => css`
    display: block;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.bold};
    font-family: ${theme.font.primary};
    font-style: ${theme.font.style.normal};
    font-size: ${theme.font.sizes.small};
    height: auto;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 3rem;
    padding: 1rem;
  `}
`;

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
`;

export const SectionGithubSocial = styled.section`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 4rem;
    width: 4rem;
    border-radius: 10rem;
    background-color: ${theme.colors.darkGrey};
    color: ${theme.colors.white};
    transition: ${theme.transition.fast};
    box-shadow: ${theme.shadow.default};

    &:hover {
      box-shadow: ${theme.shadow.hover};
      background-color: ${darken(0.5, theme.colors.darkGrey)};
    }
  `}
`;

export const SectionInstagramSocial = styled.section`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 4rem;
    width: 4rem;
    border-radius: 10rem;
    background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #fd5949 45%,
      #d6249f 60%,
      #285aeb 90%
    );
    color: ${theme.colors.white};
    transition: ${theme.transition.fast};
    box-shadow: ${theme.shadow.default};

    &:hover {
      box-shadow: ${theme.shadow.hover};
      background-color: ${darken(0.5, theme.colors.darkGrey)};
    }
  `}
`;

export const Social = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
`;

export const ContainerCopyright = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;

    a {
      color: inherit;
      text-decoration: none;
    }

    & ${SectionContainer} {
      padding-top: 0;
      padding-bottom: 0;
    }
  `}
`;
