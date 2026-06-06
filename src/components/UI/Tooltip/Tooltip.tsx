import React, { FC, PropsWithChildren, ReactNode, useRef, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export interface TooltipProps extends PropsWithChildren {
    delay?: number;
    direction?: 'left' | 'right' | 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
    content: ReactNode;
    background?: ColorDefinitions;
    disabled?: boolean;
    arrow?: boolean;
    overflowTooltip?: boolean;
    renderHtml?: boolean;
}

const Tooltip: FC<TooltipProps> = ({
    delay = 400,
    direction = 'top',
    content,
    background,
    disabled = false,
    arrow = true,
    renderHtml = false,
    overflowTooltip = false,
    children,
}) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [active, setActive] = useState(false);

    const showTip = () => {
        if (disabled) return;
        timeoutRef.current = setTimeout(() => {
            setActive(true);
        }, delay);
    };

    const hideTip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActive(false);
    };

    let backgroundClass = '';
    if (background) {
        if (!overflowTooltip) {
           backgroundClass = "tooltip-" + background;
        }
    }

    let arrowClass = '';
    if (arrow) {
        arrowClass = overflowTooltip ? '' : "tooltip--arrow";
    }

    let directionClass = '';
    if (direction) {
        directionClass = overflowTooltip ? "tooltip--bottom" : `tooltip--${direction}`;
    }

    const cls = [
        'tooltip',
        backgroundClass,
        overflowTooltip ? "tooltip--overflow tooltip--bottom" : '',
        arrowClass,
        directionClass,
    ]
        .filter(Boolean)
        .join(' ');
        

    if (content == undefined || content == null) {
        return children;
    }

    return (
        <div className={cls}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
            onFocus={showTip}
            onBlur={hideTip}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    showTip();
                }
                if (e.key === 'Escape') {
                    hideTip();
                }
            }}
            onTouchStart={showTip}
            onTouchEnd={hideTip}
            style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
        >
            {children}
            {active && (
                <div className="tooltip__container">
                    {renderHtml && typeof content === 'string' ? (
                        <div className="tooltip__content" dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <div className="tooltip__content">{content}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
