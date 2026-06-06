import React, { MouseEventHandler, ReactElement } from 'react';
import { IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Box, { BoxProps } from '../../../Base/Box/Box';

export type IconVariant = 'circle' | 'square' ;

export interface IconProps extends BoxProps {
    icon?: IconDefinitions;
    svg?: string | ReactElement;
    duotone?: boolean;
    iconCss?: string;
    svgCss?: string;
    renderPlainSvg?: boolean;
    size?: SizeDefinitions;
    variant?: IconVariant;
    dimmed?: boolean;
    dimmedSvg?: boolean;
    hover?: boolean;
    focus?: boolean;
    position?: 'left' | 'right';
    onClick?: MouseEventHandler<HTMLDivElement>;
}

function getBorderClass(variant: IconVariant | undefined, background?: string, borderColor?: string) {
    if (variant && background) {
        return borderColor ? `border-${borderColor}` : `border-${background}`;
    }
    return null;
}

function getHoverBorderClass(variant: IconVariant | undefined, hoverBackground?: string, hoverBorderColor?: string) {
    if (variant && hoverBackground) {
        return hoverBorderColor ? `border-${hoverBorderColor}` : `border-${hoverBackground}`;
    }
    return null;
}

function getClassNames({
    variant,
    dimmed,
    dimmedSvg,
    hover,
    size,
    focus,
    position,
    borderClass,
    hoverBorderClass,
    iconCss,
}: {
    variant?: IconVariant;
    duotone?: boolean;
    dimmed?: boolean;
    dimmedSvg?: boolean;
    hover?: boolean;
    size?: SizeDefinitions;
    focus?: boolean;
    position?: 'left' | 'right';
    borderClass?: string | null;
    hoverBorderClass?: string | null;
    iconCss?: string;
}) {
    return [
        'icon',
        variant && `icon-${variant}`,
        dimmed && 'icon--dimmed',
        dimmedSvg && 'icon--dimmed-icon',
        hover && 'icon--hover',
        size && `icon--${size}`,
        focus && `icon--${focus}`,
        position,
        borderClass,
        hoverBorderClass,
        iconCss,
    ].filter(Boolean).join(' ');
}


function getContent(icon: IconDefinitions | undefined, svg: string | ReactElement | undefined, svgCss: string, duotone: boolean | undefined) {

    const css = [
        svgCss,
        duotone && 'icon-duotone'
    ].filter(Boolean).join(' ');

    if (icon) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={css} >
                <use xlinkHref={`#svg_icon_${icon}`} />
            </svg>
        );
    }
    return <>{svg}</>;
}

const Icon = ({
    icon,
    svg,
    duotone = true,
    iconCss = '',
    svgCss = '',
    renderPlainSvg,
    size,
    variant,
    dimmed = false,
    dimmedSvg = false,
    hover = false,
    focus = false,
    position,
    onClick,
    children,
    ...boxProps
}: IconProps): ReactElement => {
    const borderClass = getBorderClass(variant, boxProps.background, boxProps.borderColor);
    const hoverBorderClass = getHoverBorderClass(variant, boxProps.hoverBackground, boxProps.hoverBorderColor);

    const cls = getClassNames({
        variant,
        dimmed,
        dimmedSvg,
        hover,
        size,
        focus,
        position,
        borderClass,
        hoverBorderClass,
        iconCss,
    });

    const content = getContent(icon, svg, svgCss, duotone);

    if (renderPlainSvg) return content;

    return (
        <Box
            {...boxProps}
            css={cls}
            onClick={onClick}
            style={onClick ? { cursor: 'pointer' } : {}}
        >
            {content}
        </Box>
    );
};

export default Icon;
