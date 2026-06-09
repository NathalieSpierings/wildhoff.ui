import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { DatagridColumnState } from "./Config/DatagridColumnState";
import { DatagridGetDataArguments, FilterUpdateFunc } from "./Config/DatagridData";
import { DatagridRowConfig } from "./Config/DatagridRowConfig";
import { DatagridAction } from "./Config/DatagridAction";
import { DatagridSortConfig } from "./Config/DatagridSort";
import { PaginationData } from "./Pagination";
import Dropdown from "../../UI/Dropdown/Dropdown";
import Icon from "../../UI/Icons/Icon/Icon";
import { IconDefinitions } from "../../../lib/utils/definitions";
import Checkbox from "../../Forms/Checkbox/Checkbox";


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

    function getColumnDropdownItems(
        prop: string,
        config: DatagridRowConfig<TData>,
        state: DatagridColumnState
    ) {
        return {
            tabItems: [
                {
                    id: "tabMenu",
                    content: "Menu",
                },
                {
                    id: "tabColumns",
                    content: "Kolommen",
                },
            ],
            tabs: [
                {
                    tabId: "tabMenu",
                    tabPane: [
                        {
                            id: "menu",
                            menuItems: [
                                {
                                    id: "sort-asc",
                                    content: "Sorteer oplopend",
                                    selected: sort?.prop === prop && sort.order === "asc",
                                    onClick: () => setSort({ prop, order: "asc", }),
                                },
                                {
                                    id: "sort-desc",
                                    content: "Sorteer aflopend",
                                    selected: sort?.prop === prop && sort.order === "desc",
                                    onClick: () => setSort({ prop, order: "desc", }),
                                },
                                {
                                    divider: true,
                                },
                                {
                                    id: "pinning",
                                    prefix: <Icon icon={IconDefinitions.pin} />,
                                    content: "Pin column",
                                    children: [
                                        {
                                            id: "pin-left",
                                            content: "Pin links",
                                            selected: state.pinned === "left",
                                            onClick: () => updateColumnState(prop, { pinned: "left" }),
                                        },
                                        {
                                            id: "pin-right",
                                            content: "Pin rechts",
                                            selected: state.pinned === "right",
                                            onClick: () => updateColumnState(prop, { pinned: "right" }),
                                        },
                                        {
                                            id: "pin-none",
                                            content: "Niet pinnen",
                                            selected: state.pinned === null,
                                            onClick: () => updateColumnState(prop, { pinned: null }),
                                        },
                                    ]
                                },
                                {
                                    divider: true,
                                },
                                {
                                    id: "autosize",
                                    content: "Autosize",
                                    onClick: () => updateColumnState(prop, { width: Math.max(120, config.title.length * 20), }),
                                },
                                {
                                    divider: true,
                                },
                                {
                                    id: "reset-columns",
                                    content: "Reset kolommen",
                                    onClick: resetColumns,
                                },
                            ],
                        },
                    ],
                },
                {
                    tabId: "tabColumns",
                    tabPane: [
                        {
                            id: "columns",
                            menuItems: columnState.map((column) => {
                                const columnConfig = columns.find(
                                    (c) => c.prop === column.prop
                                );

                                return {
                                    id: column.prop,
                                    keepOpen: true,
                                    selected: column.visible,
                                    content: (
                                        <Checkbox
                                            label={columnConfig?.title ?? column.prop}
                                            checked={column.visible}
                                            onChange={(checked) =>
                                                updateColumnState(column.prop, {
                                                    visible: checked,
                                                })
                                            }
                                        />
                                    ),
                                };
                            }),
                        },
                    ],
                },
            ],
        };
    }

    return (
        <div className="smart-grid">

            <div className='smart-grid__header' style={{ gridTemplateColumns: columnWidths }}>
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
                                "smart-grid__hcell",
                                state.pinned === "left" && "smart-grid__hcell--pinned-left",
                                state.pinned === "right" && "smart-grid__hcell--pinned-right",
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
                            <div className="smart-grid__hcell__container">
                                <span className="smart-grid__hcell__label">{config.title}</span>
                                <span className="sort-indicator"></span>
                                {/* <span className="sort-indicator dg__hcell__sort">
                                    {sortOrder === "asc" && "▲"}
                                    {sortOrder === "desc" && "▼"}
                                </span> */}
                            </div>


                            <Dropdown
                                trigger={{
                                    label: "⋮",
                                    dropdownTriggerCss: "smart-grid__hcell__menu",
                                }}
                                closeOnSelect={false}
                                {...getColumnDropdownItems(state.prop, config, state)}
                            />

                            <div
                                className="smart-grid__hcell__resize"
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
                        </div>
                    );
                })}
            </div>

            <div className="smart-grid__body">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="smart-grid__row"
                        style={{ gridTemplateColumns: columnWidths }}
                    >
                        {visibleColumns.map(({ config, state }) => (
                            <div
                                key={state.prop}
                                className={[
                                    "smart-grid__cell",
                                    state.pinned === "left" && "smart-grid__cell--pinned-left",
                                    state.pinned === "right" && "smart-grid__cell--pinned-right",
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

            <div className="smart-grid__footer">
                <span>{total} resultaten</span>

                <button onClick={resetColumns}>Reset kolommen</button>
            </div>
        </div>
    );
}

export default Datagrid;