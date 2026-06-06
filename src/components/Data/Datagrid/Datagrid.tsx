import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { DatagridColumnState } from "./Config/DatagridColumnState";
import { DatagridGetDataArguments, FilterUpdateFunc } from "./Config/DatagridData";
import { DatagridRowConfig } from "./Config/DatagridRowConfig";
import { DatagridAction } from "./Config/DatagridAction";
import { DatagridSortConfig } from "./Config/DatagridSort";
import { PaginationData } from "./Pagination";
import Dropdown from "../../UI/Dropdown/Dropdown";

export type DatagridSortOrder = "asc" | "desc";
export type PinnedPosition = "left" | "right" | null;
export type DatagridColumnFilters = Record<string, any>;

interface DatagridProps<TData> {
    data: TData[];
    dataRaw?: TData[];
    total: number;
    loading: boolean;
    onFilterUpdate: FilterUpdateFunc<TData>;
    initialSortConfig?: DatagridSortConfig;
    rowActions?: DatagridAction<TData>[];
    columns: DatagridRowConfig<TData>[];
}

function Datagrid<TData extends { id: string | number }>({
    data,
    dataRaw,
    total,
    loading,
    onFilterUpdate,
    initialSortConfig,
    rowActions,
    columns,
}: Readonly<DatagridProps<TData>>): ReactElement {

    const [searchTerm, setSearchTerm] = useState("");
    const [columnFilters, setColumnFilters] = useState<Record<string, any>>({});

    const [pagination, setPagination] = useState<PaginationData>({ page: 1, perPage: 25 });
    const [sort, setSort] = useState<DatagridSortConfig | undefined>(initialSortConfig);

    const [columnState, setColumnState] = useState<DatagridColumnState[]>(
        columns.map((c) => ({
            prop: c.prop,
            width: 160,
            visible: true,
            pinned: null,
        }))
    );

    const [activeCol, setActiveCol] = useState<string | null>(null);
    const [dragProp, setDragProp] = useState<string | null>(null);

    const visibleColumns = useMemo(() => {
        const merged = columnState
            .filter((s) => s.visible)
            .map((state) => ({
                state,
                config: columns.find((c) => c.prop === state.prop)!,
            }))
            .filter((x) => x.config);

        const left = merged.filter((c) => c.state.pinned === "left");
        const center = merged.filter((c) => c.state.pinned == null);
        const right = merged.filter((c) => c.state.pinned === "right");

        return [...left, ...center, ...right];
    }, [columnState, columns]);

    const columnWidths = visibleColumns
        .map((c) => `${c.state.width}px`)
        .join(" ");

    function getLeftOffset(prop: string) {
        let offset = 0;

        for (const col of visibleColumns) {
            if (col.state.prop === prop) break;
            if (col.state.pinned === "left") offset += col.state.width;
        }

        return offset;
    }

    function getRightOffset(prop: string) {
        let offset = 0;

        for (const col of [...visibleColumns].reverse()) {
            if (col.state.prop === prop) break;
            if (col.state.pinned === "right") offset += col.state.width;
        }

        return offset;
    }


    // filter update  
    useEffect(() => {
        onFilterUpdate({
            searchTerm,
            sort,
            propertyConfigs: columns,
            pagination,
            columnFilters,
        });
    }, [searchTerm, pagination.page, pagination.perPage, sort, columnFilters]);


    // Sorting
    const handleSorting = (prop: string) => {
        if (!setSort) return;

        setSort(
            sort?.prop === prop
                ? { prop, order: sort.order === "asc" ? "desc" : "asc" }
                : { prop, order: "asc" }
        );
    };

    function updateColumnState(
        prop: string,
        patch: Partial<DatagridColumnState>
    ) {
        setColumnState((prev) =>
            prev.map((c) => (c.prop === prop ? { ...c, ...patch } : c))
        );
    }

    function resetColumns() {
        setColumnState(
            columns.map((c) => ({
                prop: c.prop,
                width: 160,
                visible: true,
                pinned: null,
            }))
        );

        setSort(undefined);
    }

    function renderCell(item: TData, col: DatagridRowConfig<TData>) {
        if (col.useItemOnly) return col.useItemOnly(item);

        const rawValue = item[col.prop];
        const transformedValue = col.transformValue
            ? col.transformValue(rawValue)
            : rawValue;

        if (col.wrapValue) {
            return col.wrapValue(item, transformedValue);
        }

        return String(transformedValue ?? "");
    }

    return (
        <div className="dg">

            <div className='dg__header' style={{ gridTemplateColumns: columnWidths }}>
                {visibleColumns.map(({ config, state }) => {

                    const sortable = config.sortable !== false;
                    const sortOrder = sortable && sort?.prop === config.prop ? sort.order : null;

                    const handleSortClick = (e: React.MouseEvent<HTMLTableCellElement>) => {

                        if (!sortable) return;
                        handleSorting(state.prop);
                    };

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

            <div className="dg__body">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="dg__row"
                        style={{ columnWidths }}
                    >
                        {visibleColumns.map(({ config, state }) => (
                            <div
                                key={state.prop}
                                className={[
                                    "dg__cell",
                                    state.pinned === "left" && "dg__cell--pinned-left",
                                    state.pinned === "right" && "dg__cell--pinned-right",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
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
                            >
                                {renderCell(item, config)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="dg__footer">
                <span>{total} resultaten</span>

                <button onClick={resetColumns}>Reset kolommen</button>
            </div>
        </div>
    );
}

export default Datagrid;