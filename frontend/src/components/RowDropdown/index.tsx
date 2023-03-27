import { useState } from "react";
import Link from "next/link";

import * as S from "./styles";

type RowDropdownProps = {
  children?: string;
};
const RowDropdown = ({ children }: RowDropdownProps) => {
  const [show, setShow] = useState(false);

  const toggleDropdown = () => {
    setShow((current) => !current);
  };

  return (
    <S.Wrapper>
      <S.Container isOpen={show}>
        <S.Title onClick={toggleDropdown}>
          <S.UserContainer>
            <span>
              {children}
              <S.ArrowIcon isOpen={show} />
            </span>
          </S.UserContainer>
        </S.Title>
        <S.Content isOpen={show}>
          <ul>
            <S.ListItem value="25">25</S.ListItem>
            <S.ListItem value="50">50</S.ListItem>
            <S.ListItem value="100">100</S.ListItem>
          </ul>
        </S.Content>
      </S.Container>
      <S.Overlay isOpen={show} onClick={() => setShow(false)} />
    </S.Wrapper>
  );
};

export default RowDropdown;
