import React, { ReactElement } from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';

export interface SidebarDrawerFooterSectionProps {
    borderColor?: ColorDefinitions;
    content?: string | ReactElement;
}

const SidebarDrawerFooterSection: React.FC<SidebarDrawerFooterSectionProps> = ({ borderColor, content }) => {
    return (
        <div className={`sidebar-drawer__footer ${borderColor ? "border-" + borderColor : ''}`}>
            <div className="sidebar-drawer__footer__container">{content}</div>
        </div>
    );
};

export default SidebarDrawerFooterSection;
