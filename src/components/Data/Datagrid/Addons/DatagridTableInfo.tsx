import React, { ReactNode } from "react";
import { ColorDefinitions } from "../../../../lib/utils/definitions";

export interface DatagridTableInfoProps {
    borderBottom?: boolean;
    borderColor?: ColorDefinitions;
    children: ReactNode;
}

const DatagridTableInfo = ({
    borderBottom = false,
    borderColor = ColorDefinitions.Surface,
    children,
}: DatagridTableInfoProps) => {
    return (
        <div
            className={`datagrid__info ${borderBottom ? "border-" + borderColor : null
                }`}
        >
            <div className="datagrid__info__container">{children}</div>
        </div>
    );
};

export default DatagridTableInfo;
