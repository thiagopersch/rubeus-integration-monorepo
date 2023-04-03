import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 2rem;

    ${media.lessThan("medium")`
      flex-direction: column;
      padding: 2rem;
    `}
  `}
`;

export const WrapperCTA = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: ${theme.spacings.small} 0;
  `}
`;

export const WrapperDividerCollpase = styled.div`
  ${({ theme }) => css`
    padding: 1rem 0;
  `}
`;

export const WrapperNameSentence = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: 2rem;

    a {
      color: ${theme.colors.darkGrey};
    }

    &:focus {
      color: ${theme.colors.darkGrey};
    }
  `}
`;

export const WrapperCTAActions = styled.div`
  ${({ theme }) => css``}
`;
