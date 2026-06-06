import React, { ReactElement } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import Box, { BoxProps } from '../../Base/Box/Box';

export interface FieldsetProps extends BoxProps {
    legend?: string;
    legendBorderColor?: ColorDefinitions;
    fieldsetCss?: string;
    legendCss?: string;
}

function Fieldset({
    legend,
    legendBorderColor,
    fieldsetCss = '',
    legendCss = '',
    children,
    ...boxProps
}: Readonly<FieldsetProps>): ReactElement {

    const cls = [
        'fieldset',
        fieldsetCss,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Box css={cls} {...boxProps} renderAs="fieldset">
            {legend ? (
                <legend className={`legend ${legendCss} ${legendBorderColor ? "border-" + legendBorderColor : ''}`}>
                    {legend}
                </legend>
            ) : null}
            {children}
        </Box>
    );
}

export default Fieldset;
