import React, { createContext, useContext, useState } from 'react';
import { BreadcrumbItem } from '../../Layout/Navigation/Breadcrumb';

export interface LayoutContextValue {
    pageTitle: string;
    setPageTitle: (title: string) => void;
    breadcrumbItems: BreadcrumbItem[];
    setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
    gridLayoutDrawerOpen: boolean;
    toggleGridLayoutDrawer: () => void;
    fullscreen: boolean;
    hasSidebars: boolean;
    showHeader: boolean;
    showSidebarMobile: boolean;
    showTwoColumnLayoutMain: boolean;
    setFullscreen: (value: boolean) => void;
    setHasSidebars: (value: boolean) => void;
    setShowHeader: (value: boolean) => void;
    setShowSidebarMobile: (value: boolean) => void;
    setShowTwoColumnLayoutMain: (value: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pageTitle, setPageTitle] = useState('');
    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
    const [gridLayoutDrawerOpen, setGridLayoutDrawerOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [hasSidebars, setHasSidebars] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);
    const [showTwoColumnLayoutMain, setShowTwoColumnLayoutMain] = useState(false);

    const toggleGridLayoutDrawer = () => setGridLayoutDrawerOpen((prev) => !prev);

    const contextValue = React.useMemo(() => ({
        pageTitle,
        setPageTitle,
        breadcrumbItems,
        setBreadcrumbItems,
        gridLayoutDrawerOpen,
        toggleGridLayoutDrawer,
        fullscreen,
        hasSidebars,
        showHeader,
        showSidebarMobile,
        showTwoColumnLayoutMain,
        setFullscreen,
        setHasSidebars,
        setShowHeader,
        setShowSidebarMobile,
        setShowTwoColumnLayoutMain,
    }), [
        pageTitle,
        breadcrumbItems,
        gridLayoutDrawerOpen,
        fullscreen,
        hasSidebars,
        showHeader,
        showSidebarMobile,
        showTwoColumnLayoutMain,
        setPageTitle,
        setBreadcrumbItems,
        toggleGridLayoutDrawer,
        setFullscreen,
        setHasSidebars,
        setShowHeader,
        setShowSidebarMobile,
        setShowTwoColumnLayoutMain,
    ]);

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayoutContext must be used within a LayoutProvider');
    }
    return context;
};
