import React, { FC, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorDefinitions } from '../../../lib/utils/definitions';

const RippleContainer = styled.div<{ $duration: number; $color: string }>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    span {
        transform: scale(0);
        border-radius: 100%;
        position: absolute;
        opacity: 0.75;
        background-color: ${(props) => props.$color};
        animation-name: ripple;
        animation-duration: ${(props) => props.$duration}ms;
    }

    @keyframes ripple {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;

export interface RippleProps {
    duration?: number;
    color?: ColorDefinitions | string;
}

const useDebouncedRippleCleanUp = (
    rippleCount: number, 
    duration: number, 
    cleanUpFunction: () => void) => {

    useLayoutEffect(() => {
        let bounce: ReturnType<typeof setTimeout> | undefined;

        if (rippleCount > 0) {
            clearTimeout(bounce);

            bounce = setTimeout(() => {
                cleanUpFunction();
                clearTimeout(bounce);
            }, duration * 4);
        }

        return () => {
            if (bounce) {
                clearTimeout(bounce);
            }
        };
    }, [rippleCount, duration, cleanUpFunction]);
};

const Ripple: FC<RippleProps> = ({ duration = 850, color = '#fff' }) => {
    const [rippleArray, setRippleArray] = useState<{ x: number; y: number; size: number }[]>([]);

    const isColorDifinition = Object.values(ColorDefinitions).includes(color as ColorDefinitions);
    if (isColorDifinition) {
        color = `var(--color-${color})`;
    }

    useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
        setRippleArray([]);
    });

    const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        const rippleContainer = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rippleContainer.width, rippleContainer.height);

        const x = e.pageX - rippleContainer.x - size / 2;
        const y = e.pageY - rippleContainer.y - size / 2;
        
        const newRipple = { x, y, size };

        setRippleArray([...rippleArray, newRipple]);
    };

    return (
        <RippleContainer $duration={duration} $color={color} onMouseDown={addRipple}>
            {rippleArray.length > 0 &&
                rippleArray.map((ripple, index) => {
                    return (
                        <span
                            key={'span' + index}
                            style={{
                                top: ripple.y,
                                left: ripple.x,
                                width: ripple.size,
                                height: ripple.size,
                            }}
                        />
                    );
                })}
        </RippleContainer>
    );
};

export default Ripple;
