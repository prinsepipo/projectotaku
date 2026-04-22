import type React from "react";

import "./index.css";

function Card({ children }: React.PropsWithChildren<object>) {
  return <div className="auth-form-card">{children}</div>;
}

function TabGroup({ children }: React.PropsWithChildren<object>) {
  return <div className="auth-form-tab-group">{children}</div>;
}

interface ITabProps {
  active?: boolean;
  children: React.ReactNode;
}

function Tab({ active, children }: ITabProps) {
  return (
    <div className={`auth-form-tab${active ? " auth-form-tab--active" : ""}`}>
      {children}
    </div>
  );
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
  Footer,
};
