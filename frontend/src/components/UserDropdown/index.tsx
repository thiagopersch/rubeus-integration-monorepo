import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import * as S from "./styles";
import Button from "../Button";
import { User } from "@styled-icons/feather";

type UserDropdownProps = {
  username: string;
};
const UserDropdown = ({ username /*, image*/ }: UserDropdownProps) => {
  const [show, setShow] = useState(false);

  const handleSignout = async () => {
    await signOut();
  };

  const toggleDropdown = () => {
    setShow((current) => !current);
  };

  return (
    <S.Wrapper>
      <S.WrapperButton>
        <Link href="/login">
          <Button size="large" styleType="circle" icon={<User />} />
        </Link>
      </S.WrapperButton>
      <S.Container isOpen={show}>
        <S.Title onClick={toggleDropdown}>
          <S.UserContainer>
            {/* <span>
              {username ? username : "Tiago Persch"}
              <S.ArrowIcon isOpen={show} />
            </span> */}
            {/* <S.UserImage>
              <Image
                src={image}
                fill
                style={{ objectFit: "cover" }}
                quality={80}
                sizes="80px"
                alt={username}
              />
            </S.UserImage> */}
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
      <S.Overlay isOpen={show} onClick={() => setShow(false)} />
    </S.Wrapper>
  );
};

export default UserDropdown;
