import { NavLink } from "react-router";
import type React from "react";
import "./Button.css";

const STYLES = {
  primary: "c-button--primary",
  secondary: "c-button--secondary",
  ghost: "c-button--ghost",
  danger: "c-button--danger",
};

type STYLES = keyof typeof STYLES;

interface INavLinkButtonProps {
  to: string;
  style?: STYLES;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

function NavLinkButton({
  to,
  style = "primary",
  className,
  children,
  icon,
  iconPosition = "left",
}: INavLinkButtonProps) {
  const clsNames = `c-button ${STYLES[style]}${icon ? " c-button--has-icon" : ""}${className ? ` ${className}` : ""}`;

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
