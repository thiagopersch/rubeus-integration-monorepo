import * as S from "./styles";

import { KeyboardArrowUp } from "@styled-icons/material-outlined/KeyboardArrowUp";

const GoTop = () => {
  return (
    <S.Container href="#" aria-label="Go to top" title="Go to top">
      <KeyboardArrowUp />
    </S.Container>
  );
};

export default GoTop;
