import { DefaultTheme } from "styled-components";
import * as S from "./styles";

export type SectionContainerProps = {
  children?: string | React.ReactNode;
  paddings?:
    | "none"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "huge"
    | "xhuge";
  display?: "none" | "flex" | "block";
  flexDirection?: "row" | "column" | "rowReverse" | "columnReverse";
  flexWrap?: "nowrap" | "wrap" | "wrapReverse";
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "spaceBetween"
    | "spaceAround"
    | "spaceEvenly";
  alignItems?: "start" | "end" | "center" | "baseline" | "stretch";
  alignContent?: "start" | "end" | "center" | "spaceBetween" | "spaceAround";
};

const SectionContainer = ({
  children,
  paddings = "none",
  display = "flex",
  flexDirection = "row",
  flexWrap = "wrap",
  justifyContent = "start",
  alignItems = "start",
}: SectionContainerProps) => {
  return (
    <S.Container
      paddings={paddings}
      display={display}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </S.Container>
  );
};

export default SectionContainer;
