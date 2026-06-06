import React, { FC } from 'react';
import { ColorDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Box, { BoxProps } from '../../Base/Box/Box';

export interface DismissButtonProps extends BoxProps {
    dismissCss?: string;
    circle?: boolean;
    size?: SizeDefinitions;
    label?: string;
    labelColor?: ColorDefinitions;
    background?: ColorDefinitions;
    labelPosition?: 'left' | 'right';
    right?: boolean;
     onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DismissButton: FC<DismissButtonProps> = ({
    dismissCss = '',
    circle = false,
    size,
    label,
    labelPosition,
    labelColor,
    background,
    right = false,
    onClick,
    children,
    ...boxProps
}) => {
    const cls = [
        'dismiss',
        circle ? 'dismiss-circle' : '',
        dismissCss,
        size ? `dismiss--${size}` : '',
        right ? `dismiss--right` : '',
        labelPosition == 'left' ? `dismiss--end` : '',
    ]
        .filter(Boolean)
        .join(' ');

    const icon = (
        <Box
            {...boxProps}
            css={`dismiss__icon ${background ? 'bg-' + background : ''}`}
        >
            &nbsp;
        </Box>
    );

    let content;
    if (label) {
        const labelElement = (
            <div className={`dismiss__label ${labelColor ? 'text-' + labelColor : ''}`}>
                {label}
            </div>
        );

        content = labelPosition === 'left' ? (
            <>
                {labelElement}
                {icon}
            </>
        ) : (
            <>
                {icon}
                {labelElement}
            </>
        );
    } else {
        content = icon;
    }

    return (
        <button className={cls} onClick={onClick}>
            {content}
        </button>
    );
};

export default DismissButton;
