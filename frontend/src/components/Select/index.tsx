import { useEffect, useRef, useCallback, InputHTMLAttributes } from "react";

import UnregisteredSelect, {
  UnregisteredSelectRef,
} from "../UnregisteredSelect";

export type Option = {
  label: string;
  value: any;
};

export type OptionGroup = {
  title: string;
  items: Option[];
};

type InputHtmlProps = InputHTMLAttributes<HTMLInputElement>;

type SelectProps = InputHtmlProps & {
  label: string;
  name: string;
  options?: Array<Option | OptionGroup>;
  selectedOption?: any;
  emptyOption?: boolean;
  onChange?: (value?: any) => void;
  className?: string;
  disabled?: boolean;
};

export type Orientation = "bottom" | "top";

const Select = ({
  name,
  label,
  options = [],
  selectedOption,
  className,
  emptyOption = false,
  disabled = false,
  onChange,
}: SelectProps) => {
  const selectedOptionValue = useRef<Option | undefined>(undefined);
  const unregisteredSelectRef = useRef<UnregisteredSelectRef>(null);

  const setValue = useCallback((value: any) => {
    selectedOptionValue.current = value;
    unregisteredSelectRef.current?.setValue(value);
  }, []);

  const handleChange = (value: any) => {
    console.log(value);
    selectedOptionValue.current = value;
    onChange && onChange(value);
  };

  return (
    <UnregisteredSelect
      name={name}
      label={label}
      options={options}
      selectedOption={selectedOption}
      className={className}
      emptyOption={emptyOption}
      disabled={disabled}
      onChange={handleChange}
      ref={unregisteredSelectRef}
    />
  );
};

export default Select;
