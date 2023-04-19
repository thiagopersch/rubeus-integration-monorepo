import styled, { css, keyframes } from "styled-components";
import { ModalProps } from ".";

const showModal = keyframes`
  from {
    visibility: hidden;
    opacity: 0;
    transform: translateX(-50%) translateY(calc(-50% + -0.5rem));
  }
  to {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(-50%);
  }
`;

const dimensions = {
  normal: css`
    height: auto;
    width: auto;
    overflow: auto;
  `,
  medium: css`
    height: 50vh;
    width: 50vw;
    overflow: auto;
  `,
  large: css`
    height: 50vh;
    width: 70vw;
    overflow: auto;
  `,
};

export const Wrapper = styled.div<ModalProps>`
  ${({ theme, height, width }) => css`
    visibility: hidden;
    opacity: 0;
    animation: 0.3s both ${showModal};
    animation-fill-mode: forwards;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-0.5rem);
    z-index: ${theme.layers.modal};
    background: red;
    padding: ${theme.spacings.small} ${theme.spacings.small};
    border-radius: 1rem;
    background ${theme.colors.white};

    ${!!height && dimensions[height]}
    ${!!width && dimensions[width]}
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.weight.bold};
    color: ${theme.colors.lightGrey};
    text-align: left;
    margin: 0 ${theme.spacings.xxsmall};
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.spacings.xsmall};
  `}
`;

const showOverlay = keyframes`
  from {
    visibility: hidden;
    opacity: 0;
  }
  to {
    visibility: visible;
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: ${theme.layers.overlay};

    visibility: hidden;
    opacity: 0;
    animation: 0.3s ease-out ${showOverlay};
    animation-fill-mode: forwards;
  `}
`;
