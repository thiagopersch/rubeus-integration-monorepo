import { useState } from "react";
import Link from "next/link";

import * as S from "./styles";

type UserDropdownProps = {
  children?: string;
};
const Dropdown = ({ children }: UserDropdownProps) => {
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
            <S.ListItem>
              <Link href="/clients">Clientes</Link>
            </S.ListItem>
            <S.ListItem>
              <Link href="/tbc">TBC</Link>
            </S.ListItem>
          </ul>
        </S.Content>
      </S.Container>
      <S.Overlay isOpen={show} onClick={() => setShow(false)} />
    </S.Wrapper>
  );
};

export default Dropdown;
