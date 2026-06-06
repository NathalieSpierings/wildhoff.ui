import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import DismissButton from '../DismissButton/DismissButton';

export type ToastrVariant = 'default' | 'positive' | 'negative' | 'informational' | 'warning';
export type ToastrPosition =
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'top-full'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-full';

export type ToastrItemType = {
    id?: string;
    message: string | ReactElement;
    variant?: ToastrVariant;
    position?: ToastrPosition;
    background?: ColorDefinitions;
};

export interface ToastrItemTypeProps {
    item: ToastrItemType;
    onClose: () => void;
}

const ToastrItem = ({ item, onClose }: ToastrItemTypeProps): ReactElement => {
    let tint = item.background ? item.background : ColorDefinitions.Dark;

    switch (item.variant) {
        case 'default':
            tint = tint;
            break;
        case 'positive':
            tint = ColorDefinitions.Green;
            break;
        case 'negative':
            tint = ColorDefinitions.Red;
            break;
        case 'informational':
            tint = ColorDefinitions.Blue;
            break;
        case 'warning':
            tint = ColorDefinitions.Orange;
            break;
    }

    const position: ToastrPosition = item.position || 'bottom-center';

    let initial: { x?: string | number; y?: string | number; opacity: number } = { y: 100, opacity: 0 };
    let animate: { x?: string | number; y?: string | number; opacity: number } = { y: 0, opacity: 1 };
    let exit: { x?: string | number; y?: string | number; opacity: number } = { y: 100, opacity: 0 };

    switch (position) {
        case 'top-left':
            initial = { x: '-100%', opacity: 0 };
            animate = { y: 0, x: 0, opacity: 1 };
            exit = { x: '-100%', opacity: 0 };
            break;
        case 'top-right':
        case 'bottom-right':
            initial = { x: '100%', opacity: 0 };
            animate = { x: 0, opacity: 1 };
            exit = { x: '100%', opacity: 0 };
            break;
        case 'top-center':
        case 'top-full':
            initial = { y: -100, opacity: 0 };
            animate = { y: 0, opacity: 1 };
            exit = { y: -100, opacity: 0 };
            break;
        case 'bottom-left':
            initial = { x: '-100%', opacity: 0 };
            animate = { x: 0, opacity: 1 };
            exit = { x: '-100%', opacity: 0 };
            break;
        case 'bottom-center':
        case 'bottom-full':
            initial = { y: 100, opacity: 0 };
            animate = { y: 0, opacity: 1 };
            exit = { y: 100, opacity: 0 };
            break;
    }

    const cls = [
        'toastr',
        item.variant ? `toastr-${item.variant}` : '',
        `toastr--${position}`,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <AnimatePresence>
            <motion.div
                initial={initial} 
                animate={animate} 
                exit={exit} 
                transition={{ type: 'tween', duration: 0.5 }}
                className={cls}
            >
                <div className={`toastr__container bg-${tint}`}>
                    <div className="content-item">
                        {item.position === 'top-left' || item.position === 'bottom-left' ? (
                            <>
                                <div className="content-item__meta">
                                    <div className="toastr__content">
                                        <p>{item.message}</p>
                                    </div>
                                </div>
                                <div className="content-item__postfix item-start shown">
                                    <DismissButton circle={true} onClick={onClose} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="content-item__prefix item-start shown">
                                    <DismissButton circle={true} onClick={onClose} />
                                </div>
                                <div className="content-item__meta">
                                    <div className="toastr__content">
                                        <p>{item.message}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export interface ToastrProps {
    duration: number;
    toasts: ToastrItemType[];
    removeToastrItem: () => void;
}

const Toastr: FC<ToastrProps> = ({ 
    duration, 
    toasts, 
    removeToastrItem 
}) => {
    
    const [items, setItems] = useState<ToastrItemType[]>([]);

    const dismiss = (item: ToastrItemType) => {
        setItems((x) => x.filter((x) => x.id! != item.id));
        setTimeout(() => {
            removeToastrItem();
        }, 350);
    };

    useEffect(() => {
        if (items.length) {
            return;
        }

        if (toasts.length) {
            const item = toasts[0];
            setItems([item, ...items]);
            setTimeout(() => {
                dismiss(item);
            }, duration);
        }
    }, [toasts]);

    return items.length ? items.map((x) => <ToastrItem key={x.id} item={x} onClose={() => dismiss(x)} />) : null;
};

export default Toastr;
