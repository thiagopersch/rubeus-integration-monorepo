import * as S from "./styles";

const ToggleSwitch = () => {
  return (
    <div>
      <S.CheckBoxWrapper>
        <S.CheckBox id="checkbox" type="checkbox" />
        <S.CheckBoxLabel htmlFor="checkbox" />
      </S.CheckBoxWrapper>
    </div>
  );
};

export default ToggleSwitch;
