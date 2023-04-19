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
  labelColor?: keyof DefaultTheme["colors"];
  sizeLabel?:
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "huge"
    | "xhuge";
  styleType?: "normal" | "rounded" | "outlined" | "secondary" | "circle";
} & ButtonTypes;

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    children,
    icon,
    size = "small",
    fullWidth = false,
    styleType = "normal",
    color = "primaryColor",
    labelColor = "darkGrey",
    sizeLabel = "small",
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
    labelColor={labelColor}
    sizeLabel={sizeLabel}
    {...props}
  >
    {!!icon && icon}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
);

export default forwardRef(Button);
