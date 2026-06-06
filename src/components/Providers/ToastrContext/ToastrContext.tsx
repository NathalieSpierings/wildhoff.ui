import React, { createContext, useContext, useState } from 'react';
import { generateUUID } from '../../../lib/helpers/helpers';
import { ToastrItemType } from '../../UI/Toastr/Toastr';

export interface ToastrContextType {
    toasts: ToastrItemType[];
    enqueue: (toast: ToastrItemType) => void;
    dequeue: () => void;
}

export const ToastrContext = createContext<ToastrContextType | undefined>(undefined);

export const ToastrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastrItemType[]>([]);

    const enqueue = (toast: ToastrItemType) => {
        toast.id = toast.id ?? generateUUID();
        toast.variant = toast.variant ?? 'default';
        setToasts((prev) => [...prev, toast]);
    };

    const dequeue = () => {
        setToasts((prev) => prev.slice(1));
    };

    const contextValue = React.useMemo(() => ({ toasts, enqueue, dequeue }), [toasts, enqueue, dequeue]);
    return <ToastrContext.Provider value={contextValue}>{children}</ToastrContext.Provider>;
};

export const useToastr = () => {
    const context = useContext(ToastrContext);
    if (!context) {
        throw new Error('useToastr must be used within a ToastrProvider');
    }
    return context;
};
