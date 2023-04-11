import { DefaultTheme } from "styled-components";

import * as S from "./styles";

export type ErrorMessageProps = {
  size?: "xsm" | "sm" | "md" | "lg";
  color?: keyof DefaultTheme["colors"];
  children: React.ReactNode;
  uppercase?: boolean;
  textAlign?: "right" | "center" | "left";
};

const ErrorMessageLabel = ({
  children,
  color,
  size = "xsm",
  textAlign = "center",
  uppercase = false,
}: ErrorMessageProps) => {
  return (
    <S.ErrorMessage
      textAlign={textAlign}
      color={color}
      size={size}
      uppercase={uppercase}
    >
      {children}
    </S.ErrorMessage>
  );
};

export default ErrorMessageLabel;
