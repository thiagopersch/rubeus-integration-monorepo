import { DefaultTheme } from "styled-components";
import { forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
// import { withAccessComponent } from "hooks/AccessProvider";

import * as S from "./styles";

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  as?: React.ElementType;
  color?: keyof DefaultTheme["colors"];
  styleType?: "normal" | "rounded" | "outlined" | "secondary" | "circle";
} & ButtonTypes;

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    children,
    icon,
    size = "large",
    fullWidth = false,
    styleType = "normal",
    color = "primaryColor",
    ...props
  },
  ref,
) => (
  <S.Wrapper
    size={size}
    fullWidth={fullWidth}
    hasIcon={!!icon}
    ref={ref}
    styleType={styleType}
    color={color}
    {...props}
  >
    {!!icon && icon}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
);

export default forwardRef(Button);
