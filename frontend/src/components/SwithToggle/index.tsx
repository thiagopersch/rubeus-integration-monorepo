import * as S from "./styles";

export type ToggleSwitchProps = {
  children?: string;
};

const ToggleSwitch = ({ children }: ToggleSwitchProps) => {
  return (
    <div>
      <S.CheckBoxWrapper>
        <S.CheckBox id="checkbox" type="checkbox" />
        <S.CheckBoxLabel htmlFor="checkbox" />
        <S.Label htmlFor="checkbox">{children}</S.Label>
      </S.CheckBoxWrapper>
    </div>
  );
};

export default ToggleSwitch;
