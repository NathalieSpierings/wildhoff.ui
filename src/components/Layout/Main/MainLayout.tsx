import React, { ReactElement, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { SvgSprite } from '../../../assets/SvgSprite';
import { useLayoutContext } from '../../Providers/LayoutContext/LayoutContext';
import { MainMenuItem } from '../Navigation/MainMenu/MainMenu';
import { BreadcrumbItem } from '../Navigation/Breadcrumb/Breadcrumb';
import PageLoader from '../PageLoader/PageLoader';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

export interface MainLayoutProps {
    loading?: boolean;
    // Sidebar props
    menuItems: MainMenuItem[];
    currentMenuItem?: string | null;
    accountMenu?: ReactElement;
    // Header props
    pageTitle?: string;
    breadcrumbItems?: BreadcrumbItem[];

    // Is used to open the drawer from another location other than the menu item inside de sidebar that usually opens the drawer
    drawerRequest?: {
        item: string;
        key: number;
    } | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    loading,
    menuItems,
    currentMenuItem,
    accountMenu,
    pageTitle,
    breadcrumbItems = [],
    drawerRequest
}) => {
    const { fullscreen, hasSidebars, showHeader } = useLayoutContext();
    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(currentMenuItem || null);
    const [sidebarSubOpen, setSidebarSubOpen] = useState<boolean>(false);
    const [mobileSidebarsShown, setMobileSidebarsShown] = useState<boolean>(false);
    const [activeDrawerItem, setActiveDrawerItem] = useState<string | null>(null);
    const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState<boolean>(false);

    // If there's a drawer request, open the drawer and set the active item
    // Is used to open the drawer from another location other than the menu item inside de sidebar that usually opens the drawer
     useEffect(() => {
        if (!drawerRequest) return;

        setActiveDrawerItem(drawerRequest.item);
        setSidebarDrawerOpen(true);
    }, [drawerRequest]);


    useEffect(() => {
        setActiveMenuItem(currentMenuItem || null);
        const exists = menuItems.some((x) => x.id === activeMenuItem && x.sidebar);
        setSidebarSubOpen(exists);
    }, [currentMenuItem, activeMenuItem, menuItems]);

    const handleMenuItemClick = (id: string) => {
        // Reset drawer
        setActiveDrawerItem(null);
        setSidebarDrawerOpen(false);
        setActiveMenuItem(id);
    };

    const handleDismiss = () => {
        setSidebarSubOpen(false);
    };

    const handleMenuItemDrawerClick = (id: string) => {
        setActiveDrawerItem(id);
        setSidebarDrawerOpen(!sidebarDrawerOpen);
    };

    const handleDismissDrawer = () => {
        setSidebarDrawerOpen(false);
    };

    const handleDismissMobile = () => {
        setMobileSidebarsShown(false);
    };

    const cls = [
        'page',
        hasSidebars ? `has-sidebars` : '',
        sidebarSubOpen ? `sb-sub-shown` : '',
        sidebarDrawerOpen ? `sb-drawer-shown` : '',
        mobileSidebarsShown ? `sb-mobile-shown` : '',
        fullscreen ? `page--fullscreen` : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <>
            <PageLoader loading={loading} />

            <div className={cls}>
                {hasSidebars && (
                    <Sidebar
                        menuItems={menuItems}
                        activeMenuItem={activeMenuItem}
                        handleDismiss={handleDismiss}
                        handleMenuItemClick={handleMenuItemClick}
                        activeDawerMenuItem={activeDrawerItem}
                        sidebarDrawerOpen={sidebarDrawerOpen}
                        handleDismissDrawer={handleDismissDrawer}
                        handleMenuItemDrawerClick={handleMenuItemDrawerClick}
                        setSidebarsMobileShown={setMobileSidebarsShown}
                        handleDismissMobile={handleDismissMobile}
                        mobileSidebarsShown={mobileSidebarsShown}
                        accountMenu={accountMenu}
                    />
                )}

                {showHeader && (
                    <Header
                        title={pageTitle}
                        breadcrumbItems={breadcrumbItems}
                        hasSidebars={hasSidebars}
                        mobileSidebarsShown={mobileSidebarsShown}
                        setSidebarsMobileShown={setMobileSidebarsShown}
                    />
                )}

                <div className="page__container">
                    <div className="page__content">
                        <Outlet />
                    </div>
                </div>
            </div>

            <SvgSprite />
        </>
    );
};

export default MainLayout;
