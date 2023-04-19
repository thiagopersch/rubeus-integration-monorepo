import { useCallback, useRef, useImperativeHandle, forwardRef } from "react";

import Navbar from "@/components/Navbar";
import PageContainer from "@/components/PageContainer";

import * as S from "./styles";

type BaseProps = {
  children: React.ReactNode;
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
      <Navbar />
      <S.Content ref={contentRef}>
        <PageContainer>{children}</PageContainer>
      </S.Content>
    </>
  );
};

export default forwardRef(Base);
