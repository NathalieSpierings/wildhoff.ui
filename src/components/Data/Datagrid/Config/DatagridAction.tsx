import React, { ReactElement } from "react";

export type DatagridActionFunc<TData> = (
    item: TData,
    refresh: () => Promise<void>
) => void;

export interface DatagridAction<TData> {
    label?: string;
    icon?: ReactElement;
    action?: DatagridActionFunc<TData>;
    disabled?: (item: TData) => boolean;
    element?: (item: TData) => ReactElement | null;
}

export interface DatagridActionComponentProps<TData> {
    actions: DatagridAction<TData>[];
    item: TData;
    refresh: () => Promise<void>;
}

export function DatagridActionComponent<TData>({
    actions,
    item,
    refresh,
}: Readonly<DatagridActionComponentProps<TData>>): ReactElement {
    return (
        <td scope="row" data-label="Acties">
            <div className="table-actions">
                {actions.map((action, idx) => {
                    const isDisabled = action.disabled?.(item) ?? false;
                    const key = action.label ?? idx;

                    if (action.element) {
                        return <div key={key}>{action.element(item)}</div>;
                    }

                    return (
                        <button
                            key={key}
                            type="button"
                            disabled={isDisabled}
                            {...(isDisabled ? { style: { opacity: 0.3 } } : {})}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isDisabled) {
                                    action.action?.(item, refresh);
                                }
                            }}
                        >
                            {action.icon}
                        </button>
                    );
                })}
            </div>
        </td>
    );
}
