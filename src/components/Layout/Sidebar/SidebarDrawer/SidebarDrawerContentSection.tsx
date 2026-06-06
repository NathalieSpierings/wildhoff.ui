import React, { PropsWithChildren } from 'react';

export interface SidebarDrawerContentSectionProps extends PropsWithChildren {}

const SidebarDrawerContentSection: React.FC<SidebarDrawerContentSectionProps> = ({ children }) => {
    return <div className="sidebar-drawer__content">{children}</div>;
};

export default SidebarDrawerContentSection;
