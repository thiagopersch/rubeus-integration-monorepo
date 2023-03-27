import { DefaultTheme } from "styled-components";

import * as S from "./styles";

export type TextComponentProps = {
  children: string;
  color?: keyof DefaultTheme["colors"];
  size?: keyof DefaultTheme["font"]["sizes"];
};

export const TextComponent = ({
  children,
  color,
  size,
}: TextComponentProps) => {
  return (
    <S.Container color={color} size={size}>
      {children}
    </S.Container>
  );
};

export default TextComponent;
