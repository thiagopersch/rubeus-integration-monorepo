import {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  CSSProperties,
} from "react";
import mergeRefs from "react-merge-refs";

import { masks } from "../../utils/masks";

import * as S from "./styles";

type InputHtmlProps =
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputAs = "input" | "textarea";
export type TextInputProps = InputHtmlProps & {
  name: string;
  label: string;
  as?: InputAs;
  size?: "large" | "medium" | "small";
  type?: string;
  icon?: React.ReactNode;
  mask?: keyof typeof masks;
  error?: string;
  containerStyle?: CSSProperties;
  onChangeValue?: (value?: string) => void;
  onClickIcon?: () => void;
};

const TextInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (
  {
    as = "input",
    size = "large",
    name,
    label,
    value,
    icon,
    mask,
    error: errorProp,
    containerStyle,
    disabled = false,
    onChangeValue,
    onClickIcon,
    ...rest
  },
  ref,
) => {
  const [fieldValue, setFieldValue] = useState<string>();

  const fieldRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    const masked = mask ? masks[mask](value) : value;
    setFieldValue(masked);

    if (fieldRef.current) {
      fieldRef.current.value = masked || "";
    }

    onChangeValue && onChangeValue(masked);
  };

  const setValue = useCallback(
    (value?: string) => {
      setFieldValue(() => {
        if (value === undefined) return "";
        const newValue = String(value || "");
        const masked = mask ? masks[mask](newValue) : newValue;
        return masked;
      });
    },
    [mask],
  );

  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.value = fieldValue || "";
    }
  }, [fieldValue]);

  return (
    <S.Wrapper
      inputAs={as}
      disabled={disabled}
      style={containerStyle}
      size={size}
    >
      <S.Container hasClickableIcon={!!icon && !!onClickIcon}>
        <S.Label hasValue={!!fieldValue} inputAs={as} isDisabled={disabled}>
          <span>{label}</span>
          <S.InputContainer size={size} hasIcon={!!icon}>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            <S.Input
              inputSize={size}
              onChange={handleChange}
              as={as}
              ref={mergeRefs([fieldRef, ref])}
              name={name}
              disabled={disabled}
              value={fieldValue}
              {...rest}
            />
            {!!icon && !onClickIcon && <>{icon}</>}
          </S.InputContainer>
        </S.Label>
        {!!icon && !!onClickIcon && (
          <S.IconButton onClick={onClickIcon}>{icon}</S.IconButton>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export default forwardRef(TextInput);
