import * as S from "./styles";

export type BadgeProps = {
  children: React.ReactNode;
  styledType:
    | "success"
    | "lightGrey"
    | "blue"
    | "orange"
    | "danger"
    | "lightRed";
};

const Badge = ({
  children,
  styledType = "success",
}: BadgeProps): JSX.Element => (
  <S.Wrapper styledType={styledType}>{children}</S.Wrapper>
);

export default Badge;
