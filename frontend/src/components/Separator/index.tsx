import styled, { css } from "styled-components";

const Separator = styled.hr`
  ${({ theme }) => css`
    border: 0;
    border-top: 1px solid ${theme.colors.primaryGrey};
    border-radius: 10rem;
  `}
`;

export default Separator;
