import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import * as S from "./styles";
import Button from "../Button";
import { User } from "@styled-icons/feather";

type UserDropdownProps = {
  username: string;
  isOpen?: boolean;
};
const UserDropdown = ({ username, isOpen = true }: UserDropdownProps) => {
  const [show, setShow] = useState(false);

  const handleSignout = async () => {
    await signOut();
  };

  const toggleDropdown = () => {
    setShow((current) => !current);
  };

  return (
    <S.Wrapper>
      {username ? (
        <S.WrapperButton>
          <Link href="/login">
            <Button size="large" styleType="circle" icon={<User />} />
          </Link>
        </S.WrapperButton>
      ) : (
        <S.Container isOpen={isOpen}>
          <S.Title onClick={toggleDropdown}>
            <S.UserContainer>
              <span>
                {username ? username : "Jhon Doe"}
                <S.ArrowIcon isOpen={show} />
              </span>
            </S.UserContainer>
          </S.Title>
          <S.Content isOpen={show}>
            <ul>
              <S.ListItem>Meu perfil</S.ListItem>
              <S.ListItem onClick={handleSignout} style={{ color: "red" }}>
                Sair
              </S.ListItem>
            </ul>
          </S.Content>
        </S.Container>
      )}
      <S.Overlay isOpen={show} onClick={() => setShow(false)} />
    </S.Wrapper>
  );
};

export default UserDropdown;
