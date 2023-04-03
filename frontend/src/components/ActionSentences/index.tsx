import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import * as S from "./styles";
import Button from "../Button";
import { MoreVertical, User } from "@styled-icons/feather";

type ActionSentencesProps = {
  isOpen?: boolean;
};
const ActionSentences = ({ isOpen /*, image*/ }: ActionSentencesProps) => {
  const [show, setShow] = useState(false);

  const handleSignout = async () => {
    await signOut();
  };

  const toggleDropdown = () => {
    setShow((current) => !current);
  };

  return (
    <S.Wrapper>
      <S.Container isOpen={show}>
        <S.Title onClick={toggleDropdown}>
          <Button styleType="circle" icon={<MoreVertical />} />
        </S.Title>
        <S.Content isOpen={show}>
          <ul>
            <S.ListItem>Editar</S.ListItem>
            <S.ListItem>Visualizar</S.ListItem>
            <S.ListItem>Publicar</S.ListItem>
            <S.ListItem onClick={handleSignout} style={{ color: "red" }}>
              Excluir
            </S.ListItem>
          </ul>
        </S.Content>
      </S.Container>
      <S.Overlay isOpen={show} onClick={() => setShow(false)} />
    </S.Wrapper>
  );
};

export default ActionSentences;
