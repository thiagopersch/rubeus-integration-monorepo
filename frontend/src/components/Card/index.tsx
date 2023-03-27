import Link from "next/link";
import { DefaultTheme } from "styled-components";

// import { withAccessComponent } from 'hooks/AccessProvider';

import * as S from "./styles";

export type CardProps = {
  children?: React.ReactNode;
  description?: string;
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
  description,
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
      <S.Description textAlign={textAlign}>{description}</S.Description>
    </S.Content>
    {link ? (
      <Link href={link} passHref>
        <S.Link>
          Acessar <S.ArrowIcon />
        </S.Link>
      </Link>
    ) : (
      <>
        {onClick && (
          <S.Link onClick={onClick}>
            acessar <S.ArrowIcon />
          </S.Link>
        )}
      </>
    )}
  </S.Wrapper>
);

export default Card;
