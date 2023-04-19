import { DefaultTheme } from "styled-components";

import * as S from "./styles";

export type TextComponentProps = {
  children: string | React.ReactNode;
  color?: keyof DefaultTheme["colors"];
  size?: keyof DefaultTheme["font"]["sizes"];
  weight?: keyof DefaultTheme["font"]["weight"];
  textAlign?: "right" | "center" | "left";
};

export const TextComponent = ({
  children,
  color = "darkGrey",
  size = "xsmall",
  weight,
  textAlign,
}: TextComponentProps) => {
  return (
    <S.Container
      color={color}
      size={size}
      textAlign={textAlign}
      weight={weight}
    >
      {children}
    </S.Container>
  );
};

export default TextComponent;
