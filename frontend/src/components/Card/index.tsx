import Link from "next/link";
import { DefaultTheme } from "styled-components";

// import { withAccessComponent } from 'hooks/AccessProvider';

import * as S from "./styles";

export type CardProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconAlign?: "right" | "center" | "left";
  textAlign?: "right" | "center" | "left";
  link?: string;
  paddings?: keyof DefaultTheme["spacings"];
  columns?: keyof DefaultTheme["columns"];
  onClick?: () => void;
};

const Card = ({
  children,
  icon,
  iconAlign = "left",
  textAlign = "left",
  link,
  paddings,
  columns,
  onClick,
}: CardProps) => (
  <S.Wrapper paddings={paddings} columns={columns}>
    <S.Content hasIcon={!!icon} iconAlign={iconAlign}>
      {!!icon && icon}
      {(!!children || children === 0) && (
        <S.Text textAlign={textAlign}>{children}</S.Text>
      )}
    </S.Content>
  </S.Wrapper>
);

export default Card;
