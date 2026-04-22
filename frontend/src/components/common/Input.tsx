import React from "react";
import "./Input.css";

const SIZE_CLASSES = {
  sm: "c-input--sm",
  md: "c-input--md",
  lg: "c-input--lg",
};

type InputSize = keyof typeof SIZE_CLASSES;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  inputSize?: InputSize;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  id,
  type = "text",
  placeholder,
  value,
  inputSize = "md",
  error,
  onChange,
}: IProps) {
  const clsNames = [
    "c-input",
    SIZE_CLASSES[inputSize],
    error ? "c-input--error" : false,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <input
      id={id}
      className={clsNames}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
