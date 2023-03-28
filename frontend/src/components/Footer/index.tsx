import Link from "next/link";
import { Github, Instagram } from "@styled-icons/feather";

import Separator from "../Separator";
import SectionContainer from "../SectionContainer";

import * as S from "./styles";

export type FooterProps = {
  children: string;
};

const Footer = ({ children }: FooterProps) => {
  return (
    <S.Wrapper>
      <S.Container>
        <Link href="https://github.com/thiagopersch" target={"_blank"}>
          <S.SectionGithubSocial>
            <S.Social>
              <Github />
            </S.Social>
          </S.SectionGithubSocial>
        </Link>
        <Link href="https://www.instagram.com/thiagopersch/" target={"_blank"}>
          <S.SectionInstagramSocial>
            <S.Social>
              <Instagram />
            </S.Social>
          </S.SectionInstagramSocial>
        </Link>
      </S.Container>
      <Separator />
      <S.ContainerCopyright>
        <SectionContainer>
          <div dangerouslySetInnerHTML={{ __html: children }} />
        </SectionContainer>
      </S.ContainerCopyright>
    </S.Wrapper>
  );
};

export default Footer;
