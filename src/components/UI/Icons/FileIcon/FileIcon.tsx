import React, { ReactElement } from 'react';
import { SizeDefinitions } from '../../../../lib/utils/definitions';

export const iconDefinitions = [
    'unknown',
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'xls',
    'csv',
    'txt',
    'ei',
    'xml',
    'zip',
] as const;

export type FileIconDefinitions = (typeof iconDefinitions)[number];

export const FileToIconVariant = (x: File): FileIconDefinitions => {
    let extension = x.name.split('.').reverse()[0];
    return isIconVariant(extension) ? extension : 'unknown';
};

function isIconVariant(x: string): x is FileIconDefinitions {
    return [
        'unknown',
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'xls',
        'csv',
        'txt',
        'ei',
        'xml',
        'zip',
    ].includes(x);
}

export interface FileIconProps {
    variant?: FileIconDefinitions;
    duotone?: boolean;
}

const FileIcon = ({
     variant = 'unknown',
    duotone = true
 }: FileIconProps): ReactElement => {

    const displayVariant = (variant: string) => {
        if (variant === 'xlsx') return 'xls';
        if (variant === 'docx') return 'doc';
        return variant;
    };

    const css = duotone ? `icon-duotone` : '';

    if (variant == 'unknown') {
        return (
            <svg className={css}>
                <use xlinkHref="#svg_icon_file_text" />
            </svg>
        );
    } 
    else {
        return (
            <svg className={css}>
                <use xlinkHref={`#svg_icon_file_${displayVariant(variant)}`} />
            </svg>
        );
    }
};

export default FileIcon;
