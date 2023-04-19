import * as S from "./styles";

export type ToggleSwitchProps = {
  children?: string;
  value?: string;
};

const ToggleSwitch = ({ children, value = "false" }: ToggleSwitchProps) => {
  return (
    <div>
      <S.CheckBoxWrapper>
        <S.CheckBox id="checkbox" type="checkbox" value={value} />
        <S.CheckBoxLabel htmlFor="checkbox" />
        <S.Label htmlFor="checkbox">{children}</S.Label>
      </S.CheckBoxWrapper>
    </div>
  );
};

export default ToggleSwitch;
