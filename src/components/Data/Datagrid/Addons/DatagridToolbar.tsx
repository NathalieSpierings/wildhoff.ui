import React, { ReactElement, ReactNode } from "react";
import { ColorDefinitions } from "../../../../lib/utils/definitions";
import Toolbar from "../../../UI/Toolbar/Toolbar";

export interface DatagridToolbarProps {
    title?: string | ReactElement;
    navItems?: ReactNode;
    showSeparator?: boolean;
    prefixItems?: ReactNode[];
    postfixItems?: ReactNode[];
    borderBottom?: boolean;
    borderColor?: ColorDefinitions;
}

const DatagridToolbar: React.FC<DatagridToolbarProps> = ({
    title,
    navItems,
    showSeparator = false,
    prefixItems = [],
    postfixItems = [],
    borderBottom = false,
    borderColor = ColorDefinitions.Surface,
}) => {
    return (
        <Toolbar
            title={title}
            navItems={navItems}
            showSeparator={showSeparator}
            prefixItems={prefixItems}
            postfixItems={postfixItems}
            borderBottom={borderBottom}
            borderColor={borderColor}
        />
    );
};

export default DatagridToolbar;
