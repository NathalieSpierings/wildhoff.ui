import React, { ReactElement } from "react";
import { DatagridColumnState } from "./Config/DatagridColumnState";
import { DatagridRowConfig } from "./Config/DatagridRowConfig";
import { DatagridSortConfig } from "./Config/DatagridSort";

export interface DatagridHeaderProps<TData> {
    item: DatagridRowConfig<TData>;
    columnWidths: string;
    visibleColumns: {
        state: DatagridColumnState;
        config: DatagridRowConfig<TData, Extract<keyof TData, string>, any>;
    }[];
    sortConfig?: DatagridSortConfig;
    setSort: (prop: string) => void;
}
export function DatagridHeader<TData>({ 
    item,


    columnWidths,
    visibleColumns,
    sortConfig,
    setSort

}: Readonly<DatagridHeaderProps<TData>>): ReactElement {

    const sortable = item.sortable !== false;
    const sortOrder = sortable && sortConfig?.prop === item.prop ? sortConfig.order : null;

    
    const handleSortClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
        if (!sortable) return;

        setSort(item.prop);
    };

    return (
        <div className='dg__header' style={{ gridTemplateColumns: columnWidths }}>
            {visibleColumns.map(({ config, state }) => {

               
                return (
                    <div
                        key={state.prop}
                        className={[
                            "dg__hcell",
                            state.pinned === "left" && "dg__hcell--pinned-left",
                            state.pinned === "right" && "dg__hcell--pinned-right",
                            sortOrder === "asc" && "ascending",
                            sortOrder === "desc" && "descending",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        draggable
                        style={{
                            left:
                                state.pinned === "left"
                                    ? getLeftOffset(state.prop)
                                    : undefined,
                            right:
                                state.pinned === "right"
                                    ? getRightOffset(state.prop)
                                    : undefined,
                        }}
                        onDragStart={() => setDragProp(state.prop)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                            if (!dragProp) return;

                            setColumnState((prev) => {
                                const from = prev.findIndex((c) => c.prop === dragProp);
                                const to = prev.findIndex((c) => c.prop === state.prop);

                                if (from < 0 || to < 0) return prev;

                                const next = [...prev];
                                const [moved] = next.splice(from, 1);
                                next.splice(to, 0, moved);

                                return next;
                            });
                        }}
                        onClick={handleSortClick}
                    >
                        <div className="dg__hcell__container">
                            <span className="dg__hcell__label">{config.title}</span>

                            <span className="dg__hcell__sort">
                                {sortOrder === "asc" && "▲"}
                                {sortOrder === "desc" && "▼"}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="dg__hcell__menu"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveCol(activeCol === state.prop ? null : state.prop);
                            }}
                        >
                            ⋮
                        </button>

                        <div
                            className="dg__hcell__resize"
                            onPointerDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                const startX = e.clientX;
                                const startWidth = state.width;

                                function move(ev: PointerEvent) {
                                    updateColumnState(state.prop, {
                                        width: Math.max(80, startWidth + ev.clientX - startX),
                                    });
                                }

                                function up() {
                                    document.removeEventListener("pointermove", move);
                                    document.removeEventListener("pointerup", up);
                                }

                                document.addEventListener("pointermove", move);
                                document.addEventListener("pointerup", up);
                            }}
                        />

                        {activeCol === state.prop && (
                            <div className="dg__menu" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handleSorting(state.prop)}                                    >
                                    Sorteer
                                </button>

                                <button
                                    onClick={() =>
                                        updateColumnState(state.prop, { pinned: "left" })
                                    }
                                >
                                    Pin links
                                </button>

                                <button
                                    onClick={() =>
                                        updateColumnState(state.prop, { pinned: "right" })
                                    }
                                >
                                    Pin rechts
                                </button>

                                <button
                                    onClick={() =>
                                        updateColumnState(state.prop, { pinned: null })
                                    }
                                >
                                    Niet pinnen
                                </button>

                                <button
                                    onClick={() =>
                                        updateColumnState(state.prop, {
                                            width: Math.max(120, config.title.length * 20),
                                        })
                                    }
                                >
                                    Autosize
                                </button>

                                <button
                                    onClick={() =>
                                        updateColumnState(state.prop, { visible: false })
                                    }
                                >
                                    Verberg kolom
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    )
}