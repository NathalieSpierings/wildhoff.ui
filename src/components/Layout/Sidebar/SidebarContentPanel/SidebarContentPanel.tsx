import React, { FC, PropsWithChildren } from 'react';

export interface SidebarContentPanel extends PropsWithChildren {
    title?: string;
    fluid?: boolean;
    sidebarContentPanelCss?: string;
}

const SidebarContentPanel: FC<SidebarContentPanel> = ({ title, fluid, sidebarContentPanelCss = '', children }) => {
    return (
        <div className={`sidebar-section ${fluid ? 'sidebar-section--fluid' : ''}  ${sidebarContentPanelCss}`}>
            {title ? <div className="subtitle">{title}</div> : null}

            {children}
        </div>
    );
};

export default SidebarContentPanel;
