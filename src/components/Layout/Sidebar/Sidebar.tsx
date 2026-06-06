import React, { FC, ReactElement } from 'react';
import { SizeDefinitions } from '../../../lib/utils/definitions';
import DismissButton from '../../UI/DismissButton/DismissButton';
import Logo from '../Logo/Logo';
import MainMenu, { MainMenuItem } from '../Navigation/MainMenu/MainMenu';

export interface SidebarProps {
    menuItems: MainMenuItem[];
    activeMenuItem: string | null;
    activeDawerMenuItem: string | null;
    handleMenuItemClick: (id: string) => void;
    handleDismiss: () => void;

    // Drawer props
    sidebarDrawerOpen?: boolean;
    handleDismissDrawer: () => void;
    handleMenuItemDrawerClick: (id: string) => void;

    // Mobile props
    setSidebarsMobileShown: (state: boolean) => void;
    handleDismissMobile: () => void;
    mobileSidebarsShown: boolean;
    accountMenu?: ReactElement;
}

const Sidebar: FC<SidebarProps> = ({
    menuItems,
    activeMenuItem,
    handleMenuItemClick,
    handleDismiss,
    activeDawerMenuItem,
    sidebarDrawerOpen,
    handleDismissDrawer,
    handleMenuItemDrawerClick,
    setSidebarsMobileShown,
    handleDismissMobile,
    mobileSidebarsShown,
    accountMenu,
}) => {
    const currentSidebar = menuItems.find((item) => item.id === activeMenuItem);
    const currentDrawer = menuItems.find((item) => item.id === activeDawerMenuItem);


    return (
        <>
            <aside className="sidebar sidebar-main">
                <Logo />

                <MainMenu
                    menuItems={menuItems}
                    activeMenuItem={activeMenuItem}
                    activeDawerMenuItem={activeDawerMenuItem}
                    themeSwitch={true}
                    accountMenu={accountMenu}
                    handleMenuItemClick={handleMenuItemClick}
                    handleMenuItemDrawerClick={handleMenuItemDrawerClick}
                />
            </aside>

            {/* Drawer */}
            {sidebarDrawerOpen && currentDrawer?.sidebarDrawer ? (
                <aside
                    className="sidebar sidebar-drawer shown"
                    style={
                        currentDrawer?.sidebarDrawerWidth
                            ? ({
                                '--sb-drawer-width': `${currentDrawer?.sidebarDrawerWidth}`,
                            } as React.CSSProperties)
                            : undefined
                    }
                >
                    <div className="sidebar-drawer__container">
                        <div className={`sidebar-drawer__header`}>
                            <div className="sidebar-drawer__header__container">
                                {currentDrawer.sidebarDrawerTitle ? (
                                    <div>{currentDrawer.sidebarDrawerTitle}</div>
                                ) : null}

                                <DismissButton
                                    size={SizeDefinitions.Small}
                                    right={true}
                                    labelPosition="left"
                                    label="sluiten"
                                    onClick={handleDismissDrawer}
                                />
                            </div>
                        </div>

                        {currentDrawer.sidebarDrawer}
                    </div>
                </aside>
            ) : null}

            {/* Sidebar Sub */}
            {currentSidebar?.sidebar ? (
                <aside className="sidebar sidebar-sub shown">
                    <div className="sidebar-sub__container">
                        <div className="sidebar-sub__header">
                            <div className="sidebar-sub__header__container">
                                {currentSidebar.sidebarTitle ? (
                                    <div>{currentSidebar.sidebarTitle}</div>
                                ) : (
                                    <div className="caption text-mute">MENU</div>
                                )}
                                <DismissButton
                                    size={SizeDefinitions.Small}
                                    right={true}
                                    labelPosition="left"
                                    circle={true}
                                    onClick={handleDismiss}
                                />
                            </div>
                        </div>
                        <div className="sidebar-sub__content">{currentSidebar?.sidebar}</div>
                    </div>
                </aside>
            ) : null}

            {/* Backdrop */}
            {mobileSidebarsShown && (
                <button
                    className="sidebar-backdrop"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDismissMobile();
                    }}
                ></button>
            )}
        </>
    );
};

export default Sidebar;
