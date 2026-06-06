import React, { PropsWithChildren, ReactElement } from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import SidebarDrawerContentSection from './SidebarDrawerContentSection';
import SidebarDrawerFooterSection from './SidebarDrawerFooterSection';

export interface SidebarDrawerProps extends PropsWithChildren {
    footerBorderColor?: ColorDefinitions;
    footerContent?: string | ReactElement;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ footerBorderColor, footerContent, children }) => {
    return (
        <div className="sidebar-drawer__content__container">
            <SidebarDrawerContentSection>{children}</SidebarDrawerContentSection>

            <SidebarDrawerFooterSection borderColor={footerBorderColor} content={footerContent} />
        </div>
    );
};

export default SidebarDrawer;
