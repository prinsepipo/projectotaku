import type React from "react";
import "./Button.css";

const SIZE_CLASSES = {
  sm: "c-button--sm",
  md: "c-button--md",
  lg: "c-button--lg",
};

type ButtonSize = keyof typeof SIZE_CLASSES;

const VARIANT_CLASSES = {
  primary: "c-button--primary",
  secondary: "c-button--secondary",
  ghost: "c-button--ghost",
  danger: "c-button--danger",
};

type ButtonVariant = keyof typeof VARIANT_CLASSES;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  wide?: boolean;
}

function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  iconPosition = "left",
  wide = false,
  ...rest
}: IProps) {
  const clsNames = [
    "c-button",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    icon ? "c-button--has-icon" : "",
    wide ? "c-button--wide" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={clsNames} {...rest}>
      {icon && iconPosition === "left" && (
        <span className="c-button__icon">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="c-button__icon">{icon}</span>
      )}
    </button>
  );
}

export default Button;
