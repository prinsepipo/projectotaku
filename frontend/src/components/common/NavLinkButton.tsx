import { NavLink } from "react-router";
import type React from "react";
import "./Button.css";

const VARIANT_CLASSES = {
  primary: "c-button--primary",
  secondary: "c-button--secondary",
  ghost: "c-button--ghost",
  danger: "c-button--danger",
};

const SIZE_CLASSES = {
  sm: "c-button--sm",
  md: "c-button--md",
  lg: "c-button--lg",
};

type ButtonVariant = keyof typeof VARIANT_CLASSES;
type ButtonSize = keyof typeof SIZE_CLASSES;

interface IProps {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

function NavLinkButton({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  iconPosition = "left",
}: IProps) {
  const clsNames = [
    "c-button",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    icon ? "c-button--has-icon" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <NavLink to={to} className={clsNames}>
      {icon && iconPosition === "left" && (
        <span className="c-button__icon">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="c-button__icon">{icon}</span>
      )}
    </NavLink>
  );
}

export default NavLinkButton;
