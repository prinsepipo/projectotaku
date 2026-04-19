import type React from 'react';
import './Button.css';

const STYLES = {
    primary: "c-button--primary",
    secondary: "c-button--secondary",
    ghost: "c-button--ghost",
    danger: "c-button--danger",
}

type STYLES = keyof typeof STYLES;

interface IButtonProps {
    text?: string;
    style?: STYLES;
    className?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}


function Button({ text, style = "primary", className, children, icon, iconPosition = 'left' }: IButtonProps) {
    const clsNames = `c-button ${STYLES[style]}${icon ? ' c-button--has-icon' : ''}${className ? ` ${className}` : ''}`;
    const content = text || children;

    return (
        <button className={clsNames}>
            {icon && iconPosition === 'left' && <span className="c-button__icon">{icon}</span>}
            {content}
            {icon && iconPosition === 'right' && <span className="c-button__icon">{icon}</span>}
        </button>
    );
}


export default Button;
