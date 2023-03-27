import { DefaultTheme } from "styled-components";
import * as S from "./styles";

export type SectionContainerProps = {
  children?: string | React.ReactNode;
  paddings?: keyof DefaultTheme["spacings"];
  columns?: keyof DefaultTheme["columns"];
  display?: keyof DefaultTheme["display"];
  flexDirection?: keyof DefaultTheme["flexDirection"];
  flexWrap?: keyof DefaultTheme["flexWrap"];
  justifyContent?: keyof DefaultTheme["justifyContent"];
  alignItems?: keyof DefaultTheme["alignItems"];
  alignContent?: keyof DefaultTheme["alignContent"];
  margin?: keyof DefaultTheme["spacings"];
  marginTop?: keyof DefaultTheme["spacings"];
  marginBottom?: keyof DefaultTheme["spacings"];
  marginLeft?: keyof DefaultTheme["spacings"];
  marginRight?: keyof DefaultTheme["spacings"];
};

const SectionContainer = ({
  children,
  paddings,
  columns,
  display,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: SectionContainerProps) => {
  return (
    <S.Container
      paddings={paddings}
      columns={columns}
      display={display}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      {children}
    </S.Container>
  );
};

export default SectionContainer;
