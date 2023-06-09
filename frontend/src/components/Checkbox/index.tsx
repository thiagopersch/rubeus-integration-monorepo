import { useState, InputHTMLAttributes, useEffect } from "react";

import * as S from "./styles";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  onCheck?: (status: boolean) => void;
  isChecked?: boolean;
  label?: string | React.ReactNode;
  labelFor?: string;
  labelColor?: "white" | "black" | "primaryColor";
  value?: string | ReadonlyArray<string> | number | boolean;
  inactive?: boolean;
};

const Checkbox = ({
  onCheck,
  isChecked,
  label,
  labelFor,
  labelColor = "black",
  value,
  disabled,
  inactive = false,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(!!isChecked);

  useEffect(() => {
    if (onCheck) {
      onCheck(checked);
    }
  }, [checked]);

  return (
    <S.Wrapper onClick={() => setChecked(!checked)}>
      <S.Input
        id={labelFor}
        type="checkbox"
        checked={checked}
        value={value}
        disabled={disabled}
        inactive={inactive}
        {...props}
      />
      {!!label && (
        <S.Label htmlFor={labelFor} labelColor={labelColor}>
          {label}
        </S.Label>
      )}
    </S.Wrapper>
  );
};

export default Checkbox;
