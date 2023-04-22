import {
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
  useRef,
} from "react";
import mergeRefs from "react-merge-refs";

import * as S from "./styles";

type InputHtmlProps = InputHTMLAttributes<HTMLInputElement>;

export type ToggleSwitchProps = InputHtmlProps & {
  isChecked?: boolean;
  label?: string | React.ReactNode;
  labelFor?: string;
  onCheck?: (status: boolean) => void;
  value?: string | ReadonlyArray<string> | number | boolean;
};

const ToggleSwitch: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ToggleSwitchProps
> = ({ isChecked, value, onCheck, labelFor, label, ...props }, ref) => {
  const [checked, setChecked] = useState(!!isChecked);

  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onCheck) {
      onCheck(checked);
    }
  }, [checked]);

  return (
    <div>
      <S.CheckBoxWrapper onClick={() => setChecked(!checked)}>
        <S.CheckBox
          id={labelFor}
          type="checkbox"
          value={value}
          checked={checked}
          ref={mergeRefs([fieldRef, ref])}
          {...props}
        />
        <S.CheckBoxLabel htmlFor={labelFor} />
        <S.Label htmlFor={labelFor}>{label}</S.Label>
      </S.CheckBoxWrapper>
    </div>
  );
};

export default forwardRef(ToggleSwitch);
