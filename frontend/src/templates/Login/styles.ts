import styled, { css } from "styled-components";
import { Form as Unform } from "@unform/web";
import Image from "next/image";

import SectionContainer from "@/components/SectionContainer";
import * as InputStyles from "@/components/TextInput/styles";
import media from "styled-media-query";

export const Background = styled(Image)`
  z-index: 0;
  filter: brightness(80%) contrast(120%) !important;
`;

type WrapperProps = {
  hasBackground: boolean;
};

export const Wrapper = styled.main<WrapperProps>`
  ${({ theme, hasBackground }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${hasBackground &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
        box-shadow: inset 0rem 0rem 15rem rgba(0, 0, 15, 1);
      }
    `};
  `}
`;

export const Content = styled(SectionContainer)`
  ${({ theme }) => css`
    z-index: 1;
    max-width: 50rem !important;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: ${theme.spacings.xsmall};
    position: relative;
  `}
`;

export const Form = styled(Unform)`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    width: 100%;
    margin-top: ${theme.spacings.small};
    margin-bottom: ${theme.spacings.xxsmall};

    ${InputStyles.Wrapper} {
      margin-bottom: ${theme.spacings.xsmall};

      &:last-of-type {
        margin-bottom: ${theme.spacings.medium};
      }
    }

    @media (max-width: 425px) {
      padding: ${theme.spacings.small} ${theme.spacings.xxsmall};
    }
  `}
`;

export const WfLogoContainer = styled.div`
  width: 9.5rem;
  height: 9.5rem;
  background: #fff;
  border-radius: 50%;
  position: relative;

  border: 0.5rem solid #fff;

  img {
    border-radius: 50%;
  }
`;

export const WrapperFields = styled.div`
  ${({ theme }) => css`
    width: 30%;

    ${media.lessThan("medium")`
      width: 100%;
    `}
  `}
`;
