import { useEffect, useRef, useState } from "react";

import { ChevronDown, ChevronUp } from "@styled-icons/feather";

import TextComponent from "../TextComponent";

import * as S from "./styles";

type CollapseProps = {
  open?: boolean;
  label?: string | React.ReactNode;
  children?: string | React.ReactNode;
};

const Collapse = ({ children, label, open }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState<number | undefined>(
    open ? undefined : 0,
  );

  const ref = useRef<HTMLDivElement>(null);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;

    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  return (
    <S.Wrapper>
      <S.WrapperTitle>
        <S.Button onClick={handleFilterOpening}>
          {!!isOpen ? <S.Text>{label}</S.Text> : <S.Text>{label}</S.Text>}
        </S.Button>
        <S.Button onClick={handleFilterOpening}>
          {!!isOpen ? (
            <S.Icon>
              <ChevronUp />
            </S.Icon>
          ) : (
            <S.Icon>
              <ChevronDown />
            </S.Icon>
          )}
        </S.Button>
      </S.WrapperTitle>
      <S.WrapperContent>
        <div ref={ref}>
          {!!isOpen && (
            <S.Content>
              <TextComponent color="darkGrey" size="small">
                {children}
              </TextComponent>
            </S.Content>
          )}
        </div>
      </S.WrapperContent>
    </S.Wrapper>
  );
};

export default Collapse;
