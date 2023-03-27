import { DefaultTheme } from "styled-components";

import * as S from "./styles";

export type HeadingProps = {
  size?: "huge" | "lg" | "md" | "sm";
  color?: keyof DefaultTheme["colors"];
  children: React.ReactNode;
  uppercase?: boolean;
  textAlign?: "right" | "center" | "left";
};

const Heading = ({
  children,
  color,
  size = "lg",
  textAlign = "center",
  uppercase = false,
}: HeadingProps) => {
  return (
    <S.Heading
      textAlign={textAlign}
      color={color}
      size={size}
      uppercase={uppercase}
    >
      {children}
    </S.Heading>
  );
};

export default Heading;
