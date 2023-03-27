import { useCallback, useRef, useImperativeHandle, forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";

import UserDropdown from "@/components/UserDropdown";
import PageContainer from "@/components/PageContainer";
import Footer from "@/components/Footer";

import * as S from "./styles";
import Dropdown from "@/components/Dropdown";

type BaseProps = {
  children: string | React.ReactNode;
};

export type BaseRef = {
  scrollTo: (options?: ScrollToOptions) => void;
};

const Base: React.ForwardRefRenderFunction<BaseRef, BaseProps> = (
  { children },
  ref,
) => {
  const contentRef = useRef<HTMLElement>(null);

  const scrollTo = useCallback((options?: ScrollToOptions) => {
    contentRef.current?.scrollTo(options);
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo }));

  return (
    <>
      <S.Wrapper>
        <S.WrapperLogo>
          <Link href="/">
            <Image
              src="assets/images/rubeus-white.svg"
              width={200}
              height={40}
              quality={80}
              alt="rubeus-white"
            />
          </Link>
        </S.WrapperLogo>
        <S.Menu>
          <S.MenuList>
            <S.MenuItem>
              <Link href="/">Inicio</Link>
            </S.MenuItem>
            <S.MenuItem>
              <Dropdown children="Cadastros" />
            </S.MenuItem>
          </S.MenuList>
        </S.Menu>
        <S.MenuButton>
          <UserDropdown username={/*session?.user.name ||*/ ""} />
        </S.MenuButton>
      </S.Wrapper>
      <S.Content ref={contentRef}>
        <PageContainer>{children}</PageContainer>
      </S.Content>
    </>
  );
};

export default forwardRef(Base);
