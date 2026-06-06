import React, { FC } from 'react';
import { NavLink } from 'react-router';

export interface SidebarMenuItem {
    title: string;
    url: string;
}

export interface SidebarMenuProps {
    menuItems: SidebarMenuItem[];
}

const SidebarMenu: FC<SidebarMenuProps> = ({ menuItems = [] }) => {
    return (
        <div className="sidebar-menu">
            {menuItems.map((item, idx) => (
                <div key={item.title || idx} className="sidebar-menu__item">
                    <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                            isActive ? 'sidebar-menu__item__link active' : 'sidebar-menu__item__link'
                        }
                    >
                        {item.title}
                    </NavLink>
                </div>
            ))}
        </div>
    );
};

export default SidebarMenu;
