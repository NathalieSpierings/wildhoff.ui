export type DatagridSortOrder = "asc" | "desc";

export interface DatagridSortConfig {
    prop: string;
    order: DatagridSortOrder;
}

export interface DatagridSortIconProps {
    order: DatagridSortOrder;
}

export type DatagridSortFunc<TData> = (a: TData, b: TData) => number;
