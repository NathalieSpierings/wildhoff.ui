import React, { HTMLProps, MouseEventHandler, ReactNode } from 'react';
import { ColorDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Ripple from '../../Base/Ripple/Ripple';

export type ButtonVariant = 'outline' | 'flat' | 'ghost';

export interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type'> {
    variant?: ButtonVariant;
    circle?: boolean;
    rounded?: boolean;
    shadow?: boolean;
    raised?: boolean;
    color?: ColorDefinitions;
    size?: SizeDefinitions;
    fluid?: boolean;
    ripple?: boolean;
    rippleColor?: ColorDefinitions | string;
    rippleDuration?: number;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    css?: string;
}

const Button: React.FC<ButtonProps> = ({
    variant,
    color,
    circle = false,
    rounded = false,
    shadow = false,
    raised = false,
    size,
    fluid = false,
    ripple = true,
    rippleColor,
    rippleDuration,
    children,
    css = '',
    ...props
}) => {
    const cls = [
        'btn',
        variant ? `btn-${variant}` : '',
        shadow ? `btn--shadow` : '',
        raised ? `btn--raised` : '',
        circle ? `btn--circle` : '',
        rounded ? `btn--rounded` : '',
        color ? `btn-${color}` : '',
        size ? `btn--${size}` : '',
        fluid ? `btn--fluid` : '',
        css,
    ]
        .filter(Boolean)
        .join(' ');

    return ripple ? (
        <button className={cls} {...props}>
            {children}
            <Ripple color={rippleColor} duration={rippleDuration} />
        </button>
    ) : (
        <button className={`${cls} ${css}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
