import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router';
import { ColorDefinitions, IconDefinitions } from '../../../../lib/utils/definitions';
import Icon from '../../../UI/Icons/Icon/Icon';
import Tooltip from '../../../UI/Tooltip/Tooltip';
import ThemeSwitch from '../../ThemeSwitch/ThemeSwitch';

export enum SidebarMenuPlacement {
    Top = 'top',
    Bottom = 'bottom',
}

export interface MainMenuItem {
    id: string;
    title: string;
    tooltip: string;
    tooltipColor?: ColorDefinitions;
    iconName: IconDefinitions;
    iconDuotone?: boolean;
    url?: string | null;
    active?: boolean;
    placement: SidebarMenuPlacement;
    sidebarDrawerTitle?: string | ReactElement;
    sidebarDrawerWidth?: string;
    sidebarDrawer?: ReactElement;
    sidebarTitle?: string | ReactElement;
    sidebar?: ReactElement;
}

export interface MainMenuProps {
    menuItems: MainMenuItem[];
    activeMenuItem: string | null;
    activeDawerMenuItem: string | null;
    handleMenuItemClick: (id: string) => void;
    handleMenuItemDrawerClick: (id: string) => void;
    themeSwitch?: boolean;
    accountMenu?: ReactElement;
}

const MainMenu: FC<MainMenuProps> = ({
    menuItems,
    activeMenuItem,
    activeDawerMenuItem,
    handleMenuItemClick,
    handleMenuItemDrawerClick,
    themeSwitch,
    accountMenu,
}) => {
    const topItems = menuItems?.filter((item) => item.placement === SidebarMenuPlacement.Top);
    const bottomItems = menuItems?.filter((item) => item.placement === SidebarMenuPlacement.Bottom);

    return (
        <>
            <div className="menu">
                {topItems?.map((item, index) => (
                    <div key={item.title || index} className="menu__item">
                        {item.url ? (
                            <Tooltip content={item.tooltip} direction="right">
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) =>
                                        isActive ? 'menu__item__link active' : 'menu__item__link'
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMenuItemClick(item.id);
                                    }}
                                >
                                    <Icon icon={item.iconName} renderPlainSvg={true} duotone={item.iconDuotone} />
                                </NavLink>
                            </Tooltip>
                        ) : (
                            <Tooltip content={item.tooltip} direction="right">
                                <button
                                    className={`menu__item__link ${activeDawerMenuItem === item.id ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMenuItemDrawerClick(item.id);
                                    }}
                                >
                                    <Icon icon={item.iconName} renderPlainSvg={true}  duotone={item.iconDuotone}/>
                                </button>
                            </Tooltip>
                        )}
                    </div>
                ))}
            </div>

            <div className="menu menu--last">
                {bottomItems?.map((item, index) => (
                    <div key={item.title || index} className="menu__item">
                        {item.url ? (
                            <Tooltip content={item.tooltip} direction="right">
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) =>
                                        isActive ? 'menu__item__link active' : 'menu__item__link'
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMenuItemClick(item.id);
                                    }}
                                >
                                    <Icon icon={item.iconName} renderPlainSvg={true}  duotone={item.iconDuotone}/>
                                </NavLink>
                            </Tooltip>
                        ) : (
                            <Tooltip content={item.tooltip} direction="right">
                                <button
                                    className={`menu__item__link ${activeDawerMenuItem === item.id ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMenuItemDrawerClick(item.id);
                                    }}
                                >
                                    <Icon icon={item.iconName} renderPlainSvg={true} duotone={item.iconDuotone}/>
                                </button>
                            </Tooltip>
                        )}
                    </div>
                ))}

                {themeSwitch ? (
                    <div className="menu__item">
                        <ThemeSwitch />
                    </div>
                ) : null}

                {accountMenu ? (
                    <div className="menu__item">
                        <div className="menu__item__link">{accountMenu}</div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default MainMenu;
