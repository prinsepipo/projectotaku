import type React from "react";
import { NavLink } from "react-router";

import "./index.css";

function Card({ children }: React.PropsWithChildren<object>) {
  return <div className="auth-form-card">{children}</div>;
}

function TabGroup({ children }: React.PropsWithChildren<object>) {
  return <div className="auth-form-tab-group">{children}</div>;
}

interface ITabProps {
  to?: string;
  children: React.ReactNode;
}

function Tab({ to, children }: ITabProps) {
  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `auth-form-tab${isActive ? " auth-form-tab--active" : ""}`
        }
      >
        {children}
      </NavLink>
    );
  }
  return <div className="auth-form-tab auth-form-tab--active">{children}</div>;
}

function Title({ children }: React.PropsWithChildren<object>) {
  return <h2 className="auth-form-title">{children}</h2>;
}

function Description({ children }: React.PropsWithChildren<object>) {
  return <p className="auth-form-description">{children}</p>;
}

function Field({ children }: React.PropsWithChildren<object>) {
  return <div className="auth-form-field">{children}</div>;
}

function FormError({ children }: React.PropsWithChildren<object>) {
  return <p className="auth-form-error">{children}</p>;
}

function Alert({ children }: React.PropsWithChildren<object>) {
  return <div className="auth-form-alert">{children}</div>;
}

function Footer({ children }: React.PropsWithChildren<object>) {
  return <p className="auth-form-footer">{children}</p>;
}

export {
  Card,
  TabGroup,
  Tab,
  Title,
  Description,
  Field,
  FormError as Error,
  Alert,
  Footer,
};
