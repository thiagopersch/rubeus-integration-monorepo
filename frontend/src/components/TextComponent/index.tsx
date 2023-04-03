import { DefaultTheme } from "styled-components";

import * as S from "./styles";

export type TextComponentProps = {
  children: string | React.ReactNode;
  color?: keyof DefaultTheme["colors"];
  size?: keyof DefaultTheme["font"]["sizes"];
  textAlign?: "right" | "center" | "left";
};

export const TextComponent = ({
  children,
  color = "darkGrey",
  size = "xsmall",
  textAlign,
}: TextComponentProps) => {
  return (
    <S.Container color={color} size={size} textAlign={textAlign}>
      {children}
    </S.Container>
  );
};

export default TextComponent;
